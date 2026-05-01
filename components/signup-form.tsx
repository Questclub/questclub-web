"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { track } from "@vercel/analytics";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";

const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .email("Introduce un email válido");

const STORAGE_KEY = "qc_waitlist_email";
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type Props = {
  refCode?: string;
  source?: string;
  /** Color del botón. Por defecto lime sobre fondo oscuro. */
  variant?: "default" | "inverted";
};

export default function SignupForm({
  refCode,
  source = "organic",
  variant = "default",
}: Props) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance | null>(null);

  // Persistencia: si el usuario ya envió un email en este navegador,
  // al volver a la home le mostramos el "Estás dentro" en lugar del form.
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setEmail(stored);
        setDone(true);
      }
      const storedCode = localStorage.getItem(`${STORAGE_KEY}_code`);
      if (storedCode) setReferralCode(storedCode);
    } catch {
      // localStorage puede fallar en modo privado/SSR — ignoramos
    }
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;

    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Email no válido");
      return;
    }

    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      toast.error("Verifica que no eres un bot antes de continuar");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/waitlist/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: parsed.data,
          ref: refCode,
          source: refCode ? "referral" : source,
          // Si Turnstile está configurado mandamos el token real;
          // si no, un placeholder que la API acepta cuando no hay secret key.
          turnstileToken: turnstileToken ?? "no-turnstile-configured",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.error ?? "Algo ha ido mal. Inténtalo de nuevo.");
        // Reseteamos Turnstile para que el usuario pueda reintentar
        turnstileRef.current?.reset();
        setTurnstileToken(null);
        return;
      }

      if (data.already === "confirmed") {
        toast.success("Ya estabas en la lista.");
      } else {
        toast.success("Revisa tu email para confirmar tu plaza.");
      }
      track("signup_submitted", {
        source: refCode ? "referral" : source,
        status: data.already ?? "new",
      });
      if (data.referral_code) {
        setReferralCode(data.referral_code);
      }
      try {
        localStorage.setItem(STORAGE_KEY, parsed.data);
        if (data.referral_code) {
          localStorage.setItem(`${STORAGE_KEY}_code`, data.referral_code);
        }
      } catch {
        // ignoramos si localStorage no está disponible
      }
      setDone(true);
    } catch {
      toast.error("Error de red. Vuelve a intentarlo.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    const baseUrl =
      typeof window !== "undefined" ? window.location.origin : "";
    const referralUrl = referralCode
      ? `${baseUrl}/r/${referralCode}`
      : baseUrl;
    const shareMessage = `He encontrado esta app: QuestClub. Misiones, pruebas con foto/vídeo y ranking privado entre nosotros. Si entramos 4 desde mi enlace, desbloqueamos el Pack Verano gratis: ${referralUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;

    return (
      <div className="w-full max-w-md mx-auto bg-surface border border-border rounded-2xl p-6 text-left">
        <div className="text-lime-400 text-sm font-bold mb-2">
          ✓ Estás dentro
        </div>
        <p className="text-text mb-2">
          Te hemos enviado un email a{" "}
          <strong className="break-all">{email}</strong>. Pulsa el enlace para
          confirmar.
        </p>
        <p className="text-text mb-4">
          <strong>Ahora viene la parte importante:</strong> mete a tu grupo.
          Cada amigo que confirme te sube 100 puestos.
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            track("whatsapp_share_clicked", {
              has_referral_code: Boolean(referralCode),
            })
          }
          className="block w-full text-center bg-lime-400 text-bg font-bold py-3 rounded-full hover:bg-lime-300 transition"
        >
          Enviar al grupo de WhatsApp →
        </a>
        {referralCode && (
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-text-muted text-xs mb-1">
              Tu enlace de referidos:
            </p>
            <code className="text-lime-400 text-xs break-all font-mono">
              {referralUrl}
            </code>
          </div>
        )}
        <p className="text-text-muted text-xs mt-4">
          Revisa también la carpeta de spam. El enlace caduca en 24h.
        </p>
      </div>
    );
  }

  const buttonClass =
    variant === "inverted"
      ? "bg-bg text-lime-400 hover:bg-neutral-900"
      : "bg-lime-400 text-bg hover:bg-lime-300";

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          className="flex-1 bg-surface border border-border rounded-full px-5 py-3 text-text placeholder:text-text-muted focus:outline-none focus:border-lime-400 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={loading}
          className={`font-bold px-6 py-3 rounded-full transition disabled:opacity-60 disabled:cursor-not-allowed ${buttonClass}`}
        >
          {loading ? "Enviando…" : "Apúntate"}
        </button>
      </div>

      {TURNSTILE_SITE_KEY && (
        <div className="mt-3 flex justify-center">
          <Turnstile
            ref={turnstileRef}
            siteKey={TURNSTILE_SITE_KEY}
            options={{ theme: "dark", size: "flexible" }}
            onSuccess={(token) => setTurnstileToken(token)}
            onError={() => setTurnstileToken(null)}
            onExpire={() => setTurnstileToken(null)}
          />
        </div>
      )}
    </form>
  );
}
