// src/pages/SignupPage.jsx
import React, { useState } from 'react';

const SignupPage = ({ onGoToLogin, onRegister }) => { // 👈 ACCEPT onRegister
  const [email, setEmail] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  
  const handleRegister = (e) => {
    e.preventDefault();
    setError('');

    // 1. Call the registration function passed from App.jsx
    const result = onRegister({ 
        username: newUsername, 
        password: newPassword,
        email: email
    });
    
    if (result.success) {
      alert(`Registration successful for: ${newUsername}! Please log in.`);
      onGoToLogin(); // 2. Redirect to login page on success
    } else {
      setError(result.message); // 3. Show error if user already exists
    }
  };

  return (
    <div className="login-container"> 
      <div className="login-box">
        <h2 className="login-title">Create Your Stream-Verse Account</h2>
        <form onSubmit={handleRegister} className="login-form">
          {/* Display error message */}
          {error && <p className="login-error">{error}</p>}

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