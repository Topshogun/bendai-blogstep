import React from 'react';
import { User, Mail, Calendar } from 'lucide-react';

const UsersPage = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Users</h1>

      <div className="bg-white/5 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left p-4">User</th>
              <th className="text-left p-4">Email</th>
              <th className="text-left p-4">Role</th>
              <th className="text-left p-4">Joined</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-white/10">
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <User size={20} />
                  <span>John Doe</span>
                </div>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <Mail size={16} />
                  <span>john@example.com</span>
                </div>
              </td>
              <td className="p-4">Admin</td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>Jan 15, 2024</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;