// src/components/ProfileMenu.jsx
import React, { useState } from 'react';
// IMPORT useTheme hook
import { useTheme } from '../contexts/ThemeContext.jsx'; 

// FIX: Accept new handler props
const ProfileMenu = ({ onLogout, username, onManageProfile, onSettings }) => { 
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme(); // Use Theme Hook

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  // Example placeholder image for a generic profile avatar
  const avatarUrl = "https://placehold.co/40x40/E50914/ffffff?text=U"; 
  // FIX: Use the passed username prop
  const displayUsername = username || "Guest"; 

  // FIX: Handler to close menu after clicking a link
  const handleProfileClick = (handler) => {
      handler();
      setIsOpen(false);
  };

  return (
    <div className="profile-menu-container">
      {/* Profile Button (Replaces Logout Button) */}
      <button onClick={toggleMenu} className="profile-btn">
        <img 
          src={avatarUrl} 
          alt="User Avatar" 
          className="profile-avatar"
        />
        {/* FIX: Display the real username */}
        <span className="profile-username">{displayUsername}</span>
      </button>

      {/* The Pop-up Menu */}
      {isOpen && (
        <div className="profile-dropdown">
          <div className="dropdown-item profile-info-header">
            <p className="text-sm font-bold">Logged in as:</p>
            {/* FIX: Display the real username */}
            <p className="text-xs text-gray-400">{displayUsername}</p>
          </div>
          
          <div className="dropdown-divider"></div>

          {/* Theme Toggle Button (NEW) */}
          <button 
            className="dropdown-item" 
            onClick={() => handleProfileClick(toggleTheme)}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
          
          <div className="dropdown-divider"></div>
          
          {/* FIX: Use onClick to call new handlers */}
          <a href="#" className="dropdown-item" onClick={() => handleProfileClick(onManageProfile)}>
            Manage Profile
          </a>
          
          <a href="#" className="dropdown-item" onClick={() => handleProfileClick(onSettings)}>
            Settings
          </a>

          <div className="dropdown-divider"></div>

          {/* Logout Button */}
          <button 
            onClick={() => handleProfileClick(onLogout)} // FIX: Use handleProfileClick
            className="dropdown-item logout-btn-option"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;