import React, { useState } from 'react';

// This component handles app-specific settings
const SettingsPage = () => {
  const [language, setLanguage] = useState('English');
  const [playbackQuality, setPlaybackQuality] = useState('Auto');

  return (
    <div className="manage-page-container">
      <h1 className="page-title">Application Settings</h1>
      <p className="page-subtitle">Personalize your Stream-Verse viewing experience.</p>

      <div className="settings-section">
        <h3 className="section-title">Playback Preferences</h3>
        <div className="setting-card">
          <label htmlFor="quality-select">Default Video Quality</label>
          <select 
            id="quality-select" 
            value={playbackQuality} 
            onChange={(e) => setPlaybackQuality(e.target.value)}
            className="settings-select"
          >
            <option value="Auto">Auto (Best available)</option>
            <option value="High">High (Up to 4K)</option>
            <option value="Medium">Medium (Up to 1080p)</option>
            <option value="Low">Low (Up to 480p)</option>
          </select>
        </div>
        <div className="setting-card">
          <p>Autoplay next episode in a series</p>
          <label className="switch">
            <input type="checkbox" defaultChecked />
            <span className="slider round"></span>
          </label>
        </div>
      </div>

      <div className="settings-section">
        <h3 className="section-title">Language & Subtitles</h3>
        <div className="setting-card">
          <label htmlFor="language-select">App Language</label>
          <select 
            id="language-select" 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            className="settings-select"
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Tamil">Tamil</option>
            <option value="Japanese">Japanese</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;