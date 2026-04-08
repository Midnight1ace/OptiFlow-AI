import { AppHeader } from "@/components/Shell/AppHeader";

export default function ReportsPage() {
  return (
    <div className="app-screen">
      <AppHeader activeItem="Reports" />
      <main className="content-shell">
        <section className="page-card">
          <div className="section-head">
            <div>
              <h1>Reports</h1>
              <p className="subtitle">Historical operational performance snapshots.</p>
            </div>
          </div>

          <div className="placeholder-grid">
            <article className="placeholder-card">
              <h3>Average Wait Time</h3>
              <p>Track how patient wait times trend across the previous 24 hours.</p>
            </article>
            <article className="placeholder-card">
              <h3>Staff Utilization</h3>
              <p>Review shift pressure, idle capacity, and reassignment frequency.</p>
            </article>
            <article className="placeholder-card">
              <h3>Department Trends</h3>
              <p>Compare ER, Lab, and Radiology load to identify recurring bottlenecks.</p>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}
