import { BlogPost } from '../types';

export const BLOG_CATEGORIES = [
  'AI Technology',
  'Automation',
  'Case Studies',
  'Industry Insights'
] as const;

export const FEATURED_POST: BlogPost = {
  title: 'The Future of AI Automation in Business',
  excerpt: 'Discover how AI is transforming business operations and what to expect in the coming years.',
  image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&h=630',
  author: 'Dr. Sarah Chen',
  date: '2024-03-15',
  readTime: '8 min',
  category: 'Industry Insights'
};

export const BLOG_POSTS: BlogPost[] = [
  {
    title: 'How AI is Revolutionizing Customer Service',
    excerpt: 'Learn about the latest AI innovations in customer support automation.',
    image: 'https://images.unsplash.com/photo-1531973576160-7125cd663d86?auto=format&fit=crop&w=800&h=500',
    author: 'Michael Chen',
    date: '2024-03-10',
    readTime: '6 min',
    category: 'AI Technology'
  },
  {
    title: 'Automating Business Processes: A Complete Guide',
    excerpt: 'Step-by-step guide to implementing automation in your business.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&h=500',
    author: 'Emily Johnson',
    date: '2024-03-05',
    readTime: '10 min',
    category: 'Automation'
  },
  {
    title: 'Success Story: AI Implementation in Manufacturing',
    excerpt: 'How a leading manufacturer achieved 40% efficiency gains with AI.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&h=500',
    author: 'David Williams',
    date: '2024-03-01',
    readTime: '7 min',
    category: 'Case Studies'
  }
];