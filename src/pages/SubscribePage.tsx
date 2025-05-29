import React, { useState } from 'react';
import PageLayout from '../layouts/PageLayout';
import Button from '../components/ui/Button';
import { Mail, Bell } from 'lucide-react';

const SubscribePage = () => {
  const [email, setEmail] = useState('');
  const [preferences, setPreferences] = useState({
    news: true,
    updates: true,
    casestudies: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscription submitted:', { email, preferences });
  };

  return (
    <PageLayout
      title="Subscribe to Our Newsletter"
      description="Stay updated with the latest in AI automation"
      currentPath="/subscribe"
    >
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm">
          <div className="flex items-center gap-4 mb-8">
            <Mail className="text-blue-400 w-8 h-8" />
            <h2 className="text-2xl font-bold">Newsletter Subscription</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Preferences
              </h3>
              
              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={preferences.news}
                    onChange={(e) => setPreferences(prev => ({
                      ...prev,
                      news: e.target.checked
                    }))}
                    className="w-4 h-4 rounded text-blue-500 focus:ring-blue-500 bg-white/5"
                  />
                  <span>Industry News and Insights</span>
                </label>

                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={preferences.updates}
                    onChange={(e) => setPreferences(prev => ({
                      ...prev,
                      updates: e.target.checked
                    }))}
                    className="w-4 h-4 rounded text-blue-500 focus:ring-blue-500 bg-white/5"
                  />
                  <span>Product Updates and Features</span>
                </label>

                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={preferences.casestudies}
                    onChange={(e) => setPreferences(prev => ({
                      ...prev,
                      casestudies: e.target.checked
                    }))}
                    className="w-4 h-4 rounded text-blue-500 focus:ring-blue-500 bg-white/5"
                  />
                  <span>Case Studies and Success Stories</span>
                </label>
              </div>
            </div>

            <Button variant="primary" className="w-full">
              Subscribe Now
            </Button>

            <p className="text-sm text-gray-400 text-center">
              By subscribing, you agree to our privacy policy and terms of service.
            </p>
          </form>
        </div>
      </div>
    </PageLayout>
  );
};

export default SubscribePage;