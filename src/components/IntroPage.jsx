import React from 'react';
import Footer from './Footer';
import Logo from './Logo';
import speedometer from '../assets/speedometer.png';

const IntroPage = ({ onStart }) => (
  <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">

    {/* Header with increased height */}
    <header className="w-full bg-white border-b border-gray-200 px-4 py-4 sm:px-6 sm:py-6 flex-shrink-0">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <Logo size="small" />
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-semibold text-gray-900">Burnout Assessment</span>
            <span className="text-xs text-gray-500 hidden sm:block">Occupational Burnout Inventory</span>
          </div>
        </div>
        <span className="text-xs sm:text-sm text-gray-500 hidden sm:block">Professional Self-Assessment Tool</span>
      </div>
    </header>

    {/* Main Content */}
    <div className="flex-1 flex items-center justify-center p-3 sm:p-4 lg:p-6 min-h-0">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 w-full max-w-4xl mx-auto">
        <div className="py-4 px-6 sm:py-5 sm:px-8 lg:py-6 lg:px-10 text-center">
          
          {/* Icon */}
          <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4 flex-shrink-0">
            <img src={speedometer} alt="Speedometer" className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />
          </div>

          {/* Title */}
          <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-4 leading-tight flex-shrink-0">
            Discover Your Burnout Level
          </h1>

          {/* Description */}
          <p className="text-gray-600 mb-3 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto flex-shrink-0">
            Take this comprehensive 18-question assessment to understand your current burnout level. 
          </p>
          
          <p className="text-gray-500 mb-6 text-xs sm:text-sm lg:text-base leading-relaxed max-w-xl mx-auto flex-shrink-0">
            This scientifically-backed tool evaluates emotional exhaustion, disengagement, 
            and professional efficacy to provide you with actionable insights.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 flex-shrink-0">
            <div className="flex flex-col items-center space-y-2 text-gray-600">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-emerald-500 rounded-full"></div>
              <span className="text-xs sm:text-sm lg:text-base font-medium">5 minutes</span>
              <span className="text-xs text-gray-500">Quick & Easy</span>
            </div>
            <div className="flex flex-col items-center space-y-2 text-gray-600">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded-full"></div>
              <span className="text-xs sm:text-sm lg:text-base font-medium">18 questions</span>
              <span className="text-xs text-gray-500">Comprehensive</span>
            </div>
            <div className="flex flex-col items-center space-y-2 text-gray-600">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-violet-500 rounded-full"></div>
              <span className="text-xs sm:text-sm lg:text-base font-medium">Instant results</span>
              <span className="text-xs text-gray-500">Immediate Feedback</span>
            </div>
          </div>

          {/* Start Button */}
          <div className="flex-shrink-0">
            <button
              onClick={onStart}
              className="bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 px-6 sm:py-3 sm:px-8 lg:py-4 lg:px-10 rounded-lg sm:rounded-xl transition-all duration-200 text-sm sm:text-base lg:text-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Start Assessment
            </button>
          </div>
        </div>
      </div>
    </div>

    <Footer />

  </div>
);

export default IntroPage;
