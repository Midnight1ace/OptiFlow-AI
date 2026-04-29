import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function requireAdminSession(nextPath: string) {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.get("optiflow_admin")?.value === "authenticated";

  if (!isLoggedIn) {
    redirect(`/login?next=${encodeURIComponent(nextPath)}`);
  }
}
