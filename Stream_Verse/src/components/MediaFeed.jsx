// src/components/MediaFeed.jsx
import React, { useState } from 'react';
import MediaRow from './MediaRow';
import MediaCard from './MediaCard';

// 💡 NEW: Accept dataRows instead of a single mediaList
const MediaFeed = ({ dataRows, userWatchlist, onToggleWatchlist }) => {
  // Use the movies from the first row (Top 10) as the main list for filtering/searching
  const mainMediaList = dataRows[0]?.movies || []; 

  const [selectedGenre, setSelectedGenre] = useState('All'); 
  const [searchTerm, setSearchTerm] = useState(''); 

  // --- Genre and Search Logic Refactored ---
  const allGenresSet = new Set(['All']);
  dataRows.forEach(row => {
    row.movies.forEach(movie => {
        if (movie.genre && movie.genre !== 'Action/Adventure') {
            allGenresSet.add(movie.genre);
        }
    });
  });
  const allGenres = Array.from(allGenresSet);


  // Final list is the main list filtered by search term 
  const searchResults = mainMediaList.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="media-feed-container">
      
      {/* Search Input and Filter Buttons UI (Simplified) */}
      <div className="controls-bar">
        <input 
            type="text" 
            placeholder="Search titles..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="search-input"
        />
        {/* Hiding genre buttons unless searching, as rows categorize content now */}
        {searchTerm.length === 0 ? null : (
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
        )}
      </div>
      
      {/* 💡 RENDER LOGIC: If searching, show a grid. If not, show the rows. */}
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
                />
            ))}
          </div>
        </div>
      ) : (
        // RENDER ROWS: Iterate over the structured dataRows array
        <div>
          {dataRows.map((row, index) => (
            <MediaRow 
              key={index}
              title={row.title}
              movies={row.movies}
              userWatchlist={userWatchlist}
              onToggleWatchlist={onToggleWatchlist}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaFeed;