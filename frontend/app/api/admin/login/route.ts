import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = (await request.json()) as {
    email?: string;
    password?: string;
  };

  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@optiflow.local";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "ChangeMe123!";

  if (email !== adminEmail || password !== adminPassword) {
    return NextResponse.json(
      { message: "Invalid admin email or password." },
      { status: 401 }
    );
  }

  const cookieStore = await cookies();
  cookieStore.set("optiflow_admin", "authenticated", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8
  });

  return NextResponse.json({ ok: true });
}
