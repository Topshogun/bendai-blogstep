import React from 'react';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../../constants/blog';
import Image from '../common/Image';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <article className="group bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:transform hover:scale-105">
      <Link to={`/blog/${post.slug}`} className="block">
        <div className="aspect-video overflow-hidden">
          <Image
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      </Link>
      
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{new Date(post.publishedDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{post.readTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <User size={14} />
            <span>{post.author}</span>
          </div>
        </div>
        
        <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium mb-3">
          {post.category}
        </span>
        
        <Link to={`/blog/${post.slug}`}>
          <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors cursor-pointer">
            {post.title}
          </h3>
        </Link>
        
        <p className="text-gray-400 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs bg-gray-700 px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
        
        <Link 
          to={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors group/btn cursor-pointer"
        >
          Read More
          <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;