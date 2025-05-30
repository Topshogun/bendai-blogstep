import React from 'react';
import { Route } from 'react-router-dom';
import BlogLayout from '../layouts/BlogLayout';
import BlogListPage from '../pages/blog/BlogListPage';
import BlogPostPage from '../pages/blog/BlogPostPage';
import BlogCategoryPage from '../pages/blog/BlogCategoryPage';

export const BlogRoutes = () => (
  <Route path="/blog" element={<BlogLayout />}>
    <Route index element={<BlogListPage />} />
    <Route path="category/:categorySlug" element={<BlogCategoryPage />} />
    <Route path=":postSlug" element={<BlogPostPage />} />
  </Route>
);