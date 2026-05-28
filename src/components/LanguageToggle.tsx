// File: src/components/LanguageToggle.tsx
import { useEffect } from 'react';

interface LanguageToggleProps {
  language: 'motoko' | 'rust' | 'solidity';
  onChange: (lang: 'motoko' | 'rust' | 'solidity') => void;
}

export function LanguageToggle({ language, onChange }: LanguageToggleProps) {
  useEffect(() => {
    const saved = localStorage.getItem('smarty-language');
    if (saved === 'motoko' || saved === 'rust' || saved === 'solidity') {
      onChange(saved as 'motoko' | 'rust' | 'solidity');
    }
  }, []);

  const handleChange = (lang: 'motoko' | 'rust' | 'solidity') => {
    localStorage.setItem('smarty-language', lang);
    onChange(lang);
  };

  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={() => handleChange('motoko')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          language === 'motoko'
            ? 'bg-[#4A90D9] text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        Motoko
      </button>
      <button
        type="button"
        onClick={() => handleChange('rust')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          language === 'rust'
            ? 'bg-[#4A90D9] text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        Rust
      </button>
      <button
        type="button"
        onClick={() => handleChange('solidity')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          language === 'solidity'
            ? 'bg-[#4A90D9] text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        Solidity
      </button>
    </div>
  );
}