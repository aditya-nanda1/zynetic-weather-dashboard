import React from 'react';
import PropTypes from 'prop-types';
import { Droplets, Wind, Thermometer } from 'lucide-react';

export const WeatherCard = ({ data }) => {
  return (
    <div className="bg-gradient-to-br from-white/40 to-white/10 dark:from-gray-800/40 dark:to-gray-900/10 rounded-3xl shadow-2xl p-8 backdrop-blur-md transform hover:scale-[1.02] transition-all duration-300">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">{data.name}</h2>
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
          alt={data.weather[0].description}
          className="w-28 h-28 drop-shadow-xl"
        />
      </div>
      
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              {Math.round(data.main.temp)}°C
            </span>
            <div className="mt-3">
              <span className="text-2xl text-gray-700 dark:text-gray-300 capitalize">
                {data.weather[0].description}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg text-gray-600 dark:text-gray-400">
              Feels like
            </div>
            <div className="text-3xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              {Math.round(data.main.feels_like)}°C
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
          <div className="flex flex-col items-center p-4 bg-white/30 dark:bg-gray-800/30 rounded-2xl backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <Thermometer size={28} className="text-orange-500 dark:text-orange-400 mb-3" />
            <span className="text-sm text-gray-600 dark:text-gray-400 mb-1">Temperature</span>
            <span className="text-xl font-semibold bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400 bg-clip-text text-transparent">{Math.round(data.main.temp)}°C</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-white/30 dark:bg-gray-800/30 rounded-2xl backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <Droplets size={28} className="text-blue-500 dark:text-blue-400 mb-3" />
            <span className="text-sm text-gray-600 dark:text-gray-400 mb-1">Humidity</span>
            <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">{data.main.humidity}%</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-white/30 dark:bg-gray-800/30 rounded-2xl backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <Wind size={28} className="text-teal-500 dark:text-teal-400 mb-3" />
            <span className="text-sm text-gray-600 dark:text-gray-400 mb-1">Wind Speed</span>
            <span className="text-xl font-semibold bg-gradient-to-r from-teal-600 to-green-600 dark:from-teal-400 dark:to-green-400 bg-clip-text text-transparent">{Math.round(data.wind.speed * 3.6)} km/h</span>
          </div>
        </div>
      </div>
    </div>
  );
};

WeatherCard.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    main: PropTypes.shape({
      temp: PropTypes.number.isRequired,
      humidity: PropTypes.number.isRequired,
      feels_like: PropTypes.number.isRequired,
    }).isRequired,
    weather: PropTypes.arrayOf(PropTypes.shape({
      description: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
    })).isRequired,
    wind: PropTypes.shape({
      speed: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};