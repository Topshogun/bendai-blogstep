import { LucideIcon } from 'lucide-react';

export interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
}

export interface BlogPost {
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
}

export interface ProcessStep {
  title: string;
  description: string;
  duration: string;
}