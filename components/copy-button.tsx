"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Copiado");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("No se pudo copiar");
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="bg-lime-400 text-bg font-bold text-sm px-4 py-2 rounded-full hover:bg-lime-300 transition shrink-0"
    >
      {copied ? "✓" : "Copiar"}
    </button>
  );
}
