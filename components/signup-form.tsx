"use client";

import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .email("Introduce un email válido");

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

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;

    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Email no válido");
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
          // TODO: cuando NEXT_PUBLIC_TURNSTILE_SITE_KEY exista, sustituir
          // por el token real del widget Turnstile.
          turnstileToken: "no-turnstile-configured",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.error ?? "Algo ha ido mal. Inténtalo de nuevo.");
        return;
      }

      if (data.already === "confirmed") {
        toast.success("Ya estabas en la lista.");
      } else {
        toast.success("Revisa tu email para confirmar tu plaza.");
      }
      setDone(true);
    } catch {
      toast.error("Error de red. Vuelve a intentarlo.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="w-full max-w-md mx-auto bg-surface border border-border rounded-2xl p-6 text-left">
        <div className="text-lime-400 text-sm font-bold mb-2">
          📧 Casi dentro
        </div>
        <p className="text-text">
          Te hemos enviado un email a <strong>{email}</strong>. Pulsa el enlace
          para confirmar y reservar tu plaza.
        </p>
        <p className="text-text-muted text-sm mt-3">
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
    <form
      onSubmit={onSubmit}
      className="w-full max-w-md mx-auto flex flex-col sm:flex-row gap-2"
    >
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
    </form>
  );
}
