import React from 'react';
import Button from '../ui/Button';

const NavCTA = () => {
  const handleDemoClick = () => {
    // Smooth scroll to demo section if on homepage
    const demoSection = document.getElementById('demo');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/demo';
    }
  };

  return (
    <Button 
      variant="primary" 
      className="nav-button"
      onClick={handleDemoClick}
      aria-label="View Demo"
    >
      VIEW DEMO
    </Button>
  );
};

export default NavCTA;