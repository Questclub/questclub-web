import { getDisplayedTotal } from "@/lib/waitlist-stats";

export default async function Counter() {
  const total = await getDisplayedTotal();
  return (
    <p className="text-xs text-text-muted mt-3">
      <span className="text-lime-400 font-bold">
        {total.toLocaleString("es-ES")}
      </span>{" "}
      ya apuntados · sin spam, solo el código del Pack Verano
    </p>
  );
}
