import { create } from "zustand";
import {
  AuthState,
  AuthUser,
  SignInCredentials,
  SignUpCredentials,
  Provider,
} from "@/types/auth";
import { supabase } from "@/lib/auth/supabase";
import { AUTH_ERRORS } from "@/lib/auth/constants";

interface AuthStore extends AuthState {
  signIn: (credentials: SignInCredentials) => Promise<AuthUser | null>;
  signInWithProvider: (provider: Provider) => Promise<AuthUser | null>;
  signUp: (credentials: SignUpCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user: AuthUser | null) => void;
  setError: (error: string | null) => void;
  setLoading: (isLoading: boolean) => void;
  reset: () => void;
  signInWithGoogle: () => Promise<AuthUser | null>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
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
    } catch (error) {
      set({ error: AUTH_ERRORS.UNKNOWN });
    } finally {
      set({ isLoading: false });
    }
  },

  signInWithProvider: async (provider: Provider) => {
    try {
      set({ isLoading: true, error: null });
      console.log(`Iniciando login con ${provider}...`);

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) throw error;

      // No necesitamos setear el usuario aquí ya que se manejará en el callback
      return null;
    } catch (error: any) {
      console.error(`Error en login con ${provider}:`, error);
      set({
        error: error.message || AUTH_ERRORS.SOCIAL_LOGIN_ERROR,
        status: "unauthenticated",
      });
      return null;
    } finally {
      set({ isLoading: false });
    }
  },

  signInWithGoogle: async () => {
    try {
      set({ isLoading: true, error: null });
      console.log("Iniciando login con Google...");

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: "offline",
            prompt: "select_account",
          },
        },
      });

      if (error) {
        console.error("Error en login con Google:", error);
        throw error;
      }

      // El usuario será manejado en el callback
      return null;
    } catch (error: any) {
      console.error("Error completo:", error);
      set({
        error: error.message || "Error al iniciar sesión con Google",
        status: "unauthenticated",
      });
      return null;
    } finally {
      set({ isLoading: false });
    }
  },

  resetPassword: async (email: string) => {
    try {
      set({ isLoading: true, error: null });
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) throw error;
    } catch (error: any) {
      set({
        error: error.message || AUTH_ERRORS.RESET_PASSWORD_ERROR,
        status: "unauthenticated",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  updatePassword: async (password: string) => {
    try {
      set({ isLoading: true, error: null });
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) throw error;

      set({ error: null });
    } catch (error: any) {
      set({
        error: error.message || AUTH_ERRORS.RESET_PASSWORD_ERROR,
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));
