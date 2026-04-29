type EfficiencyPanelProps = {
  utilizationRate: number;
  totalWaiting: number;
  busiestAreaLabel: string;
  busiestAreaCount: number;
  sourceLabel: string;
};

export function EfficiencyPanel({
  utilizationRate,
  totalWaiting,
  busiestAreaLabel,
  busiestAreaCount,
  sourceLabel
}: EfficiencyPanelProps) {
  const metrics = [
    { label: "Busy Staff Rate", value: `${utilizationRate}%` },
    { label: "Patients Waiting", value: `${totalWaiting}` },
    { label: "Busiest Area", value: busiestAreaLabel },
    { label: "Peak Queue", value: `${busiestAreaCount} patients` }
  ];

  return (
    <section className="panel-section">
      <header className="section-head">
        <div>
          <h2>Operational Snapshot</h2>
          <p className="section-meta">{sourceLabel}</p>
        </div>
      </header>

      <div className="snapshot-grid">
        {metrics.map((metric) => (
          <article className="snapshot-card" key={metric.label}>
            <span className="snapshot-label">{metric.label}</span>
            <strong className="snapshot-value">{metric.value}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}
