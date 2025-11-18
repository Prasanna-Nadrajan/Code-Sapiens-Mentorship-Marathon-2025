// src/components/MediaFeed.jsx
import React, { useState } from 'react';
import MediaRow from './MediaRow.jsx'; // FIX: Explicitly use .jsx
import MediaCard from './MediaCard.jsx'; // FIX: Explicitly use .jsx
import HeroCarousel from './HeroCarousel.jsx'; // FIX: Explicitly use .jsx

// 庁 NEW: Accept dataRows, userProgress, onToggleProgress, and onSelectMedia
const MediaFeed = ({ 
  dataRows, 
  userWatchlist, 
  onToggleWatchlist, 
  userProgress, 
  onToggleProgress, 
  onSelectMedia 
}) => {
  // Use the movies from the first row as the main list for search
  const mainMediaList = dataRows[0]?.movies || []; 

  const [searchTerm, setSearchTerm] = useState(''); 

  // Final list is the main list filtered by search term 
  const searchResults = mainMediaList.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Separate the first row (Hero) from the rest of the rows
  // 庁 FIX 1: Safely access dataRows[0] only if dataRows has elements
  const heroMovies = dataRows.length > 0 ? dataRows[0].movies : [];
  const categorizedRows = dataRows.slice(1); 

  return (
    <div className="media-feed-container">
      
      {/* 庁 FIX 2: Only render the HeroCarousel if there is no search AND movies exist. */}
      {searchTerm.length === 0 && heroMovies.length > 0 && (
          <HeroCarousel 
            movies={heroMovies} 
            onSelectMedia={onSelectMedia} // 💡 NEW: Pass handler
          />
      )}
      
      {/* Search Input and Filter Buttons UI */}
      <div className="controls-bar">
        <input 
            type="text" 
            placeholder="Search titles..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="search-input search-in-feed"
        />
        {/* Genre buttons are removed here as the primary filter for now, 
            but you can add them back below the search bar if needed. */}
      </div>

      
      {/* 庁 RENDER LOGIC: If searching, show a grid. If not, show the rows. */}
      {searchTerm.length > 0 ? (
        <div className="media-grid-search">
          <h2>Search Results ({searchResults.length} items)</h2>
          <div className="media-grid">
            {searchResults.map(item => (
                <MediaCard
                    key={item.id}
                    item={item} 
                    userWatchlist={userWatchlist} 
                    onToggleWatchlist={onToggleWatchlist} 
                    userProgress={userProgress} // 💡 NEW: Pass progress
                    onToggleProgress={onToggleProgress} // 💡 NEW: Pass toggle
                    onSelectMedia={onSelectMedia} // 💡 NEW: Pass handler
                />
            ))}
          </div>
        </div>
      ) : (
        // RENDER CATEGORIZED ROWS: Iterate over the structured dataRows array
        <div className="categorized-rows-section">
          {categorizedRows.map((row, index) => (
            <MediaRow 
              key={index}
              title={row.title}
              movies={row.movies}
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

export default MediaFeed;