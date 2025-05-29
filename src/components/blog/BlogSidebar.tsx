import React from 'react';
import { Link } from 'react-router-dom';
import { BLOG_CATEGORIES } from '../../constants/blog';
import { Tag, TrendingUp } from 'lucide-react';

const BlogSidebar = () => {
  return (
    <div className="space-y-8">
      <div className="bg-white/5 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Tag className="text-blue-400" />
          <h3 className="text-xl font-semibold">Categories</h3>
        </div>
        <div className="space-y-2">
          {BLOG_CATEGORIES.map((category) => (
            <Link
              key={category}
              to={`/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
              className="block py-2 px-4 rounded-lg hover:bg-white/5 transition-colors"
            >
              {category}
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-white/5 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="text-blue-400" />
          <h3 className="text-xl font-semibold">Popular Posts</h3>
        </div>
        <div className="space-y-4">
          {/* Add popular posts here */}
        </div>
      </div>
    </div>
  );
};

export default BlogSidebar;