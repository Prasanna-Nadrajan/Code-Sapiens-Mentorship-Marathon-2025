// src/pages/IntroPage.jsx
import React, { useEffect, useRef } from 'react';

// This component shows a full-screen video intro and triggers an action when it ends.
const IntroPage = ({ onAnimationEnd }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    // 1. Get the video element
    const videoElement = videoRef.current;
    if (!videoElement) return;

    // 2. Define the handler for the video ending
    const handleVideoEnd = () => {
      onAnimationEnd();
    };

    // 3. Attach the 'ended' event listener
    videoElement.addEventListener('ended', handleVideoEnd);

    // 4. Start playback (necessary for some browsers, though 'autoPlay' is set)
    // Note: AutoPlay is often blocked. Consider asking the user to click "Play" 
    // if a proper video intro is required, or keep the default animation as fallback.
    // For this implementation, we rely on autoplay/muted for best effort.
    // videoElement.play().catch(error => {
    //   console.log("Autoplay prevented. User interaction required:", error);
    //   // Optionally, show a "Start" button if autoplay fails
    // });
    
    // Cleanup function
    return () => {
      videoElement.removeEventListener('ended', handleVideoEnd);
    };
  }, [onAnimationEnd]);

  // Use the public folder path for the intro video
  const INTRO_VIDEO_URL = '/intro.mp4'; 
  // IMPORTANT: The video MUST be muted for mobile browsers to allow autoplay.

  return (
    <div className="intro-overlay">
      <video
        ref={videoRef}
        className="intro-video" // New CSS class
        src={INTRO_VIDEO_URL}
        muted // Muted is essential for autoplay on most modern browsers
        autoPlay
        playsInline // Recommended for mobile
        preload="auto"
      >
        Your browser does not support the video tag.
      </video>
      {/* Remove the old intro-logo-container and its children */}
    </div>
  );
};

export default IntroPage;