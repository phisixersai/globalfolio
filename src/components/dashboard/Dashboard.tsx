import { NetWorthBanner } from './NetWorthBanner';
import { AllocationPieChart } from './AllocationPieChart';
import { AssetBreakdownTable } from './AssetBreakdownTable';

export function Dashboard() {
  return (
    <div className="space-y-4">
      <NetWorthBanner />
      <AllocationPieChart />
      <AssetBreakdownTable />
    </div>
  );
}
