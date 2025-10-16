import React, { useState, useEffect, useRef } from 'react';
import { getCompleteBurnoutAssessment } from '../../utils/scoring';
import { createGoogleSheetsPayload, validateAssessmentCompletion } from '../../utils/googleSheetsData';
import { sendToGoogleAppsScript, validateAppsScriptConfig } from '../../services/googleAppsScript';
import Footer from '../commons/Footer';
import Header from '../commons/Header';
import { LIKERT_SCALE_OPTIONS, UI_TEXT, BURNOUT_CATEGORIES } from '../../const/const';
import speedometer from '../../assets/speedometer.png';

const ResultPage = ({ answers, questions, demographicData }) => {
  const assessment = getCompleteBurnoutAssessment(answers, questions);
  const { exhaustion_score, disengagement_score, professional_efficacy_score, burnoutLevel } = assessment;
  
  // State for collapsible sections
  const [expandedSections, setExpandedSections] = useState({});
  
  // Ref to prevent duplicate API calls
  const hasSubmitted = useRef(false);
  
  // Prepare Google Sheets data when component mounts (only once)
  useEffect(() => {
    const saveAssessmentData = async () => {
      // Prevent duplicate submissions
      if (hasSubmitted.current) {
        console.log('🔄 Duplicate submission prevented');
        return;
      }

      try {
        // Mark as submitted to prevent duplicates
        hasSubmitted.current = true;
        
        // Validate Apps Script configuration
        const config = validateAppsScriptConfig();
        console.log('🔧 Apps Script Configuration:', config);
        
        // Validate assessment completion
        const validation = validateAssessmentCompletion(answers);
        console.log('📋 Assessment Validation:', validation);
        
        if (validation.isComplete) {
          // Create the Google Sheets payload
          const googleSheetsPayload = createGoogleSheetsPayload(answers, demographicData);
          
          console.log('=== GOOGLE SHEETS DATA READY ===');
          console.log('📊 Payload for Google Sheets API:', googleSheetsPayload);
          console.log('📈 Data Structure:', {
            demographic: googleSheetsPayload.rawData.demographicFieldsProvided,
            answered: googleSheetsPayload.rawData.answeredQuestions,
            total: googleSheetsPayload.rawData.totalQuestions
          });
          
          // Send to Google Apps Script
          const result = await sendToGoogleAppsScript(googleSheetsPayload);
          console.log('✅ Apps Script Response:', result);
          
        } else {
          console.warn('⚠️ Assessment incomplete:', validation);
          // Reset flag if validation failed
          hasSubmitted.current = false;
        }
      } catch (error) {
        console.error('❌ Error saving assessment data:', error);
        // Reset flag on error so user can retry if needed
        hasSubmitted.current = false;
      }
    };
    
    // Only run if we have answers and haven't submitted yet
    if (answers && Object.keys(answers).length > 0 && !hasSubmitted.current) {
      saveAssessmentData();
    }
  }, [answers, demographicData]); // Include dependencies but use ref to prevent duplicates
  
  const toggleSection = (category) => {
    setExpandedSections(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };
  
  // Helper function to get Likert scale text
  const getLikertText = (value) => {
    const option = LIKERT_SCALE_OPTIONS.find(opt => opt.value === value);
    return option ? option.label : "No Answer";
  };
  
  // Helper function to get questions by category
  const getQuestionsByCategory = () => {
    const categories = {};
    questions.forEach(q => {
      if (!categories[q.category]) {
        categories[q.category] = [];
      }
      categories[q.category].push({
        ...q,
        answer: answers[q.id],
        answerText: getLikertText(answers[q.id])
      });
    });
    return categories;
  };
  
  // Helper function to get score interpretation
  const getScoreInterpretation = (score, category) => {
    if (category === "Professional Efficacy") {
      // Higher scores are better for Professional Efficacy
      if (score >= 4) return { level: "High", color: "text-green-600", bg: "bg-green-50", border: "border-green-200" };
      if (score >= 3) return { level: "Moderate", color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200" };
      return { level: "Low", color: "text-red-600", bg: "bg-red-50", border: "border-red-200" };
    } else {
      // Lower scores are better for Exhaustion and Disengagement
      if (score >= 4) return { level: "High Risk", color: "text-red-600", bg: "bg-red-50", border: "border-red-200" };
      if (score >= 3) return { level: "Moderate Risk", color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200" };
      return { level: "Low Risk", color: "text-green-600", bg: "bg-green-50", border: "border-green-200" };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header showLogo={true} title="Assessment Results" />

      {/* Main Content */}
      <div className="flex-1 py-12 px-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <img src={speedometer} alt="Speedometer" className="w-12 h-12" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {UI_TEXT.ASSESSMENT_RESULTS}
            </h1>
            <p className="text-gray-600 text-lg">
              {UI_TEXT.RESULTS_DESCRIPTION}
            </p>
          </div>

          {/* Overall Burnout Level */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{UI_TEXT.OVERALL_ASSESSMENT}</h2>
            <div className={`inline-block px-8 py-4 rounded-xl text-2xl font-bold ${burnoutLevel.color} ${burnoutLevel.bg} ${burnoutLevel.border} border-2 mb-6`}>
              {burnoutLevel.level}
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              {burnoutLevel.description}
            </p>
            <div className="bg-orange-25 rounded-lg p-4" style={{ backgroundColor: 'rgba(255, 237, 213, 0.3)' }}>
              <h4 className="font-medium text-gray-800 mb-2">Recommendation:</h4>
              <p className="text-gray-600 text-sm">
                {burnoutLevel.recommendation}
              </p>
            </div>
          </div>

          {/* Individual Category Results */}
          <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">{UI_TEXT.CATEGORY_BREAKDOWN}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            
            {/* Emotional Exhaustion */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {BURNOUT_CATEGORIES.EMOTIONAL_EXHAUSTION}
                </h3>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {exhaustion_score}
                </div>
                <div className="text-sm text-gray-500 mb-4">out of 5.0</div>
                
                {(() => {
                  const interpretation = getScoreInterpretation(exhaustion_score, "Emotional Exhaustion");
                  return (
                    <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${interpretation.color} ${interpretation.bg} ${interpretation.border} border`}>
                      {interpretation.level}
                    </div>
                  );
                })()}
                
                <p className="text-gray-600 text-sm mt-4 leading-relaxed">
                  {UI_TEXT.EMOTIONAL_EXHAUSTION_DESC}
                </p>
              </div>
            </div>

            {/* Disengagement */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {BURNOUT_CATEGORIES.DISENGAGEMENT}
                </h3>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {disengagement_score}
                </div>
                <div className="text-sm text-gray-500 mb-4">out of 5.0</div>
                
                {(() => {
                  const interpretation = getScoreInterpretation(disengagement_score, "Disengagement");
                  return (
                    <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${interpretation.color} ${interpretation.bg} ${interpretation.border} border`}>
                      {interpretation.level}
                    </div>
                  );
                })()}
                
                <p className="text-gray-600 text-sm mt-4 leading-relaxed">
                  Measures cynical attitudes and distance from work tasks
                </p>
              </div>
            </div>

            {/* Professional Efficacy */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Professional Efficacy
                </h3>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {professional_efficacy_score}
                </div>
                <div className="text-sm text-gray-500 mb-4">out of 5.0</div>
                
                {(() => {
                  const interpretation = getScoreInterpretation(professional_efficacy_score, "Professional Efficacy");
                  return (
                    <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${interpretation.color} ${interpretation.bg} ${interpretation.border} border`}>
                      {interpretation.level}
                    </div>
                  );
                })()}
                
                <p className="text-gray-600 text-sm mt-4 leading-relaxed">
                  Measures feelings of competence and achievement in work
                </p>
              </div>
            </div>
          </div>

          {/* Answer Review Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
              Review Your Answers
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Click on any category below to review your specific responses
            </p>
            
            <div className="space-y-4">
              {/* Demographic Information Section - Only show if demographic data exists and has content */}
              {demographicData && Object.keys(demographicData).length > 0 && Object.values(demographicData).some(value => value && value.trim() !== '') && (
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  {/* Demographic Header - Clickable */}
                  <button
                    onClick={() => toggleSection('demographic')}
                    className="w-full px-4 sm:px-6 py-4 bg-gray-50 hover:bg-gray-100 flex items-center justify-between text-left transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                      <h4 className="font-medium text-gray-800 text-sm sm:text-base">Demographic Information</h4>
                      <span className="text-xs sm:text-sm text-gray-500">
                        (Personal Details)
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs sm:text-sm text-gray-500">
                        {expandedSections['demographic'] ? 'Hide' : 'Show'} Details
                      </span>
                      <div className={`transform transition-transform duration-200 ${
                        expandedSections['demographic'] ? 'rotate-180' : ''
                      }`}>
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </button>
                  
                  {/* Demographic Content - Collapsible */}
                  {expandedSections['demographic'] && (
                    <div className="px-4 sm:px-6 py-4 bg-white border-t border-gray-200">
                      <div className="space-y-4">
                        {/* Age Range */}
                        {demographicData.ageRange && (
                          <div className="pb-4 border-b border-gray-100">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-800 mb-2">
                                  <span className="text-orange-500 font-semibold">Q1.</span> What's your age range?
                                </p>
                              </div>
                              <div className="flex-shrink-0">
                                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                                  {demographicData.ageRange}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Job Role */}
                        {demographicData.jobRole && (
                          <div className="pb-4 border-b border-gray-100">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-800 mb-2">
                                  <span className="text-orange-500 font-semibold">Q2.</span> What's your job role/industry?
                                </p>
                              </div>
                              <div className="flex-shrink-0">
                                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                                  {demographicData.jobRole.charAt(0).toUpperCase() + demographicData.jobRole.slice(1).replace(/-/g, ' ')}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Years Experience */}
                        {demographicData.yearsExperience && (
                          <div className="pb-4 border-b border-gray-100">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-800 mb-2">
                                  <span className="text-orange-500 font-semibold">Q3.</span> How many years of work experience do you have?
                                </p>
                              </div>
                              <div className="flex-shrink-0">
                                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                                  {demographicData.yearsExperience === 'less-than-1' ? '<1 year' :
                                   demographicData.yearsExperience === 'more-than-20' ? '20+ years' :
                                   demographicData.yearsExperience.replace(/-/g, ' ') + ' years'}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Work Hours */}
                        {demographicData.workHours && (
                          <div className="pb-4 border-b border-gray-100">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-800 mb-2">
                                  <span className="text-orange-500 font-semibold">Q4.</span> How many hours per week do you typically work?
                                </p>
                              </div>
                              <div className="flex-shrink-0">
                                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                                  {demographicData.workHours === 'part-time' ? '<30 hrs' :
                                   demographicData.workHours === 'more-than-70' ? '70+ hrs' :
                                   demographicData.workHours + ' hrs'}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Gender */}
                        {demographicData.gender && (
                          <div className="pb-4 border-b border-gray-100">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-800 mb-2">
                                  <span className="text-orange-500 font-semibold">Q5.</span> What's your gender?
                                </p>
                              </div>
                              <div className="flex-shrink-0">
                                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                                  {demographicData.gender.charAt(0).toUpperCase() + demographicData.gender.slice(1)}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Family Status */}
                        {demographicData.familyStatus && (
                          <div className="pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-800 mb-2">
                                  <span className="text-orange-500 font-semibold">Q6.</span> What's your family status?
                                </p>
                              </div>
                              <div className="flex-shrink-0">
                                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                                  {demographicData.familyStatus === 'married-no-children' ? 'Married - No kids' :
                                   demographicData.familyStatus === 'married-with-children' ? 'Married - With kids' :
                                   demographicData.familyStatus === 'single-parent' ? 'Single parent' :
                                   demographicData.familyStatus.charAt(0).toUpperCase() + demographicData.familyStatus.slice(1)}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {Object.entries(getQuestionsByCategory()).map(([category, categoryQuestions]) => (
                <div key={category} className="border border-gray-200 rounded-lg overflow-hidden">
                  {/* Category Header - Clickable */}
                  <button
                    onClick={() => toggleSection(category)}
                    className="w-full px-4 sm:px-6 py-4 bg-gray-50 hover:bg-gray-100 flex items-center justify-between text-left transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        category === "Emotional Exhaustion" ? "bg-red-400" :
                        category === "Disengagement" ? "bg-yellow-400" : "bg-green-400"
                      }`}></div>
                      <h4 className="font-medium text-gray-800 text-sm sm:text-base">{category}</h4>
                      <span className="text-xs sm:text-sm text-gray-500">
                        ({categoryQuestions.length} questions)
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs sm:text-sm text-gray-500">
                        {expandedSections[category] ? 'Hide' : 'Show'} Details
                      </span>
                      <div className={`transform transition-transform duration-200 ${
                        expandedSections[category] ? 'rotate-180' : ''
                      }`}>
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </button>
                  
                  {/* Category Content - Collapsible */}
                  {expandedSections[category] && (
                    <div className="px-4 sm:px-6 py-4 bg-white border-t border-gray-200">
                      <div className="space-y-4">
                        {categoryQuestions.map((q, index) => (
                          <div key={q.id} className="pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-800 mb-2">
                                  <span className="text-orange-500 font-semibold">Q{q.id}.</span> {q.question}
                                </p>
                              </div>
                              <div className="flex-shrink-0">
                                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                  q.answer >= 4 ? 'bg-red-100 text-red-700' :
                                  q.answer >= 3 ? 'bg-yellow-100 text-yellow-700' :
                                  q.answer >= 2 ? 'bg-blue-100 text-blue-700' :
                                  'bg-green-100 text-green-700'
                                }`}>
                                  {q.answerText}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Information Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Understanding Your Scores
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Score Interpretation:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• <strong>1.0-2.4:</strong> Low level</li>
                  <li>• <strong>2.5-3.4:</strong> Moderate level</li>
                  <li>• <strong>3.5-5.0:</strong> High level</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-2">What This Means:</h4>
                <p className="text-sm text-gray-600">
                  Higher exhaustion and disengagement scores indicate greater burnout risk, 
                  while higher professional efficacy scores indicate better workplace well-being.
                </p>
              </div>
            </div>
            
            <div className="mt-8">
              <button 
                onClick={() => window.location.reload()} 
                className="bg-orange-400 hover:bg-orange-500 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200"
              >
                Take Assessment Again
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ResultPage;