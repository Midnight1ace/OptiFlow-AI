import { AppHeader } from "@/components/Shell/AppHeader";
import { requireAdminSession } from "@/lib/adminSession";

export default async function ReportsPage() {
  await requireAdminSession("/reports");

  return (
    <div className="app-screen">
      <AppHeader activeItem="Reports" />
      <main className="content-shell">
        <section className="page-card">
          <div className="section-head">
            <div>
              <h1>Reports</h1>
              <p className="subtitle">Roadmap preview for historical operational reporting.</p>
            </div>
          </div>

          <div className="roadmap-note">
            Historical exports and KPI reporting are planned next. This page is a product preview,
            not a live reporting module yet.
          </div>

          <div className="placeholder-grid">
            <article className="placeholder-card">
              <h3>Average Wait Time</h3>
              <p>Planned: compare department wait-time trends once queue history is persisted.</p>
            </article>
            <article className="placeholder-card">
              <h3>Staff Utilization</h3>
              <p>Planned: review shift pressure, idle capacity, and reassignment frequency over time.</p>
            </article>
            <article className="placeholder-card">
              <h3>Department Trends</h3>
              <p>Planned: compare ER, Lab, and Radiology patterns to identify recurring bottlenecks.</p>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}
