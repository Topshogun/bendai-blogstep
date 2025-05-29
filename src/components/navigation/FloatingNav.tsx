import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { NAV_LINKS } from '../../constants/navigation';
import NavLink from './NavLink';
import NavLogo from './NavLogo';
import NavCTA from './NavCTA';
import MobileMenu from './MobileMenu';
import { useNavigation } from '../../hooks/useNavigation';

export const FloatingNav = () => {
  const { currentPath, isScrolled } = useNavigation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav 
        className={`
          fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl
          px-6 py-4 rounded-full backdrop-blur-md
          transition-all duration-300 ease-in-out
          ${isScrolled ? 'bg-black/80 shadow-glow' : 'bg-black/50'}
        `}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between">
          <NavLogo />
          
          <DesktopNav currentPath={currentPath} />

          <MobileMenuButton 
            onClick={() => setIsMobileMenuOpen(true)} 
            isOpen={isMobileMenuOpen}
          />
        </div>
      </nav>

      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)}
        currentPath={currentPath}
      />
    </>
  );
};

const DesktopNav = ({ currentPath }: { currentPath: string }) => (
  <>
    <div className="hidden md:flex items-center space-x-8">
      {NAV_LINKS.map((link) => (
        <NavLink 
          key={link.href} 
          {...link} 
          isActive={currentPath === link.href}
        />
      ))}
    </div>
    <div className="hidden md:block">
      <NavCTA />
    </div>
  </>
);

const MobileMenuButton = ({ onClick, isOpen }: { onClick: () => void; isOpen: boolean }) => (
  <button 
    className="md:hidden text-white"
    onClick={onClick}
    aria-label="Open menu"
    aria-expanded={isOpen}
  >
    <Menu size={24} />
  </button>
);

export default FloatingNav;