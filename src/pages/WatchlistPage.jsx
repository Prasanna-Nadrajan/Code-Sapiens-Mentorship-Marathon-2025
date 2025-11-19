// src/pages/WatchlistPage.jsx
import React from 'react';
import MediaCard from '../components/MediaCard.jsx'; // 💡 FIX: Added .jsx extension

const WatchlistPage = ({ 
  fullMediaCatalog, 
  userWatchlist, 
  onToggleWatchlist, 
  userProgress, 
  onToggleProgress, 
  onSelectMedia 
}) => {
  
  // Get the media objects that are in the user's watchlist
  let wishlistItems = (fullMediaCatalog || []).filter(item => 
    userWatchlist.includes(item.id)
  );

  // FIX: Ensure no duplicate movies are rendered (just in case the API returned them)
  const seenIds = new Set();
  wishlistItems = wishlistItems.filter(item => {
    const isDuplicate = seenIds.has(item.id);
    seenIds.add(item.id);
    return !isDuplicate;
  });
  // END FIX

  return (
    <div className="main-content">
      <h2>⭐ Your Watchlist ({wishlistItems.length} items)</h2>
      
      {/* The loading check relies on the fullMediaCatalog length */}
      {fullMediaCatalog.length === 0 ? (
        <p className="empty-message">Loading media catalog...</p>
      ) : wishlistItems.length === 0 ? (
        <p className="empty-message">Your watchlist is currently empty. Add some movies from the Home page!</p>
      ) : (
        <div className="media-grid">
          {/* Keys are now unique based on the filtered list */}
          {wishlistItems.map((item) => (
            <MediaCard
              key={item.id} // The key is the unique movie ID
              item={item}
              userWatchlist={userWatchlist}
              onToggleWatchlist={onToggleWatchlist}
              userProgress={userProgress} // 💡 NEW: Pass progress
              onToggleProgress={onToggleProgress} // 💡 NEW: Pass toggle
              onSelectMedia={onSelectMedia} // 💡 NEW: Pass handler
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchlistPage;
