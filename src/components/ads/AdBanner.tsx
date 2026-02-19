import { useEffect, useRef } from 'react';
import { useAdConsent } from '../../hooks/useAdConsent';
import { AD_CONFIG } from '../../services/adConfig';

interface AdBannerProps {
  /**
   * Ad slot identifier (sidebar, belowChart, footer)
   * Corresponds to slot IDs in AD_CONFIG.google.slots
   */
  slot: keyof typeof AD_CONFIG.google.slots;

  /**
   * Ad format (optional)
   * - 'auto': Responsive ad (default)
   * - 'horizontal': Horizontal banner
   * - 'vertical': Vertical banner
   * - 'rectangle': Rectangle ad
   */
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle';

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Google AdSense ad banner component
 *
 * Prerequisites:
 * 1. Set AD_CONFIG.google.enabled to true
 * 2. Add AdSense script to index.html <head>
 * 3. Update AD_CONFIG.google.clientId and slot IDs
 * 4. User must consent to personalized ads
 *
 * Gracefully handles:
 * - Ad blockers (returns null)
 * - Missing AdSense script (returns null)
 * - User declined consent (returns null)
 */
export function AdBanner({ slot, format = 'auto', className = '' }: AdBannerProps) {
  const { consent } = useAdConsent();
  const adRef = useRef<HTMLModElement>(null);
  const isLoadedRef = useRef(false);

  useEffect(() => {
    // Don't load ads if:
    // 1. Google ads disabled in config
    // 2. User declined consent (consent !== 'all')
    // 3. Ad already loaded
    if (!AD_CONFIG.google.enabled || consent !== 'all' || isLoadedRef.current) {
      return;
    }

    // Check if AdSense script loaded
    if (typeof window.adsbygoogle === 'undefined') {
      console.warn('AdSense script not loaded. Add script tag to index.html.');
      return;
    }

    // Push ad to AdSense queue
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      isLoadedRef.current = true;
    } catch (error) {
      console.error('Failed to load AdSense ad:', error);
    }
  }, [consent]);

  // Don't render if Google ads disabled or user declined consent
  if (!AD_CONFIG.google.enabled || consent !== 'all') {
    return null;
  }

  // Check if AdSense script loaded (ad blocker check)
  if (typeof window.adsbygoogle === 'undefined') {
    return null;
  }

  const slotId = AD_CONFIG.google.slots[slot];

  return (
    <div className={`ad-banner-container ${className}`} aria-label="Advertisement">
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={AD_CONFIG.google.clientId}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
