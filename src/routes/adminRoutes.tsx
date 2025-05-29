import React from 'react';
import { Route } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import DashboardPage from '../pages/admin/DashboardPage';
import PostsPage from '../pages/admin/PostsPage';
import SettingsPage from '../pages/admin/SettingsPage';
import UsersPage from '../pages/admin/UsersPage';
import { useAuthProtection } from '../middleware/authMiddleware';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  useAuthProtection();
  return <>{children}</>;
};

export const AdminRoutes = () => {
  return (
    <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
      <Route index element={<DashboardPage />} />
      <Route path="posts" element={<PostsPage />} />
      <Route path="users" element={<UsersPage />} />
      <Route path="settings" element={<SettingsPage />} />
    </Route>
  );
};