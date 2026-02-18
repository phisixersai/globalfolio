import { useState, useCallback } from 'react';
import { loadFromStorage, saveToStorage } from '../services/localStorage';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const saved = loadFromStorage<T>(key);
    return saved ?? initialValue;
  });

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const nextValue = value instanceof Function ? value(prev) : value;
        saveToStorage(key, nextValue);
        return nextValue;
      });
    },
    [key]
  );

  return [storedValue, setValue];
}
