// src/App.tsx
import "./App.css";
import React from "react";
import CurrencyConverter from "./components/CurrencyConverter";
import CurrencyDisplay from "./components/CurrencyDisplay";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center py-8">
        <div className="flex flex-col items-center w-full max-w-3xl px-4">
          <CurrencyDisplay />
          <CurrencyConverter />
        </div>
      </div>
    </div>
  );
};

export default App;