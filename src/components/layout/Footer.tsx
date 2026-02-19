import { useTranslation } from 'react-i18next';
import { AD_CONFIG } from '../../services/adConfig';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 py-4 mt-8">
      <div className="max-w-7xl mx-auto px-4 text-center space-y-2">
        <p className="text-xs text-gray-400 dark:text-gray-500">
          {t('footer.description')}
        </p>
        {AD_CONFIG.google.enabled && (
          <div className="flex justify-center gap-4 text-xs">
            <a
              href="https://adssettings.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              {t('footer.adSettings')}
            </a>
            {/*
              TODO: Create privacy policy page
              For now, link to GitHub repo or create a dedicated page
            */}
            <a
              href="https://github.com/phisixersai/globalfolio/blob/main/PRIVACY.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              {t('footer.privacy')}
            </a>
          </div>
        )}
      </div>
    </footer>
  );
}
