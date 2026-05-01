import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

type Row = {
  email: string;
  referral_code: string;
  referred_by_code: string | null;
  source: string | null;
  country_code: string | null;
  confirmed_at: string | null;
  created_at: string;
};

export default async function WaitlistPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const params = await searchParams;
  const filter = params.filter ?? "all";

  let query = supabaseAdmin
    .from("waitlist")
    .select(
      "email, referral_code, referred_by_code, source, country_code, confirmed_at, created_at"
    )
    .order("created_at", { ascending: false })
    .limit(500);

  if (filter === "confirmed") query = query.not("confirmed_at", "is", null);
  if (filter === "pending") query = query.is("confirmed_at", null);
  if (filter === "referral") query = query.eq("source", "referral");

  const { data: rows, error } = await query;

  if (error) {
    return (
      <div>
        <SectionHeader code="02" title="Waitlist" />
        <p className="text-rose-400">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div>
      <SectionHeader code="02" title="Waitlist" />

      <div className="flex flex-wrap gap-2 mb-6">
        <FilterPill href="/dashboard/waitlist" label="Todos" active={filter === "all"} />
        <FilterPill
          href="/dashboard/waitlist?filter=confirmed"
          label="Confirmados"
          active={filter === "confirmed"}
        />
        <FilterPill
          href="/dashboard/waitlist?filter=pending"
          label="Pendientes"
          active={filter === "pending"}
        />
        <FilterPill
          href="/dashboard/waitlist?filter=referral"
          label="Vía referral"
          active={filter === "referral"}
        />
      </div>

      <p className="text-xs text-text-muted mb-3 font-mono">
        {rows?.length ?? 0} resultado{rows?.length === 1 ? "" : "s"} · max 500
      </p>

      <div className="bg-surface border border-border rounded-xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-text-muted text-xs uppercase tracking-wider">
              <th className="text-left p-3 font-medium">Email</th>
              <th className="text-left p-3 font-medium">Código</th>
              <th className="text-left p-3 font-medium">Ref by</th>
              <th className="text-left p-3 font-medium">Source</th>
              <th className="text-left p-3 font-medium">Estado</th>
              <th className="text-left p-3 font-medium">Alta</th>
            </tr>
          </thead>
          <tbody>
            {(rows ?? []).map((r: Row) => (
              <tr
                key={r.email}
                className="border-b border-border last:border-0 hover:bg-bg/50"
              >
                <td className="p-3 truncate max-w-[200px]">{r.email}</td>
                <td className="p-3 font-mono text-xs text-lime-400">
                  {r.referral_code}
                </td>
                <td className="p-3 font-mono text-xs text-text-muted">
                  {r.referred_by_code ?? "—"}
                </td>
                <td className="p-3 text-text-muted">{r.source ?? "organic"}</td>
                <td className="p-3">
                  {r.confirmed_at ? (
                    <span className="text-lime-400 text-xs">✓ confirmado</span>
                  ) : (
                    <span className="text-text-muted text-xs">pendiente</span>
                  )}
                </td>
                <td className="p-3 text-xs text-text-muted font-mono">
                  {formatDate(r.created_at)}
                </td>
              </tr>
            ))}
            {(rows ?? []).length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-text-muted">
                  Sin resultados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

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

function FilterPill({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <a
      href={href}
      className={`px-4 py-1.5 rounded-full text-sm font-semibold transition ${
        active
          ? "bg-lime-400 text-bg"
          : "bg-surface border border-border text-text-muted hover:text-text"
      }`}
    >
      {label}
    </a>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}
