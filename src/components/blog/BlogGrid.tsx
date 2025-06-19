import React from 'react';
import { BlogPost } from '../../constants/blog';
import BlogCard from './BlogCard';
import RevealOnScroll from '../ui/RevealOnScroll';

interface BlogGridProps {
  posts: BlogPost[];
}

const BlogGrid = ({ posts }: BlogGridProps) => {
  return (
    <section className="py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <RevealOnScroll key={post.id}>
            <BlogCard post={post} />
          </RevealOnScroll>
        ))}
      </div>
      
      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No posts found in this category.</p>
        </div>
      )}
    </section>
  );
};

export default BlogGrid;