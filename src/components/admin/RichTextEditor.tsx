import React from 'react';
import { Bold, Italic, Link, List, Image } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const RichTextEditor = ({ value, onChange }: RichTextEditorProps) => {
  return (
    <div className="border border-white/10 rounded-lg overflow-hidden">
      <div className="bg-white/5 p-2 border-b border-white/10 flex gap-2">
        <button className="p-2 hover:bg-white/10 rounded">
          <Bold size={16} />
        </button>
        <button className="p-2 hover:bg-white/10 rounded">
          <Italic size={16} />
        </button>
        <button className="p-2 hover:bg-white/10 rounded">
          <Link size={16} />
        </button>
        <button className="p-2 hover:bg-white/10 rounded">
          <List size={16} />
        </button>
        <button className="p-2 hover:bg-white/10 rounded">
          <Image size={16} />
        </button>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-96 p-4 bg-transparent focus:outline-none resize-none"
        placeholder="Write your post content here..."
      />
    </div>
  );
};

export default RichTextEditor;