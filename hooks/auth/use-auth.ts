import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "./use-auth-store";
import { supabase } from "@/lib/auth/supabase";
import { AUTH_ROUTES } from "@/lib/auth/constants";

export function useAuth() {
  const router = useRouter();
  const { user, setUser, setLoading, isLoading } = useAuthStore();

  useEffect(() => {
    setLoading(true);

    // Verificar sesión inicial
    const checkSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setUser(session?.user || null);
      } catch (error) {
        console.error("Error al verificar sesión:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Suscribirse a cambios de autenticación
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN") {
        setUser(session?.user || null);
        router.push(AUTH_ROUTES.DASHBOARD);
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        router.push(AUTH_ROUTES.LOGIN);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, setUser, setLoading]);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
  };
}
