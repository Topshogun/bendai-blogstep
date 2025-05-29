import React from 'react';
import { Menu } from 'lucide-react';
import { NAV_LINKS } from '../constants/navigation';
import Button from './ui/Button';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-white text-xl font-bold">bendai</span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {NAV_LINKS.map(({ href, text }) => (
                <a
                  key={href}
                  href={href}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {text}
                </a>
              ))}
              <Button variant="primary">VIEW DEMO</Button>
            </div>
          </div>
          
          <div className="md:hidden">
            <button className="text-white" aria-label="Open menu">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;