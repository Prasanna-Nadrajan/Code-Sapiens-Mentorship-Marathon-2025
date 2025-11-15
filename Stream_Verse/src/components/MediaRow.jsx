// src/components/MediaRow.jsx
import React from 'react';
import MediaCard from './MediaCard.jsx'; // FIX: Explicitly use .jsx

// Accept userProgress and onToggleProgress
const MediaRow = ({ title, movies, userWatchlist, onToggleWatchlist, userProgress, onToggleProgress }) => {
  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <div className="media-row-container">
      <h3 className="row-title">{title}</h3>
      
      {/* Horizontal scrolling wrapper */}
      <div className="media-row-content">
        {movies.map((item) => (
          <MediaCard
            key={item.id}
            item={item}
            userWatchlist={userWatchlist}
            onToggleWatchlist={onToggleWatchlist}
            userProgress={userProgress} // 💡 NEW: Pass progress
            onToggleProgress={onToggleProgress} // 💡 NEW: Pass toggle
          />
        ))}
      </div>
    </div>
  );
};

export default MediaRow;