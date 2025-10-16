// src/const/const.js

// Application Constants

// App Information
export const APP_INFO = {
  NAME: 'Burnout Assessment',
  FULL_NAME: "Priyabhashana's Burnout Inventory",
  ABBREVIATED_NAME: 'PBI',
  TAGLINE: 'Professional Self-Assessment Tool',
  SUBTITLE: 'Occupational Burnout Inventory',
  VERSION: '2025',
  DEVELOPER: 'Buddhika Priyabhashana'
};

// Likert Scale Options
export const LIKERT_SCALE_OPTIONS = [
  { value: 1, label: "Strongly Disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly Agree" }
];

// Burnout Categories
export const BURNOUT_CATEGORIES = {
  EMOTIONAL_EXHAUSTION: "Emotional Exhaustion",
  DISENGAGEMENT: "Disengagement", 
  PROFESSIONAL_EFFICACY: "Professional Efficacy"
};

// UI Text Constants
export const UI_TEXT = {
  // Navigation
  NEXT: "Next",
  PREVIOUS: "Previous", 
  BACK: "Back",
  COMPLETE: "Complete",
  START_ASSESSMENT: "Start Assessment",
  TAKE_ASSESSMENT_AGAIN: "Take Assessment Again",
  
  // Status Messages
  ASSESSMENT_COMPLETE: "Assessment Complete",
  APP_NAME: "Burnout Assessment",
  ANSWERED: "answered",
  SHOW_DETAILS: "Show Details",
  HIDE_DETAILS: "Hide Details",
  
  // Page Titles
  DISCOVER_BURNOUT_LEVEL: "Discover Your Burnout Level",
  ASSESSMENT_RESULTS: "Your Burnout Assessment Results",
  OVERALL_ASSESSMENT: "Overall Assessment",
  CATEGORY_BREAKDOWN: "Category Breakdown",
  UNDERSTANDING_SCORES: "Understanding Your Scores",
  REVIEW_ANSWERS: "Review Your Answers",
  RECOMMENDED_ACTION_STEPS: "💡 Recommended Action Steps",
  
  // Descriptions
  ASSESSMENT_DESCRIPTION: "Take this comprehensive 18-question assessment to understand your current burnout level.",
  TOOL_DESCRIPTION: "This scientifically-backed tool evaluates emotional exhaustion, disengagement, and professional efficacy to provide you with actionable insights.",
  RESULTS_DESCRIPTION: "Here's your detailed breakdown across the three key burnout dimensions",
  REVIEW_DESCRIPTION: "Click on any category below to review your specific responses",
  
  // Feature Labels
  QUICK_EASY: "Quick & Easy",
  COMPREHENSIVE: "Comprehensive", 
  IMMEDIATE_FEEDBACK: "Immediate Feedback",
  FIVE_MINUTES: "5 minutes",
  EIGHTEEN_QUESTIONS: "18 questions",
  INSTANT_RESULTS: "Instant results",
  
  // Category Descriptions
  EMOTIONAL_EXHAUSTION_DESC: "Measures feelings of being emotionally drained and depleted by work",
  DISENGAGEMENT_DESC: "Measures cynical attitudes and distance from work tasks",
  PROFESSIONAL_EFFICACY_DESC: "Measures feelings of competence and achievement in work",
  
  // Score Interpretation
  SCORE_INTERPRETATION: "Score Interpretation:",
  WHAT_THIS_MEANS: "What This Means:",
  LOW_LEVEL: "1.0-2.4: Low level",
  MODERATE_LEVEL: "2.5-3.4: Moderate level", 
  HIGH_LEVEL: "3.5-5.0: High level",
  SCORE_EXPLANATION: "Higher exhaustion and disengagement scores indicate greater burnout risk, while higher professional efficacy scores indicate better workplace well-being.",
  
  // Footer
  COPYRIGHT: "© Developed by",
  ALL_RIGHTS_RESERVED: "All rights reserved"
};

// Burnout Level Classifications
export const BURNOUT_LEVELS = {
  NO_BURNOUT: {
    level: "No Burnout",
    description: "You are showing no signs of burnout. Your emotional energy is strong, you feel engaged with your work, and you maintain a high sense of professional accomplishment.",
    color: "text-green-600",
    bg: "bg-green-50", 
    border: "border-green-200",
    recommendation: "Continue maintaining your current work-life balance and self-care practices."
  },
  MODERATE_BURNOUT: {
    level: "Moderate Burnout",
    description: "You are experiencing some burnout symptoms. While not at a critical level, this indicates areas that need attention to prevent progression.",
    color: "text-yellow-600",
    bg: "bg-yellow-50",
    border: "border-yellow-200", 
    recommendation: "Consider adjusting your work schedule, improving work-life balance, and implementing stress management techniques."
  },
  BURNOUT: {
    level: "Burnout",
    description: "You are experiencing significant burnout symptoms that require attention and intervention to prevent further deterioration.",
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-200",
    recommendation: "Consider speaking with a healthcare professional, HR representative, or counselor. Take steps to reduce workload and implement stress management strategies."
  },
  EXTREME_BURNOUT: {
    level: "Extreme Burnout", 
    description: "You are experiencing extreme burnout symptoms across all dimensions. This is a critical level that requires immediate intervention and professional support.",
    color: "text-red-700",
    bg: "bg-red-100",
    border: "border-red-300",
    recommendation: "Seek immediate professional help from a healthcare provider, counselor, or mental health specialist. Consider taking time off work and implementing immediate stress reduction measures."
  }
};

// Scoring Thresholds
export const SCORING_THRESHOLDS = {
  NO_BURNOUT: {
    EXHAUSTION_MAX: 2.5,
    DISENGAGEMENT_MAX: 2.5,
    EFFICACY_MIN: 3.5
  },
  EXTREME_BURNOUT: {
    EXHAUSTION_MIN: 4,
    DISENGAGEMENT_MIN: 4, 
    EFFICACY_MAX: 2
  },
  BURNOUT: {
    EXHAUSTION_MIN: 3.5,
    DISENGAGEMENT_MIN: 3.5,
    EFFICACY_MAX: 2.5
  }
};

// Score Interpretation Labels
export const SCORE_LABELS = {
  HIGH: "High",
  MODERATE: "Moderate", 
  LOW: "Low",
  HIGH_RISK: "High Risk",
  MODERATE_RISK: "Moderate Risk",
  LOW_RISK: "Low Risk"
};

// Color Theme Constants
export const COLORS = {
  CATEGORY_COLORS: {
    EMOTIONAL_EXHAUSTION: "bg-red-400",
    DISENGAGEMENT: "bg-yellow-400", 
    PROFESSIONAL_EFFICACY: "bg-green-400"
  }
};

// Assessment Configuration
export const ASSESSMENT_CONFIG = {
  TOTAL_QUESTIONS: 18,
  DECIMAL_PLACES: 2,
  MAX_SCORE: 5.0
};

const CONSTANTS = {
  APP_INFO,
  LIKERT_SCALE_OPTIONS,
  BURNOUT_CATEGORIES,
  UI_TEXT,
  BURNOUT_LEVELS,
  SCORING_THRESHOLDS,
  SCORE_LABELS,
  COLORS,
  ASSESSMENT_CONFIG
};

export default CONSTANTS;
