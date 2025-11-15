// src/components/MediaFetcher.jsx
import React, { useState, useEffect } from 'react';
import MediaFeed from './MediaFeed.jsx'; 
import MediaSkeletonCard from './MediaSkeletonCard.jsx'; // IMPORT NEW SKELETON
import { mediaItems as fallbackData } from '../data/mediaData.js'; // Fallback data

// Replace with your real key
const TMDB_API_KEY = '9577a6de771a0bd770051256e465efc8'; 
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

const ENDPOINTS = {
  Top10: `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`,
  // FIX: Corrected API key placement in all genre endpoints
  Action: `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=28&sort_by=popularity.desc`,
  Horror: `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=27&sort_by=popularity.desc`,
  Comedy: `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=35&sort_by=popularity.desc`,
};

const cleanAndMapData = (results, genreName) => {
  // FIX: Added safety check for 'results' being a valid array
  if (!Array.isArray(results)) {
    return []; 
  }
  
  return results.slice(0, 10).map(movie => ({
    id: movie.id,
    title: movie.title,
    year: movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A', 
    genre: genreName, 
    duration: 'TBD', 
    imageUrl: movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : 'https://placehold.co/200x300/141414/E50914?text=No+Poster',
    isNew: movie.vote_average > 7.5,
  }));
};

const MediaFetcher = ({ onDataFetched, ...props }) => {
  const [dataRows, setDataRows] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const promises = [
          fetch(ENDPOINTS.Top10).then(res => res.json()),
          fetch(ENDPOINTS.Action).then(res => res.json()),
          fetch(ENDPOINTS.Horror).then(res => res.json()),
          fetch(ENDPOINTS.Comedy).then(res => res.json()),
        ];
        
        const [top10Data, actionData, horrorData, comedyData] = await Promise.all(promises);

        const newRows = [
          { 
            title: 'Top 10 Trending Movies', 
            movies: cleanAndMapData(top10Data.results, 'Action/Adventure'),
            isCarousel: true 
          },
          { 
            title: 'Action & Adventure', 
            movies: cleanAndMapData(actionData.results, 'Action'),
            isCarousel: false
          },
          { 
            title: 'Horror', 
            movies: cleanAndMapData(horrorData.results, 'Horror'),
            isCarousel: false
          },
          { 
            title: 'Comedy', 
            movies: cleanAndMapData(comedyData.results, 'Comedy'),
            isCarousel: false
          },
        ];

        setDataRows(newRows);
        
        const allMovies = newRows.flatMap(row => row.movies);
        // Pass the combined list up to the parent App component
        if (onDataFetched) {
            onDataFetched(allMovies); 
        }
        
      } catch (e) {
        console.error("Error fetching movie rows:", e);
        setError("Failed to load movie categories. Using fallback data for now.");
        
        const fallbackRows = [{
            title: 'Trending (Offline Data)',
            movies: fallbackData,
            isCarousel: true
        }];
        setDataRows(fallbackRows);
        
        // FIX: Check if onDataFetched exists before calling it
        if (onDataFetched) {
            onDataFetched(fallbackData); // Pass fallback data up too
        }
      } finally {
        setIsLoading(false); 
      }
    };

    fetchMovies();
  }, [onDataFetched]); // Added dependency to suppress warnings

  if (isLoading) {
    // 💡 KEY CHANGE: Render the skeleton loading state
    return (
        <div className="main-content">
            <h2 className="loading-title">Loading Stream-Verse library...</h2>
            {/* Render a grid of 10 skeletons */}
            <div className="media-grid media-grid-skeleton">
                {Array.from({ length: 10 }).map((_, index) => (
                    <MediaSkeletonCard key={index} />
                ))}
            </div>
        </div>
    );
  }
  
  // Display error message if present but data still loaded (e.g., fallback data)
  if (error) {
    // Display the error as a subtle banner
    console.warn(error);
  }
  
  return (
    <MediaFeed 
      dataRows={dataRows} 
      userWatchlist={props.userWatchlist} 
      onToggleWatchlist={props.onToggleWatchlist} 
    />
  );
};

export default MediaFetcher;