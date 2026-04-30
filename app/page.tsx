import Hero from "@/components/hero";

// El Counter en el hero lee desde Supabase en cada request.
// Cuando lleguemos a >5k visitas/día consideraremos cachear con
// unstable_cache + revalidate, pero por ahora el coste es trivial.
export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <main className="flex-1">
      <Hero />
    </main>
  );
}
