// src/components/MediaRow.jsx
import React from 'react';
import MediaCard from './MediaCard';

const MediaRow = ({ title, movies, userWatchlist, onToggleWatchlist }) => {
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
          />
        ))}
      </div>
    </div>
  );
};

export default MediaRow;