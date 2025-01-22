export const AUTH_ROUTES = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  FORGOT_PASSWORD: '/auth/forgot-password',
  DASHBOARD: '/dashboard', // Ruta protegida por defecto
} as const;

export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: 'Invalid login credentials',
  EMAIL_IN_USE: 'Email already in use',
  WEAK_PASSWORD: 'Password is too weak',
  INVALID_EMAIL: 'Invalid email format',
  UNKNOWN: 'An unknown error occurred',
  SOCIAL_LOGIN_ERROR: 'Error al iniciar sesión con red social',
  SOCIAL_LOGIN_CANCELLED: 'Inicio de sesión cancelado',
} as const;

export const AUTH_MESSAGES = {
  CHECK_EMAIL: 'Please check your email for verification',
  LOGOUT_SUCCESS: 'Successfully logged out',
  LOGIN_SUCCESS: 'Successfully logged in',
  REGISTER_SUCCESS: 'Registration successful',
} as const;

export const AUTH_PROVIDERS = {
  GOOGLE: 'google',
  FACEBOOK: 'facebook',
  EMAIL: 'email',
} as const;

export const AUTH_VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
} as const;