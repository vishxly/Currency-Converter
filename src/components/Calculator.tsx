// src/components/Calculator.tsx
import React, { useState } from 'react';

interface CalculatorProps {
  onResult: (result: number) => void;
}

const Calculator: React.FC<CalculatorProps> = ({ onResult }) => {
  const [display, setDisplay] = useState('0');
  const [currentOperation, setCurrentOperation] = useState<string | null>(null);
  const [previousValue, setPreviousValue] = useState<number | null>(null);

  const handleNumberClick = (num: string) => {
    setDisplay(prev => (prev === '0' ? num : prev + num));
  };

  const handleOperationClick = (operation: string) => {
    if (previousValue === null) {
      setPreviousValue(parseFloat(display));
      setDisplay('0');
      setCurrentOperation(operation);
    } else {
      handleEqualsClick();
      setCurrentOperation(operation);
    }
  };

  const handleEqualsClick = () => {
    if (currentOperation && previousValue !== null) {
      const current = parseFloat(display);
      let result: number;
      switch (currentOperation) {
        case '+':
          result = previousValue + current;
          break;
        case '-':
          result = previousValue - current;
          break;
        case '*':
          result = previousValue * current;
          break;
        case '/':
          result = previousValue / current;
          break;
        default:
          return;
      }
      setDisplay(result.toString());
      onResult(result);
      setPreviousValue(null);
      setCurrentOperation(null);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setCurrentOperation(null);
    setPreviousValue(null);
  };

  return (
    <div className="grid grid-cols-4 gap-1 max-w-xs mx-auto mb-4">
      <div className="col-span-4 bg-gray-200 dark:bg-gray-700 p-2 rounded mb-1">{display}</div>
      {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map((num) => (
        <button
          key={num}
          onClick={() => handleNumberClick(num.toString())}
          className="bg-gray-300 dark:bg-gray-600 p-2 rounded"
        >
          {num}
        </button>
      ))}
      <button onClick={() => handleOperationClick('+')} className="bg-blue-500 text-white p-2 rounded">+</button>
      <button onClick={() => handleOperationClick('-')} className="bg-blue-500 text-white p-2 rounded">-</button>
      <button onClick={() => handleOperationClick('*')} className="bg-blue-500 text-white p-2 rounded">*</button>
      <button onClick={() => handleOperationClick('/')} className="bg-blue-500 text-white p-2 rounded">/</button>
      <button onClick={handleEqualsClick} className="bg-green-500 text-white p-2 rounded">=</button>
      <button onClick={handleClear} className="bg-red-500 text-white p-2 rounded">C</button>
    </div>
  );
};

export default Calculator;