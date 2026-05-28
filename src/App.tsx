// File: src/App.tsx
import { useState, useEffect } from 'react';
import { CodeEditor } from './components/CodeEditor';
import { LanguageToggle } from './components/LanguageToggle';
import { AuditButton } from './components/AuditButton';
import { RiskGauge } from './components/RiskGauge';
import { IssueCard } from './components/IssueCard';
import { FilterTabs } from './components/FilterTabs';
import { CleanChecks } from './components/CleanChecks';
import { HistoryList } from './components/HistoryList';
import { About } from './pages/About';
import type { AuditResult, Issue } from './types';

function App() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState<'motoko' | 'rust' | 'solidity'>('motoko');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState<'home' | 'history' | 'about'>('home');

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'history') setPage('history');
    else if (hash === 'about') setPage('about');
  }, []);

  const saveToHistory = (r: AuditResult) => {
    const stored = localStorage.getItem('smarty-history');
    const existing = stored ? JSON.parse(stored) : [];
    existing.unshift(r);
    localStorage.setItem('smarty-history', JSON.stringify(existing.slice(0, 50)));
  };

  const handleAudit = async () => {
    if (!code.trim()) return;
    setLoading(true);
    setError(null);

    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    if (!apiKey || apiKey.startsWith('sk-or-v1-')) {
      setError('API key not configured. Set VITE_OPENROUTER_API_KEY in .env');
      setLoading(false);
      return;
    }

    try {
      const prompt = `You are an ICP security expert. Analyze ${language} smart contract code for vulnerabilities. Return ONLY valid JSON with this exact structure:
{"contractId":"<sha256-hash>","language":"${language}","timestamp":<unix>,"riskScore":<0-100>,"issues":[{"severity":"critical"|"high"|"medium"|"low"|"info","title":"<name>","description":"<desc>","lineHint":"<line>"|null,"fixSnippet":"<fix>"}],"cleanChecks":["<check>"]}

Vulnerabilities: Reentrancy, Missing caller check, Integer overflow, Unsafe upgrade, Unbounded loops, Mutable shared state, Exposed admin, Unhandled errors.

Respond with ONLY JSON. No markdown.

Contract code:
${code}`;

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': 'http://localhost:4943',
          'X-Title': 'Smarty-ICP',
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-3.1-8b-instruct',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 4000,
          temperature: 0.3,
        }),
      });

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content || '';

      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON in response');
      }

      const parsed = JSON.parse(jsonMatch[0]);

      const auditResult: AuditResult = {
        contractId: parsed.contractId || 'unknown',
        language: parsed.language || language,
        timestamp: Date.now(),
        riskScore: parsed.riskScore || 0,
        issues: (parsed.issues || []).map((i: { severity: string; title: string; description: string; lineHint?: string; fixSnippet: string }) => ({
          severity: i.severity,
          title: i.title,
          description: i.description,
          lineHint: i.lineHint || undefined,
          fixSnippet: i.fixSnippet,
        })),
        cleanChecks: parsed.cleanChecks || [],
      };

      setResult(auditResult);
      saveToHistory(auditResult);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Audit failed');
    } finally {
      setLoading(false);
    }
  };

  const getCounts = (issues: Issue[]) => {
    const c: Record<string, number> = { critical: 0, high: 0, medium: 0, low: 0, info: 0 };
    issues.forEach((i) => { c[i.severity] = (c[i.severity] ?? 0) + 1; });
    return c;
  };

  const filteredIssues = filter === 'all' ? result?.issues || [] : result?.issues.filter((i) => i.severity === filter) || [];

  if (page === 'about') {
    return <About />;
  }

  if (page === 'history') {
    return (
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-[#1A1A2E] text-white px-6 py-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <h1 className="text-xl font-bold">Smarty</h1>
            <div className="flex gap-4 text-sm">
              <a href="/" className="hover:text-gray-300" onClick={(e) => { e.preventDefault(); setPage('home'); }}>Home</a>
              <a href="#history" className="hover:text-gray-300" onClick={(e) => { e.preventDefault(); setPage('history'); }}>History</a>
            </div>
          </div>
        </nav>
        <main className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Audit History</h2>
            <button
              onClick={() => localStorage.removeItem('smarty-history')}
              className="text-sm text-red-600 hover:underline"
            >
              Clear All
            </button>
          </div>
          <HistoryList onSelect={(r) => { setResult(r); setPage('home'); }} />
        </main>
      </div>
    );
  }

  if (result) {
    const counts = getCounts(result.issues);
    return (
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-[#1A1A2E] text-white px-6 py-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <h1 className="text-xl font-bold">Smarty</h1>
            <div className="flex gap-4 text-sm">
              <a href="/" className="hover:text-gray-300" onClick={(e) => { e.preventDefault(); setPage('home'); }}>Home</a>
              <a href="#history" className="hover:text-gray-300" onClick={(e) => { e.preventDefault(); setPage('history'); }}>History</a>
            </div>
          </div>
        </nav>
        <main className="max-w-4xl mx-auto px-4 py-8">
          <button onClick={() => setPage('home')} className="text-[#4A90D9] hover:underline mb-4">← Back</button>
          <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <RiskGauge score={result.riskScore} />
              <div className="flex-1">
                <p className="text-lg font-semibold mb-2">Overall Risk: {result.riskScore >= 70 ? 'HIGH' : result.riskScore >= 40 ? 'MEDIUM' : 'LOW'}</p>
                <div className="flex gap-3">
                  {counts.critical > 0 && <span className="px-2 py-1 bg-[#E74C3C] text-white rounded text-xs">{counts.critical} Critical</span>}
                  {counts.high > 0 && <span className="px-2 py-1 bg-[#E67E22] text-white rounded text-xs">{counts.high} High</span>}
                  {counts.medium > 0 && <span className="px-2 py-1 bg-[#F1C40F] text-black rounded text-xs">{counts.medium} Medium</span>}
                </div>
              </div>
            </div>
          </div>
          <FilterTabs activeFilter={filter} onFilterChange={setFilter} counts={counts} />
          <div className="space-y-3 mb-6">
            {filteredIssues.map((issue, i) => <IssueCard key={i} issue={issue} />)}
          </div>
          <CleanChecks checks={result.cleanChecks} />
          <button onClick={() => setPage('home')} className="mt-6 inline-block px-4 py-2 bg-[#4A90D9] text-white rounded hover:bg-[#3a7bc8]">Audit Another</button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-[#1A1A2E] text-white px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">Smarty</h1>
          <div className="flex gap-4 text-sm">
            <a href="/" className="hover:text-gray-300" onClick={(e) => { e.preventDefault(); setPage('home'); }}>Home</a>
            <a href="#history" className="hover:text-gray-300" onClick={(e) => { e.preventDefault(); setPage('history'); }}>History</a>
          </div>
        </div>
      </nav>
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[#1A1A2E] mb-2">Audit your ICP canister in seconds</h2>
          <p className="text-gray-600">Paste your Motoko or Rust canister code to detect vulnerabilities</p>
        </div>
        <div className="mb-4"><LanguageToggle language={language} onChange={setLanguage} /></div>
        <CodeEditor code={code} onChange={setCode} onFileUpload={(file) => console.log('Uploaded:', file.name)} />
        <div className="mt-4"><AuditButton onClick={handleAudit} disabled={!code.trim()} loading={loading} /></div>
        {error && <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg">{error}</div>}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <p className="text-sm text-gray-600">
            <a href="#about" onClick={(e) => { e.preventDefault(); setPage('about'); }} className="text-[#4A90D9] hover:underline">About</a> — AI-powered ICP smart contract auditor
          </p>
        </div>
      </main>
      <footer className="max-w-4xl mx-auto px-4 py-8 text-center text-gray-500 text-sm">Powered by OpenRouter + ICP</footer>
    </div>
  );
}

export default App;