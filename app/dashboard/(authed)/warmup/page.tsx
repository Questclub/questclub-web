import {
  SOCIAL_ACCOUNTS,
  PLATFORM_LABEL,
  STATUS_LABEL,
  WARMUP_CHECKLIST,
  type AccountStatus,
} from "@/lib/ops-data";

export const dynamic = "force-dynamic";

export default function WarmupPage() {
  const today = new Date().toISOString().slice(0, 10);
  const todayDay = WARMUP_CHECKLIST.find((d) => d.date === today);
  const upcoming = WARMUP_CHECKLIST.filter((d) => d.date > today);

  return (
    <div>
      <div className="mb-8">
        <div className="text-xs uppercase tracking-widest text-lime-400 font-mono mb-2">
          / 03
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Warmup</h1>
        <p className="text-text-muted text-sm mt-2 max-w-xl">
          Estado de cuentas + checklist diario de warmup pre-launch (drop dom 11
          may). Editar en{" "}
          <code className="text-lime-400 font-mono text-xs">
            lib/ops-data.ts
          </code>
          .
        </p>
      </div>

      {/* Accounts */}
      <section className="mb-10">
        <div className="text-xs font-mono text-text-muted uppercase tracking-wider mb-3">
          Cuentas
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          {SOCIAL_ACCOUNTS.map((a) => (
            <div
              key={a.platform}
              className="bg-surface border border-border rounded-2xl p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-xs font-mono text-text-muted uppercase tracking-wider">
                    {PLATFORM_LABEL[a.platform]}
                  </div>
                  <div className="text-base font-bold mt-1">{a.handle}</div>
                </div>
                <AccountStatusBadge status={a.status} />
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
      </section>

      {/* Today's checklist */}
      {todayDay && (
        <section className="mb-10">
          <div className="text-xs font-mono text-lime-400 uppercase tracking-wider mb-3">
            Hoy
          </div>
          <DayCard day={todayDay} highlighted />
        </section>
      )}

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <section>
          <div className="text-xs font-mono text-text-muted uppercase tracking-wider mb-3">
            Próximos días
          </div>
          <div className="space-y-3">
            {upcoming.map((d) => (
              <DayCard key={d.date} day={d} />
            ))}
          </div>
        </section>
      )}

      {!todayDay && upcoming.length === 0 && (
        <div className="text-sm text-text-muted bg-surface border border-border rounded-xl p-6">
          Warmup completado. Drop programado dom 11 may 17:30 ES con Banger
          Paula.
        </div>
      )}
    </div>
  );
}

function DayCard({
  day,
  highlighted,
}: {
  day: (typeof WARMUP_CHECKLIST)[number];
  highlighted?: boolean;
}) {
  return (
    <details
      className={`bg-surface border rounded-xl overflow-hidden ${
        highlighted ? "border-lime-400/50" : "border-border"
      }`}
      open={highlighted}
    >
      <summary className="cursor-pointer list-none p-4 hover:bg-surface/80">
        <div className="flex items-baseline gap-3">
          <span className="text-base font-bold">{day.label}</span>
          <span className="text-xs font-mono text-text-muted">{day.date}</span>
        </div>
        <div className="text-xs text-text-muted mt-1">{day.production}</div>
      </summary>

      <div className="border-t border-border p-4 space-y-4 bg-bg/50">
        <ChecklistSection
          icon="📱"
          label="TikTok"
          items={day.tiktok}
        />
        <ChecklistSection
          icon="📸"
          label="Instagram"
          items={day.instagram}
        />
      </div>
    </details>
  );
}

function ChecklistSection({
  icon,
  label,
  items,
}: {
  icon: string;
  label: string;
  items: string[];
}) {
  return (
    <div>
      <div className="text-xs font-mono text-text-muted uppercase tracking-wider mb-2">
        {icon} {label}
      </div>
      <ul className="space-y-1.5">
        {items.map((it, i) => (
          <li key={i} className="text-sm text-text flex gap-2">
            <span className="text-lime-400 mt-0.5">▸</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AccountStatusBadge({ status }: { status: AccountStatus }) {
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

function Stat({ label, value }: { label: string; value: number | string }) {
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
