import { redirect } from "next/navigation";
import { AUTH_ROUTES } from "@/lib/auth/constants";

export default function AuthPage() {
  redirect(AUTH_ROUTES.LOGIN);
}
