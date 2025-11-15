import React from 'react';

// This component displays a single movie slide at full-screen size
const HeroCard = ({ item }) => {
  // Use a high-quality poster image path for the background
  const backdropUrl = item.imageUrl.replace('/w200', '/w1280'); 

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
          <button className="play-btn">
            ▶ Play
          </button>
          <button className="more-info-btn">
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;