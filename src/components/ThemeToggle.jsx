import React from 'react';
import PropTypes from 'prop-types';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle = ({ theme }) => {
  return (
    <button
      onClick={theme.toggle}
      className="p-3 rounded-xl bg-white/30 dark:bg-gray-800/30 hover:bg-blue-500/10 dark:hover:bg-blue-400/10 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 backdrop-blur-sm"
      aria-label="Toggle theme"
    >
      {theme.isDark ? <Sun size={24} /> : <Moon size={24} />}
    </button>
  );
};

ThemeToggle.propTypes = {
  theme: PropTypes.shape({
    isDark: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
  }).isRequired,
};