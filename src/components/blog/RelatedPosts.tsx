import React from 'react';
import { BlogPost } from '../../types/index';
import { Link } from 'react-router-dom';

interface RelatedPostsProps {
  posts: BlogPost[];
}

const RelatedPosts = ({ posts }: RelatedPostsProps) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <Link
            key={post.title}
            to={`/blog/${post.title.toLowerCase().replace(/\s+/g, '-')}`}
            className="group"
          >
            <div className="bg-white/5 rounded-xl overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
              />
              <div className="p-4">
                <h3 className="font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-400 text-sm">{post.excerpt}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts;