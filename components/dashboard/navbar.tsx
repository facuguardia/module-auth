"use client";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/hooks/auth/use-auth-store";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { useToast } from "@/hooks/use-toast";
import { AUTH_ERRORS, AUTH_MESSAGES } from "@/lib/auth/constants";

export function Navbar() {
  const { signOut } = useAuthStore();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Sesión cerrada",
        description: AUTH_MESSAGES.LOGOUT_SUCCESS,
      });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: AUTH_ERRORS.UNKNOWN,
      });
    }
  };

  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="font-semibold">Mi Aplicación</h1>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button variant="outline" onClick={handleSignOut}>
            Cerrar sesión
          </Button>
        </div>
      </div>
    </nav>
  );
}
