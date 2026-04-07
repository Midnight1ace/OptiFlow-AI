import { Card } from "@/components/UI/Card";
import { StaffSnapshot } from "@/types/staff";

type StaffPanelProps = {
  staff: StaffSnapshot;
};

export function StaffPanel({ staff }: StaffPanelProps) {
  return (
    <Card
      title="Staff Status"
      subtitle="Available capacity and role mix"
      accent="teal"
    >
      <div className="staff-summary">
        <div>
          <span>Total</span>
          <strong>{staff.total}</strong>
        </div>
        <div>
          <span>Idle</span>
          <strong>{staff.idle}</strong>
        </div>
        <div>
          <span>Busy</span>
          <strong>{staff.busy}</strong>
        </div>
      </div>

      <div className="metric-list compact">
        {Object.entries(staff.byRole).map(([role, count]) => (
          <div className="metric-row" key={role}>
            <span>{role}</span>
            <strong>{count}</strong>
          </div>
        ))}
      </div>
    </Card>
  );
}
