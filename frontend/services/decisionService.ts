import { fetchJson } from "@/services/api";
import { DecisionSnapshot } from "@/types/decision";

const fallbackDecisions: DecisionSnapshot = {
  actions: ["Open new ER counter", "Reassign idle staff"]
};

export function getDecisionSnapshot() {
  return fetchJson<DecisionSnapshot>("/decisions", fallbackDecisions);
}
