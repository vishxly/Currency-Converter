// src/components/ConversionHistory.tsx
import React from 'react';

interface ConversionHistoryProps {
  history: Array<{from: string, to: string, amount: number, result: number}>;
}

const ConversionHistory: React.FC<ConversionHistoryProps> = ({ history }) => {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Conversion History</h3>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {history.map((item, index) => (
          <li key={index} className="py-2">
            {item.amount} {item.from} = {item.result.toFixed(2)} {item.to}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConversionHistory;