import React, { useState, useEffect } from 'react';
import weatherService from './services/weatherService';
import SearchBar from './components/SearchBar/SearchBar';
import WeatherCard from './components/WeatherCard/WeatherCard';
import ForecastCard from './components/ForecastCard/ForecastCard';
import TemperatureToggle from './components/TemperatureToggle/TemperatureToggle';
import FavoriteLocations from './components/FavoriteLocations/FavoriteLocations';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true);
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('weatherFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    // Get user's location on initial load
    loadUserLocation();
  }, []);

  const loadUserLocation = async () => {
    try {
      setLoading(true);
      setError(null);
      const coords = await weatherService.getCurrentLocation();
      const data = await weatherService.getWeatherData(`${coords.lat},${coords.lon}`);
      setWeatherData(data);
    } catch (err) {
      // Fallback to default location if geolocation fails
      console.warn('Geolocation failed, using default location');
      handleLocationSearch('New York');
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSearch = async (location) => {
    try {
      setLoading(true);
      setError(null);
      const data = await weatherService.getWeatherData(location);
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleUnit = () => {
    setIsCelsius(!isCelsius);
  };

  const handleAddFavorite = (location) => {
    const newFavorite = {
      id: Date.now(),
      name: location.name,
      region: location.region,
      country: location.country
    };

    const updatedFavorites = [...favorites, newFavorite];
    setFavorites(updatedFavorites);
    localStorage.setItem('weatherFavorites', JSON.stringify(updatedFavorites));
  };

  const handleRemoveFavorite = (id) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('weatherFavorites', JSON.stringify(updatedFavorites));
  };

  const handleSelectFavorite = (favorite) => {
    handleLocationSearch(`${favorite.name}, ${favorite.country}`);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Weather App</h1>
        <TemperatureToggle
          isCelsius={isCelsius}
          onToggle={handleToggleUnit}
        />
      </header>

      <main className="app-main">
        <SearchBar onSearch={handleLocationSearch} />

        {loading && <div className="loading">Loading weather data...</div>}

        {error && <div className="error">{error}</div>}

        {weatherData && !loading && (
          <>
            <div className="weather-container">
              <WeatherCard
                data={weatherData.current}
                location={weatherData.location}
                isCelsius={isCelsius}
                onAddFavorite={() => handleAddFavorite(weatherData.location)}
              />

              <ForecastCard
                data={weatherData.forecast.forecastday[1]}
                isCelsius={isCelsius}
              />
            </div>

            <FavoriteLocations
              favorites={favorites}
              onSelect={handleSelectFavorite}
              onRemove={handleRemoveFavorite}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
