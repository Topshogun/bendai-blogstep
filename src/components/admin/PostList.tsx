import React from 'react';
import { BLOG_POSTS } from '../../constants/blog';
import { Edit2, Trash2, Plus } from 'lucide-react';
import Button from '../ui/Button';

interface PostListProps {
  onEdit: (post: any) => void;
  onNew: () => void;
}

const PostList = ({ onEdit, onNew }: PostListProps) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Blog Posts</h2>
        <Button variant="primary" onClick={onNew}>
          <Plus size={16} />
          New Post
        </Button>
      </div>

      <div className="bg-white/5 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left p-4">Title</th>
              <th className="text-left p-4">Category</th>
              <th className="text-left p-4">Date</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {BLOG_POSTS.map((post) => (
              <tr key={post.title} className="border-b border-white/10">
                <td className="p-4">{post.title}</td>
                <td className="p-4">{post.category}</td>
                <td className="p-4">{post.date}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(post)}
                      className="p-2 hover:bg-white/10 rounded"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button className="p-2 hover:bg-white/10 rounded text-red-500">
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
  );
};

export default PostList;