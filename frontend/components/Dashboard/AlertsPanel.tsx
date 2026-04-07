import { Card } from "@/components/UI/Card";

type AlertsPanelProps = {
  actions: string[];
};

export function AlertsPanel({ actions }: AlertsPanelProps) {
  return (
    <Card
      title="AI Decisions"
      subtitle="Recommended actions from the current rules engine"
      accent="gold"
    >
      <div className="alert-list">
        {actions.map((action) => (
          <div className="alert-pill" key={action}>
            {action}
          </div>
        ))}
      </div>
    </Card>
  );
}
