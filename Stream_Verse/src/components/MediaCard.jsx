// src/components/MediaCard.jsx
import React from 'react';

// Accept the full item, the watchlist array, and the toggle function
const MediaCard = ({ item, userWatchlist, onToggleWatchlist }) => {
  // 1. Determine if the item's ID is present in the user's watchlist array
  const isWatching = userWatchlist.includes(item.id);

  // 2. The click handler calls the global function with this item's ID
  const handleToggle = () => {
    onToggleWatchlist(item.id);
  };

  return (
    <div className="media-card">
      <img src={item.imageUrl} alt={`${item.title} poster`} className="card-image" />
      
      {item.isNew && <span className="new-tag">NEW!</span>} 

      <div className="card-info">
        <h3>{item.title}</h3>
        <p className="details">
          {item.year} • {item.genre} • {item.duration}
        </p>
        
        <button 
          onClick={handleToggle}
          className={`watchlist-btn ${isWatching ? 'added' : ''}`}
        >
          {isWatching ? '✅ On Watchlist' : '➕ Add to Watchlist'}
        </button>
      </div>
    </div>
  );
};

export default MediaCard;