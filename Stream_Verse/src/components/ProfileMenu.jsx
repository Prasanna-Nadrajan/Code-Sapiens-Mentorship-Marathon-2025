import React, { useState } from 'react';

// FIX: Accept the username prop
const ProfileMenu = ({ onLogout, username }) => { 
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  // Example placeholder image for a generic profile avatar
  const avatarUrl = "https://placehold.co/40x40/E50914/ffffff?text=U"; 
  // FIX: Use the passed username prop
  const displayUsername = username || "Guest"; 

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

          <a href="#" className="dropdown-item">
            Manage Profile
          </a>
          
          <a href="#" className="dropdown-item">
            Settings
          </a>

          <div className="dropdown-divider"></div>

          {/* Logout Button */}
          <button 
            onClick={onLogout} 
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