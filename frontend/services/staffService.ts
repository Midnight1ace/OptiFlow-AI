import { fetchJson } from "@/services/api";
import { StaffSnapshot } from "@/types/staff";

type StaffApiResponse = {
  total: number;
  idle: number;
  busy: number;
  by_role: Record<string, number>;
};

const fallbackStaffResponse: StaffApiResponse = {
  total: 12,
  idle: 2,
  busy: 10,
  by_role: {
    Nurse: 6,
    Tech: 4,
    Doctor: 2
  }
};

export async function getStaffSnapshot(): Promise<StaffSnapshot> {
  const payload = await fetchJson<StaffApiResponse>("/staff", fallbackStaffResponse);

  return {
    total: payload.total,
    idle: payload.idle,
    busy: payload.busy,
    byRole: payload.by_role
  };
}
