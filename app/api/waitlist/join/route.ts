import { NextRequest, NextResponse } from "next/server";
import { createHash, randomBytes } from "node:crypto";
import { render } from "@react-email/render";
import { supabaseAdmin } from "@/lib/supabase";
import { joinSchema } from "@/lib/validation";
import { checkRateLimit } from "@/lib/ratelimit";
import { verifyTurnstile } from "@/lib/turnstile";
import { resend, FROM_EMAIL } from "@/lib/resend";
import ConfirmationEmail from "@/emails/confirmation";

export const runtime = "nodejs";

function getClientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real;
  return "0.0.0.0";
}

function hashIp(ip: string): string {
  return createHash("sha256").update(ip).digest("hex");
}

export async function POST(req: NextRequest) {
  // 1. Parse JSON
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  // 2. Validar
  const parsed = joinSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos inválidos", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { email, ref, source, turnstileToken } = parsed.data;
  const ip = getClientIp(req);

  // 3. Rate limit por IP
  const rl = await checkRateLimit(ip);
  if (!rl.success) {
    return NextResponse.json(
      { error: "Demasiadas peticiones. Intenta en unos minutos." },
      { status: 429 }
    );
  }

  // 4. Anti-bot Turnstile
  const turnstile = await verifyTurnstile(turnstileToken, ip);
  if (!turnstile.success) {
    return NextResponse.json(
      { error: "Verificación anti-spam fallida" },
      { status: 403 }
    );
  }

  // 5. Idempotencia: si el email ya está, devolvemos OK con su info
  const { data: existing } = await supabaseAdmin
    .from("waitlist")
    .select("email, referral_code, confirmed_at")
    .eq("email", email)
    .maybeSingle();

  if (existing) {
    return NextResponse.json({
      ok: true,
      already: existing.confirmed_at ? "confirmed" : "pending",
      referral_code: existing.referral_code,
    });
  }

  // 6. Validar ref code (si se pasó, debe existir y estar confirmado)
  let referredByCode: string | null = null;
  if (ref) {
    const { data: referrer } = await supabaseAdmin
      .from("waitlist")
      .select("referral_code")
      .eq("referral_code", ref)
      .not("confirmed_at", "is", null)
      .maybeSingle();
    if (referrer) {
      referredByCode = referrer.referral_code;
    }
    // Si el ref no existe o no está confirmado, lo ignoramos sin error
  }

  // 7. Generar referral_code único (vía función SQL)
  const { data: codeData, error: codeError } = await supabaseAdmin.rpc(
    "generate_referral_code"
  );
  if (codeError || !codeData) {
    console.error("[waitlist/join] error generando código", codeError);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
  const referralCode = codeData as string;

  // 8. Token de confirmación (256 bits, URL-safe)
  const confirmationToken = randomBytes(32).toString("base64url");

  const userAgent = (req.headers.get("user-agent") || "").slice(0, 256);
  const finalSource = referredByCode ? "referral" : source;

  // 9. Insertar
  const { error: insertError } = await supabaseAdmin.from("waitlist").insert({
    email,
    referral_code: referralCode,
    referred_by_code: referredByCode,
    confirmation_token: confirmationToken,
    source: finalSource,
    ip_hash: hashIp(ip),
    user_agent: userAgent,
  });

  if (insertError) {
    console.error("[waitlist/join] insert error", insertError);
    return NextResponse.json({ error: "Error al guardar" }, { status: 500 });
  }

  // 10. Email de confirmación (si Resend configurado)
  if (resend) {
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const confirmUrl = `${baseUrl}/api/waitlist/confirm?token=${confirmationToken}`;
    const html = await render(ConfirmationEmail({ confirmUrl }));

    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: "Confirma tu email — Quest Club",
        html,
      });
    } catch (err) {
      console.error("[waitlist/join] resend send error", err);
      // No fallamos: el usuario está en la lista. Podrá pedir reenvío después.
    }
  } else {
    console.warn(
      "[waitlist/join] Resend no configurado — email de confirmación NO enviado"
    );
  }

  return NextResponse.json({
    ok: true,
    referral_code: referralCode,
  });
}
