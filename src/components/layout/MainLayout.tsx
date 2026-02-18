import { Header } from './Header';
import { Footer } from './Footer';
import { AssetForm } from '../assets/AssetForm';
import { Dashboard } from '../dashboard/Dashboard';
import { ExchangeRatePanel } from '../exchange/ExchangeRatePanel';

export function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left column — asset input (desktop) */}
          <div className="md:col-span-4 space-y-4">
            <AssetForm />
            <ExchangeRatePanel />
          </div>
          {/* Right column — dashboard (desktop) */}
          <div className="md:col-span-8 order-first md:order-last">
            <Dashboard />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
