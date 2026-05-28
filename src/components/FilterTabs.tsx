// File: src/components/FilterTabs.tsx
interface FilterTabsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  counts: Record<string, number>;
}

export function FilterTabs({ activeFilter, onFilterChange, counts }: FilterTabsProps) {
  const filters = ['All', 'Critical', 'High', 'Medium', 'Low', 'Info'];

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {filters.map((filter) => {
        const key = filter.toLowerCase();
        const count = key === 'all' ? Object.values(counts).reduce((a, b) => a + b, 0) : counts[key] || 0;
        
        return (
          <button
            key={filter}
            onClick={() => onFilterChange(key)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              activeFilter === key
                ? 'bg-[#4A90D9] text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {filter} {count > 0 && `(${count})`}
          </button>
        );
      })}
    </div>
  );
}