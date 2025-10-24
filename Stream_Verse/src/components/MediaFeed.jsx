import React from 'react';
import MediaCard from './MediaCard';
import { mediaItems } from '../data/mediaData'; 

const MediaFeed = () => {
  return (
    <div className="media-feed-container">
      <h2>Trending Movies on Stream-Verse</h2>
      
      <div className="media-grid">
        {mediaItems.map((item) => (
          <MediaCard
            key={item.id}
            title={item.title}
            year={item.year}
            genre={item.genre}
            duration={item.duration}
            imageUrl={item.imageUrl}
            isNew={item.isNew}
          />
        ))}
      </div>
    </div>
  );
};

export default MediaFeed;