import { supabaseAdmin } from "./supabase";

const COUNTER_BASE = parseInt(
  process.env.NEXT_PUBLIC_COUNTER_BASE || "0",
  10
);

/**
 * Total de apuntados a mostrar públicamente.
 * Suma una base configurable (NEXT_PUBLIC_COUNTER_BASE) al total real
 * de confirmados en la tabla, para evitar "0 apuntados" en lanzamiento.
 *
 * Server-only: usa la secret key de Supabase. NUNCA llamar desde cliente.
 */
export async function getDisplayedTotal(): Promise<number> {
  try {
    const { data, error } = await supabaseAdmin
      .from("waitlist_stats")
      .select("total_confirmed")
      .single();

    if (error || !data) return COUNTER_BASE;
    return COUNTER_BASE + (data.total_confirmed ?? 0);
  } catch {
    // Si Supabase falla, devolvemos al menos la base para no romper el render.
    return COUNTER_BASE;
  }
}
