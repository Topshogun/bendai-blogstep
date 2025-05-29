import React from 'react';
import { SOCIAL_LINKS } from '../constants/social';
import Icon from './ui/Icon';

const SocialLinks = () => {
  return (
    <div className="flex space-x-6">
      {SOCIAL_LINKS.map(({ name, Icon: IconComponent, href }) => (
        <a
          key={name}
          href={href}
          className="text-gray-400 hover:text-white transition-colors"
          aria-label={`Follow us on ${name}`}
        >
          <Icon icon={IconComponent} size={24} />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;