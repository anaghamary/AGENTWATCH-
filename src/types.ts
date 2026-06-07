export type AgentStatus = 'idle' | 'active' | 'warning' | 'compromised' | 'sandboxed' | 'killed';
export type ThreatLevel = 'none' | 'low' | 'medium' | 'high' | 'critical';
export type InterceptAction = 'pass' | 'warn' | 'sandbox' | 'human_review' | 'kill';
export type ModelName = 'gpt-3.5-turbo' | 'gpt-4' | 'gpt-4o-mini';
export type ModelType = 'Supervised' | 'Unsupervised' | 'Reinforcement' | 'Hybrid';

export interface ModelProfile {
  id: ModelName;
  label: string;
  description: string;
  threshold: number;
  riskScore: number;
  quality: 'standard' | 'advanced' | 'experimental';
  openAiModel: string;
}

export interface Agent {
  id: string;
  timestamp: number;
  fromAgent: string;
  toAgent: string;
  content: string;
  threatLevel: ThreatLevel;
  intercepted: boolean;
  interceptAction: InterceptAction;
  injectionDetected: boolean;
  injectionPayload?: string;
  trustScoreDelta: number;
  latencyMs: number;
}

export interface AuditNode {
  id: string;
  agentId: string;
  timestamp: number;
  action: string;
  toolCalled?: string;
  source?: string;
  trustScore: number;
  flagged: boolean;
  reason?: string;
}

export interface TrustEvent {
  timestamp: number;
  agentId: string;
  score: number;
  event: string;
  delta: number;
}

export interface SessionRecord {
  id: string;
  query: string;
  createdAt: number;
  status: 'pending' | 'resolved' | 'blocked';
  report?: string;
  stepsCompleted: number;
}

export interface PipelineSettings {
  autoRun: boolean;
  useSupabase: boolean;
  enableRealApi: boolean;
  model: ModelName;
  modelType: ModelType;
}

export type DemoPhase =
  | 'idle'
  | 'baseline'
  | 'query_received'
  | 'planner_active'
  | 'researcher_active'
  | 'injection_detected'
  | 'intercepted'
  | 'forensics'
  | 'resolved';
