import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, logout, getCurrentUser } from '../../utils/auth';
import LoginModal from './LoginModal';
import Logo from './Logo';

const Header = ({ compact = false, showLogo = true, title = null }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = isAuthenticated();
  const currentUser = getCurrentUser();

  const handleLoginSuccess = () => {
    // Redirect to admin page after successful login
    navigate('/admin');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const headerClasses = compact 
    ? "w-full bg-white border-b border-gray-200 px-4 py-2 sm:px-6 sm:py-3 flex-shrink-0"
    : "w-full bg-white border-b border-gray-200 px-4 py-4 sm:px-6 sm:py-6 flex-shrink-0";

  return (
    <>
      <header className={headerClasses}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          {/* Left side - Logo/Title */}
          {showLogo && title ? (
            <Logo size={compact ? 'small' : 'default'} showText={true} title={title} />
          ) : showLogo ? (
            <Logo size={compact ? 'small' : 'default'} showText={true} />
          ) : title ? (
            <h1 className={`font-semibold text-gray-900 ${compact ? 'text-lg' : 'text-xl'}`}>
              {title}
            </h1>
          ) : null}

          {/* Right side - Login/User */}
          <div className="flex items-center space-x-3">
            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                {/* User info */}
                <div className="hidden sm:flex items-center space-x-2">
                  <div className="w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-white">
                      {currentUser?.username?.charAt(0).toUpperCase() || 'A'}
                    </span>
                  </div>
                  <span className="text-sm text-gray-700">
                    {currentUser?.username || 'Admin'}
                  </span>
                </div>

                {/* Admin button */}
                <button
                  onClick={() => navigate('/admin')}
                  className="px-3 py-1.5 text-xs font-medium text-orange-600 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors duration-200"
                >
                  Admin
                </button>

                {/* Logout button */}
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-800 transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <span className="text-base sm:text-lg text-gray-600 font-medium">
                Burnout Assessment Tool
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
};

export default Header;