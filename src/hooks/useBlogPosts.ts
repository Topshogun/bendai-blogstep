import { useState, useEffect } from 'react';
import { BlogPost } from '../types';
import { supabase } from '../lib/supabase';

interface UseBlogPostsProps {
  page: number;
  category?: string;
  perPage?: number;
}

const debugBlogPosts = async () => {
  console.log('🔍 Starting blog posts debug...')
  
  // 1. Check Supabase client configuration
  console.log('📊 Supabase URL:', import.meta.env.VITE_SUPABASE_URL)
  console.log('🔑 Supabase Anon Key exists:', !!import.meta.env.VITE_SUPABASE_ANON_KEY)
  
  // 2. Test basic Supabase connection
  try {
    const { data: tables, error: tablesError } = await supabase
      .from('Posts')
      .select('count', { count: 'exact', head: true })
    
    console.log('📈 Total posts in database:', tables?.length || 'Unknown')
    if (tablesError) console.error('❌ Table access error:', tablesError)
  } catch (err) {
    console.error('🚨 Connection error:', err)
  }
  
  // 3. Test fetching all posts (ignore published filter first)
  try {
    console.log('🔍 Fetching ALL posts...')
    const { data: allPosts, error: allError } = await supabase
      .from('Posts')
      .select('*')
    
    console.log('📝 All posts raw data:', allPosts)
    console.log('📊 Total posts found:', allPosts?.length || 0)
    
    if (allError) {
      console.error('❌ All posts error:', allError)
      console.error('❌ Error details:', JSON.stringify(allError, null, 2))
    }
  } catch (err) {
    console.error('🚨 Network error fetching all posts:', err)
  }
  
  // 4. Test fetching only published posts
  try {
    console.log('🔍 Fetching PUBLISHED posts...')
    const { data: publishedPosts, error: publishedError } = await supabase
      .from('Posts')
      .select('*')
      .eq('is_published', true)
    
    console.log('✅ Published posts:', publishedPosts)
    console.log('📊 Published posts count:', publishedPosts?.length || 0)
    
    if (publishedError) {
      console.error('❌ Published posts error:', publishedError)
    }
  } catch (err) {
    console.error('🚨 Network error fetching published posts:', err)
  }
  
  // 5. Test with different table name casing
  try {
    console.log('🔍 Testing lowercase table name...')
    const { data: lowerPosts, error: lowerError } = await supabase
      .from('posts')  // lowercase
      .select('*')
      .limit(1)
    
    console.log('📝 Lowercase table result:', lowerPosts)
    if (lowerError) console.log('ℹ️ Lowercase error (expected if table is "Posts"):', lowerError.message)
  } catch (err) {
    console.log('ℹ️ Lowercase test failed (expected):', err.message)
  }
  
  console.log('🏁 Blog posts debug complete!')
}

export const useBlogPosts = ({ page = 1, category = 'all', perPage = 6 }: UseBlogPostsProps) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [featured, setFeatured] = useState<BlogPost | null>(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      console.log('🚀 Starting fetchBlogPosts...')
      setIsLoading(true);
      setError(null);
      
      try {
        // Run debug first
        await debugBlogPosts();
        
        // Calculate pagination
        const from = (page - 1) * perPage;
        const to = from + perPage - 1;

        console.log('🔍 Fetching paginated posts...', { from, to, category })
        
        // Build query
        let query = supabase
          .from('Posts')
          .select(`
            id,
            title,
            excerpt,
            featured_image_url,
            published_at,
            created_at,
            is_published,
            category_ids,
            tags,
            content_markdown,
            slug
          `, { count: 'exact' })
          .eq('is_published', true)
          .order('published_at', { ascending: false });

        // Add category filter if specified
        if (category !== 'all') {
          query = query.eq('category_ids', category);
        }

        // Add pagination
        query = query.range(from, to);

        const { data: posts, count, error } = await query;

        console.log('📊 Query result:', { posts, count, error })

        if (error) {
          console.error('❌ Detailed error:', {
            message: error.message,
            details: error.details,
            hint: error.hint,
            code: error.code
          })
          throw error;
        }

        if (!posts) {
          console.log('⚠️ No posts found');
          setPosts([]);
          setTotalPages(0);
          return;
        }

        // Transform posts to match BlogPost type
        const transformedPosts = posts.map(post => ({
          id: post.id,
          title: post.title || 'Untitled Post',
          excerpt: post.excerpt || 'No excerpt available',
          image: post.featured_image_url || 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e',
          author: 'Admin',
          date: new Date(post.published_at || post.created_at).toLocaleDateString(),
          readTime: `${Math.ceil((post.content_markdown?.length || 0) / 1500)} min read`,
          category: post.category_ids || 'Uncategorized',
          slug: post.slug || post.id.toString()
        }));

        console.log('✅ Transformed posts:', transformedPosts);

        setPosts(transformedPosts);
        setTotalPages(Math.ceil((count || 0) / perPage));

        if (page === 1 && transformedPosts.length > 0) {
          setFeatured(transformedPosts[0]);
        }
      } catch (error) {
        console.error('🚨 Error in fetchBlogPosts:', error);
        setError(error instanceof Error ? error : new Error('Failed to fetch posts'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogPosts();
  }, [page, category, perPage]);

  return {
    posts,
    totalPages,
    isLoading,
    error,
    featured
  };
};