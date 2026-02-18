import { ThemeProvider } from './contexts/ThemeContext';
import { ExchangeRateProvider } from './contexts/ExchangeRateContext';
import { PortfolioProvider } from './contexts/PortfolioContext';
import { MainLayout } from './components/layout/MainLayout';
import './i18n';

function App() {
  return (
    <ThemeProvider>
      <ExchangeRateProvider>
        <PortfolioProvider>
          <MainLayout />
        </PortfolioProvider>
      </ExchangeRateProvider>
    </ThemeProvider>
  );
}

export default App;
