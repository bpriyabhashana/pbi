import React from 'react';
import { LIKERT_SCALE_OPTIONS, BURNOUT_CATEGORIES } from '../const/const';

const options = LIKERT_SCALE_OPTIONS;

const LikertScale = ({ selected, setSelected, questionCategory }) => {
  // For Emotional Exhaustion and Disengagement: blue (good) to orange (concerning)
  // For Professional Efficacy: orange (concerning) to blue (good)
  const isReversed = questionCategory === BURNOUT_CATEGORIES.PROFESSIONAL_EFFICACY;
  
  // Debug log to verify category is being passed correctly
  console.log('Question Category:', questionCategory, 'Is Reversed:', isReversed);
  
  const getOptionColors = (index, isSelected) => {
    const baseColors = [
      // Strongly Disagree
      isReversed 
        ? { bg: 'bg-orange-100', text: 'text-orange-700', selectedBg: 'bg-orange-200', selectedBorder: 'border-orange-500', selectedText: 'text-orange-800' }
        : { bg: 'bg-blue-100', text: 'text-blue-700', selectedBg: 'bg-blue-200', selectedBorder: 'border-blue-500', selectedText: 'text-blue-800' },
      // Disagree  
      isReversed
        ? { bg: 'bg-orange-50', text: 'text-orange-600', selectedBg: 'bg-orange-100', selectedBorder: 'border-orange-400', selectedText: 'text-orange-700' }
        : { bg: 'bg-blue-50', text: 'text-blue-600', selectedBg: 'bg-blue-100', selectedBorder: 'border-blue-400', selectedText: 'text-blue-700' },
      // Neutral
      { bg: 'bg-gray-50', text: 'text-gray-600', selectedBg: 'bg-gray-100', selectedBorder: 'border-gray-400', selectedText: 'text-gray-700' },
      // Agree
      isReversed
        ? { bg: 'bg-blue-50', text: 'text-blue-600', selectedBg: 'bg-blue-100', selectedBorder: 'border-blue-400', selectedText: 'text-blue-700' }
        : { bg: 'bg-orange-50', text: 'text-orange-600', selectedBg: 'bg-orange-100', selectedBorder: 'border-orange-400', selectedText: 'text-orange-700' },
      // Strongly Agree
      isReversed
        ? { bg: 'bg-blue-100', text: 'text-blue-700', selectedBg: 'bg-blue-200', selectedBorder: 'border-blue-500', selectedText: 'text-blue-800' }
        : { bg: 'bg-orange-100', text: 'text-orange-700', selectedBg: 'bg-orange-200', selectedBorder: 'border-orange-500', selectedText: 'text-orange-800' }
    ];
    
    const colors = baseColors[index];
    return isSelected 
      ? `${colors.selectedBg} ${colors.selectedBorder} ${colors.selectedText} border-2`
      : `${colors.bg} ${colors.text} hover:${colors.selectedBg} border-transparent`;
  };
  
  const getRadioColors = (index, isSelected) => {
    if (!isSelected) return 'border-gray-300 bg-white';
    
    if (index === 0) {
      return isReversed ? 'border-orange-400 bg-orange-400' : 'border-blue-400 bg-blue-400';
    } else if (index === 1) {
      return isReversed ? 'border-orange-300 bg-orange-300' : 'border-blue-300 bg-blue-300';
    } else if (index === 2) {
      return 'border-gray-400 bg-gray-400';
    } else if (index === 3) {
      return isReversed ? 'border-blue-300 bg-blue-300' : 'border-orange-300 bg-orange-300';
    } else {
      return isReversed ? 'border-blue-400 bg-blue-400' : 'border-orange-400 bg-orange-400';
    }
  };

  return (
    <div className="space-y-2 sm:space-y-3">
      {options.map((option, index) => (
        <button
          key={index}
          className={`w-full py-2 sm:py-3 px-3 sm:px-4 lg:px-6 rounded-lg sm:rounded-xl border-2 transition-all duration-200 text-left font-medium text-sm sm:text-base lg:text-lg ${
            getOptionColors(index, selected === index + 1)
          }`}
          onClick={() => setSelected(index + 1)}
        >
          <div className="flex items-center">
            <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 mr-3 sm:mr-4 flex-shrink-0 flex items-center justify-center ${
              getRadioColors(index, selected === index + 1)
            }`}>
              {selected === index + 1 && (
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white"></div>
              )}
            </div>
            <span>{option}</span>
          </div>
        </button>
      ))}
    </div>
  );
};

export default LikertScale;
