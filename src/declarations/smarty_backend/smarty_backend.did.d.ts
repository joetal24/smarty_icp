import type { Principal } from '@icp-sdk/core/principal';
import type { ActorMethod } from '@icp-sdk/core/agent';
import type { IDL } from '@icp-sdk/core/candid';

export interface AuditResult {
  'language' : string,
  'issues' : Array<Issue>,
  'timestamp' : bigint,
  'cleanChecks' : Array<string>,
  'riskScore' : bigint,
  'contractId' : string,
}
export interface Issue {
  'title' : string,
  'fixSnippet' : string,
  'description' : string,
  'lineHint' : [] | [string],
  'severity' : Severity,
}
export type Severity = { 'low' : null } |
  { 'high' : null } |
  { 'info' : null } |
  { 'critical' : null } |
  { 'medium' : null };
export interface SupportedVuln {
  'id' : string,
  'name' : string,
  'description' : string,
}
export interface _SERVICE {
  'auditContract' : ActorMethod<[string, string], [] | [AuditResult]>,
  'getLastAudit' : ActorMethod<[], [] | [AuditResult]>,
  'getSupportedVulns' : ActorMethod<[], Array<SupportedVuln>>,
  'health' : ActorMethod<[], string>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
