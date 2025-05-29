import React, { useState } from 'react';
import PostList from '../../components/admin/PostList';
import PostEditor from '../../components/admin/PostEditor';
import { BlogPostDetailed } from '../../types/blog';
import { supabase } from '../../lib/supabase';

const PostsPage = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPostDetailed | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async (formData: any) => {
    console.log('Saving post data:', formData);
    
    try {
      const postData = {
        title: formData.title,
        excerpt: formData.excerpt,
        content_markdown: formData.content,
        featured_image_url: formData.image,
        category_ids: formData.category,
        tags: formData.tags.split(',').map((tag: string) => tag.trim()),
        is_published: true,
        published_at: new Date().toISOString(),
        slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      };

      let result;
      
      if (selectedPost?.id) {
        // Update existing post
        const { data, error } = await supabase
          .from('Posts')
          .update(postData)
          .eq('id', selectedPost.id)
          .select()
          .single();
          
        if (error) throw error;
        result = data;
      } else {
        // Create new post
        const { data, error } = await supabase
          .from('Posts')
          .insert(postData)
          .select()
          .single();
          
        if (error) throw error;
        result = data;
      }

      console.log('Post saved successfully:', result);
      setIsEditing(false);
      setSelectedPost(null);
    } catch (error) {
      console.error('Error saving post:', error);
      // Here you would typically show an error message to the user
    }
  };

  return (
    <div className="space-y-8">
      {isEditing ? (
        <PostEditor
          post={selectedPost}
          onSave={handleSave}
          onCancel={() => {
            setIsEditing(false);
            setSelectedPost(null);
          }}
        />
      ) : (
        <PostList
          onEdit={(post) => {
            setSelectedPost(post);
            setIsEditing(true);
          }}
          onNew={() => {
            setSelectedPost(null);
            setIsEditing(true);
          }}
        />
      )}
    </div>
  );
};

export default PostsPage;