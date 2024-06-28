// src/components/CurrencyConverter.tsx
import React, { useEffect, useState } from "react";
import CurrencySelector from "./CurrencySelector";
import Calculator from "./Calculator";
// import HistoricalRates from './HistoricalRates';
import ConversionHistory from "./ConversionHistory";
// import FavoriteCurrencies from './FavoriteCurrencies';
import { fetchExchangeRates } from "../services/currencyService";
import { FaExchangeAlt, FaCalculator } from "react-icons/fa";
import "../../public/styles.css";

const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");
  const [result, setResult] = useState<number | null>(null);
  const [rates, setRates] = useState<{ [key: string]: number }>({});
  const [showCalculator, setShowCalculator] = useState<boolean>(false);
  // const [showHistoricalRates, setShowHistoricalRates] = useState<boolean>(false);
  const [conversionHistory, setConversionHistory] = useState<
    Array<{ from: string; to: string; amount: number; result: number }>
  >([]);
  // const [favoriteCurrencies, setFavoriteCurrencies] = useState<string[]>([]);

  useEffect(() => {
    fetchExchangeRates().then(setRates);
  }, []);

  const convert = () => {
    if (rates[fromCurrency] && rates[toCurrency]) {
      const conversionRate = rates[toCurrency] / rates[fromCurrency];
      const convertedAmount = amount * conversionRate;
      setResult(convertedAmount);

      // Add to conversion history
      setConversionHistory((prev) => [
        { from: fromCurrency, to: toCurrency, amount, result: convertedAmount },
        ...prev.slice(0, 9), // Keep only the last 10 conversions
      ]);
    }
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleCalculatorResult = (result: number) => {
    setAmount(result);
    setShowCalculator(false);
  };

  // const toggleFavoriteCurrency = (currency: string) => {
  //   setFavoriteCurrencies(prev =>
  //     prev.includes(currency)
  //       ? prev.filter(c => c !== currency)
  //       : [...prev, currency]
  //   );
  // };

  return (
    <div className="currency-converter-container lg:max-w-xl mx-auto p-4 bg-white dark:bg-gray-800 dark:text-white shadow-md rounded-md">
      <div className="mb-4">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="border p-2 w-full dark:bg-gray-700 dark:border-gray-600"
        />
        <div className="flex justify-between mt-2">
          <button
            onClick={() => setShowCalculator(!showCalculator)}
            className="bg-gray-300 dark:bg-gray-700 p-2 rounded-md hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
          >
            <FaCalculator /> {showCalculator ? "Hide" : "Show"} Calculator
          </button>
          {/* <button
            onClick={() => setShowHistoricalRates(!showHistoricalRates)}
            className="bg-gray-300 dark:bg-gray-700 p-2 rounded-md hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
          >
            <FaChartLine /> {showHistoricalRates ? 'Hide' : 'Show'} Historical Rates
          </button> */}
        </div>
      </div>
      {showCalculator && <Calculator onResult={handleCalculatorResult} />}
      {/* {showHistoricalRates && <HistoricalRates fromCurrency={fromCurrency} toCurrency={toCurrency} />} */}
      <div className="flex items-center mb-4">
        <CurrencySelector
          currency={fromCurrency}
          currencies={Object.keys(rates)}
          onCurrencyChange={setFromCurrency}
          // favoriteCurrencies={favoriteCurrencies}
          // onToggleFavorite={toggleFavoriteCurrency}
        />
        <button
          onClick={swapCurrencies}
          className="mx-2 p-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          <FaExchangeAlt />
        </button>
        <CurrencySelector
          currency={toCurrency}
          currencies={Object.keys(rates)}
          onCurrencyChange={setToCurrency}
          // favoriteCurrencies={favoriteCurrencies}
          // onToggleFavorite={toggleFavoriteCurrency}
        />
      </div>
      <button
        onClick={convert}
        className="bg-blue-500 text-white p-2 w-full rounded-md hover:bg-blue-600 transition-colors"
      >
        Convert
      </button>
      {result !== null && (
        <div className="mt-4 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
          {amount} {fromCurrency} = {result.toFixed(2)} {toCurrency}
        </div>
      )}
      {/* <FavoriteCurrencies 
        favorites={favoriteCurrencies} 
        onSelect={(from, to) => {
          setFromCurrency(from);
          setToCurrency(to);
        }}
      /> */}
      <ConversionHistory history={conversionHistory} />
    </div>
  );
};

export default CurrencyConverter;
