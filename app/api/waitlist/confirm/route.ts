import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const reqUrl = new URL(req.url);
  // En dev preferimos el origen del propio request (puerto que el user esté usando).
  // En prod NEXT_PUBLIC_APP_URL tiene precedencia para canonicalizar al dominio.
  const baseUrl =
    process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_APP_URL
      ? process.env.NEXT_PUBLIC_APP_URL
      : reqUrl.origin;
  const token = reqUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(`${baseUrl}/confirm?status=invalid`);
  }

  // Localizamos el registro con el token y lo marcamos como confirmado.
  // Devolvemos referral_code para redirigir a la página de gracias correcta.
  const { data, error } = await supabaseAdmin
    .from("waitlist")
    .update({
      confirmation_token: null,
      confirmed_at: new Date().toISOString(),
    })
    .eq("confirmation_token", token)
    .select("email, referral_code")
    .maybeSingle();

  if (error || !data) {
    return NextResponse.redirect(`${baseUrl}/confirm?status=invalid`);
  }

  return NextResponse.redirect(`${baseUrl}/thanks/${data.referral_code}`);
}
