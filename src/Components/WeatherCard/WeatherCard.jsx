import React from 'react';
import { formatTemperature } from '../../utils/helpers';
import './WeatherCard.css';

function WeatherCard({ data, location, isCelsius, onAddFavorite }) {
    return (
        <div className="weather-card">
            <div className="weather-card-header">
                <h2>{location.name}, {location.country}</h2>
                <button onClick={onAddFavorite} className="favorite-btn" title="Add to favorites">
                    ★
                </button>
            </div>

            <div className="weather-current">
                <img
                    src={data.condition.icon}
                    alt={data.condition.text}
                    className="weather-icon"
                />
                <div className="weather-condition">
                    {data.condition.text}
                </div>
                <div className="temperature">
                    <span className="detail-label">Current Temperature: </span>{formatTemperature(data.temp_c, isCelsius)}
                </div>
            </div>



            <div className="weather-details">
                <div className="detail-item">
                    <span className="detail-label">Feels Like: </span>
                    <span className="detail-value">
                        {formatTemperature(data.feelslike_c, isCelsius)}
                    </span>
                </div>

                <div className="detail-item">
                    <span className="detail-label">Humidity: </span>
                    <span className="detail-value">{data.humidity}%</span>
                </div>

                <div className="detail-item">
                    <span className="detail-label">Wind: </span>
                    <span className="detail-value">{data.wind_kph} km/h</span>
                </div>
            </div>
        </div>
    );
}

export default WeatherCard;
