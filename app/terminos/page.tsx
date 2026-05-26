import Footer from "@/components/footer";

export const metadata = {
  title: "Términos de uso",
  robots: { index: true, follow: true },
};

export default function Terminos() {
  return (
    <>
      <main className="flex-1 px-6 py-16 md:py-20 max-w-3xl mx-auto">
        <a href="/" className="text-sm text-text-muted hover:text-lime-400 transition">
          ← Volver al inicio
        </a>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-6 mb-2">
          Términos de uso
        </h1>
        <p className="text-text-muted mb-12">
          Última actualización: 26 mayo 2026
        </p>

        <div className="space-y-8 text-text-muted leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-text mb-2">1. Qué es Quest Club</h2>
            <p>
              Quest Club es una app móvil para grupos privados de amigos donde completáis misiones,
              subís pruebas, votáis favoritas y competís por ranking durante una temporada.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text mb-2">2. Quién puede usarla</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Debes tener al menos 16 años.</li>
              <li>Debes usar un email al que tengas acceso.</li>
              <li>Quest Club es para grupos privados, no para publicar contenido abierto.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text mb-2">3. Tu cuenta</h2>
            <p>
              Eres responsable de mantener segura tu cuenta. Puedes solicitar eliminarla desde la app o
              escribiendo a privacy@questclub.app. La eliminación puede ser definitiva.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text mb-2">4. Contenido y conducta</h2>
            <p>
              Al subir una prueba confirmas que puedes compartirla y que respeta al grupo. No está
              permitido subir contenido ilegal, peligroso, sexual, acosador, humillante, discriminatorio
              o no consensuado.
            </p>
            <p className="mt-2">
              Las normas completas están disponibles en{" "}
              <a href="/normas" className="text-lime-400 hover:underline">
                Normas de comunidad
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text mb-2">5. Contenido que subes</h2>
            <p>
              Tú mantienes la propiedad del contenido que subes. Nos das permiso para almacenarlo,
              procesarlo técnicamente y mostrarlo a los miembros de tu grupo para que la app funcione.
              No lo usaremos para publicidad ni lo haremos público fuera del grupo.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text mb-2">6. Misiones y seguridad</h2>
            <p>
              Las misiones son opcionales. No hagas nada que ponga en riesgo tu salud, tu seguridad, la
              de otras personas o que incumpla la ley.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text mb-2">7. Reportes</h2>
            <p>
              Puedes reportar problemas en pruebas del grupo. Reportar no implica borrado automático:
              ayuda a gestionar contenido que no cumple la misión o que no debería estar en el grupo.
              Para problemas graves escribe a soporte@questclub.app.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text mb-2">8. Disponibilidad</h2>
            <p>
              Hacemos lo posible para que Quest Club funcione correctamente, pero pueden existir pausas,
              errores o cambios en funcionalidades durante el lanzamiento.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text mb-2">9. Contacto</h2>
            <p>
              Para soporte: soporte@questclub.app. Para privacidad: privacy@questclub.app.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
