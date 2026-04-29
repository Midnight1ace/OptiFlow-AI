export type DecisionTone = "urgent" | "info" | "success";

export type DecisionStatus = "stable" | "watch" | "critical";

export type DecisionAction = {
  label: string;
  tag: string;
  tone: DecisionTone;
  rationale: string;
};

export type DecisionSnapshot = {
  engine: string;
  status: DecisionStatus;
  summary: string;
  generatedAt?: string;
  actions: DecisionAction[];
  reasons: string[];
};
