import React, { useState } from 'react';
import Footer from '../commons/Footer';
import Header from '../commons/Header';

const ConsentPage = ({ onSkipToDemographic, onSkipToAssessment, onDecline }) => {
  const [consentForDemographics, setConsentForDemographics] = useState(false);

  const handleProceedWithDemographics = () => {
    if (consentForDemographics) {
      onSkipToDemographic();
    }
  };

  const handleSkipToAssessment = () => {
    onSkipToAssessment();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header compact={true} showLogo={true} />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center py-12 px-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 w-full max-w-2xl p-8">
          
          {/* Icon */}
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Optional Demographics
          </h1>

          {/* Introduction */}
          <div className="mb-6 text-center">
            <p className="text-gray-600 text-sm">
              Choose how you'd like to proceed:
            </p>
          </div>

          {/* Two Path Options - Side by Side */}
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-4">
            
            {/* Option 1: Share Demographics */}
            <div className="border-2 border-orange-200 rounded-lg p-4 hover:border-orange-300 transition-colors duration-200 bg-orange-25">
              <div className="text-center mb-3">
                <div className="w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold text-xs">1</span>
                </div>
                <h3 className="text-base font-semibold text-gray-900">
                  Share Demographics
                </h3>
                <span className="text-xs text-orange-600 font-medium">Recommended</span>
              </div>
              
              {/* Benefits */}
              <div className="mb-3">
                <div className="text-xs text-gray-600 space-y-1">
                  <div>✓ More personalized results</div>
                  <div>✓ Help improve assessment</div>
                  <div>✓ Completely anonymous</div>
                </div>
              </div>

              {/* Consent Checkbox */}
              <div className="mb-3">
                <label className="flex items-start space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consentForDemographics}
                    onChange={(e) => setConsentForDemographics(e.target.checked)}
                    className="mt-0.5 w-3 h-3 text-orange-400 border-gray-300 rounded focus:ring-orange-400"
                  />
                  <span className="text-xs text-gray-700 leading-tight">
                    I consent to sharing anonymous demographic data
                  </span>
                </label>
              </div>

              {/* Action Button */}
              <button
                onClick={handleProceedWithDemographics}
                disabled={!consentForDemographics}
                className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                  consentForDemographics 
                    ? 'bg-orange-400 hover:bg-orange-500 text-white shadow-sm' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Yes, Let's Continue
              </button>
            </div>

            {/* OR Divider - Only on mobile */}
            <div className="lg:hidden flex items-center justify-center py-2">
              <div className="flex-1 border-t border-gray-300"></div>
              <div className="px-3 text-gray-500 font-medium text-xs bg-gray-50 rounded-full py-1">
                OR
              </div>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* OR Divider - Desktop vertical */}
            <div className="hidden lg:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2">
              <span className="text-gray-500 font-medium text-xs bg-gray-50 rounded-full px-3 py-1 border border-gray-200">
                OR
              </span>
            </div>

            {/* Option 2: Skip Demographics */}
            <div className="border-2 border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors duration-200">
              <div className="text-center mb-3">
                <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold text-xs">2</span>
                </div>
                <h3 className="text-base font-semibold text-gray-900">
                  Skip to Assessment
                </h3>
                <span className="text-xs text-gray-500">Quick option</span>
              </div>
              
              {/* Info */}
              <div className="mb-3">
                <div className="text-xs text-gray-600 space-y-1">
                  <div>• Proceed immediately</div>
                  <div>• Streamlined experience</div>
                  <div>• Still accurate results</div>
                </div>
              </div>

              {/* Spacer to align with consent section */}
              <div className="mb-3 h-8"></div>

              {/* Action Button */}
              <button
                onClick={handleSkipToAssessment}
                className="w-full py-2 px-4 rounded-lg text-sm font-medium bg-gray-500 hover:bg-gray-600 text-white transition-colors duration-200"
              >
                Skip to Assessment
              </button>
            </div>

          </div>

          {/* Back button */}
          <div className="text-center mt-6">
            <button
              onClick={onDecline}
              className="text-gray-500 hover:text-gray-700 text-sm underline"
            >
              ← Back to Start
            </button>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ConsentPage;