import React from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '../../layouts/PageLayout';
import BlogGrid from '../../components/blog/BlogGrid';
import { BLOG_POSTS } from '../../constants/blog';

const BlogCategoryPage = () => {
  const { categorySlug } = useParams();
  const category = categorySlug?.replace(/-/g, ' ');
  
  const filteredPosts = BLOG_POSTS.filter(
    post => post.category.toLowerCase() === category?.toLowerCase()
  );

  return (
    <PageLayout
      title={`${category} Posts`}
      description={`Latest posts in ${category}`}
      currentPath={`/blog/category/${categorySlug}`}
    >
      <BlogGrid posts={filteredPosts} />
    </PageLayout>
  );
};

export default BlogCategoryPage;