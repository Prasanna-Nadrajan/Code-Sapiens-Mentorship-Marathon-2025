// src/pages/LoginPage.jsx
import React, { useState } from 'react';
// 💡 NOTE: The static import of mockUsers should be removed or commented out 
// as the user list is now passed via props.
// import { mockUsers } from '../data/userData'; 

const LoginPage = ({ onLoginSuccess, onGoToSignup, allUsers }) => { // 👈 ACCEPT allUsers
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // 1. Use the dynamic list of users (allUsers prop) for authentication
    const user = allUsers.find(
      u => u.username === username && u.password === password
    );

    if (user) {
      onLoginSuccess(user.id); 
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Stream Verse</h2>
        <form onSubmit={handleSubmit} className="login-form">
          {/* Display error message */}
          {error && <p className="login-error" color='red'>{error}</p>} 
          
          <input
            type="text"
            placeholder="Username or Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)} 
            required
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
          <button type="submit" className="login-btn">
            Sign In
          </button>
        </form>
        <p className="login-signup">
          New to Stream-Verse? 
          <a href="#" onClick={onGoToSignup}>Sign up now.</a> 
        </p>
      </div>
    </div>
  );
};

export default LoginPage;