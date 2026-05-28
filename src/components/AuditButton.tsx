// File: src/components/AuditButton.tsx
interface AuditButtonProps {
  onClick: () => void;
  disabled: boolean;
  loading: boolean;
}

export function AuditButton({ onClick, disabled, loading }: AuditButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-colors ${
        disabled
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-[#4A90D9] hover:bg-[#3a7bc8]'
      }`}
      title={disabled ? 'Paste code first' : 'Audit your contract'}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Analyzing...
        </span>
      ) : (
        'AUDIT CONTRACT →'
      )}
    </button>
  );
}