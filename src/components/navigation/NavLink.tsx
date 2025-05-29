import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavLinkProps {
  href: string;
  text: string;
  isActive?: boolean;
  className?: string;
  exact?: boolean;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({
  href,
  text,
  isActive: forcedActive,
  className = '',
  onClick
}) => {
  const location = useLocation();
  const isActive = forcedActive ?? location.pathname === href;

  const handleClick = (e: React.MouseEvent) => {
    if (href === '/services' && location.pathname === '/') {
      e.preventDefault();
      const servicesSection = document.getElementById('services-section');
      if (servicesSection) {
        servicesSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
    onClick?.();
  };

  return (
    <Link
      to={href}
      onClick={handleClick}
      className={`
        relative text-gray-300 font-orbitron
        transition-colors duration-300
        hover:text-white
        after:content-['']
        after:absolute
        after:bottom-0
        after:left-0
        after:w-0
        after:h-[2px]
        after:bg-gradient-to-r
        after:from-blue-500
        after:to-purple-500
        after:transition-all
        after:duration-300
        hover:after:w-full
        ${isActive ? 'text-white after:w-full' : ''}
        ${className}
      `}
      aria-current={isActive ? 'page' : undefined}
    >
      {text}
    </Link>
  );
};

export default NavLink;