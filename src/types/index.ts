// File: src/types/index.ts
export interface Issue {
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  title: string;
  description: string;
  lineHint?: string;
  fixSnippet: string;
}

export interface AuditResult {
  contractId: string;
  language: string;
  timestamp: number;
  riskScore: number;
  issues: Issue[];
  cleanChecks: string[];
}

export interface SupportedVuln {
  id: string;
  name: string;
  description: string;
}