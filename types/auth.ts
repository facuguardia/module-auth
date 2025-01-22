import { User as SupabaseUser } from '@supabase/supabase-js'
import { AUTH_PROVIDERS } from '@/lib/auth/constants'

// Tipos de proveedores de autenticación
export type Provider = keyof typeof AUTH_PROVIDERS

// Estado de autenticación
export type AuthStatus = 'authenticated' | 'unauthenticated' | 'loading'

// Usuario autenticado
export interface AuthUser extends SupabaseUser {
  name?: string
  avatar_url?: string
  provider?: Provider
  last_sign_in?: string
}

// Estado global de autenticación
export interface AuthState {
  user: AuthUser | null
  status: AuthStatus
  isLoading: boolean
  error: string | null
}

// Respuestas de autenticación
export interface AuthResponse {
  success: boolean
  error: string | null
  user?: AuthUser | null
}

// Credenciales
export interface SignInCredentials {
  email: string
  password: string
  provider?: Provider
}

export interface SignUpCredentials extends SignInCredentials {
  name?: string
  avatar_url?: string
}

// Errores personalizados
export class AuthError extends Error {
  constructor(
    message: string,
    public code?: string,
    public status?: number
  ) {
    super(message)
    this.name = 'AuthError'
  }
}