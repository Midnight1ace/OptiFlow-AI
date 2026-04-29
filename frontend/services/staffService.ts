import { ApiResult, fetchJson } from "@/services/api";
import { StaffSnapshot } from "@/types/staff";

type StaffApiResponse = {
  total: number;
  idle: number;
  busy: number;
  by_role: Record<string, number>;
  captured_at?: string;
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

export async function getStaffSnapshot(): Promise<ApiResult<StaffSnapshot>> {
  const result = await fetchJson<StaffApiResponse>("/staff", fallbackStaffResponse);
  const payload = result.data;

  return {
    ...result,
    data: {
      total: payload.total,
      idle: payload.idle,
      busy: payload.busy,
      byRole: payload.by_role,
      capturedAt: payload.captured_at
    }
  };
}
