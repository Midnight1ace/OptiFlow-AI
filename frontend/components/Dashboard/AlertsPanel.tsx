import { DecisionAction, DecisionStatus } from "@/types/decision";

type AlertsPanelProps = {
  actions: DecisionAction[];
  status: DecisionStatus;
  summary: string;
};

const actionIcons: Record<DecisionAction["tone"], string> = {
  urgent: "■",
  info: "◔",
  success: "▣"
};

const statusLabels: Record<DecisionStatus, string> = {
  critical: "Critical",
  watch: "Watch",
  stable: "Stable"
};

export function AlertsPanel({ actions, status, summary }: AlertsPanelProps) {
  return (
    <section className="panel-section">
      <header className="section-head">
        <div>
          <h2>Recommended Actions</h2>
          <p className="section-meta">Current rule output from the decision engine.</p>
        </div>
        <span className={`status-chip status-chip-${status}`}>{statusLabels[status]}</span>
      </header>

      <p className="panel-summary">{summary}</p>

      <div className="action-list">
        {actions.map((action) => (
          <article className="action-row" key={`${action.label}-${action.tag}`}>
            <div className="action-main">
              <span className={`action-icon action-icon-${action.tone}`}>
                {actionIcons[action.tone]}
              </span>
              <div className="action-copy">
                <strong>{action.label}</strong>
                <p>{action.rationale}</p>
              </div>
            </div>
            <span className={`action-tag action-tag-${action.tone}`}>{action.tag}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
