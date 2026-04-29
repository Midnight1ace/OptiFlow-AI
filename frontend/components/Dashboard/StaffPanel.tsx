type StaffStat = {
  label: string;
  value: number;
  accent?: boolean;
};

type RoleDistribution = {
  label: string;
  value: number;
};

type StaffPanelProps = {
  stats: StaffStat[];
  roleDistribution: RoleDistribution[];
};

export function StaffPanel({ stats, roleDistribution }: StaffPanelProps) {
  const maxValue = Math.max(...roleDistribution.map((role) => role.value), 1);
  const columnsTemplate = `repeat(${Math.max(roleDistribution.length, 1)}, minmax(0, 1fr))`;

  return (
    <section className="panel-section">
      <header className="section-head">
        <div>
          <h2>Staff Overview</h2>
          <p className="section-meta">Current coverage pulled from the staff snapshot.</p>
        </div>
      </header>

      <div className="staff-stat-grid">
        {stats.map((stat) => (
          <article
            className={stat.accent ? "staff-stat-card staff-stat-card-accent" : "staff-stat-card"}
            key={stat.label}
          >
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </article>
        ))}
      </div>

      <div className="mini-chart-card">
        <p className="role-chart-copy">Role distribution</p>
        <div
          aria-label="Staff role distribution chart"
          className="bar-chart"
          style={{ gridTemplateColumns: columnsTemplate }}
        >
          {roleDistribution.map((role) => (
            <span
              className="bar-chart-column"
              key={role.label}
              style={{
                height: `${Math.max(24, Math.round((role.value / maxValue) * 120))}px`
              }}
            />
          ))}
        </div>
        <div className="chart-labels chart-labels-dense" style={{ gridTemplateColumns: columnsTemplate }}>
          {roleDistribution.map((role) => (
            <span key={role.label}>{role.label}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
