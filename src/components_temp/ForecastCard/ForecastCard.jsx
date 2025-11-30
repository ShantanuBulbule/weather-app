import React from 'react';
import { formatTemperature, getDayName } from '../../utils/helpers';
import './ForecastCard.css';

function ForecastCard({ data, isCelsius }) {
    return (
        <div className="forecast-card">
            <h3>Tomorrow</h3>

            <div className="forecast-content">
                <img
                    src={data.day.condition.icon}
                    alt={data.day.condition.text}
                    className="forecast-icon"
                />
                <div className="forecast-condition">
                    {data.day.condition.text}
                </div>
                <div className="forecast-temp">
                    <div className="temp-high">
                        High: {formatTemperature(data.day.maxtemp_c, isCelsius)}
                    </div>
                    <div className="temp-low">
                        Low: {formatTemperature(data.day.mintemp_c, isCelsius)}
                    </div>
                </div>
            </div>

            <div className="forecast-details">
                <span>Rain: {data.day.daily_chance_of_rain}% </span>
                <span>UV: {data.day.uv}</span>
            </div>
        </div>
    );
}

export default ForecastCard;
