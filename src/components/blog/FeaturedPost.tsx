import React from 'react';
import { BlogPost } from '../../types';
import Image from '../common/Image';
import RevealOnScroll from '../ui/RevealOnScroll';

interface FeaturedPostProps {
  post: BlogPost;
}

const FeaturedPost = ({ post }: FeaturedPostProps) => {
  const { title, excerpt, image, author, date, readTime } = post;

  return (
    <RevealOnScroll>
      <article className="relative rounded-2xl overflow-hidden mb-16">
        <div className="aspect-[21/9] relative">
          <Image
            src={image}
            alt={title}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-xl text-gray-200 mb-6 max-w-3xl">{excerpt}</p>
          <div className="flex items-center space-x-4 text-gray-300">
            <span className="font-semibold">{author}</span>
            <span>·</span>
            <span>{date}</span>
            <span>·</span>
            <span>{readTime}</span>
          </div>
        </div>
      </article>
    </RevealOnScroll>
  );
};

export default FeaturedPost;