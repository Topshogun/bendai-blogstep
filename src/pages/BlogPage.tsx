import React, { useState, useEffect } from 'react';
import PageLayout from '../layouts/PageLayout';
import BlogGrid from '../components/blog/BlogGrid';
import FeaturedCarousel from '../components/blog/FeaturedCarousel';
import CategoryFilter from '../components/blog/CategoryFilter';
import { BLOG_POSTS, BLOG_CATEGORIES } from '../constants/blog';
import { supabase } from '../lib/supabase';

interface DatabasePost {
  id: string;
  title: string;
  excerpt: string;
  content_markdown: string;
  featured_image_url: string;
  category_ids: string;
  tags: string[] | null;
  slug: string;
  published_at: string;
  created_at: string;
}

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [posts, setPosts] = useState(BLOG_POSTS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('Posts')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
        return;
      }

      // Transform database posts to blog post format
      const transformedPosts = data?.map((post: DatabasePost) => ({
        id: post.id,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content_markdown,
        author: 'Bendai Team',
        publishedDate: post.published_at,
        category: post.category_ids,
        tags: post.tags || [],
        featuredImage: post.featured_image_url,
        slug: post.slug,
        readTime: `${Math.ceil(post.content_markdown.length / 1000)} min read`
      })) || [];

      // Combine with static posts and sort by date
      const allPosts = [...transformedPosts, ...BLOG_POSTS].sort((a, b) => 
        new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
      );
      
      setPosts(allPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPosts = selectedCategory === 'all'
    ? posts
    : posts.filter(post => post.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory);

  if (isLoading) {
    return (
      <PageLayout 
        title="AI Insights Blog" 
        description="Latest insights and updates from the world of AI automation"
        currentPath="/blog"
      >
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-gray-400 mt-4">Loading posts...</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout 
      title="AI Insights Blog" 
      description="Latest insights and updates from the world of AI automation"
      currentPath="/blog"
    >
      <FeaturedCarousel posts={posts} />
      <CategoryFilter
        categories={BLOG_CATEGORIES}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <BlogGrid posts={filteredPosts} />
    </PageLayout>
  );
};

export default BlogPage;