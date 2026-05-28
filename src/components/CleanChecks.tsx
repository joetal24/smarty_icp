// File: src/components/CleanChecks.tsx
interface CleanChecksProps {
  checks: string[];
}

export function CleanChecks({ checks }: CleanChecksProps) {
  if (!checks.length) return null;

  return (
    <div className="mt-6 p-4 bg-green-50 rounded-lg">
      <h3 className="font-semibold text-green-800 mb-3">Clean Checks</h3>
      <ul className="space-y-2">
        {checks.map((check, i) => (
          <li key={i} className="flex items-center gap-2 text-green-700">
            <span className="text-green-600">✓</span>
            {check}
          </li>
        ))}
      </ul>
    </div>
  );
}