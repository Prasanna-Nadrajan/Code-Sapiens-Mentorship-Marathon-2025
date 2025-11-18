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
    };

    // 3. Update state by appending the new user (triggers localStorage save)
    setAllUsers([...allUsers, newUser]);
    
    return { success: true, message: 'Registration successful!' };
  };

  return { allUsers, registerUser };
};

export default useUserManagement;