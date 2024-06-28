// src/components/Navbar.tsx
import React from 'react';
import ThemeSwitcher from './ThemeSwitcher';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-gray-800 dark:text-white text-lg font-semibold">
              Currency Converter
            </span>
          </div>
          <div className="flex items-center">
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;