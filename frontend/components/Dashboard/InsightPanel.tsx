const sparkValues = [20, 14, 28, 18, 21, 26, 33, 25, 30, 38, 43, 29];

export function InsightPanel() {
  return (
    <section className="panel-section">
      <header className="section-head">
        <div>
          <h2>System Insights</h2>
        </div>
      </header>

      <article className="insight-card">
        <div>
          <strong>Lab Delay:</strong> Causing patient backlog
        </div>
        <div className="sparkline-bars" aria-hidden="true">
          {sparkValues.map((value, index) => (
            <span
              className="sparkline-bar"
              key={`${value}-${index}`}
              style={{ height: `${value}px` }}
            />
          ))}
        </div>
      </article>
    </section>
  );
}
