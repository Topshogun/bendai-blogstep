import React from 'react';
import PageLayout from '../../layouts/PageLayout';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import { Outlet } from 'react-router-dom';

const AdminPage = () => {
  return (
    <PageLayout
      title="Admin Dashboard"
      description="Manage your blog content"
      currentPath="/admin"
    >
      <div className="grid grid-cols-12 gap-8">
        <aside className="col-span-2">
          <AdminSidebar />
        </aside>
        <main className="col-span-10">
          <AdminHeader />
          <div className="mt-8">
            <Outlet />
          </div>
        </main>
      </div>
    </PageLayout>
  );
};

export default AdminPage;