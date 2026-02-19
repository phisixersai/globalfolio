import type { AdConfig } from '../types/ads';

/**
 * Centralized ad platform configuration
 *
 * To enable Google AdSense after approval:
 * 1. Update `clientId` with your publisher ID
 * 2. Update `slots` with actual slot IDs from AdSense dashboard
 * 3. Set `google.enabled` to true
 * 4. Set `consent.required` to true
 * 5. Add AdSense script to index.html <head>
 */
export const AD_CONFIG: AdConfig = {
  google: {
    // Replace with your publisher ID after AdSense approval
    // Format: 'ca-pub-XXXXXXXXXXXXXXXXX'
    clientId: 'ca-pub-0000000000000000',
    enabled: false, // Set to true after AdSense approval
    slots: {
      // Replace with actual slot IDs from AdSense dashboard
      belowChart: '0000000000',
      footer: '1111111111',
    },
  },
  consent: {
    // Set to true when enabling Google AdSense (GDPR requirement)
    required: false,
    storageKey: 'globalfolio_ad_consent_v1',
  },
};
