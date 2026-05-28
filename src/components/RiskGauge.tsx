// File: src/components/RiskGauge.tsx
interface RiskGaugeProps {
  score: number;
}

export function RiskGauge({ score }: RiskGaugeProps) {
  const getColor = (s: number) => {
    if (s >= 70) return '#E74C3C';
    if (s >= 40) return '#E67E22';
    if (s >= 20) return '#F1C40F';
    return '#27AE60';
  };

  const getLabel = (s: number) => {
    if (s >= 70) return 'HIGH';
    if (s >= 40) return 'MEDIUM';
    if (s >= 20) return 'LOW';
    return 'MINIMAL';
  };

  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = getColor(score);
  const label = getLabel(score);

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg width="200" height="200" className="transform -rotate-90">
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="12"
          />
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold" style={{ color }}>{score}</span>
          <span className="text-sm text-gray-500 mt-1">Overall Risk</span>
          <span className="text-lg font-semibold mt-2" style={{ color }}>{label}</span>
        </div>
      </div>
    </div>
  );
}