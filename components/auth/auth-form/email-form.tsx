"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/hooks/auth/use-auth-store";
import {
  loginSchema,
  registerSchema,
  type LoginFormData,
  type RegisterFormData,
} from "@/lib/auth/validators";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AUTH_ROUTES } from "@/lib/auth/constants";

interface EmailFormProps {
  isRegister?: boolean;
}

export function EmailForm({ isRegister = false }: EmailFormProps) {
  const { signIn, signUp, isLoading, error } = useAuthStore();

  const form = useForm<LoginFormData | RegisterFormData>({
    resolver: zodResolver(isRegister ? registerSchema : loginSchema),
    defaultValues: {
      email: "",
      password: "",
      ...(isRegister && { name: "" }),
    },
  });

  const onSubmit = async (data: LoginFormData | RegisterFormData) => {
    try {
      if (isRegister) {
        await signUp(data as RegisterFormData);
      } else {
        const user = await signIn(data as LoginFormData);
        if (user) {
          console.log("Login exitoso, redirigiendo...");
          window.location.href = AUTH_ROUTES.DASHBOARD;
        }
      }
    } catch (err) {
      console.error("Error en formulario:", err);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 sm:space-y-4"
      >
        {isRegister && (
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Nombre</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Tu nombre"
                    {...field}
                    className="h-9 sm:h-10 text-sm sm:text-base"
                  />
                </FormControl>
                <FormMessage className="text-xs sm:text-sm" />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="nombre@ejemplo.com"
                  {...field}
                  className="h-9 sm:h-10 text-sm sm:text-base"
                />
              </FormControl>
              <FormMessage className="text-xs sm:text-sm" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Contraseña</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  {...field}
                  className="h-9 sm:h-10 text-sm sm:text-base"
                />
              </FormControl>
              <FormMessage className="text-xs sm:text-sm" />
            </FormItem>
          )}
        />
        {error && (
          <div className="text-xs sm:text-sm text-red-500">{error}</div>
        )}
        <Button
          type="submit"
          className="w-full h-9 sm:h-10 text-sm sm:text-base mt-2"
          disabled={isLoading}
        >
          {isLoading
            ? "Cargando..."
            : isRegister
            ? "Registrarse"
            : "Iniciar sesión"}
        </Button>
      </form>
    </Form>
  );
}
