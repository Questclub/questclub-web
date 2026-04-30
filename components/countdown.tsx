"use client";

import { useEffect, useState } from "react";

// Lanzamiento: 1 julio 2026 a las 00:00 Madrid (UTC+2 verano)
const TARGET_MS = new Date("2026-07-01T00:00:00+02:00").getTime();

type TimeLeft = { d: number; h: number; m: number; s: number };

function getTimeLeft(): TimeLeft {
  const ms = TARGET_MS - Date.now();
  if (ms <= 0) return { d: 0, h: 0, m: 0, s: 0 };
  return {
    d: Math.floor(ms / 86_400_000),
    h: Math.floor((ms / 3_600_000) % 24),
    m: Math.floor((ms / 60_000) % 60),
    s: Math.floor((ms / 1000) % 60),
  };
}

export default function Countdown() {
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTime(getTimeLeft());
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="px-6 py-16 md:py-20 max-w-4xl mx-auto text-center">
      <p className="text-xs uppercase tracking-widest text-text-muted mb-3">
        Lanzamiento
      </p>
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">
        1 julio 2026
      </h2>
      <div className="grid grid-cols-4 gap-2 md:gap-4 max-w-2xl mx-auto">
        <Cell label="días" value={time?.d} />
        <Cell label="horas" value={time?.h} />
        <Cell label="min" value={time?.m} />
        <Cell label="seg" value={time?.s} />
      </div>
    </section>
  );
}

function Cell({ label, value }: { label: string; value: number | undefined }) {
  return (
    <div className="bg-surface border border-border rounded-2xl py-5 md:py-7">
      <div className="text-3xl md:text-5xl font-bold text-lime-400 tabular-nums">
        {value === undefined ? "—" : value.toString().padStart(2, "0")}
      </div>
      <div className="text-xs text-text-muted uppercase tracking-wider mt-1">
        {label}
      </div>
    </div>
  );
}
