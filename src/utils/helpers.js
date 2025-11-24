/**
 * Convert Celsius to Fahrenheit
 */
export const celsiusToFahrenheit = (celsius) => {
    return (celsius * 9 / 5) + 32;
};

/**
 * Format temperature based on unit preference
 */
export const formatTemperature = (tempC, isCelsius) => {
    const temp = isCelsius ? tempC : celsiusToFahrenheit(tempC);
    return `${Math.round(temp)}°${isCelsius ? 'C' : 'F'}`;
};

/**
 * Get day name from date string
 */
export const getDayName = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
};

/**
 * Format date for display
 */
export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
    });
};
