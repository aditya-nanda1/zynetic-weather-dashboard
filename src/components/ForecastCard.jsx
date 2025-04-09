import React from 'react';
import PropTypes from 'prop-types';

export const ForecastCard = ({ data }) => {
  const dailyForecasts = data.list.filter((item, index) => index % 8 === 0).slice(0, 5);

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
      {dailyForecasts.map((forecast, index) => (
        <div
          key={index}
          className="bg-gradient-to-br from-white/40 to-white/10 dark:from-gray-800/40 dark:to-gray-900/10 rounded-2xl p-6 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
        >
          <div className="text-center">
            <p className="text-xl font-medium bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              {new Date(forecast.dt_txt).toLocaleDateString('en-US', { weekday: 'short' })}
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
              alt={forecast.weather[0].main}
              className="mx-auto w-20 h-20 drop-shadow-lg"
            />
            <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              {Math.round(forecast.main.temp)}°C
            </p>
            <p className="text-base font-medium text-gray-700 dark:text-gray-300 capitalize mt-2">
              {forecast.weather[0].main}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

ForecastCard.propTypes = {
  data: PropTypes.shape({
    list: PropTypes.arrayOf(PropTypes.shape({
      dt_txt: PropTypes.string.isRequired,
      main: PropTypes.shape({
        temp: PropTypes.number.isRequired,
      }).isRequired,
      weather: PropTypes.arrayOf(PropTypes.shape({
        main: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
      })).isRequired,
    })).isRequired,
  }).isRequired,
};