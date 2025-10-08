import React from 'react';

const Logo = ({ size = 'default', showText = false, title = "Burnout Assessment", subtitle = "Occupational Burnout Inventory" }) => {
  // Size variants for different contexts - increased sizes
  const sizeClasses = {
    small: 'w-10 h-10 sm:w-12 sm:h-12',
    default: 'w-12 h-12 sm:w-14 sm:h-14',
    large: 'w-14 h-14 sm:w-16 sm:h-16'
  };

  const textSizes = {
    small: 'text-base sm:text-lg',
    default: 'text-lg sm:text-xl',
    large: 'text-xl sm:text-2xl'
  };

  // If showText is true, return the enhanced logo with title and subtitle
  if (showText) {
    return (
      <div className="flex items-center space-x-2 sm:space-x-3">
        <div 
          className={`${sizeClasses[size]} flex items-center justify-center transform hover:scale-105 transition-all duration-200 border-2 border-orange-400 rounded-lg bg-white hover:border-orange-500 hover:shadow-md`}
        >
          <span 
            className={`${textSizes[size]} font-bold select-none text-orange-500`}
            style={{ 
              fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
              letterSpacing: '1px',
              fontWeight: '700'
            }}
          >
            PBI
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-lg sm:text-xl font-semibold text-gray-900">{title}</span>
          <span className="text-xs text-gray-500 hidden sm:block">{subtitle}</span>
        </div>
      </div>
    );
  }

  // Default logo without text
  return (
    <div 
      className={`${sizeClasses[size]} flex items-center justify-center transform hover:scale-105 transition-all duration-200 border-2 border-orange-400 rounded-lg bg-white hover:border-orange-500 hover:shadow-md`}
    >
      <span 
        className={`${textSizes[size]} font-bold select-none text-orange-500`}
        style={{ 
          fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
          letterSpacing: '1px',
          fontWeight: '700'
        }}
      >
        PBI
      </span>
    </div>
  );
};

export default Logo;