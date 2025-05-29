import React from 'react';
import { ChevronRight } from 'lucide-react';
import { getBreadcrumbItems } from '../../utils/navigation';

interface BreadcrumbProps {
  currentPath: string;
}

export const Breadcrumb = ({ currentPath }: BreadcrumbProps) => {
  const items = getBreadcrumbItems(currentPath);

  return (
    <nav className="mb-8" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={item.path} className="flex items-center">
            {index > 0 && <ChevronRight size={16} className="mx-2 text-gray-400" />}
            <a
              href={item.path}
              className={`
                text-sm hover:text-white transition-colors
                ${index === items.length - 1 ? 'text-white' : 'text-gray-400'}
              `}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;