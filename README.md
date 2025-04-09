# Weather Dashboard 🌦️

A responsive weather application built with React.js that displays current weather conditions and forecasts for any city worldwide using the OpenWeatherMap API.

## Features ✨

- **Current Weather Data**:
  - City name, temperature (°C), weather condition
  - Humidity, wind speed, "feels like" temperature
  - Weather condition icons
- **5-Day Forecast** (Bonus)
- **Recent Search History** (Last 5 cities)
- **Dark/Light Mode Toggle** (Bonus)
- **Responsive Design** - Works on mobile and desktop
- **Loading States** - Visual feedback during API requests
- **Error Handling** - User-friendly error messages

## Technologies Used 🛠️

- **Framework**: React.js (Vite)
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Icons**: Lucide React
- **API**: OpenWeatherMap
- **Deployment**: Vercel

## API Integration 🔌

This application uses the OpenWeatherMap API:
- **Current Weather**: `https://api.openweathermap.org/data/2.5/weather`
- **5-Day Forecast**: `https://api.openweathermap.org/data/2.5/forecast`

### Rate Limits
- Free tier: 60 calls/minute
- 1,000,000 calls/month

## Setup Instructions 🚀

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- OpenWeatherMap API key

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/weather-dashboard.git
2. `npm install`   - to install packages
3. `npm run dev`   - to run the webapp
