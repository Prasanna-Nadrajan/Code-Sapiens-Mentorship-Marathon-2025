// src/components/MediaFeed.jsx
import React, { useState } from 'react';
import MediaCard from './MediaCard';
import { mediaItems } from '../data/mediaData'; 

const MediaFeed = ({ userWatchlist, onToggleWatchlist }) => {
  const [selectedGenre, setSelectedGenre] = useState('All'); 
  // 1. NEW STATE: State to store the user's search input
  const [searchTerm, setSearchTerm] = useState(''); 

  // Logic for unique genres (unchanged)
  const uniqueGenres = new Set(mediaItems.map(item => item.genre));
  const allGenres = ['All', ...uniqueGenres]; 

  // --- Filtering Logic (COMBINED: Search AND Genre Filter) ---
  const filteredMedia = mediaItems.filter(item => {
    
    // A. Genre Filter: Check if the genre matches the selection
    const genreMatch = selectedGenre === 'All' || item.genre === selectedGenre;
    
    // B. Search Filter: Check if the title includes the search term (case-insensitive)
    const searchMatch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Return true only if BOTH genre and search term match
    return genreMatch && searchMatch;
  });

  return (
    <div className="media-feed-container">
      
      {/* 2. Search Input and Filter Buttons UI */}
      <div className="controls-bar">
        {/* Search Input */}
        <input 
            type="text" 
            placeholder="Search titles..." 
            value={searchTerm}
            // Update the searchTerm state on input change
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="search-input"
        />
        
        {/* Genre Buttons */}
        <div className="filter-bar">
          {allGenres.map(genre => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`filter-btn ${selectedGenre === genre ? 'active-filter' : ''}`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      <h2>
        🔥 Trending Movies on Stream-Verse
      </h2>
      
      <div className="media-grid">
        {filteredMedia.map((item) => (
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

export default MediaFeed;