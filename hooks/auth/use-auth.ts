import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "./use-auth-store";
import { supabase } from "@/lib/auth/supabase";
import { AUTH_ROUTES } from "@/lib/auth/constants";
import { AuthUser } from "@/types/auth";
import { User } from "@supabase/supabase-js";

const mapSupabaseUser = (user: User | null): AuthUser | null => {
  if (!user) return null;
  return {
    id: user.id,
    email: user.email || "",
    user_metadata: user.user_metadata,
  };
};

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
        setUser(mapSupabaseUser(session?.user || null));
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
        setUser(mapSupabaseUser(session?.user || null));
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
