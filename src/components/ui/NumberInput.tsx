import { useState, useEffect } from 'react';

interface NumberInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  prefix?: string;
  className?: string;
}

function formatNumberWithCommas(num: number): string {
  if (num === 0) return '';
  return num.toLocaleString('en-US');
}

function parseNumberFromString(str: string): number {
  const cleaned = str.replace(/,/g, '');
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

export function NumberInput({ label, value, onChange, prefix, className = '' }: NumberInputProps) {
  const [displayValue, setDisplayValue] = useState(formatNumberWithCommas(value));
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!isFocused) {
      setDisplayValue(formatNumberWithCommas(value));
    }
  }, [value, isFocused]);

  const handleFocus = () => {
    setIsFocused(true);
    setDisplayValue(value === 0 ? '' : String(value));
  };

  const handleBlur = () => {
    setIsFocused(false);
    const numValue = parseNumberFromString(displayValue);
    onChange(numValue);
    setDisplayValue(formatNumberWithCommas(numValue));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (isFocused) {
      if (input === '' || /^-?\d*\.?\d*$/.test(input.replace(/,/g, ''))) {
        setDisplayValue(input);
      }
    }
  };

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
        {label}
      </label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-sm">
            {prefix}
          </span>
        )}
        <input
          type="text"
          value={displayValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="0"
          className={`w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 py-2 text-right text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${prefix ? 'pl-10 pr-3' : 'px-3'}`}
        />
      </div>
    </div>
  );
}
