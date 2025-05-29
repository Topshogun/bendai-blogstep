import React from 'react';
import { Cpu } from 'lucide-react';

const NavLogo = () => {
  return (
    <a href="/" className="flex items-center space-x-2 group">
      <Cpu className="w-8 h-8 text-blue-400 transition-transform duration-300 group-hover:scale-110" />
      <span className="text-xl font-bold text-white font-orbitron">bendai</span>
    </a>
  );
};

export default NavLogo;