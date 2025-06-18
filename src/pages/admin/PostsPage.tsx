import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Trash2, Eye, Calendar, User, RefreshCw } from 'lucide-react';
import Button from '../../components/ui/Button';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category_ids: string;
  published_at: string;
  is_published: boolean;
  featured_image_url: string;
  slug: string;
  tags: string;
  content_markdown: string;
  created_at: string;
}

const PostsPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
    
    // Set up real-time subscription for new posts
    const subscription = supabase
      .channel('posts_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'Posts'
        },
        (payload) => {
          console.log('📡 Real-time update received:', payload);
          fetchPosts(); // Refresh the posts list
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log('🔍 Fetching posts from Supabase...');
      
      const { data, error, count } = await supabase
        .from('Posts')
        .select('*', { count: 'exact' })
        .order('published_at', { ascending: false });

      console.log('📊 Supabase response:', { data, error, count });

      if (error) {
        console.error('❌ Supabase error:', error);
        throw error;
      }
      
      setPosts(data || []);
      console.log('✅ Posts loaded successfully:', data?.length || 0);
    } catch (err) {
      console.error('❌ Error fetching posts:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch posts');
    } finally {
      setIsLoading(false);
    }
  };

  const deletePost = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      console.log('🗑️ Deleting post:', id);
      
      const { error } = await supabase
        .from('Posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setPosts(posts.filter(post => post.id !== id));
      console.log('✅ Post deleted successfully');
    } catch (err) {
      console.error('❌ Error deleting post:', err);
      alert('Failed to delete post: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  const testApiEndpoint = async () => {
    try {
      console.log('🧪 Testing API endpoint...');
      
      const testData = {
        title: `Test Post ${new Date().toISOString()}`,
        content: `This is a test blog post created at ${new Date().toLocaleString()}. 

## Test Content

This post was created to test the API endpoint functionality.

### Features Tested:
- API endpoint connectivity
- Data validation
- Database insertion
- Real-time updates

The content includes **markdown formatting** and various elements to ensure proper handling.`,
        excerpt: 'This is a test post created to verify the API endpoint is working correctly.',
        category: 'Testing',
        tags: ['test', 'api', 'automation'],
        featuredImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=1200&h=630'
      };

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/blog-posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify(testData)
      });

      const result = await response.json();
      console.log('🧪 API test result:', result);

      if (response.ok) {
        alert('✅ API test successful! Check the posts list for the new test post.');
        fetchPosts(); // Refresh the list
      } else {
        alert('❌ API test failed: ' + result.error);
      }
    } catch (error) {
      console.error('❌ API test error:', error);
      alert('❌ API test failed: ' + error.message);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Blog Posts</h1>
          <Button variant="secondary" onClick={fetchPosts}>
            <RefreshCw size={16} />
            Refresh
          </Button>
        </div>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-gray-400 mt-4">Loading posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-8">
        <h1 className="text-2xl font-bold">Blog Posts</h1>
        <div className="text-center py-12 space-y-4">
          <p className="text-red-400">Error: {error}</p>
          <div className="space-x-4">
            <Button variant="primary" onClick={fetchPosts}>
              Retry
            </Button>
            <Button variant="secondary" onClick={testApiEndpoint}>
              Test API
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Blog Posts</h1>
          <p className="text-gray-400 mt-1">
            Total: {posts.length} posts
          </p>
        </div>
        <div className="flex space-x-4">
          <Button variant="secondary" onClick={testApiEndpoint}>
            Test API
          </Button>
          <Button variant="secondary" onClick={fetchPosts}>
            <RefreshCw size={16} />
            Refresh
          </Button>
        </div>
      </div>

      {/* API Endpoint Information */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-blue-400 mb-2">API Endpoint Information</h3>
        <div className="space-y-2 text-sm">
          <p><strong>URL:</strong> <code className="bg-black/30 px-2 py-1 rounded">{import.meta.env.VITE_SUPABASE_URL}/functions/v1/blog-posts</code></p>
          <p><strong>Method:</strong> POST</p>
          <p><strong>Content-Type:</strong> application/json</p>
          <p className="text-gray-400">Use the "Test API" button above to verify the endpoint is working.</p>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12 space-y-4">
          <p className="text-gray-400">No posts found.</p>
          <p className="text-sm text-gray-500">
            Posts will appear here when received from your n8n workflow or when you test the API endpoint.
          </p>
          <Button variant="primary" onClick={testApiEndpoint}>
            Create Test Post
          </Button>
        </div>
      ) : (
        <div className="bg-white/5 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4">Title</th>
                  <th className="text-left p-4">Category</th>
                  <th className="text-left p-4">Published</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="border-b border-white/10 hover:bg-white/5">
                    <td className="p-4">
                      <div className="flex items-start space-x-3">
                        <img
                          src={post.featured_image_url}
                          alt={post.title}
                          className="w-12 h-12 object-cover rounded"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=100&h=100';
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold line-clamp-1">{post.title}</h3>
                          <p className="text-sm text-gray-400 line-clamp-2">{post.excerpt}</p>
                          {post.tags && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {post.tags.split(',').slice(0, 3).map((tag, index) => (
                                <span key={index} className="text-xs bg-gray-700 px-2 py-1 rounded">
                                  {tag.trim()}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-sm">
                        {post.category_ids}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <Calendar size={14} />
                        <span>{new Date(post.published_at).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-sm ${
                        post.is_published 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {post.is_published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            // Create a simple blog post view
                            const newWindow = window.open('', '_blank');
                            if (newWindow) {
                              newWindow.document.write(`
                                <html>
                                  <head>
                                    <title>${post.title}</title>
                                    <style>
                                      body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
                                      img { max-width: 100%; height: auto; }
                                      h1 { color: #333; }
                                      .meta { color: #666; margin-bottom: 20px; }
                                    </style>
                                  </head>
                                  <body>
                                    <h1>${post.title}</h1>
                                    <div class="meta">
                                      <p><strong>Category:</strong> ${post.category_ids}</p>
                                      <p><strong>Published:</strong> ${new Date(post.published_at).toLocaleDateString()}</p>
                                      <p><strong>Tags:</strong> ${post.tags}</p>
                                    </div>
                                    <img src="${post.featured_image_url}" alt="${post.title}" />
                                    <h2>Excerpt</h2>
                                    <p>${post.excerpt}</p>
                                    <h2>Content</h2>
                                    <div>${post.content_markdown.replace(/\n/g, '<br>')}</div>
                                  </body>
                                </html>
                              `);
                            }
                          }}
                          className="p-2 hover:bg-white/10 rounded text-blue-400"
                          title="Preview Post"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => deletePost(post.id)}
                          className="p-2 hover:bg-white/10 rounded text-red-400"
                          title="Delete Post"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostsPage;