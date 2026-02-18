import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../ui/Card';
import { CashForm } from './CashForm';
import { StockForm } from './StockForm';
import { RealEstateForm } from './RealEstateForm';
import { LiabilityForm } from './LiabilityForm';

type Section = 'cash' | 'stocks' | 'realEstate' | 'liabilities';

interface AccordionProps {
  title: string;
  section: Section;
  openSection: Section | null;
  onToggle: (section: Section) => void;
  children: React.ReactNode;
}

function Accordion({ title, section, openSection, onToggle, children }: AccordionProps) {
  const isOpen = openSection === section;
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <button
        onClick={() => onToggle(section)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
      >
        <span className="font-medium text-gray-900 dark:text-gray-100">{title}</span>
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && <div className="p-4">{children}</div>}
    </div>
  );
}

export function AssetForm() {
  const { t } = useTranslation();
  const [openSection, setOpenSection] = useState<Section | null>('cash');

  const handleToggle = (section: Section) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  return (
    <Card title={t('assets.title')}>
      <div className="space-y-2">
        <Accordion title={t('assets.cash.title')} section="cash" openSection={openSection} onToggle={handleToggle}>
          <CashForm />
        </Accordion>
        <Accordion title={t('assets.stocks.title')} section="stocks" openSection={openSection} onToggle={handleToggle}>
          <StockForm />
        </Accordion>
        <Accordion title={t('assets.realEstate.title')} section="realEstate" openSection={openSection} onToggle={handleToggle}>
          <RealEstateForm />
        </Accordion>
        <Accordion title={t('assets.liabilities.title')} section="liabilities" openSection={openSection} onToggle={handleToggle}>
          <LiabilityForm />
        </Accordion>
      </div>
    </Card>
  );
}
