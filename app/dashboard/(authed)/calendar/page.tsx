import {
  WARMUP_VIDEOS,
  CONTENT_CAROUSELS,
  VIDEO_STATUS_LABEL,
  TIER_LABEL,
  CAROUSEL_CTA_LABEL,
  CAROUSEL_SHAPE_LABEL,
  type VideoStatus,
  type ContentTier,
  type ContentVideo,
  type ContentCarousel,
} from "@/lib/ops-data";

export const dynamic = "force-dynamic";

type ScheduledItem =
  | { kind: "video"; date: string; hour: string; data: ContentVideo }
  | { kind: "carousel"; date: string; hour: string; data: ContentCarousel };

export default function CalendarPage() {
  const items: ScheduledItem[] = [
    ...WARMUP_VIDEOS.filter((v) => v.scheduledDate).map(
      (v) =>
        ({
          kind: "video" as const,
          date: v.scheduledDate!,
          hour: v.scheduledHour ?? "—",
          data: v,
        }) satisfies ScheduledItem
    ),
    ...CONTENT_CAROUSELS.filter((c) => c.scheduledDate).map(
      (c) =>
        ({
          kind: "carousel" as const,
          date: c.scheduledDate!,
          hour: c.scheduledHour ?? "—",
          data: c,
        }) satisfies ScheduledItem
    ),
  ];

  const byDate = items.reduce<Record<string, ScheduledItem[]>>((acc, it) => {
    acc[it.date] = acc[it.date] ?? [];
    acc[it.date].push(it);
    return acc;
  }, {});

  const sortedDates = Object.keys(byDate).sort();
  for (const d of sortedDates) {
    byDate[d].sort((a, b) => a.hour.localeCompare(b.hour));
  }

  const today = new Date().toISOString().slice(0, 10);

  const counts = {
    videosTotal: WARMUP_VIDEOS.length,
    videosPosted: WARMUP_VIDEOS.filter((v) => v.status === "posted").length,
    videosEditing: WARMUP_VIDEOS.filter((v) => v.status === "editing").length,
    videosIdea: WARMUP_VIDEOS.filter((v) => v.status === "idea").length,
    carouselsTotal: CONTENT_CAROUSELS.length,
    carouselsEditing: CONTENT_CAROUSELS.filter((c) => c.status === "editing").length,
    carouselsIdea: CONTENT_CAROUSELS.filter((c) => c.status === "idea").length,
  };

  return (
    <div>
      <div className="mb-8">
        <div className="text-xs uppercase tracking-widest text-lime-400 font-mono mb-2">
          / 04
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Content Calendar
        </h1>
        <p className="text-text-muted text-sm mt-2 max-w-xl">
          {WARMUP_VIDEOS.length} vídeos + {CONTENT_CAROUSELS.length} carruseles
          del sprint pre-launch. Vista cronológica por fecha. Editar status en{" "}
          <code className="text-lime-400 font-mono text-xs">
            lib/ops-data.ts
          </code>
          .
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        <SummaryCard
          label="Vídeos"
          value={counts.videosPosted}
          sub={`${counts.videosPosted}/${counts.videosTotal} publicados`}
          accent={counts.videosPosted > 0}
        />
        <SummaryCard
          label="Carruseles"
          value={CONTENT_CAROUSELS.filter((c) => c.status === "posted").length}
          sub={`de ${counts.carouselsTotal}`}
          accent={CONTENT_CAROUSELS.filter((c) => c.status === "posted").length > 0}
        />
        <SummaryCard
          label="En edición"
          value={counts.videosEditing + counts.carouselsEditing}
          sub="vídeos + carruseles"
        />
        <SummaryCard
          label="Por producir"
          value={counts.videosIdea + counts.carouselsIdea}
          sub="ideas pendientes"
        />
      </div>

      {/* Daily schedule */}
      <section>
        <div className="text-xs font-mono text-text-muted uppercase tracking-wider mb-4">
          Día a día — qué se publica
        </div>
        <div className="space-y-4">
          {sortedDates.map((date) => (
            <DayBlock
              key={date}
              date={date}
              items={byDate[date]}
              isToday={date === today}
              isPast={date < today}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function DayBlock({
  date,
  items,
  isToday,
  isPast,
}: {
  date: string;
  items: ScheduledItem[];
  isToday: boolean;
  isPast: boolean;
}) {
  const d = new Date(date);
  const weekday = d.toLocaleDateString("es-ES", { weekday: "long" });
  const dayMonth = d.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
  });

  return (
    <div
      className={`rounded-2xl border overflow-hidden ${
        isToday
          ? "border-lime-400/60 bg-lime-400/5"
          : isPast
            ? "border-border bg-surface/30 opacity-50"
            : "border-border bg-surface"
      }`}
    >
      <div className="px-5 py-3 border-b border-border flex items-baseline justify-between">
        <div className="flex items-baseline gap-3">
          <span
            className={`text-sm font-bold uppercase ${
              isToday ? "text-lime-400" : "text-text"
            }`}
          >
            {weekday}
          </span>
          <span className="text-xs font-mono text-text-muted">{dayMonth}</span>
          {isToday && (
            <span className="text-[10px] font-mono uppercase tracking-wider bg-lime-400 text-bg px-2 py-0.5 rounded-full">
              hoy
            </span>
          )}
        </div>
        <span className="text-xs font-mono text-text-muted">
          {items.length} drop{items.length > 1 ? "s" : ""}
        </span>
      </div>
      <div className="divide-y divide-border">
        {items.map((it, i) => (
          <ItemRow key={i} item={it} />
        ))}
      </div>
    </div>
  );
}

function ItemRow({ item }: { item: ScheduledItem }) {
  if (item.kind === "video") {
    return <VideoRow video={item.data} hour={item.hour} />;
  }
  return <CarouselRow carousel={item.data} hour={item.hour} />;
}

function VideoRow({ video: v, hour }: { video: ContentVideo; hour: string }) {
  return (
    <details className="group">
      <summary className="cursor-pointer list-none flex items-center gap-4 px-5 py-3 hover:bg-bg/40">
        <span className="text-xs font-mono text-lime-400 w-14 shrink-0">
          {hour}
        </span>
        <span className="text-base shrink-0">🎬</span>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-text truncate">
            <span className="text-text-muted font-mono text-xs mr-2">
              {v.number}
            </span>
            {v.title}
          </div>
          <div className="text-xs text-text-muted mt-0.5 flex gap-3 flex-wrap">
            <span>TT + IG Reels</span>
            {v.archetype && <span>· {v.archetype}</span>}
            {v.format && <span>· {v.format}</span>}
            {v.status === "editing" && v.hasAudio === false && (
              <span className="text-amber-400">⏳ falta audio</span>
            )}
          </div>
        </div>
        <TierBadge tier={v.tier} />
        <StatusBadge status={v.status} />
      </summary>
      <div className="border-t border-border px-5 py-4 space-y-3 bg-bg/40">
        {v.captionTT && (
          <DetailLine label="TikTok" text={v.captionTT.primary} />
        )}
        {v.captionIG && (
          <DetailLine label="Instagram" text={v.captionIG.primary} />
        )}
        {v.hashtags && (
          <div className="flex flex-wrap gap-1.5">
            {v.hashtags.map((h) => (
              <span
                key={h}
                className="text-[10px] font-mono text-lime-400/70 bg-lime-400/5 border border-lime-400/15 rounded-full px-2 py-0.5"
              >
                {h}
              </span>
            ))}
          </div>
        )}
        {v.videoPath && (
          <div>
            <div className="text-[10px] font-mono text-text-muted uppercase tracking-wider mb-1">
              Archivo
            </div>
            <code className="text-[11px] text-lime-400/80 break-all font-mono">
              {v.videoPath}
            </code>
          </div>
        )}
        {v.notes && (
          <div className="text-xs text-text-muted leading-relaxed border-l-2 border-border pl-3">
            {v.notes}
          </div>
        )}
      </div>
    </details>
  );
}

function CarouselRow({
  carousel: c,
  hour,
}: {
  carousel: ContentCarousel;
  hour: string;
}) {
  const ctaColor =
    c.ctaType === "no-cta" ? "text-purple-400" : "text-text-muted";

  return (
    <details className="group">
      <summary className="cursor-pointer list-none flex items-center gap-4 px-5 py-3 hover:bg-bg/40">
        <span className="text-xs font-mono text-lime-400 w-14 shrink-0">
          {hour}
        </span>
        <span className="text-base shrink-0">📚</span>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-text truncate">
            <span className="text-text-muted font-mono text-xs mr-2">
              {c.slidesCount}sl
            </span>
            {c.title}
          </div>
          <div className="text-xs text-text-muted mt-0.5 flex gap-3 flex-wrap">
            <span>IG feed</span>
            <span>· {CAROUSEL_SHAPE_LABEL[c.shape]}</span>
            {c.archetype && <span>· {c.archetype}</span>}
            <span className={ctaColor}>· {CAROUSEL_CTA_LABEL[c.ctaType]}</span>
          </div>
        </div>
        <TierBadge tier={c.tier} />
        <StatusBadge status={c.status} />
      </summary>
      <div className="border-t border-border px-5 py-4 space-y-3 bg-bg/40">
        {c.captionIG && (
          <DetailLine label="Caption IG" text={c.captionIG.primary} />
        )}
        {c.hashtags && (
          <div className="flex flex-wrap gap-1.5">
            {c.hashtags.map((h) => (
              <span
                key={h}
                className="text-[10px] font-mono text-lime-400/70 bg-lime-400/5 border border-lime-400/15 rounded-full px-2 py-0.5"
              >
                {h}
              </span>
            ))}
          </div>
        )}
        {c.folderPath && (
          <div>
            <div className="text-[10px] font-mono text-text-muted uppercase tracking-wider mb-1">
              Folder
            </div>
            <code className="text-[11px] text-lime-400/80 break-all font-mono">
              {c.folderPath}
            </code>
          </div>
        )}
        {c.notes && (
          <div className="text-xs text-text-muted leading-relaxed border-l-2 border-border pl-3">
            {c.notes}
          </div>
        )}
      </div>
    </details>
  );
}

function DetailLine({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <div className="text-[10px] font-mono text-text-muted uppercase tracking-wider mb-1">
        {label}
      </div>
      <div className="text-sm text-text leading-relaxed">{text}</div>
    </div>
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
      className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${styles[status]}`}
    >
      {VIDEO_STATUS_LABEL[status]}
    </span>
  );
}

function TierBadge({ tier }: { tier: ContentTier }) {
  const styles: Record<ContentTier, string> = {
    fire: "bg-rose-500/10 text-rose-400 border-rose-500/30",
    high: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    mid: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  };
  return (
    <span
      className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${styles[tier]}`}
    >
      {TIER_LABEL[tier]}
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
