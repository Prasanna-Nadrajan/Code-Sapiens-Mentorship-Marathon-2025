// src/App.jsx
import React, { useState, useCallback, useEffect } from 'react';
// IMPORT ThemeProvider and useTheme
import { ThemeProvider, useTheme } from './contexts/ThemeContext.jsx'; 
import MediaFetcher from './components/MediaFetcher.jsx'; 
import LoginPage from './pages/LoginPage.jsx';
import ManageProfilePage from './pages/ManageProfilePage.jsx'; 
import SettingsPage from './pages/SettingsPage.jsx';  
import SignupPage from './pages/SignupPage.jsx'; 
import WatchlistPage from './pages/WatchlistPage.jsx'; 
import useUserManagement from './hooks/useUserManagement.js';
import useUserWatchlist from './hooks/useUserWatchlist.js'; 
import ProfileMenu from './components/ProfileMenu.jsx';

// Separated AppContent to use the ThemeContext
const AppContent = () => {
  const [currentPage, setCurrentPage] = useState('login'); 
  const [currentUserId, setCurrentUserId] = useState(null); 
  const [currentUserName, setCurrentUserName] = useState(null);
  const [fullMediaCatalog, setFullMediaCatalog] = useState([]); 
  const { allUsers, registerUser } = useUserManagement(); 
  // const { theme } = useTheme(); // Removed unused theme access here

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

  const handleGoToManageProfile = () => setCurrentPage('manage_profile');
  const handleGoToSettings = () => setCurrentPage('settings');

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
              
              {/* 💡 KEY CHANGE: ProfileMenu now handles theme toggle internally */}
              <ProfileMenu 
                onLogout={handleGoToLogin} 
                username={currentUserName} 
                onManageProfile={handleGoToManageProfile} 
                onSettings={handleGoToSettings}          
              />
            </div>
          </nav>
        </header>
        
        <main className="main-content">
          {currentPage === 'manage_profile' && <ManageProfilePage username={currentUserName} />}
          {currentPage === 'settings' && <SettingsPage />}
          
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
    // The theme class is applied globally via useEffect in ThemeContext
    <div>
      {renderPage()}
    </div>
  );
};

const App = () => (
    <ThemeProvider>
        <AppContent />
    </ThemeProvider>
);

export default App;