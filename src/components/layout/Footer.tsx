import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 py-4 mt-8">
      <div className="max-w-7xl mx-auto px-4 text-center text-xs text-gray-400 dark:text-gray-500">
        <p>{t('footer.description')}</p>
      </div>
    </footer>
  );
}
