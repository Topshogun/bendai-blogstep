import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export const useNavigation = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return {
    currentPath: location.pathname,
    isScrolled
  };
};