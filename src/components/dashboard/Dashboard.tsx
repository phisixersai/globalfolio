import { NetWorthBanner } from './NetWorthBanner';
import { AllocationPieChart } from './AllocationPieChart';
import { AssetBreakdownTable } from './AssetBreakdownTable';
import { AdBanner } from '../ads/AdBanner';

export function Dashboard() {
  return (
    <div className="space-y-4">
      <NetWorthBanner />
      <AllocationPieChart />
      {/* Google AdSense - Below Chart (disabled by default) */}
      <AdBanner slot="belowChart" className="my-4" />
      <AssetBreakdownTable />
      {/* Google AdSense - Footer (disabled by default) */}
      <AdBanner slot="footer" className="my-4" />
    </div>
  );
}
