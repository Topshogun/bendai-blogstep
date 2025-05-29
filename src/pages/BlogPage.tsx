import React, { useState } from 'react';
import PageLayout from '../layouts/PageLayout';
import BlogGrid from '../components/blog/BlogGrid';
import FeaturedPost from '../components/blog/FeaturedPost';
import CategoryFilter from '../components/blog/CategoryFilter';
import { BLOG_POSTS, FEATURED_POST, BLOG_CATEGORIES } from '../constants/blog';

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredPosts = selectedCategory === 'all'
    ? BLOG_POSTS
    : BLOG_POSTS.filter(post => post.category === selectedCategory);

  return (
    <PageLayout 
      title="AI Insights Blog" 
      description="Latest insights and updates from the world of AI automation"
      currentPath="/blog"
    >
      <FeaturedPost post={FEATURED_POST} />
      <CategoryFilter
        categories={BLOG_CATEGORIES}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <BlogGrid posts={filteredPosts} />
    </PageLayout>
  );
};

export default BlogPage;