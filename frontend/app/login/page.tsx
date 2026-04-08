import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/Auth/AdminLoginForm";

export const metadata: Metadata = {
  title: "Admin Login | OptiFlow AI"
};

type LoginPageProps = {
  searchParams: Promise<{ next?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.get("optiflow_admin")?.value === "authenticated";
  const resolvedSearchParams = await searchParams;
  const nextPath = resolvedSearchParams.next;

  if (isLoggedIn) {
    redirect("/dashboard");
  }

  return (
    <main className="login-page">
      <section className="login-brand-panel">
        <div className="brand-lockup">
          <div className="brand-mark" aria-hidden="true">
            <span className="brand-orbit brand-orbit-top" />
            <span className="brand-orbit brand-orbit-bottom" />
          </div>
          <div>
            <p className="brand-name">OptiFlow AI</p>
            <p className="brand-tag">Hospital operations command center</p>
          </div>
        </div>

        <div className="login-copy">
          <p className="section-kicker">Admin Access</p>
          <h1>Coordinate queues, staffing, and urgent interventions in one place.</h1>
          <p>
            Sign in as an administrator to access the operations dashboard,
            review system insights, and manage hospital response settings.
          </p>
        </div>

        <div className="login-benefits">
          <div className="benefit-card">
            <strong>Real-time oversight</strong>
            <span>Monitor ER, Lab, and Radiology pressure without switching tools.</span>
          </div>
          <div className="benefit-card">
            <strong>Action-oriented alerts</strong>
            <span>See staffing moves and capacity recommendations the moment they matter.</span>
          </div>
          <div className="benefit-card">
            <strong>Secure admin access</strong>
            <span>Keep the dashboard behind a dedicated sign-in flow for leadership users.</span>
          </div>
        </div>
      </section>

      <section className="login-form-panel">
        <div className="login-form-shell">
          <div>
            <p className="section-kicker">Welcome Back</p>
            <h2>Admin login</h2>
            <p className="login-muted">
              Use the admin credentials from your `.env` file to enter the dashboard.
            </p>
          </div>
          <AdminLoginForm nextPath={nextPath} />
        </div>
      </section>
    </main>
  );
}
