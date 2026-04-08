import { AppHeader } from "@/components/Shell/AppHeader";

export default function SettingsPage() {
  return (
    <div className="app-screen">
      <AppHeader activeItem="Settings" />
      <main className="content-shell">
        <section className="page-card">
          <div className="section-head">
            <div>
              <h1>Settings</h1>
              <p className="subtitle">Configure alert rules, thresholds, and admin access.</p>
            </div>
          </div>

          <div className="placeholder-grid">
            <article className="placeholder-card">
              <h3>ER threshold</h3>
              <p>Adjust the queue level that triggers a congestion alert or staffing suggestion.</p>
            </article>
            <article className="placeholder-card">
              <h3>Notification policy</h3>
              <p>Define which actions are marked urgent, postponed, or capacity related.</p>
            </article>
            <article className="placeholder-card">
              <h3>Admin controls</h3>
              <p>Rotate credentials and review access decisions for your operations team.</p>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}
