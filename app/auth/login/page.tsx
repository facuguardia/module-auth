import { AuthContainer } from "@/components/auth/auth-container";
import { AuthForm } from "@/components/auth/auth-form";
import { AuthHeader } from "@/components/auth/auth-header";
import Link from "next/link";

export default function LoginPage() {
  return (
    <AuthContainer>
      <AuthHeader
        title="Bienvenido de nuevo"
        description="Ingresa tus credenciales para continuar"
      />
      <AuthForm />
      <p className="text-center text-xs sm:text-sm text-muted-foreground">
        ¿No tienes una cuenta?{" "}
        <Link href="/auth/register" className="text-primary hover:underline">
          Regístrate
        </Link>
      </p>
    </AuthContainer>
  );
}
