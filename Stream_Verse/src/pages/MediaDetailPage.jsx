// src/pages/MediaDetailPage.jsx
import React from 'react';
// Using an icon for the back button

// This component shows the full details for a selected movie
const MediaDetailPage = ({ 
  item, 
  onBack, 
  onPlay, // 💡 NEW: Accept onPlay handler
  userWatchlist = [], 
  onToggleWatchlist, 
  userProgress = [], 
  onToggleProgress 
}) => {
  
  // Use a high-quality backdrop image if available
  const backdropUrl = item.imageUrl.includes('image.tmdb.org') 
    ? item.imageUrl.replace('/w200', '/w1280')
    : item.imageUrl;
    
  // Check watchlist and progress status
  const isWatching = userWatchlist.includes(item.id);
  const isWatched = userProgress.includes(item.id);

  return (
    <div className="media-detail-page">
      {/* --- Back Button --- */}
      <button onClick={onBack} className="detail-back-btn">
        <ArrowLeft size={20} /> Back
      </button>

      {/* --- Backdrop Image --- */}
      <div className="detail-backdrop-container">
        <img 
          src={backdropUrl} 
          alt={`${item.title} backdrop`} 
          className="detail-backdrop-image" 
          onError={(e) => { 
            // Fallback for broken images
            e.target.onerror = null; 
            e.target.src = 'https://placehold.co/1280x720/141414/E50914?text=Stream-Verse';
          }}
        />
        <div className="detail-backdrop-overlay"></div>
      </div>

      {/* --- Content --- */}
      <div className="detail-content">
        <h1 className="detail-title">{item.title}</h1>
        
        <p className="detail-meta">
          {item.year} • {item.genre} • {item.duration}
        </p>
        
        {/* --- Action Buttons --- */}
        <div className="detail-actions">
          <button className="play-btn-large" onClick={onPlay}>
            ▶ Play
          </button>
          
          <button 
            onClick={() => onToggleWatchlist(item.id)}
            className={`watchlist-btn-large ${isWatching ? 'added' : ''}`}
          >
            {isWatching ? '✅ Added to List' : '➕ Add to List'}
          </button>
          
          <button 
            onClick={() => onToggleProgress(item.id)}
            className={`watched-btn-large ${isWatched ? 'completed' : ''}`}
          >
            {isWatched ? '✔ Watched' : 'Mark as Watched'}
          </button>
        </div>
        
        {/* --- Mock Description --- */}
        <p className="detail-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          (This is a mock description. In a real app, this would come from the API.)
        </p>
      </div>
    </div>
  );
};

// Simple inline SVG for Lucide icon fallback
const ArrowLeft = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);

export default MediaDetailPage;