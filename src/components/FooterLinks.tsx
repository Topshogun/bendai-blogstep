import React from 'react';
import { FOOTER_LINKS } from '../constants/navigation';

const FooterLinks = () => {
  return (
    <div className="flex space-x-8 mb-8 md:mb-0">
      {FOOTER_LINKS.map(({ href, text }) => (
        <a
          key={href}
          href={href}
          className="text-gray-400 hover:text-white transition-colors"
        >
          {text}
        </a>
      ))}
    </div>
  );
};

export default FooterLinks;