"use client";

import { useState } from "react";
import Link from "next/link";
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
import { AUTH_ROUTES, AUTH_MESSAGES, AUTH_ERRORS } from "@/lib/auth/constants";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EmailFormProps {
  isRegister?: boolean;
}
export function EmailForm({ isRegister = false }: EmailFormProps) {
  const { signIn, signUp, isLoading, error } = useAuthStore();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<LoginFormData | RegisterFormData>({
    resolver: zodResolver(isRegister ? registerSchema : loginSchema),
    defaultValues: {
      email: "",
      password: "",
      ...(isRegister && { name: "", confirmPassword: "" }),
    },
  });

  const onSubmit = async (data: LoginFormData | RegisterFormData) => {
    try {
      if (isRegister) {
        await signUp(data as RegisterFormData);
        toast({
          title: "Registro exitoso",
          description: AUTH_MESSAGES.CHECK_EMAIL,
        });
        form.reset({
          email: "",
          password: "",
          name: "",
          confirmPassword: "",
        });
      } else {
        const user = await signIn(data as LoginFormData);
        if (user) {
          toast({
            title: "¡Bienvenido!",
            description: AUTH_MESSAGES.LOGIN_SUCCESS,
          });
          window.location.href = AUTH_ROUTES.DASHBOARD;
        }
      }
    } catch (err) {
      console.error("Error en formulario:", err);
      toast({
        variant: "destructive",
        title: "Error",
        description: error || AUTH_ERRORS.UNKNOWN,
      });
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
              <div className="flex justify-between items-center">
                <FormLabel className="text-sm">Contraseña</FormLabel>
                {!isRegister && (
                  <Link
                    href={AUTH_ROUTES.FORGOT_PASSWORD}
                    className="text-sm text-primary hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                )}
              </div>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    {...field}
                    className="h-9 sm:h-10 text-sm sm:text-base pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-1 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isRegister && (
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Confirmar Contraseña</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      {...field}
                      className="h-9 sm:h-10 text-sm sm:text-base pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-1 hover:bg-transparent"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
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
