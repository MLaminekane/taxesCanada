import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator } from 'lucide-react';

const TaxCalculator = () => {
  const [amount, setAmount] = useState<string>('');
  
  const numAmount = parseFloat(amount) || 0;
  const gst = numAmount * 0.05; // TPS 5%
  const qst = numAmount * 0.09975; // TVQ 9.975%
  const totalTaxes = gst + qst;
  const totalWithTaxes = numAmount + totalTaxes;

  return (
    <Card className="bg-gradient-card border-border shadow-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Calculator className="h-5 w-5 text-primary" />
          Calculateur de taxes QC
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="amount" className="text-muted-foreground">
            Montant avant taxes
          </Label>
          <Input
            id="amount"
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="text-lg font-medium bg-secondary/50 border-border text-foreground"
          />
        </div>

        {numAmount > 0 && (
          <div className="space-y-3 pt-2 animate-fade-in">
            <div className="flex justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">Montant de base</span>
              <span className="font-medium text-foreground">{numAmount.toFixed(2)} $</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">TPS (5%)</span>
              <span className="font-medium text-info">{gst.toFixed(2)} $</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">TVQ (9.975%)</span>
              <span className="font-medium text-info">{qst.toFixed(2)} $</span>
            </div>
            
            <div className="flex justify-between py-2 border-t border-border/50">
              <span className="text-muted-foreground">Total des taxes</span>
              <span className="font-medium text-warning">{totalTaxes.toFixed(2)} $</span>
            </div>
            
            <div className="flex justify-between py-3 bg-primary/10 rounded-lg px-3 border border-primary/20">
              <span className="font-semibold text-foreground">Total à payer</span>
              <span className="font-bold text-xl text-primary">{totalWithTaxes.toFixed(2)} $</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TaxCalculator;