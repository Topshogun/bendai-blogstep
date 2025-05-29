import React from 'react';
import { BlogPost } from '../../types';
import BlogCard from './BlogCard';
import SectionHeader from '../common/SectionHeader';

interface BlogGridProps {
  posts: BlogPost[];
}

const BlogGrid = ({ posts }: BlogGridProps) => {
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