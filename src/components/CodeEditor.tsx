// File: src/components/CodeEditor.tsx
import { useState, useRef } from 'react';

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  onFileUpload: (file: File) => void;
}

export function CodeEditor({ code, onChange, onFileUpload }: CodeEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [lineCount, setLineCount] = useState(1);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    onChange(value);
    setLineCount(value.split('\n').length);
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const ext = file.name.split('.').pop();
    if (ext !== 'mo' && ext !== 'rs') {
      alert('Please upload a .mo (Motoko) or .rs (Rust) file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      onChange(content);
      onFileUpload(file);
    };
    reader.readAsText(file);
  };

  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

  return (
    <div className="relative">
      <div className="flex border border-gray-300 rounded-lg overflow-hidden bg-white">
        <div className="py-3 px-3 bg-gray-50 text-gray-400 text-sm font-mono text-right select-none overflow-hidden min-w-[3rem]">
          {lineNumbers.map((num) => (
            <div key={num}>{num}</div>
          ))}
        </div>
        <textarea
          value={code}
          onChange={handleChange}
          placeholder="Paste your canister code here..."
          className="flex-1 p-3 font-mono text-sm resize-none focus:outline-none text-gray-800 min-h-[300px]"
          spellCheck={false}
        />
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept=".mo,.rs"
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        type="button"
        onClick={handleFileSelect}
        className="mt-2 text-sm text-gray-600 hover:text-gray-900"
      >
        or upload .mo / .rs file
      </button>
    </div>
  );
}