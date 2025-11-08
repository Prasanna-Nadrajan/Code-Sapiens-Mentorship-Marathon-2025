// src/pages/WatchlistPage.jsx
import React from 'react';
import MediaCard from '../components/MediaCard'; 
import { mediaItems } from '../data/mediaData'; // Import the full list of media

// This component shows only the items whose IDs are in userWatchlist
const WatchlistPage = ({ userWatchlist, onToggleWatchlist }) => {
  
  // 1. Filter the full list of media to find only the items in the user's watchlist
  const wishlistItems = mediaItems.filter(item => 
    userWatchlist.includes(item.id)
  );

  return (
    <div className="main-content">
      <h2>⭐ Your Watchlist ({wishlistItems.length} items)</h2>
      
      {wishlistItems.length === 0 ? (
        <p className="empty-message">Your watchlist is currently empty. Add some movies from the Home page!</p>
      ) : (
        // 2. Reuse the same media-grid styling and MediaCard component
        <div className="media-grid">
          {wishlistItems.map((item) => (
            <MediaCard
              key={item.id}
              item={item}
              userWatchlist={userWatchlist}
              onToggleWatchlist={onToggleWatchlist}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchlistPage;