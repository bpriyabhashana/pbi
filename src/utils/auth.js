// src/utils/auth.js
// Authentication utility using localStorage

const AUTH_KEY = 'pbi_admin_auth';
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin'
};

/**
 * Check if user is currently authenticated
 * @returns {boolean} Authentication status
 */
export const isAuthenticated = () => {
  try {
    const authData = localStorage.getItem(AUTH_KEY);
    if (!authData) return false;
    
    const { isLoggedIn, timestamp } = JSON.parse(authData);
    
    // Check if login is still valid (24 hours)
    const now = Date.now();
    const twentyFourHours = 24 * 60 * 60 * 1000;
    
    if (now - timestamp > twentyFourHours) {
      // Session expired
      logout();
      return false;
    }
    
    return isLoggedIn;
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
};

/**
 * Attempt to login with username and password
 * @param {string} username 
 * @param {string} password 
 * @returns {boolean} Login success status
 */
export const login = (username, password) => {
  try {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      const authData = {
        isLoggedIn: true,
        timestamp: Date.now(),
        username: username
      };
      
      localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error during login:', error);
    return false;
  }
};

/**
 * Logout current user
 */
export const logout = () => {
  try {
    localStorage.removeItem(AUTH_KEY);
  } catch (error) {
    console.error('Error during logout:', error);
  }
};

/**
 * Get current user information
 * @returns {object|null} User info or null
 */
export const getCurrentUser = () => {
  try {
    if (!isAuthenticated()) return null;
    
    const authData = localStorage.getItem(AUTH_KEY);
    const { username } = JSON.parse(authData);
    
    return { username };
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};