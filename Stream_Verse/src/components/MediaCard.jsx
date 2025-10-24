import React, { useState } from 'react';

const MediaCard = ({ title, year, genre, duration, imageUrl, isNew }) => {
  const [isWatching, setIsWatching] = useState(false);

  const toggleWatchlist = () => {
    setIsWatching(!isWatching);
  };

  return (
    <div className="media-card">
      <img src={imageUrl} alt={`${title} poster`} className="card-image" />
      
      {isNew && <span className="new-tag">NEW!</span>} 

      <div className="card-info">
        <h3>{title}</h3>
        <p className="details">
          {year} • {genre} • {duration}
        </p>
        
        <button 
          onClick={toggleWatchlist}
          className={`watchlist-btn ${isWatching ? 'added' : ''}`}
        >
          {isWatching ? '✅ On Watchlist' : '➕ Add to Watchlist'}
        </button>
      </div>
    </div>
  );
};

export default MediaCard;