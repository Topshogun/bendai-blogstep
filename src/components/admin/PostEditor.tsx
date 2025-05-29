import React, { useState } from 'react';
import { BlogPostDetailed } from '../../types/blog';
import { BLOG_CATEGORIES } from '../../constants/blog';
import Button from '../ui/Button';
import RichTextEditor from './RichTextEditor';

interface PostEditorProps {
  post?: BlogPostDetailed | null;
  onSave: (formData: any) => void;
  onCancel: () => void;
}

const PostEditor = ({ post, onSave, onCancel }: PostEditorProps) => {
  const [formData, setFormData] = useState({
    title: post?.title || '',
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    category: post?.category || BLOG_CATEGORIES[0],
    tags: post?.tags?.join(', ') || '',
    image: post?.image || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {post ? 'Edit Post' : 'Create New Post'}
        </h2>
        <div className="space-x-4">
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {post ? 'Update' : 'Publish'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <input
            type="text"
            name="title"
            placeholder="Post Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white/5 rounded-lg"
            required
          />

          <textarea
            name="excerpt"
            placeholder="Excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white/5 rounded-lg h-24"
            required
          />

          <RichTextEditor
            value={formData.content}
            onChange={(content) => setFormData(prev => ({ ...prev, content }))}
          />
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/5 rounded-lg"
              required
            >
              {BLOG_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Tags</label>
            <input
              type="text"
              name="tags"
              placeholder="Separate tags with commas"
              value={formData.tags}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/5 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Featured Image URL</label>
            <input
              type="url"
              name="image"
              placeholder="https://..."
              value={formData.image}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/5 rounded-lg"
              required
            />
          </div>

          {formData.image && (
            <img
              src={formData.image}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg"
            />
          )}
        </div>
      </div>
    </form>
  );
};

export default PostEditor;