import { ProtectedRoute } from "@/components/auth/protected-route";
import { Navbar } from "@/components/dashboard/navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <Navbar />
        <main className="container mx-auto py-8">{children}</main>
      </div>
    </ProtectedRoute>
  );
}
