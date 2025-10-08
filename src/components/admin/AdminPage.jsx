import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../utils/auth';
import AdminContent from './index';

const AdminPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // If user is not authenticated, redirect to login page
    if (!isAuthenticated()) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  // Don't render anything if user is not authenticated (will redirect)
  if (!isAuthenticated()) {
    return null;
  }

  return (
    <div>
      <AdminContent />
    </div>
  );
};

export default AdminPage;