import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.get("optiflow_admin")?.value === "authenticated";

  redirect(isLoggedIn ? "/dashboard" : "/login");
}
