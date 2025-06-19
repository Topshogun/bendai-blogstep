import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../../constants/blog';
import Image from '../common/Image';
import RevealOnScroll from '../ui/RevealOnScroll';

interface FeaturedCarouselProps {
  posts: BlogPost[];
}

const FeaturedCarousel = ({ posts }: FeaturedCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Get the last 5 posts for the carousel
  const featuredPosts = posts.slice(0, 5);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || featuredPosts.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === featuredPosts.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, featuredPosts.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? featuredPosts.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  };

  const goToNext = () => {
    const newIndex = currentIndex === featuredPosts.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  };

  if (featuredPosts.length === 0) {
    return null;
  }

  const currentPost = featuredPosts[currentIndex];

  return (
    <RevealOnScroll>
      <section className="mb-16">
        <div className="relative bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl overflow-hidden">
          {/* Main Carousel Content */}
          <div className="relative h-[500px] md:h-[600px]">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
              <Image
                src={currentPost.featuredImage}
                alt={currentPost.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center">
              <div className="max-w-7xl mx-auto px-8 w-full">
                <div className="max-w-2xl">
                  <span className="inline-block px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium mb-4 backdrop-blur-sm">
                    Featured Post
                  </span>
                  
                  <Link to={`/blog/${currentPost.slug}`}>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 hover:text-blue-400 transition-colors cursor-pointer leading-tight">
                      {currentPost.title}
                    </h2>
                  </Link>
                  
                  <p className="text-xl text-gray-200 mb-6 leading-relaxed">
                    {currentPost.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-6 text-sm text-gray-300 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>{new Date(currentPost.publishedDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      <span>{currentPost.readTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User size={16} />
                      <span>{currentPost.author}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {currentPost.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className="text-sm bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <Link 
                    to={`/blog/${currentPost.slug}`}
                    className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-all duration-300 group font-medium"
                  >
                    Read Full Article
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            {featuredPosts.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
                  aria-label="Previous post"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
                  aria-label="Next post"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail Navigation */}
          {featuredPosts.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
              <div className="flex gap-2 bg-black/50 backdrop-blur-sm rounded-full p-2">
                {featuredPosts.map((post, index) => (
                  <button
                    key={post.id}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'bg-blue-500 scale-125' 
                        : 'bg-white/50 hover:bg-white/70'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Post Counter */}
          {featuredPosts.length > 1 && (
            <div className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
              {currentIndex + 1} / {featuredPosts.length}
            </div>
          )}
        </div>

        {/* Thumbnail Strip */}
        {featuredPosts.length > 1 && (
          <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
            {featuredPosts.map((post, index) => (
              <button
                key={post.id}
                onClick={() => goToSlide(index)}
                className={`group relative aspect-video rounded-lg overflow-hidden transition-all duration-300 ${
                  index === currentIndex 
                    ? 'ring-2 ring-blue-500 scale-105' 
                    : 'hover:scale-105 opacity-70 hover:opacity-100'
                }`}
              >
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-2 left-2 right-2">
                  <h4 className="text-white text-sm font-medium line-clamp-2 leading-tight">
                    {post.title}
                  </h4>
                </div>
                {index === currentIndex && (
                  <div className="absolute inset-0 bg-blue-500/20" />
                )}
              </button>
            ))}
          </div>
        )}
      </section>
    </RevealOnScroll>
  );
};

export default FeaturedCarousel;