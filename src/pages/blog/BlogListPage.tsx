import React from 'react';
import { useSearchParams } from 'react-router-dom';
import BlogGrid from '../../components/blog/BlogGrid';
import FeaturedPost from '../../components/blog/FeaturedPost';
import CategoryFilter from '../../components/blog/CategoryFilter';
import Pagination from '../../components/blog/Pagination';
import { useBlogPosts } from '../../hooks/useBlogPosts';

const BlogListPage = () => {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');
  const category = searchParams.get('category') || 'all';
  const { posts, totalPages, featured } = useBlogPosts({ page, category });

  return (
    <div className="space-y-12">
      <FeaturedPost post={featured} />
      <CategoryFilter />
      <BlogGrid posts={posts} />
      <Pagination currentPage={page} totalPages={totalPages} />
    </div>
  );
};

export default BlogListPage;