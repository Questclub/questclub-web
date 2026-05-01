/**
 * Banner que convierte la fricción de "se necesitan 4 personas" en motor
 * de viralidad: pásale el link al grupo ANTES de apuntarte.
 * Decisión estratégica: el grupo no se desbloquea hasta tener 4
 * confirmaciones (cold-start mitigation documentado en 00_overview).
 */
export default function GroupGate() {
  return (
    <section className="px-6 py-12 md:py-16 max-w-4xl mx-auto">
      <div className="bg-surface border border-lime-400/30 rounded-2xl p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-lime-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative">
          <div className="text-xs uppercase tracking-widest text-lime-400 font-bold mb-3">
            Mecánica de juego
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 leading-tight">
            QuestClub empieza{" "}
            <span className="text-lime-400">cuando sois 4.</span>
          </h2>
          <p className="text-text-muted text-base md:text-lg leading-relaxed">
            Apúntate, pasa el link al grupo y{" "}
            <strong className="text-text">
              por cada amigo que confirme su email subes 100 puestos
            </strong>{" "}
            en la cola. Los primeros grupos completos entran al Pack Verano
            gratis.
          </p>
        </div>
      </div>
    </section>
  );
}
