"use client";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/hooks/auth/use-auth-store";
import { Icons } from "@/components/ui/icons";

export function SocialButtons() {
  const { signInWithGoogle, isLoading } = useAuthStore();

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
    }
  };

  return (
    <div className="grid w-full gap-2">
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={handleGoogleLogin}
        className="w-full h-9 sm:h-10 text-sm sm:text-base"
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
        ) : (
          <svg
            className="mr-2 h-3 w-3 sm:h-4 sm:w-4"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="google"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
          >
            <path
              fill="currentColor"
              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
            ></path>
          </svg>
        )}
        Continuar con Google
      </Button>
    </div>
  );
}
