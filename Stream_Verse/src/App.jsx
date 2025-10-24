import React from 'react';
import MediaFeed from './components/MediaFeed';

const App = () => {
  return (
    <div>
      <header>
        <nav className="nav-bar">
          <span className="logo">Stream-Verse</span>
          <div className="nav-links">
            <a href="#home">Home</a>
            <a href="#watchlist">Watchlist</a>
          </div>
        </nav>
      </header>
      
      <main className="main-content">
        <MediaFeed />
      </main>
    </div>
  );
};

export default App;