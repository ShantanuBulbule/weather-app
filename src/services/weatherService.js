import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = process.env.REACT_APP_WEATHER_API_BASE_URL;

class WeatherService {
    /**
     * Fetch current weather and forecast for a location
     * @param {string} location - City name or coordinates "lat,lon"
     * @returns {Promise} Weather data object
     */
    async getWeatherData(location) {
        try {
            const response = await axios.get(`${BASE_URL}/forecast.json`, {
                params: {
                    key: API_KEY,
                    q: location,
                    days: 2, // Today + tomorrow
                    aqi: 'no'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching weather data:', error);
            throw new Error(
                error.response?.data?.error?.message || 'Failed to fetch weather data'
            );
        }
    }

    /**
     * Search for locations (autocomplete)
     * @param {string} query - Search query
     * @returns {Promise} Array of matching locations
     */
    async searchLocations(query) {
        try {
            const response = await axios.get(`${BASE_URL}/search.json`, {
                params: {
                    key: API_KEY,
                    q: query
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error searching locations:', error);
            throw error;
        }
    }

    /**
     * Get user's current location using browser geolocation
     * @returns {Promise} Coordinates object {lat, lon}
     */
    async getCurrentLocation() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation not supported'));
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude
                    });
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }
}

export default new WeatherService();
