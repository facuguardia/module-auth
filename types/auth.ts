import {
  User as SupabaseUser,
  Provider as SupabaseProvider,
} from "@supabase/supabase-js";
import { AUTH_PROVIDERS } from "@/lib/auth/constants";

// Tipos de proveedores de autenticación
export type OAuthProvider = SupabaseProvider;
export type Provider = OAuthProvider | "email";

// Estado de autenticación
export type AuthStatus = "authenticated" | "unauthenticated" | "loading";

// Usuario autenticado
export interface AuthUser {
  id: string;
  email: string;
  user_metadata?: {
    avatar_url?: string;
    full_name?: string;
    name?: string;
    email_verified?: boolean;
    provider?: Provider;
  };
}

// Estado global de autenticación
export interface AuthState {
  user: AuthUser | null;
  status: AuthStatus;
  isLoading: boolean;
  error: string | null;
}

// Respuestas de autenticación
export interface AuthResponse {
  success: boolean;
  error: string | null;
  user?: AuthUser | null;
}

// Credenciales
export interface SignInCredentials {
  email: string;
  password: string;
  provider?: Provider;
}

export interface SignUpCredentials extends SignInCredentials {
  name?: string;
  avatar_url?: string;
}

// Errores personalizados
export class AuthError extends Error {
  constructor(message: string, public code?: string, public status?: number) {
    super(message);
    this.name = "AuthError";
  }
}

export interface GoogleUser {
  email: string;
  name: string;
  avatar_url?: string;
  provider: "google";
}
