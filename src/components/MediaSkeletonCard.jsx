// src/components/MediaSkeletonCard.jsx
import React from 'react';

// This component displays a visual placeholder while media is loading.
const MediaSkeletonCard = () => {
  return (
    <div className="media-card-skeleton">
      {/* Image Placeholder */}
      <div className="skeleton-image"></div>
      
      {/* Info Block */}
      <div className="skeleton-info">
        <div className="skeleton-line full"></div>
        <div className="skeleton-line short"></div>
      </div>
      
      {/* Button Placeholder */}
      <div className="skeleton-btn"></div>
    </div>
  );
};

export default MediaSkeletonCard;