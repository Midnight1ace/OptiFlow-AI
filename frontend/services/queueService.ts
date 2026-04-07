import { fetchJson } from "@/services/api";
import { QueueSnapshot } from "@/types/queue";

const fallbackQueue: QueueSnapshot = {
  areas: {
    ER: 18,
    Lab: 6,
    Radiology: 3
  }
};

export function getQueueSnapshot() {
  return fetchJson<QueueSnapshot>("/queue", fallbackQueue);
}
