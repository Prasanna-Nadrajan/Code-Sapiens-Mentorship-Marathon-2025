// src/hooks/useUserProgress.js
import { useState, useEffect } from 'react';

// Key for storing the data in localStorage
const PROGRESS_STORAGE_KEY = 'streamverse-user-progress';

// Mock progress data structure: { userId: [mediaId1, mediaId2, ...] }
const useUserProgress = (currentUserId) => {
  // Global state holding ALL users' watch progress
  const [allProgress, setAllProgress] = useState(() => {
    try {
      const item = window.localStorage.getItem(PROGRESS_STORAGE_KEY);
      return item ? JSON.parse(item) : {};
    } catch (error) {
      console.error("Failed to read progress data from localStorage:", error);
      return {};
    }
  });

  // Effect to save the global state to localStorage whenever it changes
  useEffect(() => {
    try {
      window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(allProgress));
    } catch (error) {
      console.error("Failed to write progress data to localStorage:", error);
    }
  }, [allProgress]);

  // The actual progress list (array of completed media IDs) for the current user
  const userProgress = allProgress[currentUserId] || [];

  // Function to toggle a media item's 'watched' status
  const toggleProgressItem = (mediaId) => {
    if (!currentUserId) {
        console.warn("Cannot track progress: User is not logged in.");
        return;
    }
    
    // 💡 FIX: Ensure the ID is consistently treated as a string for storage and lookup
    const mediaIdStr = String(mediaId);

    setAllProgress(prevProgress => {
      const currentList = prevProgress[currentUserId] || [];
      let newList;

      // Check if the item is already marked as watched
      if (currentList.includes(mediaIdStr)) {
        // Mark as unwatched (Filter out the ID)
        newList = currentList.filter(id => id !== mediaIdStr);
      } else {
        // Mark as watched (Add the ID)
        newList = [...currentList, mediaIdStr];
      }

      // Return the updated global dictionary
      return {
        ...prevProgress,
        [currentUserId]: newList
      };
    });
  };

  return { userProgress, toggleProgressItem };
};

export default useUserProgress;