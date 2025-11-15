// src/App.jsx
import React, { useState, useCallback, useEffect } from 'react'; // ADD useEffect
import MediaFetcher from './components/MediaFetcher'; 
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage'; 
import WatchlistPage from './pages/WatchlistPage'; 
import useUserManagement from './hooks/useUserManagement';
import useUserWatchlist from './hooks/useUserWatchlist'; 
import ProfileMenu from './components/ProfileMenu';

const App = () => {
  const [currentPage, setCurrentPage] = useState('login'); 
  const [currentUserId, setCurrentUserId] = useState(null); 
  // FIX: Initialize the state as an empty array, not undefined (it was correct before the last change)
  const [currentUserName, setCurrentUserName] = useState(null);
  const [fullMediaCatalog, setFullMediaCatalog] = useState([]); 
  const { allUsers, registerUser } = useUserManagement(); 

  const { userWatchlist, toggleWatchlistItem } = useUserWatchlist(currentUserId); 

  // Function to switch to home page AND set the logged-in user's ID
  const handleLogin = (userId) => { 
    setCurrentUserId(userId);
    // Find the user object to get their username
    const user = allUsers.find(u => u.id === userId || u.id === String(userId));
    setCurrentUserName(user ? user.username : 'Guest'); 
    setCurrentPage('home'); 
  };

  const handleGoToLogin = () => {
    setCurrentUserId(null); 
    setCurrentUserName(null); 
    setCurrentPage('login');
  };
  
  const handleGoToSignup = () => setCurrentPage('signup');
  const handleGoToWatchlist = () => setCurrentPage('watchlist'); 
  const handleGoToHome = () => setCurrentPage('home');

  // FIX: Wrap the handler with useCallback to ensure it's not recreated on every render
  const handleMediaDataFetched = useCallback((data) => { 
    // This function will receive the full list of movies from MediaFetcher
    setFullMediaCatalog(data);
  }, []); 

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
          onRegister={registerUser} //PASS REGISTER FUNCTION
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
              <a href="#" onClick={handleGoToHome} className={currentPage === 'home' ? 'active-link' : ''}>Home</a>
              <a href="#" onClick={handleGoToWatchlist} className={currentPage === 'watchlist' ? 'active-link' : ''}>Watchlist</a>
              
              {/* 💡 KEY CHANGE: Replace Logout button with ProfileMenu */}
              <ProfileMenu onLogout={handleGoToLogin} username={currentUserName} /> 
            </div>
          </nav>
        </header>
        
        <main className="main-content">
          {currentPage === 'home' && (
            <MediaFetcher 
              userWatchlist={userWatchlist}
              onToggleWatchlist={toggleWatchlistItem}
              onDataFetched={handleMediaDataFetched} // Pass handler to update catalog
            />
          )}
          
          {/* Watchlist component requires the full catalog */}
          {currentPage === 'watchlist' && (
            <WatchlistPage 
              fullMediaCatalog={fullMediaCatalog} // Pass the state
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