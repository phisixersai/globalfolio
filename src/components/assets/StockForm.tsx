import { useTranslation } from 'react-i18next';
import { usePortfolioContext } from '../../contexts/PortfolioContext';
import { NumberInput } from '../ui/NumberInput';

export function StockForm() {
  const { t } = useTranslation();
  const { portfolio, updateStock } = usePortfolioContext();

  return (
    <div className="space-y-3">
      <NumberInput
        label={t('assets.stocks.TW')}
        value={portfolio.stocks.TW}
        onChange={(v) => updateStock('TW', v)}
        prefix="NT$"
      />
      <NumberInput
        label={t('assets.stocks.JP')}
        value={portfolio.stocks.JP}
        onChange={(v) => updateStock('JP', v)}
        prefix="¥"
      />
      <NumberInput
        label={t('assets.stocks.US')}
        value={portfolio.stocks.US}
        onChange={(v) => updateStock('US', v)}
        prefix="$"
      />
    </div>
  );
}
