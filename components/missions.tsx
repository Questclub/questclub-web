const MISSIONS = [
  "Recread una escena de película famosa usando solo cosas que tengáis a mano.",
  "Foto de grupo con el peor outfit turístico posible.",
  "Haced una portada de disco falsa con vuestro grupo, título incluido.",
  "Foto de grupo con el perro más cool que encontréis en la calle.",
  "Mételo todo en la piscina vestido, menos el móvil.",
];

export default function Missions() {
  return (
    <section className="px-6 py-20 max-w-3xl mx-auto">
      <h2 className="text-3xl md:text-5xl font-bold mb-3 text-center tracking-tight">
        Ejemplos del{" "}
        <span className="text-lime-400">Pack Verano</span>
      </h2>
      <p className="text-text-muted text-center mb-12">
        5 de las 30+ del pack que recibes gratis al lanzar. ¿Os mola otra
        cosa? Os las inventáis y listo.
      </p>
      <ul className="space-y-3">
        {MISSIONS.map((m, i) => (
          <li
            key={i}
            className="bg-surface border border-border rounded-xl p-5 flex gap-4 items-start"
          >
            <div className="text-lime-400 font-bold font-mono shrink-0">
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className="text-text leading-relaxed">{m}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}
