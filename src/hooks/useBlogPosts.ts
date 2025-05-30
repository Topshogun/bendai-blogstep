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
  const [error, setError] = useState<Error | null>(null);
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
          .order('created_at', { ascending: false });

        // Add category filter if specified
        if (category !== 'all') {
          query = query.eq('category_ids', category);
        }

        // Add pagination
        query = query.range(from, to);

        const { data: posts, count, error } = await query;

        if (error) throw error;

        if (!posts) {
          setPosts([]);
          setTotalPages(0);
          return;
        }

        // Transform posts to match BlogPost type
        const transformedPosts = posts.map(post => ({
          title: post.title || '',
          excerpt: post.excerpt || '',
          image: post.featured_image_url || 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e',
          author: 'Admin',
          date: post.created_at ? new Date(post.created_at).toLocaleDateString() : '',
          readTime: '5 min',
          category: post.category_ids || 'Uncategorized'
        }));

        setPosts(transformedPosts);
        setTotalPages(Math.ceil((count || 0) / perPage));

        // Set featured post if on first page
        if (page === 1 && transformedPosts.length > 0) {
          setFeatured(transformedPosts[0]);
        }

        setError(null);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError(error instanceof Error ? error : new Error('Failed to fetch posts'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [page, category, perPage]);

  return {
    posts,
    totalPages,
    isLoading,
    error,
    featured
  };
};