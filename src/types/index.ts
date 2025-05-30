import { DivideIcon as LucideIcon } from 'lucide-react';

export interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
}

export interface BlogPost {
  id: string | number;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
}

export interface ProcessStep {
  title: string;
  description: string;
  duration: string;
}