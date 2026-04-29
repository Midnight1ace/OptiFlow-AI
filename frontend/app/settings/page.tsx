import { AppHeader } from "@/components/Shell/AppHeader";
import { requireAdminSession } from "@/lib/adminSession";

export default async function SettingsPage() {
  await requireAdminSession("/settings");

  return (
    <div className="app-screen">
      <AppHeader activeItem="Settings" />
      <main className="content-shell">
        <section className="page-card">
          <div className="section-head">
            <div>
              <h1>Settings</h1>
              <p className="subtitle">Roadmap preview for configurable thresholds and admin controls.</p>
            </div>
          </div>

          <div className="roadmap-note">
            Threshold editing and admin policy management are planned features. The live app still
            uses fixed backend rules and environment-based admin credentials.
          </div>

          <div className="placeholder-grid">
            <article className="placeholder-card">
              <h3>ER threshold</h3>
              <p>Planned: adjust the queue level that triggers a congestion alert or staffing suggestion.</p>
            </article>
            <article className="placeholder-card">
              <h3>Notification policy</h3>
              <p>Planned: define which actions are marked urgent, staffing-related, or capacity-related.</p>
            </article>
            <article className="placeholder-card">
              <h3>Admin controls</h3>
              <p>Planned: rotate credentials and review access decisions for the operations team.</p>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}
