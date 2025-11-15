// src/components/MediaCard.jsx
import React from 'react';

// Accept the full item, the watchlist array, the toggle function, 
// and NEW progress props. Add default empty array for safety.
const MediaCard = ({ 
  item, 
  userWatchlist = [], // 💡 FIX: Default to []
  onToggleWatchlist, 
  userProgress = [], // 💡 FIX: Default to []
  onToggleProgress 
}) => {
  // 1. Determine if the item's ID is present in the user's watchlist array
  const isWatching = userWatchlist.includes(item.id);
  
  // 2. Determine if the item is marked as watched (completed)
  const isWatched = userProgress.includes(item.id);

  // 3. Handler for toggling the watchlist status
  const handleToggleWatchlist = () => {
    onToggleWatchlist(item.id);
  };

  // 4. Handler for toggling the watched status
  const handleToggleWatched = () => {
    onToggleProgress(item.id);
  };

  return (
    <div className="media-card">
      <img src={item.imageUrl} alt={`${item.title} poster`} className="card-image" />
      
      {/* 💡 NEW: Watched Overlay/Icon (High Priority over New Tag) */}
      {isWatched && <span className="watched-tag">✔ Watched</span>}
      {item.isNew && !isWatched && <span className="new-tag">NEW!</span>} 

      <div className="card-info">
        <h3>{item.title}</h3>
        <p className="details">
          {item.year} • {item.genre} • {item.duration}
        </p>
        
        {/* Progress Bar (Simulated full completion progress) */}
        <div className="progress-bar-container">
            <div className="progress-bar-fill" style={{ width: isWatched ? '100%' : '0%' }}></div>
        </div>
        
        {/* Action Buttons */}
        <div className="card-actions">
          {/* Watchlist Toggle */}
          <button 
            onClick={handleToggleWatchlist}
            className={`watchlist-btn ${isWatching ? 'added' : ''}`}
            style={{ width: '50%' }}
          >
            {isWatching ? '✅ List' : '➕ List'}
          </button>
          
          {/* Watched Toggle (NEW BUTTON) */}
          <button 
            onClick={handleToggleWatched}
            className={`watched-toggle-btn ${isWatched ? 'completed' : ''}`}
            style={{ width: '50%' }}
          >
            {isWatched ? 'Reset' : 'Mark Watched'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MediaCard;