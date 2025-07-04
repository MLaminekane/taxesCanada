import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const currencies = [
  { code: 'XOF', name: 'CFA senegal', symbol: 'CFA' },
  { code: 'CAD', name: 'Dollar canadien', symbol: '$' },
  { code: 'USD', name: 'Dollar américain', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'Livre sterling', symbol: '£' },
  { code: 'JPY', name: 'Yen japonais', symbol: '¥' },
  { code: 'CHF', name: 'Franc suisse', symbol: 'CHF' },
  { code: 'AUD', name: 'Dollar australien', symbol: '$' },
];

const CurrencyConverter = () => {
  const [amount, setAmount] = useState<string>('');
  const [fromCurrency, setFromCurrency] = useState<string>('CAD');
  const [toCurrency, setToCurrency] = useState<string>('XOF');
  const [exchangeRate, setExchangeRate] = useState<number>(0.74); // Taux approximatif CAD/USD
  const [convertedAmount, setConvertedAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const numAmount = parseFloat(amount) || 0;

  useEffect(() => {
    if (numAmount > 0) {
      setConvertedAmount(numAmount * exchangeRate);
    } else {
      setConvertedAmount(0);
    }
  }, [numAmount, exchangeRate]);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setExchangeRate(1 / exchangeRate);
  };

  const fetchExchangeRate = useCallback(async () => {
    if (!fromCurrency || !toCurrency) return;

    setLoading(true);
    try {
      const apiKey = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;
      if (!apiKey) {
        throw new Error("La clé API pour les taux de change n'est pas configurée.");
      }
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}`);
      const data = await response.json();
      if (data.result === 'success') {
        setExchangeRate(data.conversion_rate);
      } else {
        console.error('Erreur lors de la récupération du taux de change:', data['error-type']);
        // Fallback sur un taux de 1 en cas d'erreur
        setExchangeRate(1);
      }
    } catch (error) {
      console.error('Erreur de connexion à l\'API de taux de change:', error);
      setExchangeRate(1);
    } finally {
      setLoading(false);
    }
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    if (fromCurrency !== toCurrency) {
      fetchExchangeRate();
    }
  }, [fromCurrency, toCurrency, fetchExchangeRate]);

  const fromCurrencyInfo = currencies.find(c => c.code === fromCurrency);
  const toCurrencyInfo = currencies.find(c => c.code === toCurrency);

  return (
    <Card className="bg-gradient-card border-border shadow-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <ArrowUpDown className="h-5 w-5 text-primary" />
          Convertisseur de devises
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-muted-foreground">De</Label>
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger className="bg-secondary/50 border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-muted-foreground">Vers</Label>
            <Select value={toCurrency} onValueChange={setToCurrency}>
              <SelectTrigger className="bg-secondary/50 border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={swapCurrencies}
            className="border-primary/20 hover:bg-primary/10"
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-2">
          <Label htmlFor="currency-amount" className="text-muted-foreground">
            Montant en {fromCurrencyInfo?.name}
          </Label>
          <Input
            id="currency-amount"
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
              <span className="text-muted-foreground">Taux de change</span>
              <span className="font-medium text-info">
                {loading ? '...' : `1 ${fromCurrency} = ${exchangeRate.toFixed(4)} ${toCurrency}`}
              </span>
            </div>
            
            <div className="flex justify-between py-3 bg-primary/10 rounded-lg px-3 border border-primary/20">
              <span className="font-semibold text-foreground">Montant converti</span>
              <span className="font-bold text-xl text-primary">
                {toCurrencyInfo?.symbol}{convertedAmount.toFixed(2)}
              </span>
            </div>
          </div>
        )}

 
      </CardContent>
    </Card>
  );
};

export default CurrencyConverter;