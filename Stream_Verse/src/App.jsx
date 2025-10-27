// src/App.jsx
import React, { useState } from 'react';
import MediaFeed from './components/MediaFeed';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage'; // 👈 Import new component

const App = () => {
  const [currentPage, setCurrentPage] = useState('login'); 

  // Functions to change the view
  const handleLogin = () => setCurrentPage('home'); // Go to MediaFeed
  const handleGoToSignup = () => setCurrentPage('signup'); // Go to SignupPage
  const handleGoToLogin = () => setCurrentPage('login'); // Go to LoginPage

  const renderPage = () => {
    if (currentPage === 'login') {
      return (
        <LoginPage 
          onLoginSuccess={handleLogin} 
          onGoToSignup={handleGoToSignup} // Pass function to go to signup
        />
      );
    }
    
    if (currentPage === 'signup') {
      return (
        <SignupPage 
          onGoToLogin={handleGoToLogin} // Pass function to go back to login
        />
      );
    }

    // Default (Home/MediaFeed) View
    return (
      <> 
        <header>
          <nav className="nav-bar">
            <span className="logo">Stream-Verse</span>
            <div className="nav-links">
              <a href="#home">Home</a>
              <a href="#watchlist">Watchlist</a>
              <button onClick={handleGoToLogin} className="nav-btn">
                Logout
              </button>
            </div>
          </nav>
        </header>
        
        <main className="main-content">
          <MediaFeed />
        </main>
      </>
    );
  };
  
  return (
    <div>
      {renderPage()}
    </div>
  );
};

export default App;