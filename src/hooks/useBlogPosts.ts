import { useState, useEffect } from 'react';
import { BlogPost } from '../types';
import { supabase } from '../lib/supabase';

interface UseBlogPostsProps {
  page: number;
  category?: string;
  perPage?: number;
}

export const useBlogPosts = ({ page = 1, category = 'all', perPage = 6 }: UseBlogPostsProps) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [featured, setFeatured] = useState<BlogPost | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        // Calculate pagination
        const from = (page - 1) * perPage;
        const to = from + perPage - 1;

        // Build query
        let query = supabase
          .from('Posts')
          .select('*', { count: 'exact' })
          .eq('is_published', true)
          .order('published_at', { ascending: false })
          .range(from, to);

        // Add category filter if specified
        if (category !== 'all') {
          query = query.eq('category_ids', category);
        }

        const { data: posts, count, error } = await query;

        if (error) throw error;

        // Transform posts to match BlogPost type
        const transformedPosts = posts?.map(post => ({
          title: post.title || '',
          excerpt: post.excerpt || '',
          image: post.featured_image_url || '',
          author: 'Admin', // You might want to fetch this from a users table
          date: post.published_at ? new Date(post.published_at).toLocaleDateString() : '',
          readTime: '5 min', // You might want to calculate this based on content length
          category: post.category_ids || 'Uncategorized'
        })) || [];

        setPosts(transformedPosts);
        setTotalPages(Math.ceil((count || 0) / perPage));

        // Fetch featured post if on first page
        if (page === 1 && transformedPosts.length > 0) {
          setFeatured(transformedPosts[0]);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();

    // Set up realtime subscription
    const subscription = supabase
      .channel('public:Posts')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'Posts'
        },
        (payload) => {
          console.log('Change received:', payload);
          fetchPosts(); // Refresh posts when changes occur
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [page, category, perPage]);

  return {
    posts,
    totalPages,
    isLoading,
    featured
  };
};