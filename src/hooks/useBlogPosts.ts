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
      setError(null);
      
      try {
        console.log('Fetching posts with params:', { page, category, perPage });
        
        const from = (page - 1) * perPage;
        const to = from + perPage - 1;

        let query = supabase
          .from('Posts')
          .select('*', { count: 'exact' });

        // Only filter by is_published if it exists in the table
        query = query.order('created_at', { ascending: false });

        if (category !== 'all') {
          query = query.eq('category_ids', category);
        }

        const { data: posts, count, error } = await query.range(from, to);

        console.log('Supabase response:', { posts, count, error });

        if (error) throw error;

        if (!posts) {
          setPosts([]);
          setTotalPages(0);
          return;
        }

        const transformedPosts = posts.map(post => ({
          title: post.title || 'Untitled Post',
          excerpt: post.excerpt || 'No excerpt available',
          image: post.featured_image_url || 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e',
          author: 'Admin',
          date: post.created_at ? new Date(post.created_at).toLocaleDateString() : 'No date',
          readTime: '5 min',
          category: post.category_ids || 'Uncategorized'
        }));

        console.log('Transformed posts:', transformedPosts);

        setPosts(transformedPosts);
        setTotalPages(Math.ceil((count || 0) / perPage));

        if (page === 1 && transformedPosts.length > 0) {
          setFeatured(transformedPosts[0]);
        }
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