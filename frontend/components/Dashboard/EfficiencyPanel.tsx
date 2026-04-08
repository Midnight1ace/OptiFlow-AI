type EfficiencyPanelProps = {
  values: number[];
};

export function EfficiencyPanel({ values }: EfficiencyPanelProps) {
  const points = values
    .map((value, index) => `${index * 28},${90 - value * 6}`)
    .join(" ");

  return (
    <section className="panel-section">
      <header className="section-head">
        <div>
          <h2>Efficiency Tracker</h2>
        </div>
      </header>

      <article className="efficiency-card">
        <div className="efficiency-copy">
          <strong>Avg Wait Time: 8 mins</strong>
          <span>Previous Hour</span>
        </div>
        <svg
          aria-label="Efficiency trend line"
          className="trend-chart"
          viewBox="0 0 320 100"
        >
          <defs>
            <linearGradient id="trendFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#7bb5ff" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#7bb5ff" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <polyline
            className="trend-area"
            fill="url(#trendFill)"
            points={`0,100 ${points} 308,100`}
          />
          <polyline className="trend-line" fill="none" points={points} />
        </svg>
      </article>
    </section>
  );
}
