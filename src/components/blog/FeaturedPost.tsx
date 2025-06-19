import React from 'react';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import { BlogPost } from '../../constants/blog';
import Image from '../common/Image';
import RevealOnScroll from '../ui/RevealOnScroll';

interface FeaturedPostProps {
  post: BlogPost;
}

const FeaturedPost = ({ post }: FeaturedPostProps) => {
  return (
    <RevealOnScroll>
      <section className="mb-16">
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            <div className="order-2 lg:order-1 flex flex-col justify-center">
              <span className="inline-block px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium mb-4 w-fit">
                Featured Post
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {post.title}
              </h2>
              
              <p className="text-xl text-gray-300 mb-6">
                {post.excerpt}
              </p>
              
              <div className="flex items-center gap-6 text-sm text-gray-400 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{new Date(post.publishedDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{post.readTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span>{post.author}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-sm bg-gray-700 px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              
              <button className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors group w-fit">
                Read Full Article
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="aspect-video rounded-xl overflow-hidden">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </RevealOnScroll>
  );
};

export default FeaturedPost;