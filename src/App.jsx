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
import MediaDetailPage from './pages/MediaDetailPage.jsx';
import MediaPlayer from './components/MediaPlayer.jsx';
import IntroPage from './pages/IntroPage.jsx';
import Footer from './components/Footer.jsx';
import ProfilePickerPage from './pages/ProfilePickerPage.jsx';
import useUserManagement from './hooks/useUserManagement.js';
import useUserWatchlist from './hooks/useUserWatchlist.js';
import useUserProgress from './hooks/useUserProgress.js';
import ProfileMenu from './components/ProfileMenu.jsx';

// Inline SVG for Hamburger/Close Icon
const MenuIcon = ({ isOpen, onClick }) => (
  <button
    className="mobile-menu-toggle"
    onClick={onClick}
    aria-label={isOpen ? "Close menu" : "Open menu"}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
    >
      {isOpen ? (
        // Close icon (X)
        <React.Fragment>
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </React.Fragment>
      ) : (
        // Menu icon (Hamburger)
        <React.Fragment>
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </React.Fragment>
      )}
    </svg>
  </button>
);


// Keys for storing auth state in localStorage
const INTRO_SEEN_KEY = 'streamverse-intro-seen';
const AUTH_STORAGE_KEY_ID = 'streamverse-auth-userId';
const AUTH_STORAGE_KEY_NAME = 'streamverse-auth-userName';

// Separated AppContent to use the ThemeContext
const AppContent = () => {

  // Function to read initial state from localStorage
  const getInitialState = () => {
    try {
      const storedUserId = localStorage.getItem(AUTH_STORAGE_KEY_ID);
      const storedUserName = localStorage.getItem(AUTH_STORAGE_KEY_NAME);
      // Check the new key: if it's 'true', the intro has been seen.
      const introSeen = localStorage.getItem(INTRO_SEEN_KEY) === 'true';

      let initialPage = 'login';
      if (storedUserId && storedUserName) {
        initialPage = 'profile_picker';
      }

      return {
        page: initialPage,
        id: storedUserId,
        name: storedUserName,
        // If the intro has been seen, set showIntro to false. Otherwise, true.
        showIntro: !introSeen,
      };
    } catch (e) {
      console.error("Failed to read auth or intro from storage", e);
    }
    // Default (logged out) state
    return { page: 'login', id: null, name: null, showIntro: true };
  };

  // Initialize state from localStorage function
  const [initialState] = useState(getInitialState);
  const [currentPage, setCurrentPage] = useState(initialState.page);
  const [currentUserId, setCurrentUserId] = useState(initialState.id);
  const [currentUserName, setCurrentUserName] = useState(initialState.name);

  // Profile State
  const [currentProfileId, setCurrentProfileId] = useState(null);
  const [currentProfile, setCurrentProfile] = useState(null);

  const [fullMediaCatalog, setFullMediaCatalog] = useState([]);
  const [selectedMediaId, setSelectedMediaId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showIntro, setShowIntro] = useState(initialState.showIntro);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { allUsers, registerUser, addProfile, deleteProfile, getUserProfiles } = useUserManagement();

  // Pass currentProfileId instead of currentUserId
  const { userWatchlist, toggleWatchlistItem } = useUserWatchlist(currentProfileId);
  const { userProgress, toggleProgressItem } = useUserProgress(currentProfileId);

  // Toggle handler
  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);

  // Close handler that is useful after navigation
  const closeMobileMenu = () => setIsMobileMenuOpen(false);


  const handleIntroEnd = useCallback(() => {
    // 1. Set the flag in localStorage so the intro is skipped next time
    try {
      localStorage.setItem(INTRO_SEEN_KEY, 'true');
    } catch (e) {
      console.error("Failed to set intro seen flag:", e);
    }
    // 2. Hide the intro screen, which will trigger the rest of the application render
    setShowIntro(false);
  }, []);

  // Handler to show media details
  const handleSelectMedia = (mediaId) => {
    setSelectedMediaId(mediaId);
    setIsPlaying(false); // Ensure player is closed when selecting new media
    closeMobileMenu(); // Close menu on navigation
  };

  // Handler to clear media details (go back)
  const handleClearSelectedMedia = () => {
    setSelectedMediaId(null);
    setIsPlaying(false); // Ensure player is closed
    closeMobileMenu(); // Close menu on navigation
  };

  // Handlers to open/close the player
  const handlePlayMedia = () => setIsPlaying(true);
  const handleClosePlayer = () => setIsPlaying(false);

  // Function to switch to home page AND set the logged-in user's ID
  const handleLogin = (userId) => {
    const user = allUsers.find(u => u.id === userId || u.id === String(userId));
    const userName = user ? user.username : 'Guest';

    try {
      // Save auth state to localStorage
      localStorage.setItem(AUTH_STORAGE_KEY_ID, userId);
      localStorage.setItem(AUTH_STORAGE_KEY_NAME, userName);

      // Set state
      setCurrentUserId(userId);
      setCurrentUserName(userName);
      setCurrentPage('profile_picker');
      handleClearSelectedMedia();
    } catch (e) {
      console.error("Failed to save auth to storage", e);
    }
    closeMobileMenu(); // Close menu on login
  };

  const handleProfileSelect = (profileId) => {
    const profiles = getUserProfiles(currentUserId);
    const profile = profiles.find(p => p.id === profileId);
    if (profile) {
      setCurrentProfileId(profileId);
      setCurrentProfile(profile);
      setCurrentPage('home');
    }
  };

  const handleAddProfile = (name, avatar) => {
    addProfile(currentUserId, name, avatar);
  };

  const handleDeleteProfile = (profileId) => {
    deleteProfile(currentUserId, profileId);
  };

  // This function now also serves as "logout"
  const handleGoToLogin = () => {
    try {
      // Clear auth state from localStorage
      localStorage.removeItem(AUTH_STORAGE_KEY_ID);
      localStorage.removeItem(AUTH_STORAGE_KEY_NAME);
    } catch (e) {
      console.error("Failed to clear auth from storage", e);
    }

    // Reset state
    setCurrentUserId(null);
    setCurrentUserName(null);
    setCurrentProfileId(null);
    setCurrentProfile(null);
    setCurrentPage('login');
    handleClearSelectedMedia();
    closeMobileMenu(); // Close menu on logout
  };

  const handleGoToSignup = () => {
    setCurrentPage('signup');
    handleClearSelectedMedia(); // Clear detail view
    closeMobileMenu();
  };

  const handleGoToWatchlist = () => {
    setCurrentPage('watchlist');
    handleClearSelectedMedia(); // Clear detail view
    closeMobileMenu(); // Close menu after nav
  };

  const handleGoToHome = () => {
    setCurrentPage('home');
    handleClearSelectedMedia(); // Clear detail view
    closeMobileMenu(); // Close menu after nav
  };

  const handleGoToManageProfile = () => {
    setCurrentPage('manage_profile');
    handleClearSelectedMedia(); // Clear detail view
    closeMobileMenu(); // Close menu after nav
  };

  const handleGoToSettings = () => {
    setCurrentPage('settings');
    handleClearSelectedMedia(); // Clear detail view
    closeMobileMenu(); // Close menu after nav
  };

  // FIX: Wrap the handler with useCallback to ensure it's not recreated on every render
  const handleMediaDataFetched = useCallback((data) => {
    // This function will receive the full list of movies from MediaFetcher
    setFullMediaCatalog(data);
  }, []);

  const renderPage = () => {
    // Show Intro page first
    if (showIntro) {
      return <IntroPage onAnimationEnd={handleIntroEnd} />;
    }

    const selectedItem = fullMediaCatalog.find(item => item.id === selectedMediaId);

    // Check if we should render the player (highest priority)
    if (isPlaying && selectedItem) {
      return (
        <MediaPlayer
          item={selectedItem}
          onClose={handleClosePlayer}
        />
      );
    }

    // Check if a movie is selected first
    if (selectedMediaId && selectedItem) {
      // If item is found, show detail page
      return (
        <MediaDetailPage
          item={selectedItem}
          onBack={handleClearSelectedMedia} // Pass the "back" handler
          onPlay={handlePlayMedia} // Pass the "play" handler
          userWatchlist={userWatchlist}
          onToggleWatchlist={toggleWatchlistItem}
          userProgress={userProgress}
          onToggleProgress={toggleProgressItem}
        />
      );
    }

    // If item not found (e.g., bad ID), clear selection
    if (selectedMediaId) {
      handleClearSelectedMedia();
    }

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

    if (currentPage === 'profile_picker') {
      return (
        <ProfilePickerPage
          profiles={getUserProfiles(currentUserId)}
          onSelectProfile={handleProfileSelect}
          onAddProfile={handleAddProfile}
          onDeleteProfile={handleDeleteProfile}
        />
      );
    }

    return (
      <>
        <header>
          <nav className="nav-bar">
            <span className="logo">Stream-Verse</span>
            {/* Desktop Links (Hidden on mobile) */}
            <div className="nav-links">
              <a href="#" onClick={handleGoToHome} className={currentPage === 'home' ? 'active-link' : ''}>Home</a>
              <a href="#" onClick={handleGoToWatchlist} className={currentPage === 'watchlist' ? 'active-link' : ''}>Watchlist</a>

              <ProfileMenu
                onLogout={handleGoToLogin}
                username={currentProfile ? currentProfile.name : currentUserName}
                onManageProfile={handleGoToManageProfile}
                onSettings={handleGoToSettings}
              />
              <button className="switch-profile-btn" onClick={() => setCurrentPage('profile_picker')} style={{ marginLeft: '10px', background: 'transparent', border: '1px solid #fff', color: '#fff', padding: '5px 10px', cursor: 'pointer', borderRadius: '4px' }}>
                Switch Profile
              </button>
            </div>

            {/* Mobile Menu Toggle Button */}
            <MenuIcon isOpen={isMobileMenuOpen} onClick={toggleMobileMenu} />

            {/* Mobile Menu Overlay */}
            <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
              <a href="#" onClick={handleGoToHome} className={currentPage === 'home' ? 'active-link' : ''}>Home</a>
              <a href="#" onClick={handleGoToWatchlist} className={currentPage === 'watchlist' ? 'active-link' : ''}>Watchlist</a>
              <a href="#" onClick={handleGoToManageProfile}>Manage Profile</a>
              <a href="#" onClick={handleGoToSettings}>Settings</a>
              <a href="#" onClick={() => { setCurrentPage('profile_picker'); closeMobileMenu(); }}>Switch Profile</a>
              <button className="mobile-logout-btn" onClick={handleGoToLogin}>Logout</button>
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
              userProgress={userProgress} // Pass user progress
              onToggleProgress={toggleProgressItem} // Pass toggle function
              onSelectMedia={handleSelectMedia} // Pass select handler
              onPlayMedia={handlePlayMedia} // Pass play handler
            />
          )}

          {/* Watchlist component requires the full catalog */}
          {currentPage === 'watchlist' && (
            <WatchlistPage
              fullMediaCatalog={fullMediaCatalog} // Pass the state
              userWatchlist={userWatchlist}
              onToggleWatchlist={toggleWatchlistItem}
              userProgress={userProgress} // Pass user progress
              onToggleProgress={toggleProgressItem} // Pass toggle function
              onSelectMedia={handleSelectMedia} // Pass select handler
            />
          )}
        </main>

        {/* Footer is added here for all logged-in views */}
        <Footer />
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