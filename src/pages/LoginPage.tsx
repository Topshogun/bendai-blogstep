import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Cpu } from 'lucide-react';
import Button from '../components/ui/Button';

const LoginPage = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simple authentication check (replace with your actual auth logic)
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      localStorage.setItem('admin_token', 'authenticated');
      navigate('/admin');
    } else {
      setError('Invalid username or password');
    }
    
    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Cpu className="w-8 h-8 text-blue-400" />
            <span className="text-2xl font-bold font-orbitron">bendai</span>
          </div>
          <h2 className="text-3xl font-bold">Admin Login</h2>
          <p className="text-gray-400 mt-2">Sign in to access the admin dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border border-white/10"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border border-white/10"
              required
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <Button 
            variant="primary" 
            className="w-full"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
            <LogIn size={16} />
          </Button>

          <div className="text-center text-sm text-gray-400">
            <p>Demo credentials:</p>
            <p>Username: <span className="text-white">admin</span></p>
            <p>Password: <span className="text-white">admin123</span></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;