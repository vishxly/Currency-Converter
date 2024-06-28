// src/components/CurrencySelector.tsx
import React, { useState, useRef, useEffect } from "react";
import * as Flags from "country-flag-icons/react/3x2";
import { FlagComponent as ImportedFlagComponent } from "country-flag-icons/react/3x2";

interface CurrencySelectorProps {
  currency: string;
  currencies: string[];
  onCurrencyChange: (currency: string) => void;
}

type FlagComponent = ImportedFlagComponent;

const flagComponents: { [key: string]: FlagComponent } = {
  GBP: Flags.GB,
  USD: Flags.US,
  EUR: Flags.EU,
  JPY: Flags.JP,
  AUD: Flags.AU,
  CAD: Flags.CA,
  CNY: Flags.CN,
  HKD: Flags.HK,
  NZD: Flags.NZ,
  KRW: Flags.KR,
  CHF: Flags.CH,
  SEK: Flags.SE,
  NOK: Flags.NO,
  DKK: Flags.DK,
  CZK: Flags.CZ,
  AED: Flags.AE,
  INR: Flags.IN,
};

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  currency,
  currencies,
  onCurrencyChange,
}) => {
  const [search, setSearch] = useState<string>(currency);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredCurrencies = currencies.filter((curr) =>
    curr.toLowerCase().includes(search.toLowerCase())
  );

  const handleCurrencyChange = (curr: string) => {
    onCurrencyChange(curr);
    setSearch(curr);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSearch(currency);
  }, [currency]);

  const renderFlag = (currencyCode: string) => {
    const FlagComponent = flagComponents[currencyCode];
    if (FlagComponent) {
      return (
        <div className="w-6 h-4 mr-2 inline-flex items-center justify-center">
          <FlagComponent />
        </div>
      );
    }
    return (
      <div className="w-6 h-4 mr-2 inline-block bg-gray-300 dark:bg-gray-600" />
    );
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <div
        className="flex items-center border p-2 w-full mb-2 dark:bg-gray-700 dark:border-gray-600 box-border"
        onClick={() => setIsOpen(true)}
      >
        {renderFlag(currency)}
        <input
          type="text"
          placeholder="Search currency"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-grow bg-transparent outline-none"
          style={{ boxSizing: "border-box" }}
        />
      </div>
      {isOpen && (
        <ul className="absolute z-10 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 max-h-60 overflow-y-auto">
          {filteredCurrencies.length > 0 ? (
            filteredCurrencies.map((curr) => (
              <li
                key={curr}
                className={`p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 ${
                  curr === currency ? "bg-gray-200 dark:bg-gray-700" : ""
                } flex items-center`}
                onClick={() => handleCurrencyChange(curr)}
              >
                {renderFlag(curr)}
                {curr}
              </li>
            ))
          ) : (
            <li className="p-2">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default CurrencySelector;
