type Params = Promise<{ status?: string }>;

export default async function ConfirmPage({
  searchParams,
}: {
  searchParams: Params;
}) {
  const { status } = await searchParams;

  // Cualquier estado distinto de "success" muestra el mismo mensaje genérico.
  // El happy-path redirige directamente a /thanks/[code] desde la API.
  if (status === "invalid") {
    return (
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Enlace no válido
        </h1>
        <p className="text-text-muted max-w-md mb-8">
          Este enlace de confirmación ya se ha usado o ha caducado. Si te
          apuntaste hace más de 24h, vuelve a la home y registra tu email otra
          vez.
        </p>
        <a
          href="/"
          className="bg-lime-400 text-bg font-bold px-6 py-3 rounded-full hover:bg-lime-300 transition"
        >
          Volver al inicio
        </a>
      </main>
    );
  }

  return (
    <main className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Confirmando…</h1>
      <p className="text-text-muted">
        Si esta página no se actualiza, vuelve al{" "}
        <a href="/" className="text-lime-400 underline">
          inicio
        </a>
        .
      </p>
    </main>
  );
}
