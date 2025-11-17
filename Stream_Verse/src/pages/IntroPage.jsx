// src/pages/IntroPage.jsx
import React, { useEffect } from 'react';

// This component shows a full-screen animation and then triggers an action.
const IntroPage = ({ onAnimationEnd }) => {

  useEffect(() => {
    // Wait for the animation to be finished, then call onAnimationEnd
    const timer = setTimeout(() => {
      onAnimationEnd();
    }, 3800); // 3.8 seconds total animation time

    return () => clearTimeout(timer); // Clean up the timer
  }, [onAnimationEnd]);

  return (
    <div className="intro-overlay">
      {/* This animation concept is a "Stream" of light revealing the logo.
        1. The outline "SV" fades in.
        2. A solid "SV" is revealed by a "wipe" effect, as if a stream of light is filling it.
        3. The logo pulses with a bright red glow.
        4. The entire intro fades to black.
      */}
      <div className="intro-logo-container">
        {/* We will have two text layers: one outline, one solid */}
        <h1 className="intro-logo-outline">SV</h1>
        <h1 className="intro-logo-solid">SV</h1>
      </div>
    </div>
  );
};

export default IntroPage;