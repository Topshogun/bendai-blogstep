import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowLeft, Tag } from 'lucide-react';
import FloatingNav from '../components/navigation/FloatingNav';
import Breadcrumb from '../components/navigation/Breadcrumb';
import ModernCursor from '../components/cursor/ModernCursor';
import { BlogPost, BLOG_POSTS, FEATURED_POST } from '../constants/blog';
import { supabase } from '../lib/supabase';
import Image from '../components/common/Image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Scroll to top immediately when component mounts
    window.scrollTo(0, 0);
    
    if (slug) {
      fetchPost(slug);
    }
  }, [slug]);

  // Additional scroll to top after post loads
  useEffect(() => {
    if (post && !isLoading) {
      // Small delay to ensure DOM is fully rendered
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    }
  }, [post, isLoading]);

  const fetchPost = async (postSlug: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // First check static posts
      const staticPosts = [FEATURED_POST, ...BLOG_POSTS];
      const staticPost = staticPosts.find(p => p.slug === postSlug);
      
      if (staticPost) {
        setPost(staticPost);
        setIsLoading(false);
        return;
      }

      // Then check database posts
      const { data, error } = await supabase
        .from('Posts')
        .select('*')
        .eq('slug', postSlug)
        .eq('is_published', true)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          setError('Post not found');
        } else {
          setError('Error loading post');
        }
        return;
      }

      // Transform database post to blog post format
      const transformedPost: BlogPost = {
        id: data.id,
        title: data.title,
        excerpt: data.excerpt,
        content: data.content_markdown,
        author: 'Bendai Team',
        publishedDate: data.published_at,
        category: data.category_ids,
        tags: data.tags || [],
        featuredImage: data.featured_image_url,
        slug: data.slug,
        readTime: `${Math.ceil(data.content_markdown.length / 1000)} min read`
      };

      setPost(transformedPost);
    } catch (err) {
      console.error('Error fetching post:', err);
      setError('Error loading post');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white cursor-none">
        <ModernCursor />
        <FloatingNav />
        <main className="pt-32 pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
              <p className="text-gray-400 mt-4">Loading post...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-black text-white cursor-none">
        <ModernCursor />
        <FloatingNav />
        <main className="pt-32 pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumb currentPath={`/blog/${slug}`} />
            <div className="text-center py-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Post Not Found</h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
                The blog post you're looking for doesn't exist.
              </p>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
              >
                <ArrowLeft size={16} />
                Back to Blog
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white cursor-none">
      <ModernCursor />
      <FloatingNav />
      
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb currentPath={`/blog/${slug}`} />
          
          <article className="max-w-4xl mx-auto">
            {/* Back to Blog Link */}
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-8"
            >
              <ArrowLeft size={16} />
              Back to Blog
            </Link>

            {/* Featured Image */}
            <div className="aspect-video rounded-2xl overflow-hidden mb-8">
              <Image
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Post Header */}
            <header className="mb-8">
              <span className="inline-block px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium mb-4">
                {post.category}
              </span>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {post.title}
              </h1>
              
              <p className="text-xl text-gray-300 mb-6">
                {post.excerpt}
              </p>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-6">
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
              
              {post.tags.length > 0 && (
                <div className="flex items-center gap-2 mb-8">
                  <Tag size={16} className="text-gray-400" />
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="text-sm bg-gray-700 px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </header>

            {/* Post Content */}
            <div className="prose prose-invert prose-lg max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-2xl font-bold mt-6 mb-3">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-xl font-bold mt-4 mb-2">{children}</h3>,
                  p: ({ children }) => <p className="mb-4 text-gray-300 leading-relaxed">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc pl-6 mb-4 text-gray-300">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 text-gray-300">{children}</ol>,
                  li: ({ children }) => <li className="mb-1">{children}</li>,
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-400 my-6">
                      {children}
                    </blockquote>
                  ),
                  code: ({ children }) => (
                    <code className="bg-gray-800 px-2 py-1 rounded text-sm">{children}</code>
                  ),
                  pre: ({ children }) => (
                    <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto my-6">{children}</pre>
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            {/* Back to Blog Link */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
              >
                <ArrowLeft size={16} />
                Back to Blog
              </Link>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
};

export default BlogPostPage;