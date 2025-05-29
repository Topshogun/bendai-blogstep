import React from 'react';
import { Activity, Users, FileText, TrendingUp } from 'lucide-react';

const DashboardPage = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/5 p-6 rounded-xl">
          <div className="flex items-center gap-4">
            <Activity className="text-blue-400" size={24} />
            <div>
              <h3 className="text-sm text-gray-400">Total Views</h3>
              <p className="text-2xl font-bold">45.2K</p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 p-6 rounded-xl">
          <div className="flex items-center gap-4">
            <Users className="text-green-400" size={24} />
            <div>
              <h3 className="text-sm text-gray-400">Active Users</h3>
              <p className="text-2xl font-bold">1.2K</p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 p-6 rounded-xl">
          <div className="flex items-center gap-4">
            <FileText className="text-purple-400" size={24} />
            <div>
              <h3 className="text-sm text-gray-400">Total Posts</h3>
              <p className="text-2xl font-bold">324</p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 p-6 rounded-xl">
          <div className="flex items-center gap-4">
            <TrendingUp className="text-orange-400" size={24} />
            <div>
              <h3 className="text-sm text-gray-400">Engagement Rate</h3>
              <p className="text-2xl font-bold">12.3%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/5 p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          {/* Add activity feed here */}
        </div>

        <div className="bg-white/5 p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Popular Posts</h2>
          {/* Add popular posts list here */}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;