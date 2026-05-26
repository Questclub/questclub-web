import Footer from "@/components/footer";

export const metadata = {
  title: "Normas de comunidad",
  robots: { index: true, follow: true },
};

export default function Normas() {
  return (
    <>
      <main className="flex-1 px-6 py-16 md:py-20 max-w-3xl mx-auto">
        <a href="/" className="text-sm text-text-muted hover:text-lime-400 transition">
          ← Volver al inicio
        </a>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-6 mb-2">
          Normas de comunidad
        </h1>
        <p className="text-text-muted mb-12">
          Quest Club es un juego privado para grupos reales. Competid con confianza.
        </p>

        <div className="space-y-8 text-text-muted leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-text mb-2">1. Grupo privado</h2>
            <p>
              Las pruebas deben tener sentido dentro de tu grupo. No subas contenido pensado para
              avergonzar, exponer o atacar a otra persona.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text mb-2">2. Consentimiento</h2>
            <p>
              Sube solo contenido que puedas compartir. Si aparecen otras personas, asegúrate de que
              están de acuerdo.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text mb-2">3. Contenido no permitido</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Ilegal o que promueva actividades ilegales.</li>
              <li>Peligroso o que pueda causar daño físico.</li>
              <li>Sexual, explícito o íntimo.</li>
              <li>Acosador, humillante, discriminatorio o amenazante.</li>
              <li>Que muestre datos privados de otra persona sin permiso.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text mb-2">4. Reportar problemas</h2>
            <p>
              Si una prueba no cumple la misión o muestra algo que no debería estar en el grupo, usa
              Reportar problema desde la prueba. Para problemas graves escribe a soporte@questclub.app.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
