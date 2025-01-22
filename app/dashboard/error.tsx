"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="grid place-items-center min-h-[50vh]">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-semibold">Algo salió mal</h2>
        <p className="text-muted-foreground">
          Ocurrió un error al cargar esta página
        </p>
        <Button onClick={reset}>Intentar de nuevo</Button>
      </div>
    </div>
  );
}
