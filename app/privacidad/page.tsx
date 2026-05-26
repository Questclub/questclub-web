import Footer from "@/components/footer";

export const metadata = {
  title: "Política de privacidad",
  robots: { index: true, follow: true },
};

export default function Privacidad() {
  return (
    <>
      <main className="flex-1 px-6 py-16 md:py-20 max-w-3xl mx-auto">
        <a href="/" className="text-sm text-text-muted hover:text-lime-400 transition">
          ← Volver al inicio
        </a>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-6 mb-2">
          Política de privacidad
        </h1>
        <p className="text-text-muted mb-12">
          Última actualización: 26 mayo 2026
        </p>

        <div className="space-y-8 text-text-muted leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-text mb-2">1. Responsable</h2>
            <p>
              Quest Club es una app móvil para grupos privados de amigos. Para cualquier asunto de
              privacidad puedes escribir a{" "}
              <a href="mailto:privacy@questclub.app" className="text-lime-400 hover:underline">
                privacy@questclub.app
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text mb-2">2. Qué datos recogemos</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Email de registro, usado para enviarte el código de acceso e identificar tu cuenta.</li>
              <li>Nombre y avatar que eliges dentro de la app.</li>
              <li>Grupos a los que perteneces y rol dentro de cada grupo.</li>
              <li>Fotos que subes como prueba de misiones, visibles solo para miembros de tu grupo.</li>
              <li>Votos, reportes y actividad necesaria para calcular rankings y progreso.</li>
              <li>Token de notificaciones push si aceptas recibir avisos del grupo.</li>
              <li>Eventos de uso agregados para entender y mejorar el producto.</li>
            </ul>
            <p className="mt-2">
              No recogemos ubicación precisa, contactos, datos de redes sociales, historial de
              navegación ni trackers publicitarios.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text mb-2">3. Para qué usamos los datos</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Crear tu cuenta y permitirte entrar a grupos privados.</li>
              <li>Mostrar misiones, pruebas, votaciones, rankings y progreso del grupo.</li>
              <li>Enviar notificaciones relacionadas con la actividad del grupo.</li>
              <li>Atender solicitudes de soporte, privacidad y seguridad.</li>
              <li>Medir uso agregado para mejorar Quest Club.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text mb-2">4. Con quién compartimos datos</h2>
            <p>Usamos proveedores técnicos para operar el servicio:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Supabase para base de datos, autenticación y almacenamiento de imágenes.</li>
              <li>Expo para actualizaciones y notificaciones push.</li>
              <li>Apple y Google para distribución de la app y servicios del sistema operativo.</li>
            </ul>
            <p className="mt-2">
              No vendemos, alquilamos ni cedemos tus datos con fines publicitarios.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text mb-2">5. Privacidad del grupo</h2>
            <p>
              Quest Club no es una red social pública. Las pruebas y rankings se muestran solo a los
              miembros del grupo correspondiente, salvo obligaciones legales o necesidades de seguridad.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text mb-2">6. Conservación y eliminación</h2>
            <p>
              Conservamos tus datos mientras tu cuenta esté activa. Puedes solicitar la eliminación de
              tu cuenta desde la app o escribiendo a{" "}
              <a href="mailto:privacy@questclub.app" className="text-lime-400 hover:underline">
                privacy@questclub.app
              </a>
              . Eliminaremos tu perfil y tus pruebas en un máximo de 30 días, salvo datos que debamos
              conservar por obligaciones legales o seguridad.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text mb-2">7. Tus derechos</h2>
            <p>
              Puedes solicitar acceso, rectificación, portabilidad, limitación u oposición al
              tratamiento de tus datos. Escríbenos a privacy@questclub.app desde el email de tu cuenta.
              También puedes reclamar ante la Agencia Española de Protección de Datos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text mb-2">8. Menores</h2>
            <p>
              Quest Club está pensada para personas mayores de 16 años. Si detectamos que una cuenta
              pertenece a una persona menor de esa edad, podremos eliminarla.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text mb-2">9. Seguridad</h2>
            <p>
              Usamos HTTPS, Row Level Security en base de datos y almacenamiento privado con URLs
              firmadas para las pruebas. Ningún sistema es perfecto; para problemas graves escribe a
              soporte@questclub.app.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
