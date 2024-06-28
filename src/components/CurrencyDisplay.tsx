// src/components/CurrencyDisplay.tsx
import React, { useEffect, useState } from 'react';
import { fetchExchangeRates } from '../services/currencyService';

interface CurrencyRate {
  currency: string;
  rate: number;
}

const CurrencyDisplay: React.FC = () => {
  const [rates, setRates] = useState<CurrencyRate[]>([]);
  const baseCurrency = 'USD';
  const displayCurrencies = ['INR','EUR', 'GBP', 'JPY', 'CAD', 'AUD',];

  useEffect(() => {
    const fetchRates = async () => {
      const fetchedRates = await fetchExchangeRates();
      const formattedRates = displayCurrencies.map(currency => ({
        currency,
        rate: fetchedRates[currency]
      }));
      setRates(formattedRates);
    };

    fetchRates();
    const interval = setInterval(fetchRates, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4 text-center dark:text-white">Current Exchange Rates</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {rates.map(({ currency, rate }) => (
          <div key={currency} className="text-center">
            <p className="font-semibold dark:text-white">{currency}</p>
            <p className="text-gray-600 dark:text-gray-300">
              1 {baseCurrency} = {rate.toFixed(4)} {currency}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrencyDisplay;