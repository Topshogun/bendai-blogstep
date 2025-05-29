import React from 'react';
import { BlogPost } from '../../types';
import Image from '../common/Image';

const BlogCard = ({ title, excerpt, image, author, date, readTime }: BlogPost) => {
  return (
    <article className="group rounded-xl bg-white/5 overflow-hidden hover:bg-white/10 transition-colors">
      <div className="aspect-video overflow-hidden">
        <Image
          src={image}
          alt={title}
          className="object-cover w-full h-full transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3 line-clamp-2">{title}</h3>
        <p className="text-gray-400 mb-4 line-clamp-3">{excerpt}</p>
        <div className="flex items-center justify-between text-sm text-gray-300">
          <span>{author}</span>
          <div className="flex items-center space-x-3">
            <span>{date}</span>
            <span>·</span>
            <span>{readTime}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;