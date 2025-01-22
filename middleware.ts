import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_ROUTES } from "./lib/auth/constants";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  try {
    // Refresh session if needed
    const {
      data: { session },
    } = await supabase.auth.getSession();

    console.log("Middleware: Session state:", {
      hasSession: !!session,
      sessionId: session?.access_token?.slice(-10),
      url: req.url,
    });

    // Rutas protegidas
    const protectedRoutes = ["/dashboard"];
    const isProtectedRoute = protectedRoutes.some((route) =>
      req.nextUrl.pathname.startsWith(route)
    );

    // Rutas de autenticación
    const isAuthRoute = Object.values(AUTH_ROUTES).some(
      (route) =>
        route !== AUTH_ROUTES.DASHBOARD && req.nextUrl.pathname === route
    );

    // Si hay sesión y estamos en una ruta de auth, redirigir al dashboard
    if (session && isAuthRoute) {
      return NextResponse.redirect(new URL(AUTH_ROUTES.DASHBOARD, req.url));
    }

    // Si no hay sesión y estamos en una ruta protegida, redirigir al login
    if (!session && isProtectedRoute) {
      return NextResponse.redirect(new URL(AUTH_ROUTES.LOGIN, req.url));
    }

    // Importante: establecer la cookie de sesión en la respuesta
    return res;
  } catch (error) {
    console.error("Error en middleware:", error);
    return NextResponse.redirect(new URL(AUTH_ROUTES.LOGIN, req.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
