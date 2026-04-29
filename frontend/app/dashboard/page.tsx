import { AppHeader } from "@/components/Shell/AppHeader";
import { AlertsPanel } from "@/components/Dashboard/AlertsPanel";
import { EfficiencyPanel } from "@/components/Dashboard/EfficiencyPanel";
import { InsightPanel } from "@/components/Dashboard/InsightPanel";
import { QueueCard } from "@/components/Dashboard/QueueCard";
import { StaffPanel } from "@/components/Dashboard/StaffPanel";
import { requireAdminSession } from "@/lib/adminSession";
import { ApiSource } from "@/services/api";
import { getDecisionSnapshot } from "@/services/decisionService";
import { getQueueSnapshot } from "@/services/queueService";
import { getStaffSnapshot } from "@/services/staffService";
import { DecisionStatus } from "@/types/decision";

const trackedAreas = ["ER", "Lab", "Radiology"];
const queueThresholds: Record<string, number> = {
  ER: 15,
  Lab: 8,
  Radiology: 6
};

const statusTitles: Record<DecisionStatus, string> = {
  critical: "Action Needed Now",
  watch: "Monitor Closely",
  stable: "System Within Thresholds"
};

const statusIcons: Record<DecisionStatus, string> = {
  critical: "!",
  watch: "~",
  stable: "✓"
};

function getQueueTone(area: string, waiting: number) {
  const threshold = queueThresholds[area] ?? 10;

  if (waiting >= threshold) {
    return "critical" as const;
  }

  if (waiting >= Math.ceil(threshold * 0.65)) {
    return "moderate" as const;
  }

  return "stable" as const;
}

function getQueueLoadLabel(area: string, waiting: number) {
  const tone = getQueueTone(area, waiting);

  if (tone === "critical") {
    return "Threshold exceeded";
  }

  if (tone === "moderate") {
    return "Elevated load";
  }

  return "Stable load";
}

function formatSourceLabel(sources: ApiSource[]) {
  if (sources.every((source) => source === "live")) {
    return "Live backend API data";
  }

  if (sources.every((source) => source === "fallback")) {
    return "Fallback demo data";
  }

  return "Mixed live and fallback data";
}

function formatTimestamp(timestamp?: string) {
  if (!timestamp) {
    return "Unavailable";
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC"
  }).format(new Date(timestamp));
}

export default async function DashboardPage() {
  await requireAdminSession("/dashboard");

  const [queueResult, staffResult, decisionResult] = await Promise.all([
    getQueueSnapshot(),
    getStaffSnapshot(),
    getDecisionSnapshot()
  ]);

  const queue = queueResult.data;
  const staff = staffResult.data;
  const decisions = decisionResult.data;
  const orderedAreas = [
    ...trackedAreas.filter((area) => area in queue.areas),
    ...Object.keys(queue.areas).filter((area) => !trackedAreas.includes(area))
  ];

  const queueEntries = orderedAreas.map((area) => {
    const waiting = queue.areas[area] ?? 0;

    return {
      label: area,
      waiting,
      tone: getQueueTone(area, waiting),
      load: getQueueLoadLabel(area, waiting)
    };
  });

  const staffStats = [
    { label: "On Duty", value: staff.total },
    { label: "Available", value: staff.idle },
    { label: "Busy", value: staff.busy, accent: true }
  ];
  const roleDistribution = Object.entries(staff.byRole).map(([label, value]) => ({
    label,
    value
  }));
  const queueEntriesRaw = Object.entries(queue.areas);
  const totalWaiting = queueEntriesRaw.reduce((sum, [, value]) => sum + value, 0);
  const busiestArea = queueEntriesRaw.reduce(
    (current, entry) => (entry[1] > current[1] ? entry : current),
    queueEntriesRaw[0] ?? ["ER", 0]
  );
  const utilizationRate = staff.total > 0 ? Math.round((staff.busy / staff.total) * 100) : 0;
  const sourceLabel = formatSourceLabel([
    queueResult.source,
    staffResult.source,
    decisionResult.source
  ]);
  const lastUpdated = formatTimestamp(
    decisions.generatedAt ?? queue.capturedAt ?? staff.capturedAt ?? decisionResult.fetchedAt
  );

  return (
    <div className="app-screen">
      <AppHeader activeItem="Dashboard" />

      <main className="content-shell">
        <section className="hero-copy-block">
          <h1>Welcome to OptiFlow AI Dashboard</h1>
          <p className="subtitle">Current hospital operations snapshot and decision support</p>
        </section>

        <section className="dashboard-meta" aria-label="Dashboard metadata">
          <span className="meta-pill">Data Source: {sourceLabel}</span>
          <span className="meta-pill">Last Updated: {lastUpdated}</span>
          <span className="meta-pill">Engine: {decisions.engine}</span>
        </section>

        <section className={`alert-banner alert-banner-${decisions.status}`}>
          <div className="alert-icon">{statusIcons[decisions.status]}</div>
          <div>
            <strong>{statusTitles[decisions.status]}</strong>
            <p>{decisions.summary}</p>
          </div>
        </section>

        <section className="dashboard-layout">
          <QueueCard items={queueEntries} />
          <StaffPanel roleDistribution={roleDistribution} stats={staffStats} />
          <AlertsPanel
            actions={decisions.actions}
            status={decisions.status}
            summary={decisions.summary}
          />
        </section>

        <section className="insight-layout">
          <InsightPanel
            engine={decisions.engine}
            queueAreas={queue.areas}
            reasons={decisions.reasons}
          />
          <EfficiencyPanel
            busiestAreaCount={busiestArea[1]}
            busiestAreaLabel={busiestArea[0]}
            sourceLabel={sourceLabel}
            totalWaiting={totalWaiting}
            utilizationRate={utilizationRate}
          />
        </section>
      </main>
    </div>
  );
}
