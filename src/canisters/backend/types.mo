// File: src/canisters/backend/types.mo

module {
  public type Severity = {
    #critical;
    #high;
    #medium;
    #low;
    #info;
  };

  public type Issue = {
    severity : Severity;
    title : Text;
    description : Text;
    lineHint : ?Text;
    fixSnippet : Text;
  };

  public type AuditResult = {
    contractId : Text;
    language : Text;
    timestamp : Int;
    riskScore : Nat;
    issues : [Issue];
    cleanChecks : [Text];
  };

  public type SupportedVuln = {
    id : Text;
    name : Text;
    description : Text;
  };

  public let supportedVulns : [SupportedVuln] = [
    { id = "reentrancy"; name = "Reentrancy"; description = "Async call made before state mutation" },
    { id = "missing_caller_check"; name = "Missing Caller Check"; description = "No Principal.isController or caller validation" },
    { id = "integer_overflow"; name = "Integer Overflow"; description = "Unchecked arithmetic on Nat/Int" },
    { id = "unsafe_upgrade"; name = "Unsafe Upgrade"; description = "Missing preupgrade/postupgrade or non-stable state" },
    { id = "unbounded_loop"; name = "Unbounded Loop"; description = "Loops over user-controlled data without cycle guards" },
    { id = "mutable_shared_state"; name = "Mutable Shared State"; description = "Unguarded var in actor accessible across calls" },
    { id = "exposed_admin"; name = "Exposed Admin Functions"; description = "Update methods without access control" },
    { id = "unhandled_error"; name = "Unhandled Errors"; description = "Missing Result/Option handling, silent failures" },
  ];
}