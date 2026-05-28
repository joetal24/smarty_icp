// File: test.mo - Sample Motoko contract for testing
persistent actor Token {
  stable var balance : Nat = 1000;
  stable var owner : Principal = Principal.fromActor(actor);

  public shared func transfer(to : Principal, amount : Nat) : async () {
    if (amount > balance) return ();
    balance -= amount;
  };

  public query func getBalance() : async Nat {
    balance
  };

  public func setOwner(newOwner : Principal) : async () {
    owner := newOwner;
  };
}