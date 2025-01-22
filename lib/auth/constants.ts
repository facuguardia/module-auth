export const AUTH_ROUTES = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  FORGOT_PASSWORD: "/auth/forgot-password",
  RESET_PASSWORD: "/auth/reset-password",
  DASHBOARD: "/dashboard", // Ruta protegida por defecto
} as const;

export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: "Credenciales de inicio de sesión inválidas",
  EMAIL_IN_USE: "El email ya está en uso",
  WEAK_PASSWORD: "La contraseña es demasiado débil",
  INVALID_EMAIL: "Formato de email inválido",
  UNKNOWN: "Ocurrió un error desconocido",
  RESET_PASSWORD_ERROR: "Error al restablecer la contraseña",
  INVALID_RESET_TOKEN: "Token de recuperación inválido o expirado",
  EMAIL_NOT_FOUND: "No existe una cuenta con este email",
  SOCIAL_LOGIN_ERROR: "Error al iniciar sesión con red social",
} as const;

export const AUTH_MESSAGES = {
  CHECK_EMAIL: "Por favor, verifica tu email para continuar",
  LOGOUT_SUCCESS: "Sesión cerrada correctamente",
  LOGIN_SUCCESS: "¡Bienvenido a tu dashboard!",
  REGISTER_SUCCESS: "Registro exitoso",
  RESET_EMAIL_SENT: "Te hemos enviado un email con las instrucciones",
  PASSWORD_RESET_SUCCESS: "Contraseña actualizada correctamente",
} as const;

export const AUTH_PROVIDERS = {
  google: "google",
  facebook: "facebook",
  email: "email",
} as const;

export const AUTH_VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
} as const;
