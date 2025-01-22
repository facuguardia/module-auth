"use client";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/hooks/auth/use-auth-store";
import { ModeToggle } from "@/components/theme/mode-toggle";

export function Navbar() {
  const { signOut } = useAuthStore();

  const handleSignOut = async () => {
    try {
      await signOut();
      // La redirección se maneja en el hook useAuth
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
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
