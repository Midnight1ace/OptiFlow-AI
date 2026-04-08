import { AppHeader } from "@/components/Shell/AppHeader";
import { AlertsPanel } from "@/components/Dashboard/AlertsPanel";
import { EfficiencyPanel } from "@/components/Dashboard/EfficiencyPanel";
import { InsightPanel } from "@/components/Dashboard/InsightPanel";
import { QueueCard } from "@/components/Dashboard/QueueCard";
import { StaffPanel } from "@/components/Dashboard/StaffPanel";
import { getDecisionSnapshot } from "@/services/decisionService";
import { getQueueSnapshot } from "@/services/queueService";
import { getStaffSnapshot } from "@/services/staffService";

export default async function DashboardPage() {
  const [queue, staff, decisions] = await Promise.all([
    getQueueSnapshot(),
    getStaffSnapshot(),
    getDecisionSnapshot()
  ]);

  const queueEntries = [
    {
      label: "ER",
      waiting: queue.areas.ER ?? 0,
      tone: "critical" as const,
      load: "High Load"
    },
    {
      label: "Lab",
      waiting: queue.areas.Lab ?? 0,
      tone: "moderate" as const,
      load: "Moderate Load"
    },
    {
      label: "Radiology",
      waiting: queue.areas.Radiology ?? 0,
      tone: "stable" as const,
      load: "Low Load"
    }
  ];

  const totalOnDuty = staff.total;
  const available = staff.idle + 1;
  const openRooms = 2;

  const staffBars = [
    480, 430, 500, 360, 440, 390, 320, 495, 410, 455, 310
  ];

  const efficiencyBars = [3, 5, 7, 6, 4, 5, 8, 10, 8, 7, 9, 12];
  const urgentAction = decisions.actions[0] ?? "Move 2 nurses to ER";
  const allActions = [
    { label: urgentAction, tag: "Urgent", tone: "urgent" as const },
    { label: "Delay 3 non-urgent tasks", tag: "Postpone", tone: "info" as const },
    { label: "Open another ER counter", tag: "Add Capacity", tone: "success" as const }
  ];

  return (
    <div className="app-screen">
      <AppHeader activeItem="Dashboard" />

      <main className="content-shell">
        <section className="hero-copy-block">
          <h1>Welcome to OptiFlow AI Dashboard</h1>
          <p className="subtitle">Real-Time Hospital Optimization</p>
        </section>

        <section className="alert-banner">
          <div className="alert-icon">!</div>
          <div>
            <strong>ER Congestion Predicted in 15 Minutes!</strong>
            <p>Suggest moving 2 nurses to ER</p>
          </div>
        </section>

        <section className="dashboard-layout">
          <QueueCard items={queueEntries} />
          <StaffPanel
            totalOnDuty={totalOnDuty}
            available={available}
            openRooms={openRooms}
            chartValues={staffBars}
          />
          <AlertsPanel actions={allActions} />
        </section>

        <section className="insight-layout">
          <InsightPanel />
          <EfficiencyPanel values={efficiencyBars} />
        </section>
      </main>
    </div>
  );
}
