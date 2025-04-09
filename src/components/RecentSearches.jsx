import React from 'react';
import PropTypes from 'prop-types';
import { Clock } from 'lucide-react';

export const RecentSearches = ({ searches, onSelect }) => {
  if (searches.length === 0) return null;

  return (
    <div className="mt-6">
      <div className="flex items-center gap-2 mb-3">
        <Clock size={18} className="text-gray-600 dark:text-gray-400" />
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Recent Searches</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {searches.map((city, index) => (
          <button
            key={index}
            onClick={() => onSelect(city)}
            className="px-4 py-2 text-sm bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-blue-500/10 dark:hover:bg-blue-400/10 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 backdrop-blur-sm"
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
};

RecentSearches.propTypes = {
  searches: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func.isRequired,
};