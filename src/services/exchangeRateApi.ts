import type { ExchangeRates } from '../types/currency';
import { API_URLS } from '../utils/constants';

interface PrimaryApiResponse {
  result: string;
  rates: Record<string, number>;
}

interface FallbackApiResponse {
  usd: Record<string, number>;
}

export const DEFAULT_RATES: ExchangeRates = {
  USD: 1,
  TWD: 32.5,
  JPY: 155,
};

async function fetchPrimary(): Promise<ExchangeRates> {
  const res = await fetch(API_URLS.PRIMARY);
  if (!res.ok) throw new Error(`Primary API error: ${res.status}`);
  const data: PrimaryApiResponse = await res.json();
  if (data.result !== 'success') throw new Error('Primary API returned non-success');
  return {
    USD: 1,
    TWD: data.rates.TWD ?? DEFAULT_RATES.TWD,
    JPY: data.rates.JPY ?? DEFAULT_RATES.JPY,
  };
}

async function fetchFallback(): Promise<ExchangeRates> {
  const res = await fetch(API_URLS.FALLBACK);
  if (!res.ok) throw new Error(`Fallback API error: ${res.status}`);
  const data: FallbackApiResponse = await res.json();
  return {
    USD: 1,
    TWD: data.usd.twd ?? DEFAULT_RATES.TWD,
    JPY: data.usd.jpy ?? DEFAULT_RATES.JPY,
  };
}

export async function fetchExchangeRates(): Promise<ExchangeRates> {
  try {
    return await fetchPrimary();
  } catch {
    try {
      return await fetchFallback();
    } catch {
      return DEFAULT_RATES;
    }
  }
}
