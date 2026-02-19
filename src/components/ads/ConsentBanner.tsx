import { useTranslation } from 'react-i18next';
import { useAdConsent } from '../../hooks/useAdConsent';
import { AD_CONFIG } from '../../services/adConfig';
import { Card } from '../ui/Card';

/**
 * GDPR Consent Banner
 *
 * Shows consent banner if:
 * 1. AD_CONFIG.consent.required is true (AdSense enabled)
 * 2. User hasn't made a consent decision yet
 *
 * Persists choice in localStorage via useAdConsent hook.
 */
export function ConsentBanner() {
  const { t } = useTranslation();
  const { hasConsented, updateConsent } = useAdConsent();

  // Don't show banner if consent not required or user already consented
  if (!AD_CONFIG.consent.required || hasConsented) {
    return null;
  }

  const handleAcceptAll = () => {
    updateConsent('all');
  };

  const handleDecline = () => {
    updateConsent('essential');
  };

  return (
    <>
      {/* Dark overlay */}
      <div className="fixed inset-0 bg-black/50 z-40" aria-hidden="true" />

      {/* Consent banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-2xl">
            <div className="p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {t('consent.banner.title')}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('consent.banner.message')}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAcceptAll}
                  className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                >
                  {t('consent.banner.acceptAll')}
                </button>
                <button
                  onClick={handleDecline}
                  className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                >
                  {t('consent.banner.decline')}
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
