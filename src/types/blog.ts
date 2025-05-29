import { BlogPost } from './index';

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface BlogAuthor {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  role: string;
}

export interface BlogPostDetailed extends BlogPost {
  slug: string;
  content: string;
  author: BlogAuthor;
  categories: BlogCategory[];
  tags: string[];
  relatedPosts: BlogPost[];
}