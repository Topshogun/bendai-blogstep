import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, Users, Settings } from 'lucide-react';

const AdminSidebar = () => {
  return (
    <aside className="w-64 min-h-screen bg-white/5 border-r border-white/10">
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isActive ? 'bg-blue-500 text-white' : 'hover:bg-white/10'
                }`
              }
            >
              <LayoutDashboard size={16} />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/posts"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isActive ? 'bg-blue-500 text-white' : 'hover:bg-white/10'
                }`
              }
            >
              <FileText size={16} />
              Posts
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isActive ? 'bg-blue-500 text-white' : 'hover:bg-white/10'
                }`
              }
            >
              <Users size={16} />
              Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/settings"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isActive ? 'bg-blue-500 text-white' : 'hover:bg-white/10'
                }`
              }
            >
              <Settings size={16} />
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;