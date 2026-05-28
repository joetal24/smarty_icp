// File: src/components/IssueCard.tsx
import { useState } from 'react';
import type { Issue } from '../types';

interface IssueCardProps {
  issue: Issue;
}

const severityColors: Record<string, string> = {
  critical: 'bg-[#E74C3C]',
  high: 'bg-[#E67E22]',
  medium: 'bg-[#F1C40F]',
  low: 'bg-[#27AE60]',
  info: 'bg-[#27AE60]',
} as const;

const severityBgColors: Record<string, string> = {
  critical: 'bg-red-50',
  high: 'bg-orange-50',
  medium: 'bg-yellow-50',
  low: 'bg-green-50',
  info: 'bg-green-50',
} as const;

export function IssueCard({ issue }: IssueCardProps) {
  const [expanded, setExpanded] = useState(false);
  const badgeColor = severityColors[issue.severity] || 'bg-gray-500';
  const bgColor = severityBgColors[issue.severity] || 'bg-gray-50';

  const copyFix = async () => {
    await navigator.clipboard.writeText(issue.fixSnippet);
  };

  return (
    <div className={`border rounded-lg overflow-hidden ${bgColor}`}>
      <div
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <span className={`px-2 py-1 rounded text-white text-xs font-medium ${badgeColor}`}>
            {issue.severity.toUpperCase()}
          </span>
          <span className="font-medium">{issue.title}</span>
        </div>
        <span className="text-gray-400">{expanded ? '▲' : '▼'}</span>
      </div>

      {expanded && (
        <div className="px-4 pb-4">
          <p className="text-gray-600 mb-3">{issue.description}</p>
          {issue.lineHint && (
            <p className="text-sm text-gray-500 mb-3">Line: {issue.lineHint}</p>
          )}
          <div className="bg-gray-900 rounded-lg p-3 text-sm">
            <pre className="text-green-400 font-mono whitespace-pre-wrap">
{issue.fixSnippet}
            </pre>
          </div>
          <button
            onClick={copyFix}
            className="mt-3 px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
          >
            Copy Fix
          </button>
        </div>
      )}
    </div>
  );
}