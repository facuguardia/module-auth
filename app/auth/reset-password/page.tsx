import { AuthContainer } from "@/components/auth/auth-container";
import { ResetPasswordForm } from "@/components/auth/auth-form/reset-password-form";
import { AuthHeader } from "@/components/auth/auth-header";

export default function ResetPasswordPage() {
  return (
    <AuthContainer>
      <AuthHeader
        title="Cambiar contraseña"
        description="Ingresa tu nueva contraseña"
      />
      <ResetPasswordForm />
    </AuthContainer>
  );
}
