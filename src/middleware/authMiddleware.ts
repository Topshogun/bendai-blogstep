import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Simulated auth check - replace with your actual auth logic
const isAuthenticated = () => {
  const token = localStorage.getItem('admin_token');
  return !!token;
};

export const useAuthProtection = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    }
  }, [navigate]);
};