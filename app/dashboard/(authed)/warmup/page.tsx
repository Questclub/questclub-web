import {
  SOCIAL_ACCOUNTS,
  PLATFORM_LABEL,
  STATUS_LABEL,
  type AccountStatus,
} from "@/lib/ops-data";

export const dynamic = "force-dynamic";

export default function WarmupPage() {
  return (
    <div>
      <div className="mb-8">
        <div className="text-xs uppercase tracking-widest text-lime-400 font-mono mb-2">
          / 03
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Warmup</h1>
        <p className="text-text-muted text-sm mt-2 max-w-xl">
          Estado de las 4 cuentas sociales `@questclubapp`. Editar a mano en{" "}
          <code className="text-lime-400 font-mono text-xs">lib/ops-data.ts</code>{" "}
          hasta que migremos a Supabase.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {SOCIAL_ACCOUNTS.map((a) => (
          <div
            key={a.platform}
            className="bg-surface border border-border rounded-2xl p-5"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-xs font-mono text-text-muted uppercase tracking-wider">
                  {PLATFORM_LABEL[a.platform]}
                </div>
                <div className="text-lg font-bold mt-1">{a.handle}</div>
              </div>
              <StatusBadge status={a.status} />
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs mb-3">
              <Stat label="Días" value={daysSince(a.createdAt)} />
              <Stat label="Followers" value={a.followers} />
              <Stat label="Posts" value={a.posts} />
            </div>

            {a.notes && (
              <div className="text-xs text-text-muted leading-relaxed bg-bg border border-border rounded-lg p-3 mt-3">
                {a.notes}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: AccountStatus }) {
  const styles: Record<AccountStatus, string> = {
    active: "bg-lime-400/10 text-lime-400 border-lime-400/30",
    warming: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    banned: "bg-rose-500/10 text-rose-400 border-rose-500/30",
    pending: "bg-neutral-500/10 text-neutral-400 border-neutral-500/30",
  };
  return (
    <span
      className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${styles[status]}`}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}

function Stat({
  label,
  value,
}: {
  label: string;
  value: number | string;
}) {
  return (
    <div className="bg-bg border border-border rounded-lg p-2 text-center">
      <div className="text-base font-bold tabular-nums text-text">{value}</div>
      <div className="text-[10px] text-text-muted uppercase tracking-wider mt-0.5">
        {label}
      </div>
    </div>
  );
}

function daysSince(iso: string): number {
  const d = new Date(iso);
  const ms = Date.now() - d.getTime();
  return Math.max(0, Math.floor(ms / (1000 * 60 * 60 * 24)));
}
