import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { AUTH_ROUTES } from "@/lib/auth/constants";

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    console.log("No hay sesión activa en el dashboard");
    redirect(AUTH_ROUTES.LOGIN);
  }

  console.log("Sesión activa en dashboard:", session.user.email);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="text-muted-foreground">Bienvenido, {session.user.email}</p>
      <pre className="mt-4 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-auto">
        {JSON.stringify(session.user, null, 2)}
      </pre>
    </div>
  );
}
