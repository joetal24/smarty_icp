export const idlFactory = ({ IDL }) => {
  const Severity = IDL.Variant({
    'low' : IDL.Null,
    'high' : IDL.Null,
    'info' : IDL.Null,
    'critical' : IDL.Null,
    'medium' : IDL.Null,
  });
  const Issue = IDL.Record({
    'title' : IDL.Text,
    'fixSnippet' : IDL.Text,
    'description' : IDL.Text,
    'lineHint' : IDL.Opt(IDL.Text),
    'severity' : Severity,
  });
  const AuditResult = IDL.Record({
    'language' : IDL.Text,
    'issues' : IDL.Vec(Issue),
    'timestamp' : IDL.Int,
    'cleanChecks' : IDL.Vec(IDL.Text),
    'riskScore' : IDL.Nat,
    'contractId' : IDL.Text,
  });
  const SupportedVuln = IDL.Record({
    'id' : IDL.Text,
    'name' : IDL.Text,
    'description' : IDL.Text,
  });
  return IDL.Service({
    'auditContract' : IDL.Func(
        [IDL.Text, IDL.Text],
        [IDL.Opt(AuditResult)],
        [],
      ),
    'getLastAudit' : IDL.Func([], [IDL.Opt(AuditResult)], ['query']),
    'getSupportedVulns' : IDL.Func([], [IDL.Vec(SupportedVuln)], ['query']),
    'health' : IDL.Func([], [IDL.Text], ['query']),
    'setApiKey' : IDL.Func([IDL.Text], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
