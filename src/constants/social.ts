import { Linkedin, Twitter, MessageSquare } from 'lucide-react';
import type { SocialLink } from '../types';

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'linkedin',
    Icon: Linkedin,
    href: 'https://linkedin.com/company/bendai',
  },
  {
    name: 'twitter',
    Icon: Twitter,
    href: 'https://twitter.com/bendai',
  },
  {
    name: 'chat',
    Icon: MessageSquare,
    href: 'https://bendai.com/chat',
  },
] as const;