import React, { useState, useEffect } from 'react';
import HeroCard from './HeroCard';

const HeroCarousel = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Set the automatic sliding interval (e.g., every 5 seconds)
  useEffect(() => {
    if (movies.length < 2) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => 
        (prevIndex + 1) % movies.length // Loop back to 0
      );
    }, 5000); // 5000ms = 5 seconds

    return () => clearInterval(interval); // Cleanup function
  }, [movies.length]);


  if (!movies || movies.length === 0) {
    return <div className="hero-loading">Loading top movies...</div>;
  }

  // 💡 FIX APPLIED: The translation must be based on the viewport width (100vw) 
  // multiplied by the current index. This calculation is correct, but we must 
  // ensure the track width is correct in CSS.
  const transformStyle = {
    transform: `translateX(-${currentIndex * 100}vw)`, // Translate by viewport width (VW)
    transition: 'transform 1s ease-in-out'
  };

  return (
    <div className="hero-carousel-wrapper">
      {/* 💡 FIX: Apply the style to the track */}
      <div className="hero-carousel-track" style={transformStyle}> 
        {movies.map((item) => (
          <HeroCard key={item.id} item={item} />
        ))}
      </div>
      
      {/* Navigation Dots (Optional) */}
      <div className="carousel-nav-dots">
        {movies.map((_, index) => (
          <span 
            key={index}
            className={`dot ${index === currentIndex ? 'active-dot' : ''}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;