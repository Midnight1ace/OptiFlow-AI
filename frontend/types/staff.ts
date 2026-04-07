export type StaffSnapshot = {
  total: number;
  idle: number;
  busy: number;
  byRole: Record<string, number>;
};
