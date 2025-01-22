import { EmailForm } from "./email-form"
import { SocialButtons } from "./social-buttons"
import { ForgotPasswordForm } from "./forgot-password-form"

interface AuthFormProps {
  isRegister?: boolean
  isForgotPassword?: boolean
}

export function AuthForm({ isRegister = false, isForgotPassword = false }: AuthFormProps) {
  if (isForgotPassword) {
    return <ForgotPasswordForm />
  }

  return (
    <div className="space-y-6">
      <EmailForm isRegister={isRegister} />
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white dark:bg-slate-900 px-2 text-muted-foreground">
            O continuar con
          </span>
        </div>
      </div>
      <SocialButtons />
    </div>
  )
}