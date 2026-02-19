// Global window types for ad scripts
declare global {
  interface Window {
    adsbygoogle?: Array<unknown> & {
      loaded?: boolean;
      push: (config: unknown) => void;
    };
  }
}

export type ConsentType = 'all' | 'essential' | null;

export interface AdConfig {
  google: {
    clientId: string;
    enabled: boolean;
    slots: Record<string, string>;
  };
  consent: {
    required: boolean;
    storageKey: string;
  };
}

// Export to avoid TS isolated modules error
export {};
