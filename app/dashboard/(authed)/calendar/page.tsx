import {
  WARMUP_VIDEOS,
  VIDEO_STATUS_LABEL,
  type VideoStatus,
} from "@/lib/ops-data";

export const dynamic = "force-dynamic";

export default function CalendarPage() {
  const byPhase = {
    1: WARMUP_VIDEOS.filter((v) => v.phase === 1),
    2: WARMUP_VIDEOS.filter((v) => v.phase === 2),
    3: WARMUP_VIDEOS.filter((v) => v.phase === 3),
  };

  const counts = {
    posted: WARMUP_VIDEOS.filter((v) => v.status === "posted").length,
    scheduled: WARMUP_VIDEOS.filter((v) => v.status === "scheduled").length,
    inProgress: WARMUP_VIDEOS.filter(
      (v) => v.status === "shooting" || v.status === "editing"
    ).length,
    pending: WARMUP_VIDEOS.filter((v) => v.status === "idea").length,
  };

  return (
    <div>
      <div className="mb-8">
        <div className="text-xs uppercase tracking-widest text-lime-400 font-mono mb-2">
          / 04
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Calendar
        </h1>
        <p className="text-text-muted text-sm mt-2 max-w-xl">
          12 vídeos warmup planificados. Editar status en{" "}
          <code className="text-lime-400 font-mono text-xs">
            lib/ops-data.ts
          </code>{" "}
          conforme avances.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        <SummaryCard label="Pendientes" value={counts.pending} />
        <SummaryCard label="En curso" value={counts.inProgress} />
        <SummaryCard label="Programados" value={counts.scheduled} />
        <SummaryCard
          label="Publicados"
          value={counts.posted}
          accent
          sub={`${counts.posted}/12`}
        />
      </div>

      {[1, 2, 3].map((phase) => (
        <PhaseSection
          key={phase}
          phase={phase as 1 | 2 | 3}
          videos={byPhase[phase as 1 | 2 | 3]}
        />
      ))}
    </div>
  );
}

function PhaseSection({
  phase,
  videos,
}: {
  phase: 1 | 2 | 3;
  videos: typeof WARMUP_VIDEOS;
}) {
  const labels = {
    1: "Personaje y nicho",
    2: "Concepto narrativo",
    3: "Product tease + waitlist",
  };

  return (
    <section className="mb-10">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xs font-mono text-text-muted uppercase tracking-wider">
          Fase {phase}
        </span>
        <span className="text-sm font-bold">{labels[phase]}</span>
        <span className="text-xs text-text-muted">{videos.length} videos</span>
      </div>

      <div className="space-y-2">
        {videos.map((v) => (
          <div
            key={v.id}
            className="bg-surface border border-border rounded-xl p-4 flex items-center gap-4"
          >
            <span className="text-xs font-mono text-text-muted w-6 shrink-0">
              {v.id.toString().padStart(2, "0")}
            </span>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-text truncate">{v.title}</div>
              <div className="text-xs text-text-muted mt-0.5 flex gap-3 flex-wrap">
                <span>{v.hasVoice ? "🎙 con voz" : "🔇 mute + overlay"}</span>
                {v.scheduledFor && (
                  <span className="font-mono">
                    📅 {formatDate(v.scheduledFor)}
                  </span>
                )}
                {v.postedAt && (
                  <span className="font-mono text-lime-400">
                    ✓ {formatDate(v.postedAt)}
                  </span>
                )}
              </div>
            </div>
            <StatusBadge status={v.status} />
          </div>
        ))}
      </div>
    </section>
  );
}

function StatusBadge({ status }: { status: VideoStatus }) {
  const styles: Record<VideoStatus, string> = {
    idea: "bg-neutral-500/10 text-neutral-400 border-neutral-500/30",
    shooting: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    editing: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
    scheduled: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    posted: "bg-lime-400/10 text-lime-400 border-lime-400/30",
  };
  return (
    <span
      className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full border ${styles[status]}`}
    >
      {VIDEO_STATUS_LABEL[status]}
    </span>
  );
}

function SummaryCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: number;
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
        {value}
      </div>
      {sub && <div className="text-xs text-text-muted mt-1">{sub}</div>}
    </div>
  );
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
  });
}
