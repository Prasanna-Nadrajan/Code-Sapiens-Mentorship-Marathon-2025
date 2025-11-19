// src/components/HeroCard.jsx
import React from 'react';

// This component displays a single movie slide at full-screen size
// 💡 FIX: Added onPlayMedia prop to trigger player open
const HeroCard = ({ item, onSelectMedia, onPlayMedia }) => { 
  // Use a high-quality poster image path for the background
  const backdropUrl = item.imageUrl.replace('/w200', '/w1280'); 

  // 💡 NEW HANDLER: Combines selection and immediate playback
  const handlePlayClick = () => {
    // 1. Select the media (so App.jsx knows which video to play)
    onSelectMedia(item.id); 
    // 2. Immediately trigger playback
    onPlayMedia();
  };

  return (
    <div className="hero-slide">
      {/* Background Image/Backdrop */}
      <div 
        className="hero-backdrop" 
        style={{ backgroundImage: `url(${backdropUrl})` }}
      ></div>
      {/* Dark overlay for text readability */}
      <div className="hero-overlay"></div> 
      
      {/* Content over the image */}
      <div className="hero-content">
        <h1 className="hero-title">{item.title}</h1>
        <p className="hero-details">
          {item.year} | {item.genre} | {item.duration}
        </p>
        <p className="hero-description">
          {/* Mock description - TMDb doesn't always provide good summaries in the 'popular' endpoint */}
          Experience the latest action-adventure film with groundbreaking visuals and sound design. A must-watch for the week!
        </p>
        
        {/* Call-to-Action Buttons */}
        <div className="hero-actions">
          {/* 💡 FIX: Use the new handler */}
          <button className="play-btn" onClick={handlePlayClick}>
            ▶ Play
          </button>
          {/* 💡 Fire onSelectMedia when "More Info" is clicked */}
          <button className="more-info-btn" onClick={() => onSelectMedia(item.id)}>
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;