import React, { useState } from 'react';
import LikertScale from './LikertScale';
import Footer from '../commons/Footer';
import Logo from '../commons/Logo';

const QuestionPage = ({ 
  question, 
  questionNumber, 
  total, 
  onNext, 
  onBack, 
  onQuestionSelect, 
  answers = {},
  questionCategory,
  cameFromDemographic = false
}) => {
  const [selected, setSelected] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Set selection based on previously answered questions
  React.useEffect(() => {
    setSelected(answers[questionNumber] || null);
  }, [questionNumber, answers]);



  // Auto-advance when an answer is selected
  React.useEffect(() => {
    if (selected !== null && selected !== answers[questionNumber]) {
      // Show transition indicator
      setIsTransitioning(true);
      
      // Small delay for visual feedback, then advance
      const timer = setTimeout(() => {
        onNext(selected);
        setIsTransitioning(false);
      }, 200);
      
      return () => {
        clearTimeout(timer);
        setIsTransitioning(false);
      };
    }
  }, [selected, answers, questionNumber, onNext]);

  const handleNext = () => {
    if (selected !== null && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        onNext(selected);
        setIsTransitioning(false);
      }, 100);
    }
  };

  const handleBack = () => {
    if (onBack && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        onBack();
        setIsTransitioning(false);
      }, 200);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Simple CSS for loading indicator */}
      <style>{`
        .loading-spinner {
          border: 3px solid #f3f4f6;
          border-top: 3px solid #fb923c;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .transition-overlay {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(2px);
        }
        
        .fade-content {
          opacity: ${isTransitioning ? '0.3' : '1'};
          transition: opacity 0.3s ease;
        }
      `}</style>
      
      {/* Compact Header */}
      <header className="w-full bg-white border-b border-gray-200 px-4 py-2 sm:px-6 sm:py-3 flex-shrink-0">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Logo size="small" showText={true} />
          <div className="flex items-center space-x-2 sm:space-x-4">
            <span className="text-xs sm:text-sm text-gray-500">
              Q {questionNumber}/{total}
            </span>
            <span className="text-xs sm:text-sm font-medium text-orange-500">
              {Math.round((questionNumber / total) * 100)}%
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-2 sm:p-3 lg:p-4">
        <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-1 sm:h-2 mb-2 sm:mb-3 flex-shrink-0">
            <div 
              className="bg-orange-400 h-1 sm:h-2 rounded-full transition-all duration-300"
              style={{ width: `${(questionNumber / total) * 100}%` }}
            ></div>
          </div>

          {/* Question Numbers - Display Only Grid */}
          <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4 justify-center flex-shrink-0">
            {Array.from({ length: total }, (_, i) => i + 1).map((qNum) => (
              <div
                key={qNum}
                className={`w-6 h-6 sm:w-8 sm:h-8 rounded text-xs sm:text-sm font-medium flex items-center justify-center ${
                  qNum === questionNumber
                    ? 'bg-orange-400 text-white shadow-md'
                    : answers[qNum]
                    ? 'bg-green-100 text-green-700 border border-green-300'
                    : 'bg-white text-gray-600 border border-gray-200'
                }`}
              >
                {qNum}
              </div>
            ))}
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 p-3 sm:p-4 lg:p-5 mb-4 flex flex-col relative">
            
            {/* Transition Overlay */}
            {isTransitioning && (
              <div className="absolute inset-0 transition-overlay rounded-xl sm:rounded-2xl flex items-center justify-center z-10">
                <div className="flex flex-col items-center space-y-3">
                  <div className="loading-spinner"></div>
                  <span className="text-sm text-gray-600 font-medium">Loading next question...</span>
                </div>
              </div>
            )}
            
            {/* Question Content */}
            <div className="fade-content">
              <div>
                {/* Question Header Section */}
                <div className="text-center mb-5 sm:mb-6">
                  
                  {/* Question Text with Enhanced Styling */}
                  <div className="bg-gradient-to-r from-gray-50 to-orange-50 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-5 border-l-4 border-b-4 border-orange-190" 
                       style={{ 
                         boxShadow: '-4px 4px 12px rgba(251, 146, 60, 0.15), -2px 2px 6px rgba(251, 146, 60, 0.1)' 
                       }}>
                    <h2 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-gray-800 leading-snug max-w-4xl mx-auto break-words">
                      {question?.question}
                    </h2>
                  </div>
                </div>

                {/* Likert Scale */}
                <div className="flex items-center justify-center mb-6">
                  <div className="w-full max-w-2xl">
                    <LikertScale 
                      selected={selected} 
                      setSelected={setSelected} 
                      questionCategory={questionCategory}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              <button
                onClick={handleBack}
                disabled={isTransitioning}
                className={`flex items-center space-x-1 sm:space-x-2 py-2 px-3 sm:px-4 rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base ${
                  isTransitioning 
                    ? 'bg-gray-100 border border-gray-300 text-gray-400 cursor-not-allowed' 
                    : 'bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>←</span>
                <span className="hidden sm:inline">Previous</span>
                <span className="sm:hidden">Back</span>
              </button>

              {/* Auto-advance indicator - always centered */}
              <div className="text-xs sm:text-sm text-gray-500 text-center">
                {isTransitioning ? (
                  <span className="text-orange-600 font-medium flex items-center justify-center space-x-2">
                    <div className="loading-spinner" style={{ width: '16px', height: '16px', borderWidth: '2px' }}></div>
                    <span>Loading next question...</span>
                  </span>
                ) : selected !== null ? (
                  // Check if Next button is visible (user returned to previously answered question)
                  answers[questionNumber] && selected === answers[questionNumber] ? (
                    <span className="text-green-600 font-medium">
                      ✓ Answer recorded - Click next to continue
                    </span>
                  ) : (
                    <span className="text-green-600 font-medium">
                      ✓ Answer recorded - Moving to next question...
                    </span>
                  )
                ) : (
                  <span>
                    Select an answer to continue
                  </span>
                )}
              </div>

              {/* Next button - aligned to right when needed */}
              {answers[questionNumber] && selected === answers[questionNumber] ? (
                <button
                  onClick={handleNext}
                  disabled={isTransitioning}
                  className={`flex items-center space-x-1 sm:space-x-2 py-2 px-4 sm:px-6 rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base ${
                    isTransitioning 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'bg-orange-400 text-white hover:bg-orange-500'
                  }`}
                >
                  <span>{questionNumber === total ? 'Complete' : 'Next'}</span>
                  {questionNumber !== total && <span>→</span>}
                </button>
              ) : (
                <div className="w-20"></div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default QuestionPage;