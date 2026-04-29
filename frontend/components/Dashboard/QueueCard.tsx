type QueueItem = {
  label: string;
  waiting: number;
  load: string;
  tone: "critical" | "moderate" | "stable";
};

type QueueCardProps = {
  items: QueueItem[];
};

const toneIcons: Record<QueueItem["tone"], string> = {
  critical: "▶",
  moderate: "▦",
  stable: "▤"
};

export function QueueCard({ items }: QueueCardProps) {
  return (
    <section className="panel-section panel-section-wide">
      <header className="section-head">
        <div>
          <h2>Current Queues</h2>
          <p className="section-meta">Live waiting counts by tracked department.</p>
        </div>
      </header>

      <div className="queue-stack">
        {items.map((item) => (
          <article className={`queue-card queue-${item.tone}`} key={item.label}>
            <div className="queue-icon">{toneIcons[item.tone]}</div>
            <div className="queue-copy">
              <span className="queue-label">{item.label}</span>
              <div className="queue-topline">
                <strong>{item.waiting} Waiting</strong>
              </div>
              <span>{item.load}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
