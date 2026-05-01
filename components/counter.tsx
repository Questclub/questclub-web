import { getDisplayedTotal } from "@/lib/waitlist-stats";

export default async function Counter() {
  const total = await getDisplayedTotal();
  return (
    <div className="mt-5 flex flex-col items-center gap-3">
      <div className="inline-flex items-center gap-2 bg-surface border border-border rounded-full px-4 py-2 text-sm">
        <span className="relative flex size-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-75" />
          <span className="relative inline-flex size-2 rounded-full bg-lime-400" />
        </span>
        <span className="text-text">
          <strong className="text-lime-400">
            {total.toLocaleString("es-ES")}
          </strong>{" "}
          plazas iniciales abiertas
        </span>
        <span className="text-text-muted">·</span>
        <span className="text-text-muted">sin spam</span>
      </div>
      <p className="text-xs text-text-muted">
        Sin feed público · Sin stories · Fotos solo dentro del grupo · iOS +
        Android
      </p>
    </div>
  );
}
