import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { usePortfolioContext } from '../../contexts/PortfolioContext';
import { useExchangeRateContext } from '../../contexts/ExchangeRateContext';
import { useThemeContext } from '../../contexts/ThemeContext';
import { calculateAllocation } from '../../utils/calculateAllocation';
import { Card } from '../ui/Card';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export function AllocationPieChart() {
  const { t } = useTranslation();
  const { portfolio } = usePortfolioContext();
  const { rates, displayCurrency } = useExchangeRateContext();
  const { theme } = useThemeContext();

  const slices = useMemo(
    () => calculateAllocation(portfolio, rates, displayCurrency),
    [portfolio, rates, displayCurrency]
  );

  // Reorder slices to group same currency assets together in the chart
  const reorderedSlices = useMemo(() => {
    const currencyGroups = {
      TWD: [] as typeof slices,
      JPY: [] as typeof slices,
      USD: [] as typeof slices,
      other: [] as typeof slices,
    };

    slices.forEach((slice) => {
      if (slice.label === 'cash.TWD' || slice.label === 'stocks.TW') {
        currencyGroups.TWD.push(slice);
      } else if (slice.label === 'cash.JPY' || slice.label === 'stocks.JP') {
        currencyGroups.JPY.push(slice);
      } else if (slice.label === 'cash.USD' || slice.label === 'stocks.US') {
        currencyGroups.USD.push(slice);
      } else {
        currencyGroups.other.push(slice);
      }
    });

    return [
      ...currencyGroups.TWD,
      ...currencyGroups.JPY,
      ...currencyGroups.USD,
      ...currencyGroups.other,
    ];
  }, [slices]);

  const chartData = useMemo(
    () => ({
      labels: reorderedSlices.map((s) => t(`allocation.${s.label}`)),
      datasets: [
        {
          data: reorderedSlices.map((s) => s.valueInDisplayCurrency),
          backgroundColor: reorderedSlices.map((s) => s.color),
          borderColor: theme === 'dark' ? '#1f2937' : '#ffffff',
          borderWidth: 2,
        },
      ],
    }),
    [reorderedSlices, t, theme]
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: true,
      layout: {
        padding: {
          top: 30,
          bottom: 10,
          left: 10,
          right: 10,
        },
      },
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
            generateLabels: (chart: any) => {
              const datasets = chart.data.datasets;
              // Use original slices order for legend
              return slices.map((slice, i) => {
                const reorderedIndex = reorderedSlices.findIndex((s) => s.label === slice.label);
                return {
                  text: t(`allocation.${slice.label}`),
                  fillStyle: slice.color,
                  strokeStyle: theme === 'dark' ? '#1f2937' : '#ffffff',
                  lineWidth: 2,
                  hidden: false,
                  index: reorderedIndex,
                  datasetIndex: 0,
                };
              });
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
        datalabels: {
          color: (context: any) => {
            const total = slices.reduce((sum, s) => sum + s.valueInDisplayCurrency, 0);
            const percentage = total > 0 ? Math.round((context.dataset.data[context.dataIndex] / total) * 100) : 0;
            // Small slices get dark text on light background
            return percentage < 8 ? (theme === 'dark' ? '#1f2937' : '#111827') : '#ffffff';
          },
          font: (context: any) => {
            const total = slices.reduce((sum, s) => sum + s.valueInDisplayCurrency, 0);
            const percentage = total > 0 ? Math.round((context.dataset.data[context.dataIndex] / total) * 100) : 0;
            return {
              size: percentage < 8 ? 13 : 16,
              weight: 'bold' as const,
            };
          },
          formatter: (value: number) => {
            const total = slices.reduce((sum, s) => sum + s.valueInDisplayCurrency, 0);
            const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
            return percentage > 0 ? `${percentage}%` : '';
          },
          // Position labels differently based on slice size
          anchor: (context: any) => {
            const total = slices.reduce((sum, s) => sum + s.valueInDisplayCurrency, 0);
            const percentage = total > 0 ? Math.round((context.dataset.data[context.dataIndex] / total) * 100) : 0;
            // Small slices: anchor at the end (outer edge)
            // Large slices: anchor at center for better positioning
            return percentage < 8 ? 'end' : 'center';
          },
          align: (context: any) => {
            const total = slices.reduce((sum, s) => sum + s.valueInDisplayCurrency, 0);
            const percentage = total > 0 ? Math.round((context.dataset.data[context.dataIndex] / total) * 100) : 0;
            // Small slices: align to end (outside the chart)
            // Large slices: align to center
            return percentage < 8 ? 'end' : 'center';
          },
          offset: (context: any) => {
            const total = slices.reduce((sum, s) => sum + s.valueInDisplayCurrency, 0);
            const percentage = total > 0 ? Math.round((context.dataset.data[context.dataIndex] / total) * 100) : 0;
            // Small slices get pushed further out
            return percentage < 8 ? 10 : 0;
          },
          backgroundColor: (context: any) => {
            const total = slices.reduce((sum, s) => sum + s.valueInDisplayCurrency, 0);
            const percentage = total > 0 ? Math.round((context.dataset.data[context.dataIndex] / total) * 100) : 0;
            // Small slices get a background box for readability
            return percentage < 8 ? (theme === 'dark' ? 'rgba(229, 231, 235, 0.95)' : 'rgba(255, 255, 255, 0.95)') : 'transparent';
          },
          borderColor: (context: any) => {
            const total = slices.reduce((sum, s) => sum + s.valueInDisplayCurrency, 0);
            const percentage = total > 0 ? Math.round((context.dataset.data[context.dataIndex] / total) * 100) : 0;
            return percentage < 8 ? (theme === 'dark' ? 'rgba(156, 163, 175, 0.5)' : 'rgba(209, 213, 219, 0.8)') : 'transparent';
          },
          borderWidth: (context: any) => {
            const total = slices.reduce((sum, s) => sum + s.valueInDisplayCurrency, 0);
            const percentage = total > 0 ? Math.round((context.dataset.data[context.dataIndex] / total) * 100) : 0;
            return percentage < 8 ? 1 : 0;
          },
          borderRadius: 4,
          padding: (context: any) => {
            const total = slices.reduce((sum, s) => sum + s.valueInDisplayCurrency, 0);
            const percentage = total > 0 ? Math.round((context.dataset.data[context.dataIndex] / total) * 100) : 0;
            return percentage < 8 ? 4 : 0;
          },
          clamp: false, // Allow labels to go outside the chart area
        },
      },
    }),
    [theme, slices, reorderedSlices, t]
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
