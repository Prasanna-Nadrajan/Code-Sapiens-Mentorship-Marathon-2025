import React from 'react';

// This component shows user account details and management options
const ManageProfilePage = ({ username }) => {
  return (
    <div className="manage-page-container">
      <h1 className="page-title">Account Management</h1>
      <p className="page-subtitle">Welcome back, {username}. Manage your security and access here.</p>

      <div className="settings-section">
        <h3 className="section-title">Membership & Billing</h3>
        <div className="setting-card">
          <div className="setting-details">
            <p>Email: <span className="highlight-text">{username}@streamverse.com</span></p>
            <p>Plan: <span className="highlight-text">Premium (HD/4K)</span></p>
          </div>
          <button className="settings-btn secondary-btn">Change Plan</button>
        </div>
      </div>

      <div className="settings-section">
        <h3 className="section-title">Security & Privacy</h3>
        <div className="setting-card">
          <p>Password</p>
          <button className="settings-btn primary-btn">Change Password</button>
        </div>
        <div className="setting-card">
          <p>Security Pin (Requires pin to access profile)</p>
          <button className="settings-btn secondary-btn">Set Pin</button>
        </div>
      </div>
    </div>
  );
};

export default ManageProfilePage;