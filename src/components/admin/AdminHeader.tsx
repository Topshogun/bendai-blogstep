import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Settings } from 'lucide-react';
import Button from '../ui/Button';

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/login');
  };

  return (
    <header className="bg-white/5 border-b border-white/10">
      <div className="px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <Button variant="secondary" onClick={() => navigate('/admin/settings')}>
            <Settings size={16} />
            Settings
          </Button>
          <Button variant="secondary" onClick={handleLogout}>
            <LogOut size={16} />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;