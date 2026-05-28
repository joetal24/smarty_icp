// File: src/canisters/backend/main.mo
import Types "types";

persistent actor SmartyBackend {
  stable var lastAudit : ?Types.AuditResult = null;

  public query func health() : async Text {
    "ok"
  };

  public query func getSupportedVulns() : async [Types.SupportedVuln] {
    Types.supportedVulns
  };

  public query func getLastAudit() : async ?Types.AuditResult {
    lastAudit
  };

  public func setApiKey(_apiKey : Text) : async () {
    ()
  };

  public func auditContract(_code : Text, lang : Text) : async ?Types.AuditResult {
    let cleanIssues : [Types.Issue] = [];

    let checks = ["AI integration ready - configure API key in frontend"];

    let result : Types.AuditResult = {
      contractId = "ready";
      language = lang;
      timestamp = 0;
      riskScore = 0;
      issues = cleanIssues;
      cleanChecks = checks;
    };

    lastAudit := ?result;
    ?result;
  };
}