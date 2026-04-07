import { QueueAreas } from "@/types/queue";
import { Card } from "@/components/UI/Card";

type QueueCardProps = {
  areas: QueueAreas;
};

export function QueueCard({ areas }: QueueCardProps) {
  return (
    <Card
      title="Queue Load"
      subtitle="Current waiting patients by department"
      accent="coral"
    >
      <div className="metric-list">
        {Object.entries(areas).map(([area, count]) => (
          <div className="metric-row" key={area}>
            <span>{area}</span>
            <strong>{count}</strong>
          </div>
        ))}
      </div>
    </Card>
  );
}
