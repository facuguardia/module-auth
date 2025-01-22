import { create } from "zustand";
import {
  AuthState,
  AuthUser,
  SignInCredentials,
  SignUpCredentials,
} from "@/types/auth";
import { supabase } from "@/lib/auth/supabase";
import { AUTH_ERRORS } from "@/lib/auth/constants";
import { AUTH_ROUTES } from "@/lib/auth/constants";

interface AuthStore extends AuthState {
  signIn: (credentials: SignInCredentials) => Promise<AuthUser | null>;
  signUp: (credentials: SignUpCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user: AuthUser | null) => void;
  setError: (error: string | null) => void;
  setLoading: (isLoading: boolean) => void;
  reset: () => void;
}

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  status: "unauthenticated" as const,
};

export const useAuthStore = create<AuthStore>((set) => ({
  ...initialState,

  reset: () => set(initialState),
  setUser: (user) => set({ user }),
  setError: (error) => set({ error }),
  setLoading: (isLoading) => set({ isLoading }),

  signIn: async ({ email, password }) => {
    try {
      set({ isLoading: true, error: null });
      console.log("Iniciando proceso de login...");

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Error de autenticación:", error);
        throw error;
      }

      if (!data?.user || !data?.session) {
        throw new Error("No se pudo obtener la información del usuario");
      }

      console.log("Login exitoso:", data.user);

      // Actualizar el estado
      set({
        user: data.user,
        status: "authenticated",
        error: null,
      });

      // Forzar un refresh de la sesión
      await supabase.auth.getSession();

      return data.user;
    } catch (error: any) {
      console.error("Error completo:", error);
      set({
        error: error.message || AUTH_ERRORS.INVALID_CREDENTIALS,
        status: "unauthenticated",
      });
      return null;
    } finally {
      set({ isLoading: false });
    }
  },

  signUp: async ({ email, password, name }) => {
    try {
      set({ isLoading: true, error: null });
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: { name },
        },
      });

      if (error) throw error;

      if (data.user?.identities?.length === 0) {
        throw new Error("Este email ya está registrado");
      }

      set({
        user: data.user,
        status: "unauthenticated", // Mantener como no autenticado hasta confirmar email
        error: null,
      });

      // Mostrar mensaje de verificación de email
      alert("Por favor, verifica tu email para continuar");
    } catch (error: any) {
      console.error("Error de registro:", error);
      set({
        error: error.message || AUTH_ERRORS.EMAIL_IN_USE,
        status: "unauthenticated",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  signOut: async () => {
    try {
      set({ isLoading: true, error: null });
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      set({ user: null, status: "unauthenticated" });
      
      // Forzar redirección al login
      window.location.href = AUTH_ROUTES.LOGIN;
    } catch (error: any) {
      console.error("Error al cerrar sesión:", error);
      set({ error: AUTH_ERRORS.UNKNOWN });
    } finally {
      set({ isLoading: false });
    }
  },
}));
