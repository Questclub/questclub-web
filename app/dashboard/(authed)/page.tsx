import { supabaseAdmin } from "@/lib/supabase";
import { SOCIAL_ACCOUNTS, ISSUES, WARMUP_VIDEOS } from "@/lib/ops-data";

export const dynamic = "force-dynamic";

async function getStats() {
  const since24h = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const since7d = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const [{ count: total }, { count: confirmed }, { count: last24h }, { count: last7d }] =
    await Promise.all([
      supabaseAdmin
        .from("waitlist")
        .select("*", { count: "exact", head: true }),
      supabaseAdmin
        .from("waitlist")
        .select("*", { count: "exact", head: true })
        .not("confirmed_at", "is", null),
      supabaseAdmin
        .from("waitlist")
        .select("*", { count: "exact", head: true })
        .gte("created_at", since24h),
      supabaseAdmin
        .from("waitlist")
        .select("*", { count: "exact", head: true })
        .gte("created_at", since7d),
    ]);

  // Top sources
  const { data: sourcesRaw } = await supabaseAdmin
    .from("waitlist")
    .select("source")
    .not("confirmed_at", "is", null);

  const sources: Record<string, number> = {};
  for (const r of sourcesRaw ?? []) {
    const s = r.source ?? "organic";
    sources[s] = (sources[s] ?? 0) + 1;
  }

  return {
    total: total ?? 0,
    confirmed: confirmed ?? 0,
    last24h: last24h ?? 0,
    last7d: last7d ?? 0,
    sources,
  };
}

export default async function Overview() {
  const stats = await getStats();
  const confirmRate = stats.total
    ? Math.round((stats.confirmed / stats.total) * 100)
    : 0;
  const openIssues = ISSUES.filter((i) => i.status === "open").length;
  const bannedAccounts = SOCIAL_ACCOUNTS.filter((a) => a.status === "banned")
    .length;
  const postedVideos = WARMUP_VIDEOS.filter((v) => v.status === "posted").length;

  return (
    <div>
      <SectionHeader code="01" title="Overview" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        <Kpi label="Total apuntados" value={stats.total} />
        <Kpi
          label="Confirmados"
          value={stats.confirmed}
          sub={`${confirmRate}% confirma`}
          accent
        />
        <Kpi label="Últimas 24h" value={stats.last24h} />
        <Kpi label="Últimos 7d" value={stats.last7d} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Panel title="Operación" code="A">
          <Row label="Cuentas sociales activas">
            {SOCIAL_ACCOUNTS.length - bannedAccounts} de {SOCIAL_ACCOUNTS.length}
          </Row>
          <Row label="Cuentas con problema">
            {bannedAccounts > 0 ? (
              <span className="text-rose-400">{bannedAccounts}</span>
            ) : (
              <span className="text-text-muted">0</span>
            )}
          </Row>
          <Row label="Videos warmup publicados">
            {postedVideos} / {WARMUP_VIDEOS.length}
          </Row>
          <Row label="Issues abiertos">
            {openIssues > 0 ? (
              <span className="text-rose-400">{openIssues}</span>
            ) : (
              <span className="text-text-muted">0</span>
            )}
          </Row>
        </Panel>

        <Panel title="Atribución" code="B">
          {Object.keys(stats.sources).length === 0 ? (
            <p className="text-text-muted text-sm">
              Sin signups confirmados todavía.
            </p>
          ) : (
            Object.entries(stats.sources)
              .sort((a, b) => b[1] - a[1])
              .map(([src, n]) => (
                <Row key={src} label={src}>
                  {n}
                </Row>
              ))
          )}
        </Panel>
      </div>
    </div>
  );
}

/* --- shared building blocks --- */

function SectionHeader({ code, title }: { code: string; title: string }) {
  return (
    <div className="mb-8">
      <div className="text-xs uppercase tracking-widest text-lime-400 font-mono mb-2">
        / {code}
      </div>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>
    </div>
  );
}

function Kpi({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: number | string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div className="bg-surface border border-border rounded-xl p-4">
      <div className="text-xs text-text-muted uppercase tracking-wider">
        {label}
      </div>
      <div
        className={`text-2xl md:text-3xl font-bold mt-1 tabular-nums ${
          accent ? "text-lime-400" : "text-text"
        }`}
      >
        {typeof value === "number" ? value.toLocaleString("es-ES") : value}
      </div>
      {sub && <div className="text-xs text-text-muted mt-1">{sub}</div>}
    </div>
  );
}

function Panel({
  title,
  code,
  children,
}: {
  title: string;
  code: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-surface border border-border rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
        <span className="text-xs font-mono text-text-muted">/ {code}</span>
        <span className="text-sm font-bold uppercase tracking-wider">
          {title}
        </span>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-text-muted">{label}</span>
      <span className="font-mono tabular-nums">{children}</span>
    </div>
  );
}
