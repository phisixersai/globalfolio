import { useState, useEffect, useCallback } from 'react';
import type { ConsentType } from '../types/ads';
import { AD_CONFIG } from '../services/adConfig';

const STORAGE_KEY = AD_CONFIG.consent.storageKey;

/**
 * Hook for managing GDPR ad consent state
 *
 * Consent types:
 * - 'all': User accepts personalized ads (enables Google AdSense)
 * - 'essential': User declines personalized ads (only non-tracking ads like Carbon Ads)
 * - null: No decision yet (show consent banner)
 *
 * @returns Consent state and update function
 */
export function useAdConsent() {
  const [consent, setConsent] = useState<ConsentType>(() => {
    // Read from localStorage on mount
    if (!AD_CONFIG.consent.required) {
      // If consent not required, default to 'all'
      return 'all';
    }
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'all' || stored === 'essential') {
        return stored as ConsentType;
      }
      return null;
    } catch {
      return null;
    }
  });

  const [hasConsented, setHasConsented] = useState<boolean>(consent !== null);

  // Sync consent state with localStorage
  const updateConsent = useCallback((newConsent: ConsentType) => {
    setConsent(newConsent);
    setHasConsented(newConsent !== null);

    try {
      if (newConsent === null) {
        localStorage.removeItem(STORAGE_KEY);
      } else {
        localStorage.setItem(STORAGE_KEY, newConsent);
      }
    } catch (error) {
      console.error('Failed to save ad consent preference:', error);
    }
  }, []);

  // Listen for storage changes (multi-tab sync)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        const newValue = e.newValue as ConsentType;
        setConsent(newValue);
        setHasConsented(newValue !== null);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return {
    consent,
    hasConsented,
    updateConsent,
  };
}
