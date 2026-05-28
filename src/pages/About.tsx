// File: src/pages/About.tsx
export function About() {
  const vulns = [
    { name: 'Reentrancy', desc: 'Async call made before state mutation' },
    { name: 'Missing Caller Check', desc: 'No Principal.isController or caller validation' },
    { name: 'Integer Overflow', desc: 'Unchecked arithmetic on Nat/Int' },
    { name: 'Unsafe Upgrade', desc: 'Missing preupgrade/postupgrade or non-stable state' },
    { name: 'Unbounded Loop', desc: 'Loops over user-controlled data without cycle guards' },
    { name: 'Mutable Shared State', desc: 'Unguarded var in actor accessible across calls' },
    { name: 'Exposed Admin', desc: 'Update methods without access control' },
    { name: 'Unhandled Errors', desc: 'Missing Result/Option handling' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-[#1A1A2E] text-white px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">Smarty</h1>
          <div className="flex gap-4 text-sm">
            <a href="/" className="hover:text-gray-300">Home</a>
            <a href="#history" className="hover:text-gray-300">History</a>
          </div>
        </div>
      </nav>
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">About Smarty</h2>
        <p className="text-gray-600 mb-6">
          Smarty is an AI-powered smart contract auditor for the Internet Computer Protocol (ICP).
          It detects vulnerabilities in Motoko and Rust canisters and provides actionable fix suggestions.
        </p>

        <h3 className="text-xl font-semibold mb-3">What Smarty Checks</h3>
        <ul className="space-y-2 mb-6">
          {vulns.map((v) => (
            <li key={v.name} className="flex gap-2">
              <span className="text-[#E74C3C]">•</span>
              <span><strong>{v.name}</strong> — {v.desc}</span>
            </li>
          ))}
        </ul>

        <h3 className="text-xl font-semibold mb-3">Chains Supported</h3>
        <p className="text-gray-600 mb-6">ICP (Motoko + Rust). EVM support planned for v2.</p>

        <h3 className="text-xl font-semibold mb-3">Privacy</h3>
        <p className="text-gray-600 mb-6">
          Your code is sent to the Claude API for analysis only. It is not persisted beyond the session.
        </p>

        <h3 className="text-xl font-semibold mb-3">Run Locally</h3>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`# Install DFX
sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"

# Start local replica
dfx start --clean --background

# Deploy
dfx deploy

# Run frontend
npm run dev`}
        </pre>

        <h3 className="text-xl font-semibold mb-3">FAQ</h3>
        <div className="space-y-4">
          <div>
            <p className="font-medium">Q: Why does the audit show "stub"?</p>
            <p className="text-gray-600">A: AI integration requires an Anthropic API key. Add it to your .env file as ANTHROPIC_API_KEY.</p>
          </div>
        </div>
      </main>
    </div>
  );
}