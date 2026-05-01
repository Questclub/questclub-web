import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/dashboard-auth";
import Sidebar from "@/components/dashboard/sidebar";

export const dynamic = "force-dynamic";

export default async function AuthedDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ok = await isAuthenticated();
  if (!ok) {
    redirect("/dashboard/login");
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1 px-6 py-8 md:px-10 md:py-10 max-w-6xl">
        {children}
      </main>
    </div>
  );
}
