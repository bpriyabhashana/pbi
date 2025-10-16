// src/services/googleAppsScript.js

/**
 * Clean Google Apps Script Integration Service
 * Handles data submission to Google Sheets via Apps Script Web App
 */

const APPS_SCRIPT_URL = process.env.REACT_APP_APPS_SCRIPT_URL;

/**
 * Helper function to handle retry logic with exponential backoff
 * @param {Function} fn - Function to retry
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} baseDelay - Base delay in milliseconds
 * @returns {Promise} Result of the function
 */
const retryWithBackoff = async (fn, maxRetries = 3, baseDelay = 1000) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }
      
      // Exponential backoff: 1s, 2s, 4s
      const delay = baseDelay * Math.pow(2, attempt - 1);
      console.log(`Attempt ${attempt} failed, retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

/**
 * Sends assessment data to Google Apps Script
 * @param {Object} payload - Formatted data from googleSheetsData.js
 * @returns {Promise<Object>} Response from Apps Script
 */
export const sendToGoogleAppsScript = async (payload) => {
  try {
    if (!APPS_SCRIPT_URL) {
      throw new Error('Google Apps Script URL not configured');
    }

    console.log('📝 Sending data to Google Apps Script...', payload.rawData.formattedData);

    // Standard approach: Use no-cors mode for Google Apps Script
    // This avoids CORS preflight issues while maintaining reliability
    const response = await retryWithBackoff(async () => {
      return await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Use no-cors to avoid preflight OPTIONS request
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload.rawData.formattedData)
      });
    }, 3, 1000);

    // Log response details for debugging
    console.log('Response details:', {
      status: response.status,
      statusText: response.statusText,
      type: response.type,
      ok: response.ok,
      redirected: response.redirected,
      url: response.url
    });

    // With no-cors mode, we get an opaque response
    // We can't read the response body, but if the request didn't throw an error,
    // we can assume it was successful (Google Apps Script returns 302 on success)
    if (response.type === 'opaque') {
      console.log('✅ Apps Script Success (no-cors mode - request completed without error)');
      return {
        success: true,
        message: 'Data sent successfully to Google Sheets',
        timestamp: new Date().toISOString(),
        method: 'Google Apps Script (no-cors)',
        note: 'Response body not accessible due to no-cors mode, but request completed successfully'
      };
    }

    // Fallback handling for non-opaque responses (shouldn't happen with no-cors)
    if (response.status === 302 || response.ok) {
      console.log('✅ Apps Script Success (302 redirect indicates successful save)');
      return {
        success: true,
        message: 'Data saved successfully to Google Sheets',
        timestamp: new Date().toISOString(),
        method: 'Google Apps Script'
      };
    } else {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

  } catch (error) {
    console.error('❌ Apps Script Error:', error);
    
    // Enhanced error handling for different scenarios
    if (error.name === 'TypeError') {
      if (error.message.includes('fetch')) {
        throw new Error('Network Error: Unable to connect to Google Apps Script. Please check your internet connection and try again.');
      } else if (error.message.includes('Failed to fetch')) {
        throw new Error('Connection Error: Failed to reach Google Apps Script endpoint. The service might be temporarily unavailable.');
      }
    } else if (error.message.includes('CORS')) {
      throw new Error('CORS Error: This should not happen with no-cors mode. Please check the Apps Script deployment.');
    } else if (error.message.includes('not configured')) {
      throw new Error('Configuration Error: Google Apps Script URL is not properly configured in environment variables.');
    }
    
    // Re-throw the original error if we can't categorize it
    throw error;
  }
};

/**
 * Validates Apps Script configuration
 * @returns {Object} Configuration status
 */
export const validateAppsScriptConfig = () => {
  return {
    isConfigured: !!APPS_SCRIPT_URL,
    appsScriptUrl: APPS_SCRIPT_URL ? '✅ Configured' : '❌ Missing REACT_APP_APPS_SCRIPT_URL',
    method: 'Google Apps Script',
    status: APPS_SCRIPT_URL ? 'Ready' : 'Not configured'
  };
};

const googleAppsScript = {
  sendToGoogleAppsScript,
  validateAppsScriptConfig
};

export default googleAppsScript;