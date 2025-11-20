// src/hooks/useUserManagement.js
import { useState, useEffect } from 'react';
import { mockUsers } from '../data/userData'; // Fallback data

const USER_STORAGE_KEY = 'streamverse-users';

const useUserManagement = () => {
  // State to hold the dynamic list of all users
  const [allUsers, setAllUsers] = useState(() => {
    try {
      const item = window.localStorage.getItem(USER_STORAGE_KEY);
      // Load from localStorage, or use mockUsers as the initial fallback list
      return item ? JSON.parse(item) : mockUsers;
    } catch (error) {
      console.error("Failed to read user data from localStorage:", error);
      return mockUsers;
    }
  });

  // Effect to save the global user list to localStorage whenever the state changes
  useEffect(() => {
    try {
      window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(allUsers));
    } catch (error) {
      console.error("Failed to write user data to localStorage:", error);
    }
  }, [allUsers]);

  // Function to add a new user to the list
  const registerUser = ({ username, password, email }) => {
    // 1. Basic Validation: Check if username already exists
    const userExists = allUsers.some(user => user.username === username);
    if (userExists) {
      return { success: false, message: 'Username already taken.' };
    }

    // 2. Create new user object with a simple unique ID (using timestamp)
    const newUser = {
      username,
      password,
      id: Date.now().toString(), // Simple unique ID
      email: email,
      profiles: [
        {
          id: `${Date.now()}-main`,
          name: 'Main',
          avatar: '👤' // Default avatar
        }
      ]
    };

    // 3. Update state by appending the new user (triggers localStorage save)
    setAllUsers([...allUsers, newUser]);

    return { success: true, message: 'Registration successful!' };
  };

  // Function to add a profile to a user
  const addProfile = (userId, profileName, avatar) => {
    setAllUsers(prevUsers => {
      return prevUsers.map(user => {
        if (user.id === userId) {
          // Check if profile limit reached (max 5)
          if (user.profiles && user.profiles.length >= 5) {
            return user; // Or throw error/handle UI side
          }

          const newProfile = {
            id: `${userId}-${Date.now()}`,
            name: profileName,
            avatar: avatar || '👤'
          };

          // Ensure profiles array exists (migration for old users)
          const currentProfiles = user.profiles || [];
          return { ...user, profiles: [...currentProfiles, newProfile] };
        }
        return user;
      });
    });
  };

  // Helper to get profiles for a user (handling migration on read if needed, though better to migrate on write/access)
  const getUserProfiles = (userId) => {
    const user = allUsers.find(u => u.id === userId);
    if (!user) return [];

    // Migration: If user has no profiles, return a virtual default one or empty
    // Ideally we should update the user object in state if it's missing profiles, 
    // but for a getter, we just return what's there or a default.
    if (!user.profiles || user.profiles.length === 0) {
      // Return a temporary default profile structure so the UI doesn't break
      // Real migration happens if they try to "add" or we can do a lazy fix effect.
      return [{ id: `${userId}-default`, name: 'Main', avatar: '👤' }];
    }
    return user.profiles;
  };

  // Function to delete a profile
  const deleteProfile = (userId, profileId) => {
    setAllUsers(prevUsers => {
      return prevUsers.map(user => {
        if (user.id === userId) {
          const currentProfiles = user.profiles || [];
          // Prevent deleting the last profile
          if (currentProfiles.length <= 1) {
            return user;
          }
          const updatedProfiles = currentProfiles.filter(p => p.id !== profileId);
          return { ...user, profiles: updatedProfiles };
        }
        return user;
      });
    });
  };

  return { allUsers, registerUser, addProfile, getUserProfiles, deleteProfile };
};

export default useUserManagement;