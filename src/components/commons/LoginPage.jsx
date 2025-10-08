import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../utils/auth';
import LoginModal from './LoginModal';

const LoginPage = () => {
  const [showLoginModal, setShowLoginModal] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already authenticated, redirect to admin
    if (isAuthenticated()) {
      navigate('/admin', { replace: true });
    }
  }, [navigate]);

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    // Redirect to admin page after successful login
    navigate('/admin', { replace: true });
  };

  const handleLoginClose = () => {
    setShowLoginModal(false);
    // Redirect to home page if user closes login modal without logging in
    navigate('/', { replace: true });
  };

  // Don't render anything if user is already authenticated (will redirect)
  if (isAuthenticated()) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={handleLoginClose}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
};

export default LoginPage;