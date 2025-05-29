import React from 'react';
import FloatingNav from '../components/navigation/FloatingNav';
import Breadcrumb from '../components/navigation/Breadcrumb';
import PageHeader from '../components/common/PageHeader';
import ModernCursor from '../components/cursor/ModernCursor';

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  currentPath: string;
}

const PageLayout = ({ children, title, description, currentPath }: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-black text-white cursor-none">
      <ModernCursor />
      <FloatingNav />
      
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb currentPath={currentPath} />
          <PageHeader title={title} description={description} />
          {children}
        </div>
      </main>
    </div>
  );
};

export default PageLayout;