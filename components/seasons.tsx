const SEASONS = [
  { name: "Verano", emoji: "🏖", date: "Jul 2026", active: true },
  { name: "Halloween", emoji: "🎃", date: "Oct 2026" },
  { name: "Navidad", emoji: "🎄", date: "Dic 2026" },
  { name: "San Valentín", emoji: "💔", date: "Feb 2027" },
  { name: "Carnaval", emoji: "🎭", date: "Feb 2027" },
  { name: "Semana Santa", emoji: "✈️", date: "Abr 2027" },
];

export default function Seasons() {
  return (
    <section className="px-6 py-20 max-w-5xl mx-auto">
      <h2 className="text-3xl md:text-5xl font-bold mb-3 text-center tracking-tight">
        Un año entero de retos
      </h2>
      <p className="text-text-muted text-center mb-12 max-w-xl mx-auto">
        Cada temporada, un pack temático nuevo. El ranking del grupo se
        acumula entre todas. Lo que pasa esta semana cuenta dentro de 5
        años.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        {SEASONS.map((s) => (
          <div
            key={s.name}
            className={`rounded-full px-5 py-3 text-sm font-semibold border ${
              s.active
                ? "bg-lime-400 text-bg border-lime-400"
                : "border-border text-text"
            }`}
          >
            <span className="mr-2">{s.emoji}</span>
            {s.name}
            <span className="opacity-60 ml-2">{s.date}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
