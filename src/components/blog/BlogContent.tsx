import React from 'react';
import { BlogPostDetailed } from '../../types/blog';
import { Calendar, Clock, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface BlogContentProps {
  post: BlogPostDetailed;
}

const BlogContent = ({ post }: BlogContentProps) => {
  return (
    <div className="space-y-8">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-[400px] object-cover rounded-2xl"
      />

      <div className="flex items-center gap-6 text-gray-400">
        <div className="flex items-center gap-2">
          <User size={16} />
          <span>{post.author.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={16} />
          <span>{post.date}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={16} />
          <span>{post.readTime}</span>
        </div>
      </div>

      <h1 className="text-4xl font-bold">{post.title}</h1>
      
      <div className="prose prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>

      <div className="flex gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-white/5 rounded-full text-sm"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default BlogContent;