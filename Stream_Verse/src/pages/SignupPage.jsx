// src/pages/SignupPage.jsx
import React, { useState } from 'react';

// This component accepts a prop to switch back to the login view
const SignupPage = ({ onGoToLogin }) => {
  const [email, setEmail] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  const handleRegister = (e) => {
    e.preventDefault();
    
    // 💡 TO DO: In Week 2, this is where you would send the new user data 
    // to a database or save it to localStorage.
    
    alert(`Registration attempted for: ${newUsername}`);
    
    // After a simulated successful registration, send the user back to the login page
    onGoToLogin(); 
  };

  return (
    <div className="login-container"> {/* Reuse the login container styling */}
      <div className="login-box">
        <h2 className="login-title">Create Your Stream-Verse Account</h2>
        <form onSubmit={handleRegister} className="login-form">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            required
            className="login-input"
          />
          <input
            type="text"
            placeholder="Choose Username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)} 
            required
            className="login-input"
          />
          <input
            type="password"
            placeholder="Set Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="login-input"
          />
          <button type="submit" className="login-btn">
            Register Now
          </button>
        </form>
        <p className="login-signup">
          Already have an account? <a href="#" onClick={onGoToLogin}>Sign In</a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;