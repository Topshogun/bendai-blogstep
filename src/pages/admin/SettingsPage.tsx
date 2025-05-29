import React from 'react';
import Button from '../../components/ui/Button';
import { Save } from 'lucide-react';

const SettingsPage = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Settings</h1>

      <div className="bg-white/5 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-6">General Settings</h2>
        
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Site Title</label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-white/5 rounded-lg"
              defaultValue="Bendai Blog"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Site Description</label>
            <textarea
              className="w-full px-4 py-2 bg-white/5 rounded-lg h-24"
              defaultValue="AI Automation Insights and Updates"
            />
          </div>

          <Button variant="primary">
            <Save size={16} />
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;