// src/hooks/useUserWatchlist.js
import { useState, useEffect } from 'react';

// Key for storing the data in localStorage
const WATCHLIST_STORAGE_KEY = 'streamverse-user-watchlists';

const useUserWatchlist = (currentProfileId) => {
  // Global state holding ALL users' wishlists: { profileId: [mediaId1, mediaId2, ...] }
  const [allWatchlists, setAllWatchlists] = useState(() => {
    try {
      const item = window.localStorage.getItem(WATCHLIST_STORAGE_KEY);
      return item ? JSON.parse(item) : {};
    } catch (error) {
      console.error("Failed to read localStorage:", error);
      return {};
    }
  });

  // Effect to save the global state to localStorage whenever it changes
  useEffect(() => {
    try {
      window.localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(allWatchlists));
    } catch (error) {
      console.error("Failed to write to localStorage:", error);
    }
  }, [allWatchlists]);

  // The actual watchlist for the current profile
  const userWatchlist = allWatchlists[currentProfileId] || [];

  // Function to toggle a media item's status in the current profile's list
  const toggleWatchlistItem = (mediaId) => {
    if (!currentProfileId) return; // Guard clause

    setAllWatchlists(prevWatchlists => {
      const currentList = prevWatchlists[currentProfileId] || [];
      let newList;

      // Check if the item is already in the list
      if (currentList.includes(mediaId)) {
        // Remove item (Filter out the ID)
        newList = currentList.filter(id => id !== mediaId);
      } else {
        // Add item (Spread operator to create a new array)
        newList = [...currentList, mediaId];
      }

      // Return the updated global dictionary
      return {
        ...prevWatchlists,
        [currentProfileId]: newList
      };
    });
  };

  return { userWatchlist, toggleWatchlistItem };
};

export default useUserWatchlist;