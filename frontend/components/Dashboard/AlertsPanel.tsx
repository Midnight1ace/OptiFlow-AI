type ActionItem = {
  label: string;
  tag: string;
  tone: "urgent" | "info" | "success";
};

type AlertsPanelProps = {
  actions: ActionItem[];
};

const actionIcons: Record<ActionItem["tone"], string> = {
  urgent: "■",
  info: "◔",
  success: "▣"
};

export function AlertsPanel({ actions }: AlertsPanelProps) {
  return (
    <section className="panel-section">
      <header className="section-head">
        <div>
          <h2>Recommended Actions</h2>
        </div>
      </header>

      <div className="action-list">
        {actions.map((action) => (
          <article className="action-row" key={`${action.label}-${action.tag}`}>
            <div className="action-main">
              <span className={`action-icon action-icon-${action.tone}`}>
                {actionIcons[action.tone]}
              </span>
              <span>{action.label}</span>
            </div>
            <span className={`action-tag action-tag-${action.tone}`}>{action.tag}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
