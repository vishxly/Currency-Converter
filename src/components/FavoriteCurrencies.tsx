// src/components/FavoriteCurrencies.tsx
import React from 'react';
import { FaStar } from 'react-icons/fa';

interface FavoriteCurrenciesProps {
  favorites: string[];
  onSelect: (from: string, to: string) => void;
}

const FavoriteCurrencies: React.FC<FavoriteCurrenciesProps> = ({ favorites, onSelect }) => {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Favorite Currency Pairs</h3>
      <div className="flex flex-wrap gap-2">
        {favorites.map((from, index) => 
          favorites.slice(index + 1).map(to => (
            <button
              key={`${from}-${to}`}
              onClick={() => onSelect(from, to)}
              className="bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-100 px-2 py-1 rounded-md flex items-center"
            >
              <FaStar className="mr-1" /> {from}/{to}
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default FavoriteCurrencies;