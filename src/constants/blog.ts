export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedDate: string;
  category: string;
  tags: string[];
  featuredImage: string;
  slug: string;
  readTime: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  count: number;
}

export const BLOG_CATEGORIES: BlogCategory[] = [
  { id: 'all', name: 'All Posts', count: 12 },
  { id: 'ai-technology', name: 'AI Technology', count: 5 },
  { id: 'automation', name: 'Automation', count: 4 },
  { id: 'case-studies', name: 'Case Studies', count: 3 },
];

export const FEATURED_POST: BlogPost = {
  id: '1',
  title: 'The Future of AI Automation in Business',
  excerpt: 'Discover how artificial intelligence is revolutionizing business operations and what it means for the future of work.',
  content: 'Full article content here...',
  author: 'Sarah Chen',
  publishedDate: '2024-01-15',
  category: 'AI Technology',
  tags: ['AI', 'Automation', 'Business', 'Future'],
  featuredImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&h=630',
  slug: 'future-of-ai-automation-in-business',
  readTime: '8 min read'
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '2',
    title: 'How AI Customer Support Reduces Response Time by 90%',
    excerpt: 'Learn how implementing AI-powered customer support can dramatically improve response times and customer satisfaction.',
    content: 'Full article content here...',
    author: 'Michael Rodriguez',
    publishedDate: '2024-01-12',
    category: 'Case Studies',
    tags: ['Customer Support', 'AI', 'Efficiency'],
    featuredImage: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&h=400',
    slug: 'ai-customer-support-reduces-response-time',
    readTime: '6 min read'
  },
  {
    id: '3',
    title: 'CRM Integration Best Practices for Small Businesses',
    excerpt: 'Essential strategies for successfully integrating CRM systems with your existing business processes.',
    content: 'Full article content here...',
    author: 'Emily Johnson',
    publishedDate: '2024-01-10',
    category: 'Automation',
    tags: ['CRM', 'Integration', 'Small Business'],
    featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&h=400',
    slug: 'crm-integration-best-practices',
    readTime: '5 min read'
  },
  {
    id: '4',
    title: 'Building Custom AI Agents for Your Industry',
    excerpt: 'A comprehensive guide to developing specialized AI agents tailored to your specific industry needs.',
    content: 'Full article content here...',
    author: 'David Kim',
    publishedDate: '2024-01-08',
    category: 'AI Technology',
    tags: ['AI Agents', 'Custom Development', 'Industry Solutions'],
    featuredImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&h=400',
    slug: 'building-custom-ai-agents',
    readTime: '10 min read'
  },
  {
    id: '5',
    title: 'Automated Scheduling: Saving 20 Hours Per Week',
    excerpt: 'Real-world case study showing how automated scheduling systems can save significant time and reduce errors.',
    content: 'Full article content here...',
    author: 'Lisa Thompson',
    publishedDate: '2024-01-05',
    category: 'Case Studies',
    tags: ['Scheduling', 'Automation', 'Productivity'],
    featuredImage: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=800&h=400',
    slug: 'automated-scheduling-case-study',
    readTime: '7 min read'
  }
];