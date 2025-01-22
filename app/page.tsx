import { redirect } from "next/navigation";
import { AUTH_ROUTES } from "@/lib/auth/constants";

export default function HomePage() {
  redirect(AUTH_ROUTES.LOGIN);
}
