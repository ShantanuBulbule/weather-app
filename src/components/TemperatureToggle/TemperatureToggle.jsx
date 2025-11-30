import React from 'react';
import './TemperatureToggle.css';

function TemperatureToggle({ isCelsius, onToggle }) {
    return (
        <div className="temperature-toggle">
            <button
                className={`toggle-btn ${isCelsius ? 'active' : ''}`}
                onClick={() => !isCelsius && onToggle()}
            >
                °C
            </button>
            <button
                className={`toggle-btn ${!isCelsius ? 'active' : ''}`}
                onClick={() => isCelsius && onToggle()}
            >
                °F
            </button>
        </div>
    );
}

export default TemperatureToggle;
