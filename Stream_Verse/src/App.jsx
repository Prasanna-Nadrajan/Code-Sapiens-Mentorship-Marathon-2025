// src/App.jsx
import React, { useState } from 'react';
import MediaFeed from './components/MediaFeed';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage'; 
import WatchlistPage from './pages/WatchListPage'; //import new page
import useUserManagement from './hooks/useUserManagement';
import useUserWatchlist from './hooks/useUserWatchlist'; //NEW

const App = () => {
  const [currentPage, setCurrentPage] = useState('login'); 
  const [currentUserId, setCurrentUserId] = useState(null); // NEW state for User ID
  const { allUsers, registerUser } = useUserManagement(); 

  // Use the custom hook to manage the persistent, user-specific watchlist
  const { userWatchlist, toggleWatchlistItem } = useUserWatchlist(currentUserId); // NEW

  // Function to switch to home page AND set the logged-in user's ID
  const handleLogin = (userId) => { //  Accepts userId now
    setCurrentUserId(userId);
    setCurrentPage('home'); 
  };

  const handleGoToLogin = () => {
    setCurrentUserId(null); // Clear user ID on logout/going to login
    setCurrentPage('login');
  };
  
  const handleGoToSignup = () => setCurrentPage('signup');
  const handleGoToWatchlist = () => setCurrentPage('watchlist'); 
  const handleGoToHome = () => setCurrentPage('home');

  const renderPage = () => {
    if (currentPage === 'login') {
      return (
        <LoginPage 
          allUsers={allUsers} //PASS ALL USERS for authentication
          onLoginSuccess={handleLogin} 
          onGoToSignup={handleGoToSignup}
        />
      );
    }
    
    if (currentPage === 'signup') {
      return (
        <SignupPage 
          onRegister={registerUser} //  PASS REGISTER FUNCTION
          onGoToLogin={handleGoToLogin}
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
              {/*  UPDATED LINKS: Use onClick handlers for state routing */}
              <a href="#" onClick={handleGoToHome} className={currentPage === 'home' ? 'active-link' : ''}>Home</a>
              <a href="#" onClick={handleGoToWatchlist} className={currentPage === 'watchlist' ? 'active-link' : ''}>Watchlist ({userWatchlist.length})</a>
              <button onClick={handleGoToLogin} className="nav-btn">
                Logout
              </button>
            </div>
          </nav>
        </header>
        
        <main className="main-content">
          {currentPage === 'home' && (
            <MediaFeed 
              userWatchlist={userWatchlist}
              onToggleWatchlist={toggleWatchlistItem}
            />
          )}
          
          {currentPage === 'watchlist' && (
            <WatchlistPage 
              userWatchlist={userWatchlist}
              onToggleWatchlist={toggleWatchlistItem}
            />
          )}
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