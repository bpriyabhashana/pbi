// src/utils/googleSheetsData.js

import questions from '../data/questions';

/**
 * Formats user assessment data for Google Sheets export
 * @param {Object} answers - User's question answers (questionId: likertValue)
 * @param {Object} demographicData - User's demographic data
 * @returns {Object} Formatted data ready for Google Sheets API
 */
export const formatDataForGoogleSheets = (answers, demographicData = {}) => {
  // Initialize the data object with all possible headers
  const formattedData = {
    // Demographic data (can be null if not provided)
    ageRanges: demographicData.ageRange || null,
    genderOptions: demographicData.gender || null,
    jobRoles: demographicData.jobRole || null,
    yearsExperienceOptions: demographicData.yearsExperience || null,
    workHoursOptions: demographicData.workHours || null,
    familyStatusOptions: demographicData.familyStatus || null,
    
    // Assessment questions - initialize all to null first
    EE1: null, EE2: null, EE3: null, EE4: null, EE5: null, EE6: null, EE7: null,
    DE1: null, DE2: null, DE3: null, DE4: null, DE5: null, DE6: null,
    PE1: null, PE2: null, PE3: null, PE4: null, PE5: null
  };

  // Map question answers using the question value (EE1, DE1, etc.) as key
  questions.forEach(question => {
    const questionValue = question.value; // e.g., "EE1", "DE2", "PE3"
    const userAnswer = answers[question.id]; // Likert scale value (1-5)
    
    if (userAnswer !== undefined && userAnswer !== null) {
      formattedData[questionValue] = userAnswer;
    }
  });

  return formattedData;
};

/**
 * Gets the column headers for Google Sheets in the correct order
 * @returns {Array} Array of column headers
 */
export const getGoogleSheetsHeaders = () => {
  return [
    // Demographic headers
    'ageRanges',
    'genderOptions', 
    'jobRoles',
    'yearsExperienceOptions',
    'workHoursOptions',
    'familyStatusOptions',
    
    // Assessment question headers
    'EE1', 'EE2', 'EE3', 'EE4', 'EE5', 'EE6', 'EE7',
    'DE1', 'DE2', 'DE3', 'DE4', 'DE5', 'DE6',
    'PE1', 'PE2', 'PE3', 'PE4', 'PE5'
  ];
};

/**
 * Converts formatted data to array format for Google Sheets API
 * @param {Object} formattedData - Data formatted by formatDataForGoogleSheets
 * @returns {Array} Array of values in header order
 */
export const convertToArrayFormat = (formattedData) => {
  const headers = getGoogleSheetsHeaders();
  return headers.map(header => formattedData[header]);
};

/**
 * Creates the complete payload for Google Sheets API request
 * @param {Object} answers - User's question answers
 * @param {Object} demographicData - User's demographic data
 * @returns {Object} Complete request payload
 */
export const createGoogleSheetsPayload = (answers, demographicData = {}) => {
  const formattedData = formatDataForGoogleSheets(answers, demographicData);
  const valuesArray = convertToArrayFormat(formattedData);
  
  return {
    // Google Sheets API format
    range: 'Sheet1!A:Z', // Adjust range as needed
    majorDimension: 'ROWS',
    values: [valuesArray],
    
    // Additional metadata
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    
    // Raw data for debugging
    rawData: {
      formattedData,
      headers: getGoogleSheetsHeaders(),
      totalQuestions: questions.length,
      answeredQuestions: Object.keys(answers).length,
      demographicFieldsProvided: Object.keys(demographicData).filter(key => 
        demographicData[key] && demographicData[key].trim() !== ''
      ).length
    }
  };
};

/**
 * Validates that all required assessment questions are answered
 * @param {Object} answers - User's question answers
 * @returns {Object} Validation result
 */
export const validateAssessmentCompletion = (answers) => {
  const totalQuestions = questions.length;
  const answeredQuestions = Object.keys(answers).length;
  const missingQuestions = [];
  
  questions.forEach(question => {
    if (!answers[question.id]) {
      missingQuestions.push({
        id: question.id,
        value: question.value,
        question: question.question
      });
    }
  });
  
  return {
    isComplete: answeredQuestions === totalQuestions,
    totalQuestions,
    answeredQuestions,
    missingQuestions,
    completionPercentage: Math.round((answeredQuestions / totalQuestions) * 100)
  };
};

/**
 * Example usage and testing function
 */
export const exampleUsage = () => {
  // Example answers data
  const exampleAnswers = {
    1: 4, 2: 3, 3: 5, 4: 2, 5: 4, 6: 3, 7: 5, // EE1-EE7
    8: 2, 9: 1, 10: 3, 11: 2, 12: 4, 13: 3,    // DE1-DE6
    14: 4, 15: 5, 16: 3, 17: 4, 18: 5           // PE1-PE5
  };
  
  // Example demographic data
  const exampleDemographicData = {
    ageRange: '25-34',
    gender: 'female',
    jobRole: 'technology',
    yearsExperience: '3-5',
    workHours: '41-50',
    familyStatus: 'single'
  };
  
  console.log('=== Google Sheets Data Formatting Example ===');
  console.log('Formatted Data:', formatDataForGoogleSheets(exampleAnswers, exampleDemographicData));
  console.log('Headers:', getGoogleSheetsHeaders());
  console.log('Array Format:', convertToArrayFormat(formatDataForGoogleSheets(exampleAnswers, exampleDemographicData)));
  console.log('Complete Payload:', createGoogleSheetsPayload(exampleAnswers, exampleDemographicData));
  console.log('Validation:', validateAssessmentCompletion(exampleAnswers));
};

const googleSheetsUtils = {
  formatDataForGoogleSheets,
  getGoogleSheetsHeaders,
  convertToArrayFormat,
  createGoogleSheetsPayload,
  validateAssessmentCompletion,
  exampleUsage
};

export default googleSheetsUtils;