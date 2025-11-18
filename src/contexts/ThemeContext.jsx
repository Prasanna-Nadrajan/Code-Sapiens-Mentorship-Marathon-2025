// src/contexts/ThemeContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';

// 1. Create the Context object
export const ThemeContext = createContext({
  theme: 'dark',
  toggleTheme: () => {},
});

// Key for localStorage persistence
const LOCAL_STORAGE_KEY = 'streamverse-theme';

// 2. Create the Provider component
export const ThemeProvider = ({ children }) => {
  // Initialize state from localStorage or default to 'dark'
  const [theme, setTheme] = useState(() => {
    try {
      const storedTheme = localStorage.getItem(LOCAL_STORAGE_KEY);
      return storedTheme || 'dark';
    } catch (error) {
      console.error("Could not read theme from localStorage:", error);
      return 'dark';
    }
  });

  // Effect to apply the theme to the document body and save to localStorage
  useEffect(() => {
    const root = document.documentElement;
    
    // Apply the theme class to the root element (used by CSS variables)
    root.setAttribute('data-theme', theme);

    // Save preference to localStorage
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, theme);
    } catch (error) {
      console.error("Could not save theme to localStorage:", error);
    }
  }, [theme]);

  // Function to switch between 'dark' and 'light'
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 3. Custom Hook for easy access (optional, but good practice)
export const useTheme = () => useContext(ThemeContext);