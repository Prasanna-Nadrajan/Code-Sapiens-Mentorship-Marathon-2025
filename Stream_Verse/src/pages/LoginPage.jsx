// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { mockUsers } from '../data/userData'; 

// LoginPage now accepts two props: onLoginSuccess AND onGoToSignup
const LoginPage = ({ onLoginSuccess, onGoToSignup }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // ... [handleSubmit function remains the same] ...
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const user = mockUsers.find(
      u => u.username === username && u.password === password
    );

    if (user) {
      onLoginSuccess();
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Sign In to Stream-Verse</h2>
        <form onSubmit={handleSubmit} className="login-form">
          {error && <p className="login-error">{error}</p>}
          
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
          {/* 💡 UPDATED LINK: Call the onGoToSignup function on click */}
          <a href="#" onClick={onGoToSignup}>Sign up now.</a> 
        </p>
      </div>
    </div>
  );
};

export default LoginPage;