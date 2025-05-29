import React from 'react';
import { Linkedin, Twitter, MessageSquare } from 'lucide-react';
import FooterLinks from './FooterLinks';
import SocialLinks from './SocialLinks';

const Footer = () => {
  return (
    <footer className="bg-black/50 backdrop-blur-md py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <FooterLinks />
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
};

export default Footer;