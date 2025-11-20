import { useState, useEffect } from 'react';

// Key for storing the data in localStorage
const PROGRESS_STORAGE_KEY = 'streamverse-user-progress';

// Mock progress data structure: { profileId: [mediaId1, mediaId2, ...] }
const useUserProgress = (currentProfileId) => {
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
      // console.log("✅ Progress saved to localStorage:", allProgress);
    } catch (error) {
      console.error("Failed to write progress data to localStorage:", error);
    }
  }, [allProgress]);

  // The actual progress list (array of completed media IDs) for the current profile
  // Convert all stored IDs to numbers for consistent comparison
  const userProgress = (allProgress[currentProfileId] || []).map(id =>
    typeof id === 'string' ? parseInt(id, 10) : id
  );

  // Function to toggle a media item's 'watched' status
  const toggleProgressItem = (mediaId) => {
    if (!currentProfileId) {
      console.warn("Cannot track progress: Profile is not selected.");
      return;
    }

    // Ensure the ID is treated as a number for consistent comparison
    const mediaIdNum = typeof mediaId === 'string' ? parseInt(mediaId, 10) : mediaId;

    // console.log("🔄 Toggling progress for media ID:", mediaIdNum, "Profile:", currentProfileId);

    setAllProgress(prevProgress => {
      // Get current list and convert all IDs to numbers
      const currentList = (prevProgress[currentProfileId] || []).map(id =>
        typeof id === 'string' ? parseInt(id, 10) : id
      );

      let newList;

      // Check if the item is already marked as watched
      if (currentList.includes(mediaIdNum)) {
        // Mark as unwatched (Filter out the ID)
        newList = currentList.filter(id => id !== mediaIdNum);
        // console.log("➖ Removed from progress:", mediaIdNum);
      } else {
        // Mark as watched (Add the ID)
        newList = [...currentList, mediaIdNum];
        // console.log("➕ Added to progress:", mediaIdNum);
      }

      // console.log("📊 New progress list:", newList);

      // Return the updated global dictionary
      return {
        ...prevProgress,
        [currentProfileId]: newList
      };
    });
  };

  return { userProgress, toggleProgressItem };
};

export default useUserProgress;