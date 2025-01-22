export const AUTH_ROUTES = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  FORGOT_PASSWORD: "/auth/forgot-password",
  RESET_PASSWORD: "/auth/reset-password",
  DASHBOARD: "/dashboard", // Ruta protegida por defecto
} as const;

export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: "Invalid login credentials",
  EMAIL_IN_USE: "Email already in use",
  WEAK_PASSWORD: "Password is too weak",
  INVALID_EMAIL: "Invalid email format",
  UNKNOWN: "An unknown error occurred",
  RESET_PASSWORD_ERROR: "Error al restablecer la contraseña",
  INVALID_RESET_TOKEN: "Token de recuperación inválido o expirado",
  EMAIL_NOT_FOUND: "No existe una cuenta con este email",
} as const;

export const AUTH_MESSAGES = {
  CHECK_EMAIL: "Please check your email for verification",
  LOGOUT_SUCCESS: "Successfully logged out",
  LOGIN_SUCCESS: "Successfully logged in",
  REGISTER_SUCCESS: "Registration successful",
  RESET_EMAIL_SENT: "Te hemos enviado un email con las instrucciones",
  PASSWORD_RESET_SUCCESS: "Contraseña actualizada correctamente",
} as const;

export const AUTH_PROVIDERS = {
  GOOGLE: "google",
  FACEBOOK: "facebook",
  EMAIL: "email",
} as const;

export const AUTH_VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
} as const;
