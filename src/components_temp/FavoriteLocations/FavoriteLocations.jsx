import React from 'react';
import './FavoriteLocations.css';

function FavoriteLocations({ favorites, onSelect, onRemove }) {
    if (favorites.length === 0) {
        return null;
    }

    return (
        <div className="favorites-section">
            <h3>Favorite Locations</h3>
            <div className="favorites-list">
                {favorites.map((favorite) => (
                    <div key={favorite.id} className="favorite-item">
                        <button
                            className="favorite-location"
                            onClick={() => onSelect(favorite)}
                        >
                            {favorite.name}, {favorite.country}
                        </button>
                        <button
                            className="remove-btn"
                            onClick={() => onRemove(favorite.id)}
                            title="Remove from favorites"
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FavoriteLocations;
