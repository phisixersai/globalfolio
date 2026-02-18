import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { usePortfolioContext } from '../../contexts/PortfolioContext';
import { useExchangeRateContext } from '../../contexts/ExchangeRateContext';
import { useThemeContext } from '../../contexts/ThemeContext';
import { calculateAllocation } from '../../utils/calculateAllocation';
import { Card } from '../ui/Card';

ChartJS.register(ArcElement, Tooltip, Legend);

export function AllocationPieChart() {
  const { t } = useTranslation();
  const { portfolio } = usePortfolioContext();
  const { rates, displayCurrency } = useExchangeRateContext();
  const { theme } = useThemeContext();

  const slices = useMemo(
    () => calculateAllocation(portfolio, rates, displayCurrency),
    [portfolio, rates, displayCurrency]
  );

  const chartData = useMemo(
    () => ({
      labels: slices.map((s) => t(`allocation.${s.label}`)),
      datasets: [
        {
          data: slices.map((s) => s.valueInDisplayCurrency),
          backgroundColor: slices.map((s) => s.color),
          borderColor: theme === 'dark' ? '#1f2937' : '#ffffff',
          borderWidth: 2,
        },
      ],
    }),
    [slices, t, theme]
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'bottom' as const,
          labels: {
            color: theme === 'dark' ? '#e5e7eb' : '#1f2937',
            padding: 16,
            usePointStyle: true,
            font: {
              size: 13,
            },
          },
        },
        tooltip: {
          callbacks: {
            label: (context: { label?: string; parsed: number }) => {
              const total = slices.reduce((sum, s) => sum + s.valueInDisplayCurrency, 0);
              const pct = total > 0 ? ((context.parsed / total) * 100).toFixed(1) : '0';
              return `${context.label}: ${pct}%`;
            },
          },
        },
      },
    }),
    [theme, slices]
  );

  if (slices.length === 0) {
    return (
      <Card title={t('dashboard.allocation')}>
        <div className="flex items-center justify-center h-48 text-gray-400 dark:text-gray-500">
          {t('dashboard.allocation')}
        </div>
      </Card>
    );
  }

  return (
    <Card title={t('dashboard.allocation')}>
      <div className="max-w-xs mx-auto">
        <Pie data={chartData} options={options} />
      </div>
    </Card>
  );
}
