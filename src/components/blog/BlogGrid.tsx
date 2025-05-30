import React from 'react';
import { BlogPost } from '../../types';
import BlogCard from './BlogCard';
import SectionHeader from '../common/SectionHeader';

interface BlogGridProps {
  posts: BlogPost[];
  isLoading?: boolean;
  error?: Error | null;
}

const BlogGrid = ({ posts, isLoading, error }: BlogGridProps) => {
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="text-gray-400">Loading posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 space-y-4">
        <p className="text-red-400">Error loading posts: {error.message}</p>
        <p className="text-gray-400">Please try again later or contact support if the problem persists.</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No posts found.</p>
      </div>
    );
  }

  return (
    <section className="py-16">
      <SectionHeader
        title="Latest Articles"
        subtitle="Insights from our AI experts"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {posts.map((post, index) => (
          <BlogCard key={`${post.title}-${index}`} {...post} />
        ))}
      </div>
    </section>
  );
};

export default BlogGrid;