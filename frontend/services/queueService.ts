import { ApiResult, fetchJson } from "@/services/api";
import { QueueSnapshot } from "@/types/queue";

type QueueApiResponse = {
  areas: Record<string, number>;
  captured_at?: string;
};

const fallbackQueue: QueueApiResponse = {
  areas: {
    ER: 18,
    Lab: 6,
    Radiology: 3
  }
};

export async function getQueueSnapshot(): Promise<ApiResult<QueueSnapshot>> {
  const result = await fetchJson<QueueApiResponse>("/queue", fallbackQueue);

  return {
    ...result,
    data: {
      areas: result.data.areas,
      capturedAt: result.data.captured_at
    }
  };
}
