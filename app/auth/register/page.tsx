import { AuthContainer } from "@/components/auth/auth-container";
import { AuthForm } from "@/components/auth/auth-form";
import { AuthHeader } from "@/components/auth/auth-header";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <AuthContainer>
      <AuthHeader
        title="Crear cuenta"
        description="Ingresa tus datos para registrarte"
      />
      <AuthForm isRegister />
      <p className="text-center text-sm text-muted-foreground">
        ¿Ya tienes una cuenta?{" "}
        <Link href="/auth/login" className="text-primary hover:underline">
          Inicia sesión
        </Link>
      </p>
    </AuthContainer>
  );
}
