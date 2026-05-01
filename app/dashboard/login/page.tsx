"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

export default function Login() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError(null);

    const res = await fetch("/api/dashboard/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/dashboard");
      router.refresh();
    } else {
      setError("Contraseña incorrecta");
      setPassword("");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm">
        <div className="text-xs uppercase tracking-widest text-lime-400 mb-3">
          Operator
        </div>
        <h1 className="text-3xl font-bold mb-2 tracking-tight">Dashboard</h1>
        <p className="text-text-muted text-sm mb-8">Quest Club · interno</p>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoFocus
          placeholder="Contraseña"
          disabled={loading}
          className="w-full bg-surface border border-border rounded-full px-5 py-3 text-text placeholder:text-text-muted focus:outline-none focus:border-lime-400 disabled:opacity-60 mb-3"
        />

        {error && (
          <p className="text-sm text-rose-400 mb-3" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-lime-400 text-bg font-bold py-3 rounded-full hover:bg-lime-300 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Verificando…" : "Entrar"}
        </button>

        <p className="text-xs text-text-muted text-center mt-6">
          <a href="/" className="hover:text-lime-400 transition">
            ← Volver al inicio
          </a>
        </p>
      </form>
    </main>
  );
}
