// File: src/components/HistoryList.tsx
import { useState, useEffect } from 'react';
import type { AuditResult } from '../types';

interface HistoryListProps {
  onSelect: (result: AuditResult) => void;
}

export function HistoryList({ onSelect }: HistoryListProps) {
  const [history, setHistory] = useState<AuditResult[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('smarty-history');
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch {
        setHistory([]);
      }
    }
  }, []);

  const formatTime = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return 'Yesterday';
    return `${days} days ago`;
  };

  if (history.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg mb-2">No audits yet.</p>
        <p>Paste your first canister above.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {history.map((item, i) => (
        <div
          key={i}
          className="flex items-center justify-between p-4 bg-white border rounded-lg hover:shadow-sm cursor-pointer"
          onClick={() => onSelect(item)}
        >
          <div className="flex items-center gap-4">
            <span className={`px-2 py-1 rounded text-white text-xs font-medium ${
              item.riskScore >= 70 ? 'bg-[#E74C3C]' :
              item.riskScore >= 40 ? 'bg-[#E67E22]' :
              'bg-[#27AE60]'
            }`}>
              Score: {item.riskScore}
            </span>
            <span className="text-gray-600">main.{item.language === 'motoko' ? 'mo' : 'rs'}</span>
            <span className="text-gray-500 text-sm">{item.language}</span>
            <span className="text-gray-400 text-sm">{item.issues.length} issues</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-sm">{formatTime(item.timestamp)}</span>
            <span className="text-[#4A90D9]">View →</span>
          </div>
        </div>
      ))}
    </div>
  );
}