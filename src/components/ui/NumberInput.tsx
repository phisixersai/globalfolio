import { useState, useMemo } from 'react';

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
  const [internalValue, setInternalValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Derive display value based on focus state
  const displayValue = useMemo(() => {
    if (isFocused) {
      return internalValue;
    }
    return formatNumberWithCommas(value);
  }, [isFocused, internalValue, value]);

  const handleFocus = () => {
    setIsFocused(true);
    setInternalValue(value === 0 ? '' : String(value));
  };

  const handleBlur = () => {
    setIsFocused(false);
    const numValue = parseNumberFromString(internalValue);
    onChange(numValue);
    setInternalValue('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (input === '' || /^-?\d*\.?\d*$/.test(input.replace(/,/g, ''))) {
      setInternalValue(input);
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
