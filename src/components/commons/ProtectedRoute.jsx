import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../utils/auth';
import LoginModal from './LoginModal';

const ProtectedRoute = ({ children }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      setShowLoginModal(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    // Stay on the current page after successful login
  };

  const handleLoginClose = () => {
    setShowLoginModal(false);
    // Redirect to home page if user closes login modal without logging in
    navigate('/', { replace: true });
  };

  if (!isAuthenticated() && !showLoginModal) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      {isAuthenticated() ? children : null}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={handleLoginClose}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
};

export default ProtectedRoute;