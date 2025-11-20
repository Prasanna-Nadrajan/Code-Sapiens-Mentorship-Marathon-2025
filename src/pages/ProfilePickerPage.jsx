import React, { useState } from 'react';
import './ProfilePickerPage.css'; // We'll create this CSS file next

const AVATARS = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵'];

const ProfilePickerPage = ({ profiles, onSelectProfile, onAddProfile, onDeleteProfile }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [newProfileName, setNewProfileName] = useState('');
    const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0]);

    const [activeMenuProfileId, setActiveMenuProfileId] = useState(null);

    const handleAddClick = () => {
        setIsAdding(true);
        setActiveMenuProfileId(null); // Close any open menus
    };

    const handleCancelAdd = () => {
        setIsAdding(false);
        setNewProfileName('');
        setSelectedAvatar(AVATARS[0]);
    };

    const handleSaveProfile = (e) => {
        e.preventDefault();
        if (newProfileName.trim()) {
            onAddProfile(newProfileName, selectedAvatar);
            handleCancelAdd();
        }
    };

    const toggleMenu = (e, profileId) => {
        e.stopPropagation();
        if (activeMenuProfileId === profileId) {
            setActiveMenuProfileId(null);
        } else {
            setActiveMenuProfileId(profileId);
        }
    };

    // Close menu when clicking outside
    React.useEffect(() => {
        const handleClickOutside = () => setActiveMenuProfileId(null);
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <div className="profile-picker-container">
            <div className="profile-picker-content">
                <h1>Who's Watching?</h1>

                <div className="profiles-grid">
                    {profiles.map(profile => (
                        <div
                            key={profile.id}
                            className="profile-card"
                            onClick={() => onSelectProfile(profile.id)}
                        >
                            <div className="profile-avatar-wrapper">
                                <div className="profile-avatar">{profile.avatar}</div>
                                <div className="profile-menu-container">
                                    <button
                                        className={`profile-menu-btn ${activeMenuProfileId === profile.id ? 'active' : ''}`}
                                        onClick={(e) => toggleMenu(e, profile.id)}
                                    >
                                        ⋮
                                    </button>
                                    {activeMenuProfileId === profile.id && (
                                        <div className="profile-menu-dropdown">
                                            {/* Future: Add Edit option here */}
                                            {profiles.length > 1 && (
                                                <div
                                                    className="profile-menu-item delete"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        onDeleteProfile(profile.id);
                                                    }}
                                                >
                                                    🗑️ Delete Profile
                                                </div>
                                            )}
                                            {profiles.length <= 1 && (
                                                <div className="profile-menu-item" style={{ cursor: 'default', opacity: 0.5 }}>
                                                    Cannot delete last profile
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <span className="profile-name">{profile.name}</span>
                        </div>
                    ))}

                    {profiles.length < 5 && !isAdding && (
                        <div className="profile-card add-profile-btn" onClick={handleAddClick}>
                            <div className="profile-avatar add-icon">+</div>
                            <span className="profile-name">Add Profile</span>
                        </div>
                    )}
                </div>

                {isAdding && (
                    <div className="add-profile-form-overlay">
                        <div className="add-profile-form">
                            <h2>Add New Profile</h2>
                            <form onSubmit={handleSaveProfile}>
                                <div className="avatar-selection">
                                    <p>Choose an Avatar:</p>
                                    <div className="avatar-grid">
                                        {AVATARS.map(avatar => (
                                            <span
                                                key={avatar}
                                                className={`avatar-option ${selectedAvatar === avatar ? 'selected' : ''}`}
                                                onClick={() => setSelectedAvatar(avatar)}
                                            >
                                                {avatar}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <input
                                    type="text"
                                    placeholder="Profile Name"
                                    value={newProfileName}
                                    onChange={(e) => setNewProfileName(e.target.value)}
                                    maxLength={15}
                                    autoFocus
                                />

                                <div className="form-actions">
                                    <button type="button" onClick={handleCancelAdd} className="cancel-btn">Cancel</button>
                                    <button type="submit" className="save-btn" disabled={!newProfileName.trim()}>Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePickerPage;
