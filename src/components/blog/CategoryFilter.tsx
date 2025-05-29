import React from 'react';
import { Tag } from 'lucide-react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange 
}: CategoryFilterProps) => {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-2 mb-4">
        <Tag className="text-blue-400" />
        <h3 className="text-xl font-semibold">Categories</h3>
      </div>
      
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => onCategoryChange('all')}
          className={`px-4 py-2 rounded-full transition-colors ${
            selectedCategory === 'all'
              ? 'bg-blue-500 text-white'
              : 'bg-white/5 hover:bg-white/10'
          }`}
        >
          All Posts
        </button>
        
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-full transition-colors ${
              selectedCategory === category
                ? 'bg-blue-500 text-white'
                : 'bg-white/5 hover:bg-white/10'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;