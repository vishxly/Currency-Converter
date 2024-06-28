// src/components/ThemeSwitcher.tsx
import React, { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeSwitcher: React.FC = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div
      onClick={toggleTheme}
      className="cursor-pointer p-2 rounded-full bg-gray-200 dark:bg-gray-800 mb-4"
    >
      {theme === 'light' ? (
        <FaMoon className="text-gray-800 text-xl" />
      ) : (
        <FaSun className="text-yellow-400 text-xl" />
      )}
    </div>
  );
};

export default ThemeSwitcher;