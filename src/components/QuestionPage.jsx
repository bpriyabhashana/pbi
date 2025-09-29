import React, { useState } from 'react';
import LikertScale from './LikertScale';
import Footer from './Footer';
import Logo from './Logo';

const QuestionPage = ({ 
  question, 
  questionNumber, 
  total, 
  onNext, 
  onBack, 
  onQuestionSelect, 
  answers = {},
  questionCategory
}) => {
  const [selected, setSelected] = useState(null);
  
  // Set selection based on previously answered questions
  React.useEffect(() => {
    setSelected(answers[questionNumber] || null);
  }, [questionNumber, answers]);

  const handleNext = () => {
    if (selected !== null) {
      onNext(selected);
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Compact Header */}
      <header className="w-full bg-white border-b border-gray-200 px-4 py-2 sm:px-6 sm:py-3 flex-shrink-0">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Logo size="small" />
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-semibold text-gray-900">Burnout Assessment</span>
              <span className="text-xs text-gray-500 hidden sm:block">Occupational Burnout Inventory</span>
            </div>
          </div>
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
      <div className="flex-1 flex flex-col p-3 sm:p-4 lg:p-6 min-h-0 overflow-hidden">
        <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full min-h-0">
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-1 sm:h-2 mb-3 sm:mb-4 flex-shrink-0">
            <div 
              className="bg-orange-400 h-1 sm:h-2 rounded-full transition-all duration-300"
              style={{ width: `${(questionNumber / total) * 100}%` }}
            ></div>
          </div>

          {/* Question Numbers - Display Only Grid */}
          <div className="flex flex-wrap gap-1 sm:gap-2 mb-4 sm:mb-6 justify-center flex-shrink-0">
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
          <div className="flex-1 bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6 lg:p-8 mb-3 sm:mb-4 flex flex-col min-h-0 overflow-hidden">
            
            {/* Question Header Section */}
            <div className="text-center mb-6 sm:mb-8 flex-shrink-0">
              
              {/* Question Text with Enhanced Styling */}
              <div className="bg-gradient-to-r from-gray-50 to-orange-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border-l-4 border-b-4 border-orange-190" 
                   style={{ 
                     boxShadow: '-4px 4px 12px rgba(251, 146, 60, 0.15), -2px 2px 6px rgba(251, 146, 60, 0.1)' 
                   }}>
                <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-800 leading-relaxed max-w-4xl mx-auto">
                  {question}
                </h2>
              </div>
            </div>

            {/* Likert Scale */}
            <div className="flex-1 flex items-center justify-center min-h-0 overflow-y-auto">
              <div className="w-full max-w-2xl">
                <LikertScale 
                  selected={selected} 
                  setSelected={setSelected} 
                  questionCategory={questionCategory}
                />
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center flex-shrink-0">
            <button
              onClick={handleBack}
              disabled={questionNumber === 1}
              className={`flex items-center space-x-1 sm:space-x-2 py-2 px-3 sm:px-4 rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base ${
                questionNumber === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span>←</span>
              <span className="hidden sm:inline">Previous</span>
              <span className="sm:hidden">Back</span>
            </button>

            <button
              onClick={handleNext}
              disabled={selected === null}
              className={`flex items-center space-x-1 sm:space-x-2 py-2 px-4 sm:px-6 rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base ${
                selected !== null
                  ? 'bg-orange-400 text-white hover:bg-orange-500'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              <span>{questionNumber === total ? 'Complete' : 'Next'}</span>
              {questionNumber !== total && <span>→</span>}
            </button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default QuestionPage;
