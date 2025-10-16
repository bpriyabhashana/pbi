import React, { useState } from 'react';
import Footer from '../commons/Footer';
import Header from '../commons/Header';
import { 
  ageRanges, 
  genderOptions, 
  jobRoles, 
  yearsExperienceOptions, 
  workHoursOptions, 
  familyStatusOptions 
} from '../../data/questions';

const DemographicPage = ({ onNext, onBack, initialStep = 0, initialData = {} }) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [demographicData, setDemographicData] = useState({
    ageRange: initialData.ageRange || '',
    gender: initialData.gender || '',
    jobRole: initialData.jobRole || '',
    yearsExperience: initialData.yearsExperience || '',
    workHours: initialData.workHours || '',
    familyStatus: initialData.familyStatus || ''
  });

  const [errors, setErrors] = useState({});
  const [originalData] = useState(initialData); // Track original values

  const handleSelection = (field, value) => {
    setDemographicData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user makes selection
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }



    // Auto-advance logic - only when user makes a new selection
    if (currentStep < 5) {
      if (field === 'ageRange' && currentStep === 0) {
        setTimeout(() => setCurrentStep(1), 300);
      } else if (field === 'jobRole' && currentStep === 1) {
        setTimeout(() => setCurrentStep(2), 300);
      } else if (field === 'yearsExperience' && currentStep === 2) {
        setTimeout(() => setCurrentStep(3), 300);
      } else if (field === 'workHours' && currentStep === 3) {
        setTimeout(() => setCurrentStep(4), 300);
      } else if (field === 'gender' && currentStep === 4) {
        setTimeout(() => setCurrentStep(5), 300);
      }
    } else if (currentStep === 5 && field === 'familyStatus') {
      // Family status auto-proceeds to assessment only when user makes selection
      setTimeout(() => {
        const updatedData = { ...demographicData, [field]: value };
        onNext(updatedData);
      }, 300);
    }
  };





  const handleStepBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const handleStepNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 4) {
      setCurrentStep(5);
    }
  };

  // Check if current step has existing answer that matches current selection
  const hasExistingAnswer = () => {
    const fieldMap = {
      0: 'ageRange',
      1: 'jobRole', 
      2: 'yearsExperience',
      3: 'workHours',
      4: 'gender'
    };
    
    const field = fieldMap[currentStep];
    return field && originalData[field] && demographicData[field] === originalData[field];
  };

  // Interactive chip selection component
  const ChipSelector = ({ options, selectedValue, onSelect, title, subtitle, required = false, centered = false, wide = false }) => (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {title} {required && <span className="text-orange-500">*</span>}
        </h3>
        {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
      </div>
      <div className={`grid gap-3 p-4 ${
        centered 
          ? 'justify-center' 
          : ''
      } ${
        wide 
          ? 'grid-cols-1 sm:grid-cols-2 max-w-md mx-auto' 
          : 'grid-cols-2 sm:grid-cols-3'
      }`}>
        {options.map((option) => (
          <button
            key={option.value}
            onClick={(e) => {
              onSelect(option.value);
              // Force blur on touch devices to remove focus border
              e.target.blur();
            }}
            onTouchEnd={(e) => {
              // Additional blur for iOS Safari
              setTimeout(() => e.target.blur(), 100);
            }}
            className={`${wide ? 'p-6' : 'p-4'} rounded-xl border-2 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-0 ${
              selectedValue === option.value
                ? 'border-orange-400 bg-orange-50 text-orange-700 shadow-lg'
                : 'border-gray-200 bg-white text-gray-700 hover:border-orange-200 hover:bg-orange-25'
            }`}
            style={{
              WebkitTapHighlightColor: 'transparent',
              touchAction: 'manipulation'
            }}
          >
            <div className={`${wide ? 'text-3xl mb-3' : 'text-2xl mb-2'}`}>{option.icon}</div>
            <div className={`${wide ? 'text-base' : 'text-sm'} font-medium`}>{option.label}</div>
          </button>
        ))}
      </div>
    </div>
  );



  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* iOS Focus Fix Styles */}
      <style>{`
        /* Remove iOS Safari focus outline and tap highlights */
        button {
          -webkit-tap-highlight-color: transparent !important;
          -webkit-focus-ring-color: transparent !important;
          outline: none !important;
        }
        
        button:focus {
          outline: none !important;
          box-shadow: none !important;
          border-color: inherit !important;
        }
        
        button:active {
          outline: none !important;
          box-shadow: none !important;
        }
        
        /* Ensure touch manipulation for better iOS experience */
        button {
          touch-action: manipulation;
          user-select: none;
          -webkit-user-select: none;
        }
      `}</style>
      
      {/* Compact Header */}
      <Header compact={true} showLogo={true} title="Demographic Information" />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center py-4 px-3 sm:py-6 sm:px-4">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 w-full max-w-4xl mx-auto">
          <div className="py-4 px-4 sm:py-6 sm:px-6 lg:py-8 lg:px-8">
            
            {/* Icon */}
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>

            {/* Title */}
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 text-center leading-tight">
              Tell Us About Yourself
            </h1>
            
            <p className="text-gray-600 text-center mb-6 text-sm sm:text-base leading-relaxed">
              This information helps us provide more accurate and relevant assessment results. 
              All responses remain completely anonymous.
            </p>

            {/* Progress Steps */}
            <div className="flex justify-center mb-6">
              <div className="flex items-center space-x-2">
                {[0, 1, 2, 3, 4, 5].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                      step <= currentStep ? 'bg-orange-400' : 'bg-gray-300'
                    }`} />
                    {step < 5 && <div className="w-4 h-px bg-gray-300 mx-1" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Form Steps */}
            <div className="min-h-[300px] flex items-center justify-center">
              
              {/* Step 0: Age Range */}
              {currentStep === 0 && (
                <ChipSelector
                  title="What's your age range?"
                  subtitle="This helps us understand generational workplace trends"
                  options={ageRanges}
                  selectedValue={demographicData.ageRange}
                  onSelect={(value) => handleSelection('ageRange', value)}
                  required={true}
                />
              )}

              {/* Step 1: Industry */}
              {currentStep === 1 && (
                <div className="space-y-4 w-full">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      What industry do you work in? <span className="text-orange-500">*</span>
                    </h3>
                    <p className="text-sm text-gray-600">Different industries have unique burnout patterns</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-64 overflow-y-auto">
                    {jobRoles.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleSelection('jobRole', option.value)}
                        className={`p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                          demographicData.jobRole === option.value
                            ? 'border-orange-400 bg-orange-50 text-orange-700'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-orange-200'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-xl">{option.icon}</span>
                          <span className="text-sm font-medium">{option.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Years of Experience */}
              {currentStep === 2 && (
                <ChipSelector
                  title="Years of professional experience?"
                  subtitle="Experience level affects burnout risk factors"
                  options={yearsExperienceOptions}
                  selectedValue={demographicData.yearsExperience}
                  onSelect={(value) => handleSelection('yearsExperience', value)}
                  required={true}
                />
              )}

              {/* Step 3: Work Hours */}
              {currentStep === 3 && (
                <ChipSelector
                  title="Average hours worked per week?"
                  subtitle="Work-life balance is crucial for burnout prevention"
                  options={workHoursOptions}
                  selectedValue={demographicData.workHours}
                  onSelect={(value) => handleSelection('workHours', value)}
                  required={true}
                />
              )}

              {/* Step 4: Gender */}
              {currentStep === 4 && (
                <ChipSelector
                  title="What's your gender?"
                  subtitle="Helps us understand workplace dynamics"
                  options={genderOptions}
                  selectedValue={demographicData.gender}
                  onSelect={(value) => handleSelection('gender', value)}
                  required={true}
                  centered={true}
                  wide={true}
                />
              )}

              {/* Step 5: Family Status */}
              {currentStep === 5 && (
                <ChipSelector
                  title="What's your family status?"
                  subtitle="Family responsibilities can impact work stress"
                  options={familyStatusOptions}
                  selectedValue={demographicData.familyStatus}
                  onSelect={(value) => handleSelection('familyStatus', value)}
                  required={true}
                />
              )}

            </div>



            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-8">
              <button
                onClick={handleStepBack}
                className="flex items-center space-x-1 sm:space-x-2 py-2 px-3 sm:px-4 rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100"
              >
                <span>←</span>
                <span className="hidden sm:inline">{currentStep === 0 ? 'Back to Consent' : 'Previous'}</span>
                <span className="sm:hidden">Back</span>
              </button>

              {/* Auto-advance indicator - always centered */}
              <div className="text-xs sm:text-sm text-gray-500 text-center">
                {currentStep === 5 ? (
                  demographicData.familyStatus ? (
                    <span className="text-green-600 font-medium">
                      ✓ Demographic data complete - Moving to assessment...
                    </span>
                  ) : (
                    <span>
                      Select your family status to continue to assessment
                    </span>
                  )
                ) : (
                  (() => {
                    const currentFieldValue = 
                      (currentStep === 0 && demographicData.ageRange) ||
                      (currentStep === 1 && demographicData.jobRole) ||
                      (currentStep === 2 && demographicData.yearsExperience) ||
                      (currentStep === 3 && demographicData.workHours) ||
                      (currentStep === 4 && demographicData.gender);
                    
                    return currentFieldValue ? (
                      <span className="text-green-600 font-medium">
                        ✓ Answer recorded - Moving to next question...
                      </span>
                    ) : (
                      <span>
                        Select an answer to continue
                      </span>
                    );
                  })()
                )}
              </div>

              {/* Next button - aligned to right when needed */}
              {currentStep < 5 && hasExistingAnswer() ? (
                <button
                  onClick={handleStepNext}
                  className="flex items-center space-x-1 sm:space-x-2 py-2 px-4 sm:px-6 rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base bg-orange-400 text-white hover:bg-orange-500"
                >
                  <span>Next</span>
                  <span>→</span>
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

export default DemographicPage;