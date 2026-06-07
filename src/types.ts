export type AgentStatus = 'idle' | 'active' | 'warning' | 'compromised' | 'sandboxed' | 'killed';
export type ThreatLevel = 'none' | 'low' | 'medium' | 'high' | 'critical';
export type InterceptAction = 'pass' | 'warn' | 'sandbox' | 'human_review' | 'kill';

export interface Agent {
  id: string;
  name: string;
  role: string;
  description: string;
  allowedTools: string[];
  trustScore: number;
  status: AgentStatus;
  manifestHash: string;
}

export interface AgentMessage {
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
