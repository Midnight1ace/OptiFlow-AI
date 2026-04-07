import { AlertsPanel } from "@/components/Dashboard/AlertsPanel";
import { QueueCard } from "@/components/Dashboard/QueueCard";
import { StaffPanel } from "@/components/Dashboard/StaffPanel";
import { getQueueSnapshot } from "@/services/queueService";
import { getStaffSnapshot } from "@/services/staffService";
import { getDecisionSnapshot } from "@/services/decisionService";

export default async function DashboardPage() {
  const [queue, staff, decisions] = await Promise.all([
    getQueueSnapshot(),
    getStaffSnapshot(),
    getDecisionSnapshot()
  ]);

  const totalQueue = Object.values(queue.areas).reduce(
    (sum, current) => sum + current,
    0
  );

  return (
    <main className="dashboard-shell">
      <section className="dashboard-hero">
        <div>
          <p className="eyebrow">Live Dashboard</p>
          <h1>Operational view for queues, staffing, and AI actions.</h1>
        </div>
        <div className="hero-stat">
          <span>Total Patients Waiting</span>
          <strong>{totalQueue}</strong>
        </div>
      </section>

      <section className="dashboard-grid">
        <QueueCard areas={queue.areas} />
        <StaffPanel staff={staff} />
        <AlertsPanel actions={decisions.actions} />
      </section>
    </main>
  );
}
