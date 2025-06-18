import { DivideIcon as LucideIcon } from 'lucide-react';

export interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
}

export interface ProcessStep {
  title: string;
  description: string;
  duration: string;
}

export interface SocialLink {
  name: string;
  Icon: LucideIcon;
  href: string;
}

export interface StatItem {
  label: string;
  value: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}