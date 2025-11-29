import logo from './logo.svg';
import './App.css';
import weatherService from './services/weatherService.js';
import SearchBar from './Components/SearchBar/SearchBar.jsx';
import WeatherCard from './Components/WeatherCard/WeatherCard.jsx';
import ForecastCard from './Components/ForecastCard/ForecastCard.jsx';
import TemperatureToggle from './Components/TemperatureToggle/TemperatureToggle.jsx';
import FavoriteLocations from './Components/FavoriteLocations/FavoriteLocations.jsx';
import { useState, useEffect } from 'react';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true);
  const [favoriteLocations, setFavoriteLocations] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    try {
      const data = await weatherService.getWeatherData(query);
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };
  const loadUserLocation = async () => {
    try {
      setLoading(true);
      setError(null);
      const coords = await weatherService.getCurrentLocation();
      const data = await weatherService.getWeatherData(`${coords.lat},${coords.lon}`);
      setWeatherData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedFavorites = localStorage.getItem('weatherFavorites');
    if (savedFavorites) {
      setFavoriteLocations(JSON.parse(savedFavorites));
    }
    loadUserLocation();
  }, []);
  const handleTemperatureToggle = () => {
    setIsCelsius(!isCelsius);
  };

  const handleAddFavorite = (location) => {
    const newFavorite = {
      id: Date.now(),
      name: location.name,
      region: location.region,
      country: location.country,
      lat: location.lat,
      lon: location.lon,
    };
    const updatedFavorites = [...favoriteLocations, newFavorite];
    setFavoriteLocations(updatedFavorites);
    localStorage.setItem('weatherFavorites', JSON.stringify(updatedFavorites));
  };

  const handleRemoveFavorite = (location) => {
    const updatedFavorites = favoriteLocations.filter((loc) => loc.id !== location.id);
    setFavoriteLocations(updatedFavorites);
    localStorage.setItem('weatherFavorites', JSON.stringify(updatedFavorites));
  };

  const handleSelectFavorite = (favorite) => {
    handleSearch(`${favorite.name},${favorite.region},${favorite.country}`);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
        <TemperatureToggle
          isCelsius={isCelsius}
          onToggle={handleTemperatureToggle}
        />
      </header>
      <main className="app-main">
        <SearchBar onSearch={handleSearch} />
        {loading ? (
          <p>Loading weather data...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : weatherData ? (
          <>
            <WeatherCard
              location={weatherData.location}
              current={weatherData.current}
              isCelsius={isCelsius}
              onAddFavorite={handleAddFavorite}
              onRemoveFavorite={handleRemoveFavorite}
            />
            <ForecastCard
              forecast={weatherData.forecast.forecastday}
              isCelsius={isCelsius}
            />
            <FavoriteLocations
              favoriteLocations={favoriteLocations}
              onSelectFavorite={handleSelectFavorite}
              onRemoveFavorite={handleRemoveFavorite}
            />
          </>
        ) : null}
      </main>
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>

    </div >
  );
}

export default App;
