type InsightPanelProps = {
  engine: string;
  reasons: string[];
  queueAreas: Record<string, number>;
};

export function InsightPanel({ engine, reasons, queueAreas }: InsightPanelProps) {
  const areaEntries = Object.entries(queueAreas);
  const maxWaiting = Math.max(...areaEntries.map(([, value]) => value), 1);

  return (
    <section className="panel-section">
      <header className="section-head">
        <div>
          <h2>Decision Rationale</h2>
          <p className="section-meta">{engine}</p>
        </div>
      </header>

      <div className="insight-stack">
        <div className="reason-list">
          {reasons.map((reason, index) => (
            <article className="reason-item" key={reason}>
              <span className="reason-index">{index + 1}</span>
              <p>{reason}</p>
            </article>
          ))}
        </div>

        <div className="queue-mix">
          {areaEntries.map(([label, value]) => (
            <div className="queue-mix-row" key={label}>
              <div className="queue-mix-values">
                <strong>{label}</strong>
                <span>{value} waiting</span>
              </div>
              <div className="queue-mix-track" aria-hidden="true">
                <span
                  className="queue-mix-fill"
                  style={{ width: `${Math.max(12, Math.round((value / maxWaiting) * 100))}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
