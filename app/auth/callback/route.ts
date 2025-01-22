import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AUTH_ROUTES } from "@/lib/auth/constants";

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");

    if (code) {
      const supabase = createRouteHandlerClient({ cookies });

      const { data, error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        console.error("Error en el intercambio de código:", error);
        throw error;
      }

      if (data.session) {
        console.log("Sesión creada exitosamente");
        return NextResponse.redirect(
          new URL(AUTH_ROUTES.DASHBOARD, request.url)
        );
      }
    }

    throw new Error("No se recibió código de autorización");
  } catch (error) {
    console.error("Error en callback:", error);
    return NextResponse.redirect(
      new URL(`${AUTH_ROUTES.LOGIN}?error=auth_callback_error`, request.url)
    );
  }
}
