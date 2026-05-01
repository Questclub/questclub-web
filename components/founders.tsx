/**
 * Pre-launch sin testimonials reales necesita una promesa de estatus.
 * Vendemos acceso, voto y reconocimiento dentro de la app a cambio de
 * estar en la waitlist desde el principio.
 */
export default function Founders() {
  return (
    <section className="px-6 py-20 max-w-3xl mx-auto">
      <div className="bg-surface border border-border rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-lime-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative">
          <span className="inline-block text-xs uppercase tracking-widest text-lime-400 font-bold mb-4">
            Acceso prioritario
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 leading-tight">
            Buscamos los primeros{" "}
            <span className="text-lime-400">100 grupos fundadores.</span>
          </h2>
          <p className="text-text-muted text-base md:text-lg leading-relaxed max-w-xl mx-auto">
            Si entráis antes del lanzamiento, probaréis el Pack Verano gratis,
            votaréis las próximas temporadas y apareceréis como{" "}
            <strong className="text-text">grupo fundador</strong> dentro de la
            app. Para siempre.
          </p>
        </div>
      </div>
    </section>
  );
}
