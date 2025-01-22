import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "./use-auth-store";
import { supabase } from "@/lib/auth/supabase";
import { AUTH_ROUTES } from "@/lib/auth/constants";

export function useAuth() {
  const router = useRouter();
  const { user, setUser, setLoading, isLoading } = useAuthStore();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
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
  }, [router, setUser]);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
  };
}
