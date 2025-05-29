import React from 'react';
import { Outlet } from 'react-router-dom';
import BlogSidebar from '../components/blog/BlogSidebar';

const BlogLayout = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <main className="lg:col-span-8">
          <Outlet />
        </main>
        <aside className="lg:col-span-4">
          <BlogSidebar />
        </aside>
      </div>
    </div>
  );
};

export default BlogLayout;