import { ApiResult, fetchJson } from "@/services/api";
import { DecisionSnapshot, DecisionStatus, DecisionTone } from "@/types/decision";

type DecisionApiResponse = {
  engine: string;
  status: DecisionStatus;
  summary: string;
  generated_at?: string;
  reasons: string[];
  actions: Array<{
    label: string;
    tag: string;
    tone: DecisionTone;
    rationale: string;
  }>;
};

const fallbackDecisions: DecisionApiResponse = {
  engine: "Rules-based triage engine",
  status: "critical",
  summary: "ER is the main pressure point with 18 waiting patients. Immediate action is recommended.",
  reasons: [
    "ER queue is above the congestion threshold (18 waiting vs 15 threshold).",
    "2 staff member(s) are idle while the ER still has active patient demand."
  ],
  actions: [
    {
      label: "Open new ER counter",
      tag: "Urgent",
      tone: "urgent",
      rationale: "Reduce front-door congestion before the ER queue grows further."
    },
    {
      label: "Reassign idle staff",
      tag: "Staffing",
      tone: "info",
      rationale: "Move available coverage toward the busiest area to shorten waits."
    }
  ]
};

export async function getDecisionSnapshot(): Promise<ApiResult<DecisionSnapshot>> {
  const result = await fetchJson<DecisionApiResponse>("/decisions", fallbackDecisions);
  const payload = result.data;

  return {
    ...result,
    data: {
      engine: payload.engine,
      status: payload.status,
      summary: payload.summary,
      generatedAt: payload.generated_at,
      reasons: payload.reasons,
      actions: payload.actions
    }
  };
}
