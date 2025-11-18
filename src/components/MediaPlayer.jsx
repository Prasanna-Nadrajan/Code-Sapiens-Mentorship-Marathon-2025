// src/components/MediaPlayer.jsx
import React from 'react';

// This component overlays the entire screen to play the video.
const MediaPlayer = ({ item, onClose }) => {
  
  // --------------------------------------------------------------------------
  // --- !! IMPORTANT MOCK DATA !! ---
  // In a real app, this URL would come from your database (e.g., item.videoURL)
  // We are using a free placeholder video for demonstration.
  // --------------------------------------------------------------------------
  const MOCK_VIDEO_URL = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4";

  return (
    <div className="player-overlay" onClick={onClose}>
      {/* Close Button (top right) */}
      <button 
        className="player-close-btn" 
        onClick={onClose} 
        aria-label="Close player"
      >
        &times; {/* A simple 'X' icon */}
      </button>

      {/* Video Player */}
      <video
        // Stop the overlay from closing if the video itself is clicked
        onClick={(e) => e.stopPropagation()} 
        className="player-video"
        controls  // Show native video controls (play, pause, volume)
        autoPlay  // Start playing immediately
        src={MOCK_VIDEO_URL}
      >
        {/* Fallback text if the video tag isn't supported */}
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default MediaPlayer;