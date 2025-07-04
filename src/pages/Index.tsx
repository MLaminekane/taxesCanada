import Header from '@/components/Header';
import TaxCalculator from '@/components/TaxCalculator';
import CurrencyConverter from '@/components/CurrencyConverter';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6 space-y-6 max-w-md">
        <div className="text-center space-y-2 mb-8">
          <h2 className="text-2xl font-bold text-foreground">
            Calculateur financier
          </h2>
          <p className="text-muted-foreground">
            Taxes québécoises et conversion de devises
          </p>
        </div>
        
        <TaxCalculator />
        <CurrencyConverter />
        
        <div className="text-center pt-6">
          <p className="text-xs text-muted-foreground">
            TPS: 5% • TVQ: 9.975% • Total: 14.975%
          </p>
        </div>
      </main>
    </div>
  );
};

export default Index;
