// src/utils/scoring.js
import { BURNOUT_CATEGORIES, BURNOUT_LEVELS, SCORING_THRESHOLDS, ASSESSMENT_CONFIG } from '../const/const';

/**
 * Calculate mean score for Emotional Exhaustion category
 * @param {Object} answers - User answers object
 * @param {Array} questions - Questions array
 * @returns {number} Mean score for emotional exhaustion
 */
export const calculateExhaustionScore = (answers, questions) => {
  const exhaustionQuestions = questions.filter(q => q.category === BURNOUT_CATEGORIES.EMOTIONAL_EXHAUSTION);
  const exhaustionAnswers = exhaustionQuestions
    .map(q => answers[q.id])
    .filter(answer => answer !== undefined);
  
  return exhaustionAnswers.length > 0 
    ? exhaustionAnswers.reduce((sum, score) => sum + score, 0) / exhaustionAnswers.length 
    : 0;
};

/**
 * Calculate mean score for Disengagement category
 * @param {Object} answers - User answers object
 * @param {Array} questions - Questions array
 * @returns {number} Mean score for disengagement
 */
export const calculateDisengagementScore = (answers, questions) => {
  const disengagementQuestions = questions.filter(q => q.category === BURNOUT_CATEGORIES.DISENGAGEMENT);
  const disengagementAnswers = disengagementQuestions
    .map(q => answers[q.id])
    .filter(answer => answer !== undefined);
  
  return disengagementAnswers.length > 0 
    ? disengagementAnswers.reduce((sum, score) => sum + score, 0) / disengagementAnswers.length 
    : 0;
};

/**
 * Calculate mean score for Professional Efficacy category
 * @param {Object} answers - User answers object
 * @param {Array} questions - Questions array
 * @returns {number} Mean score for professional efficacy
 */
export const calculateProfessionalEfficacyScore = (answers, questions) => {
  const efficacyQuestions = questions.filter(q => q.category === BURNOUT_CATEGORIES.PROFESSIONAL_EFFICACY);
  const efficacyAnswers = efficacyQuestions
    .map(q => answers[q.id])
    .filter(answer => answer !== undefined);
  
  return efficacyAnswers.length > 0 
    ? efficacyAnswers.reduce((sum, score) => sum + score, 0) / efficacyAnswers.length 
    : 0;
};

/**
 * Calculate all three main burnout scores
 * @param {Object} answers - User answers object
 * @param {Array} questions - Questions array
 * @returns {Object} Object with all three category scores
 */
export const calculateBurnoutScores = (answers, questions) => {
  return {
    exhaustion_score: Number(calculateExhaustionScore(answers, questions).toFixed(ASSESSMENT_CONFIG.DECIMAL_PLACES)),
    disengagement_score: Number(calculateDisengagementScore(answers, questions).toFixed(ASSESSMENT_CONFIG.DECIMAL_PLACES)),
    professional_efficacy_score: Number(calculateProfessionalEfficacyScore(answers, questions).toFixed(ASSESSMENT_CONFIG.DECIMAL_PLACES))
  };
};

/**
 * Determine overall burnout level based on the three scores
 * @param {number} exhaustion - Exhaustion score
 * @param {number} disengagement - Disengagement score
 * @param {number} efficacy - Professional efficacy score
 * @returns {Object} Burnout level with description and color coding
 */
export const determineBurnoutLevel = (exhaustion, disengagement, efficacy) => {
  // No burnout: exhaustion < 2.5, disengagement < 2.5, efficacy >= 3.5
  if (exhaustion < SCORING_THRESHOLDS.NO_BURNOUT.EXHAUSTION_MAX && 
      disengagement < SCORING_THRESHOLDS.NO_BURNOUT.DISENGAGEMENT_MAX && 
      efficacy >= SCORING_THRESHOLDS.NO_BURNOUT.EFFICACY_MIN) {
    return BURNOUT_LEVELS.NO_BURNOUT;
  }
  
  // Extreme burnout: exhaustion > 4, disengagement > 4, efficacy < 2
  if (exhaustion > SCORING_THRESHOLDS.EXTREME_BURNOUT.EXHAUSTION_MIN && 
      disengagement > SCORING_THRESHOLDS.EXTREME_BURNOUT.DISENGAGEMENT_MIN && 
      efficacy < SCORING_THRESHOLDS.EXTREME_BURNOUT.EFFICACY_MAX) {
    return BURNOUT_LEVELS.EXTREME_BURNOUT;
  }
  
  // Burnout: exhaustion > 3.5, disengagement > 3.5, efficacy < 2.5
  if (exhaustion > SCORING_THRESHOLDS.BURNOUT.EXHAUSTION_MIN && 
      disengagement > SCORING_THRESHOLDS.BURNOUT.DISENGAGEMENT_MIN && 
      efficacy < SCORING_THRESHOLDS.BURNOUT.EFFICACY_MAX) {
    return BURNOUT_LEVELS.BURNOUT;
  }
  
  // Moderate burnout: any combination that doesn't fit the above categories
  return BURNOUT_LEVELS.MODERATE_BURNOUT;
};

/**
 * Get complete burnout assessment including scores and level
 * @param {Object} answers - User answers object
 * @param {Array} questions - Questions array
 * @returns {Object} Complete assessment with scores and burnout level
 */
export const getCompleteBurnoutAssessment = (answers, questions) => {
  const scores = calculateBurnoutScores(answers, questions);
  const burnoutLevel = determineBurnoutLevel(
    scores.exhaustion_score,
    scores.disengagement_score,
    scores.professional_efficacy_score
  );
  
  return {
    ...scores,
    burnoutLevel
  };
};
