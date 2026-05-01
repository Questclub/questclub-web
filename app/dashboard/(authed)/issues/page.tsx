import {
  ISSUES,
  SEVERITY_LABEL,
  ISSUE_STATUS_LABEL,
  type IssueSeverity,
  type IssueStatus,
} from "@/lib/ops-data";

export const dynamic = "force-dynamic";

export default function IssuesPage() {
  const open = ISSUES.filter((i) => i.status !== "resolved" && i.status !== "wont-fix");
  const closed = ISSUES.filter((i) => i.status === "resolved" || i.status === "wont-fix");

  return (
    <div>
      <div className="mb-8">
        <div className="text-xs uppercase tracking-widest text-lime-400 font-mono mb-2">
          / 05
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Issues</h1>
        <p className="text-text-muted text-sm mt-2 max-w-xl">
          Log de incidencias del proyecto. Editar a mano en{" "}
          <code className="text-lime-400 font-mono text-xs">
            lib/ops-data.ts
          </code>
          .
        </p>
      </div>

      {open.length > 0 && (
        <section className="mb-10">
          <h2 className="text-sm font-bold uppercase tracking-wider text-text-muted mb-4">
            Abiertos · {open.length}
          </h2>
          <div className="space-y-3">
            {open.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        </section>
      )}

      {closed.length > 0 && (
        <section>
          <h2 className="text-sm font-bold uppercase tracking-wider text-text-muted mb-4">
            Cerrados · {closed.length}
          </h2>
          <div className="space-y-3">
            {closed.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        </section>
      )}

      {ISSUES.length === 0 && (
        <p className="text-text-muted text-sm">Sin issues registrados.</p>
      )}
    </div>
  );
}

function IssueCard({ issue }: { issue: (typeof ISSUES)[number] }) {
  return (
    <div className="bg-surface border border-border rounded-xl p-5">
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="font-bold text-text leading-snug">{issue.title}</h3>
        <div className="flex gap-2 shrink-0">
          <SeverityBadge severity={issue.severity} />
          <StatusBadge status={issue.status} />
        </div>
      </div>
      <p className="text-sm text-text-muted leading-relaxed mb-3">
        {issue.description}
      </p>
      <div className="flex gap-4 text-xs text-text-muted font-mono">
        <span>📅 {issue.createdAt}</span>
        {issue.resolvedAt && <span>✓ {issue.resolvedAt}</span>}
      </div>
    </div>
  );
}

function SeverityBadge({ severity }: { severity: IssueSeverity }) {
  const styles: Record<IssueSeverity, string> = {
    low: "bg-neutral-500/10 text-neutral-400 border-neutral-500/30",
    medium: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    high: "bg-rose-500/10 text-rose-400 border-rose-500/30",
    critical: "bg-rose-700/20 text-rose-300 border-rose-700/40",
  };
  return (
    <span
      className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${styles[severity]}`}
    >
      {SEVERITY_LABEL[severity]}
    </span>
  );
}

function StatusBadge({ status }: { status: IssueStatus }) {
  const styles: Record<IssueStatus, string> = {
    open: "bg-rose-500/10 text-rose-400 border-rose-500/30",
    investigating: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    resolved: "bg-lime-400/10 text-lime-400 border-lime-400/30",
    "wont-fix": "bg-neutral-500/10 text-neutral-400 border-neutral-500/30",
  };
  return (
    <span
      className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${styles[status]}`}
    >
      {ISSUE_STATUS_LABEL[status]}
    </span>
  );
}
