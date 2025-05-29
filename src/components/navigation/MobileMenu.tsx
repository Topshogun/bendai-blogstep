import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import NavLink from './NavLink';
import { NAV_LINKS } from '../../constants/navigation';
import Button from '../ui/Button';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
}

export const MobileMenu = ({ isOpen, onClose, currentPath }: MobileMenuProps) => {
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLinkClick = () => {
    onClose(); // Close the menu when a link is clicked
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md mobile-menu-enter"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
    >
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors duration-300"
          aria-label="Close menu"
        >
          <X size={24} />
        </button>

        <nav className="flex flex-col items-center space-y-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={handleLinkClick}
              className={`text-2xl font-orbitron text-gray-300 hover:text-white transition-colors ${
                currentPath === link.href ? 'text-white' : ''
              }`}
            >
              {link.text}
            </Link>
          ))}
          <Button variant="primary" onClick={handleLinkClick}>
            VIEW DEMO
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;