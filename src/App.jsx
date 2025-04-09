import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { WeatherCard } from './components/WeatherCard';
import { ForecastCard } from './components/ForecastCard';
import { RecentSearches } from './components/RecentSearches';
import { ThemeToggle } from './components/ThemeToggle';
import { useTheme } from './hooks/useTheme';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem('recentSearches');
    return saved ? JSON.parse(saved) : [];
  });
  const theme = useTheme();

  useEffect(() => {
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  const addToRecentSearches = (cityName) => {
    setRecentSearches(prev => {
      const filtered = prev.filter(c => c !== cityName);
      return [cityName, ...filtered].slice(0, 5);
    });
  };

  const fetchWeather = async (cityName) => {
    setIsLoading(true);
    setError('');
    try {
      const [weatherRes, forecastRes] = await Promise.all([
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`),
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`)
      ]);

      if (!weatherRes.ok || !forecastRes.ok) {
        throw new Error('City not found');
      }

      const [weatherData, forecastData] = await Promise.all([
        weatherRes.json(),
        forecastRes.json()
      ]);

      setWeather(weatherData);
      setForecast(forecastData);
      setCity(cityName);
      addToRecentSearches(cityName);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (cityName) => {
    fetchWeather(cityName);
  };

  const handleRefresh = () => {
    if (city) {
      fetchWeather(city);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sky-100 via-blue-100 to-purple-100 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 transition-all duration-500">
      {/* Mobile-first container with responsive padding */}
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {/* Responsive header section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-12 gap-4">
          <h1 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent drop-shadow-sm text-center sm:text-left">
            Weather Dashboard
          </h1>
          <ThemeToggle theme={theme} />
        </div>

        <div className="flex flex-col items-center space-y-6 sm:space-y-8">
          {/* Search bar container with responsive width */}
          <div className="w-full mx-0 sm:mx-4 backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 p-4 sm:p-6 rounded-2xl shadow-lg">
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
            <RecentSearches searches={recentSearches} onSelect={handleSearch} />
          </div>

          {/* Error message with responsive width */}
          {error && (
            <div className="w-full sm:max-w-md p-3 sm:p-4 bg-red-100/80 dark:bg-red-900/80 text-red-700 dark:text-red-200 rounded-xl backdrop-blur-sm border border-red-200 dark:border-red-800 shadow-lg text-sm sm:text-base">
              {error}
            </div>
          )}

          {isLoading ? (
            <div className="flex items-center justify-center p-6 sm:p-8">
              <RefreshCw className="animate-spin text-blue-500 dark:text-blue-400" size={32} />
            </div>
          ) : (
            weather && (
              <div className="w-full space-y-6 sm:space-y-10">
                {/* Refresh button with responsive positioning */}
                <div className="flex justify-center sm:justify-end">
                  <button
                    onClick={handleRefresh}
                    className="p-2 sm:p-3 bg-white/30 dark:bg-gray-800/30 rounded-full text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  >
                    <RefreshCw size={20} className="sm:size-6" />
                  </button>
                </div>
                
                <WeatherCard data={weather} />
                
                {forecast && (
                  <div className="mt-6 sm:mt-8">
                    <h2 className="text-2xl sm:text-3xl font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-4 sm:mb-6 text-center sm:text-left">
                      5-Day Forecast
                    </h2>
                    <ForecastCard data={forecast} />
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default App;