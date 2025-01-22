import { AuthContainer } from "@/components/auth/auth-container";
import { AuthForm } from "@/components/auth/auth-form";
import { AuthHeader } from "@/components/auth/auth-header";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <AuthContainer>
      <AuthHeader
        title="Recuperar contraseña"
        description="Ingresa tu email para recibir las instrucciones"
      />
      <AuthForm isForgotPassword />
      <p className="text-center text-xs sm:text-sm text-muted-foreground">
        ¿Recordaste tu contraseña?{" "}
        <Link href="/auth/login" className="text-primary hover:underline">
          Volver al login
        </Link>
      </p>
    </AuthContainer>
  );
}
