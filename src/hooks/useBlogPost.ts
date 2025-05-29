import { useState, useEffect } from 'react';
import { BlogPostDetailed } from '../types/blog';
import { supabase } from '../lib/supabase';

export const useBlogPost = (slug: string | undefined) => {
  const [post, setPost] = useState<BlogPostDetailed | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!slug) {
      setError(new Error('No slug provided'));
      setIsLoading(false);
      return;
    }

    const fetchPost = async () => {
      try {
        const { data: post, error } = await supabase
          .from('posts')
          .select('*')
          .eq('slug', slug)
          .eq('is_published', true)
          .single();

        if (error) throw error;

        if (post) {
          // Transform the post data to match BlogPostDetailed type
          const transformedPost: BlogPostDetailed = {
            title: post.title,
            excerpt: post.excerpt,
            image: post.featured_image_url,
            author: {
              id: '1',
              name: 'Admin', // You might want to fetch this from a users table
              avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150',
              bio: 'AI researcher and technology enthusiast',
              role: 'Senior AI Engineer'
            },
            date: new Date(post.published_at).toLocaleDateString(),
            readTime: '5 min',
            category: post.category_ids,
            slug: post.slug,
            content: post.content_mark || post.content_html,
            categories: [{ id: '1', name: post.category_ids, slug: post.category_ids.toLowerCase(), description: '' }],
            tags: post.tags ? post.tags.split(',').map(tag => tag.trim()) : [],
            relatedPosts: [] // You might want to fetch related posts based on category or tags
          };

          setPost(transformedPost);
        } else {
          setError(new Error('Post not found'));
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        setError(error instanceof Error ? error : new Error('Failed to fetch post'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();

    // Set up realtime subscription for post updates
    const subscription = supabase
      .channel(`post_${slug}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'posts',
          filter: `slug=eq.${slug}`
        },
        fetchPost
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [slug]);

  return { post, isLoading, error };
};