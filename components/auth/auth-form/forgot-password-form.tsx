"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/hooks/auth/use-auth-store";
import { emailSchema } from "@/lib/auth/validators";
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
import { AUTH_MESSAGES, AUTH_ERRORS } from "@/lib/auth/constants";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const forgotPasswordSchema = z.object({
  email: emailSchema,
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
  const { resetPassword, isLoading, error } = useAuthStore();
  const { toast } = useToast();
  const [isEmailSent, setIsEmailSent] = useState(false);

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await resetPassword(data.email);
      setIsEmailSent(true);
      toast({
        title: "Email enviado",
        description: AUTH_MESSAGES.RESET_EMAIL_SENT,
      });
    } catch (err) {
      console.error("Error al solicitar recuperación:", err);
      toast({
        variant: "destructive",
        title: "Error",
        description: error || AUTH_ERRORS.UNKNOWN,
      });
    }
  };

  if (isEmailSent) {
    return (
      <div className="text-center space-y-4">
        <p className="text-sm text-muted-foreground">
          {AUTH_MESSAGES.RESET_EMAIL_SENT}
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="nombre@ejemplo.com"
                  type="email"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && (
          <p className="text-sm text-destructive text-center">{error}</p>
        )}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Enviando..." : "Recuperar contraseña"}
        </Button>
      </form>
    </Form>
  );
}
