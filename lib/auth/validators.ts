import { z } from "zod";
import { AUTH_VALIDATION, AUTH_PROVIDERS } from "./constants";

// Esquema de email
export const emailSchema = z
  .string()
  .email("Por favor ingresa un email válido")
  .min(1, "El email es requerido")
  .max(255, "El email es demasiado largo")
  .trim()
  .toLowerCase();

// Esquema de contraseña
export const passwordSchema = z
  .string()
  .min(
    AUTH_VALIDATION.PASSWORD_MIN_LENGTH,
    `La contraseña debe tener al menos ${AUTH_VALIDATION.PASSWORD_MIN_LENGTH} caracteres`
  )
  .max(72, "La contraseña es demasiado larga")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/,
    "La contraseña debe contener al menos una mayúscula, una minúscula y un número"
  );

// Esquema de nombre
export const nameSchema = z
  .string()
  .min(AUTH_VALIDATION.NAME_MIN_LENGTH, "El nombre es muy corto")
  .max(AUTH_VALIDATION.NAME_MAX_LENGTH, "El nombre es muy largo")
  .regex(
    /^[a-zA-ZÀ-ÿ\s]{2,}$/,
    "El nombre solo puede contener letras y espacios"
  )
  .transform((name) =>
    name
      .trim()
      .replace(/\s+/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ")
  )
  .optional();

// Esquema de proveedor
export const providerSchema = z.enum([
  AUTH_PROVIDERS.google,
  AUTH_PROVIDERS.facebook,
  AUTH_PROVIDERS.email,
]);

// Esquemas principales
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  provider: providerSchema.optional(),
});

export const registerSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

// Tipos inferidos
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
