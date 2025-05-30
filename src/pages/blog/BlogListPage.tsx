import React from 'react';
import { useSearchParams } from 'react-router-dom';
import BlogGrid from '../../components/blog/BlogGrid';
import FeaturedPost from '../../components/blog/FeaturedPost';
import CategoryFilter from '../../components/blog/CategoryFilter';
import Pagination from '../../components/blog/Pagination';
import { useBlogPosts } from '../../hooks/useBlogPosts';
import { BLOG_CATEGORIES } from '../../constants/blog';

const BlogListPage = () => {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');
  const category = searchParams.get('category') || 'all';
  
  const { posts, totalPages, isLoading, error, featured } = useBlogPosts({ 
    page, 
    category,
    perPage: 9 
  });

  return (
    <div className="space-y-12">
      {featured && <FeaturedPost post={featured} />}
      <CategoryFilter
        categories={BLOG_CATEGORIES}
        selectedCategory={category}
        onCategoryChange={(newCategory) => {
          searchParams.set('category', newCategory);
          searchParams.set('page', '1');
          window.history.pushState(null, '', `?${searchParams.toString()}`);
        }}
      />
      <BlogGrid posts={posts} isLoading={isLoading} error={error} />
      {totalPages > 1 && (
        <Pagination currentPage={page} totalPages={totalPages} />
      )}
    </div>
  );
};

export default BlogListPage;