type StaffPanelProps = {
  totalOnDuty: number;
  available: number;
  openRooms: number;
  chartValues: number[];
};

export function StaffPanel({
  totalOnDuty,
  available,
  openRooms,
  chartValues
}: StaffPanelProps) {
  const columns = ["Active", "Idle Shift", "Free", "Monitors"];

  return (
    <section className="panel-section">
      <header className="section-head">
        <div>
          <h2>Staff Overview</h2>
        </div>
      </header>

      <div className="staff-stat-grid">
        <article className="staff-stat-card">
          <strong>{totalOnDuty}</strong>
          <span>On Duty</span>
        </article>
        <article className="staff-stat-card">
          <strong>{available}</strong>
          <span>Available</span>
        </article>
        <article className="staff-stat-card staff-stat-card-accent">
          <strong>{openRooms}</strong>
          <span>Open Rooms</span>
        </article>
      </div>

      <div className="mini-chart-card">
        <div className="bar-chart" aria-label="Staff activity chart">
          {chartValues.map((value, index) => (
            <span
              className="bar-chart-column"
              key={`${value}-${index}`}
              style={{ height: `${Math.max(20, Math.round(value / 5))}px` }}
            />
          ))}
        </div>
        <div className="chart-labels">
          {columns.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
