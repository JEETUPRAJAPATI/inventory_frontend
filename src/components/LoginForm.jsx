import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';
import FormInput from './common/FormInput';
import Button from './common/Button';

export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const getRedirectPath = (user) => {
    console.log('userd',user);
    // Handle production roles with operator types
    if (user.registrationType === 'production' && user.operatorType) {
      switch (user.operatorType) {
        case 'flexo_printing':
          return '/production/flexo/dashboard';
        case 'w_cut_bagmaking':
          return '/production/bagmaking/dashboard';
        case 'd_cut_bagmaking':
          return '/production/bagmaking/dashboard';
        case 'opsert_printing':
          return '/production/opsert/dashboard';
        default:
          return '/production/dashboard';
      }
    }

    // Handle other roles
    const routes = {
      sales: '/sales/dashboard',
      delivery: '/delivery/dashboard',
      admin: '/admin/dashboard',
      inventory: '/inventory/dashboard' // Added inventory route
    };

    return routes[user.registrationType] || '/login';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { user } = await login(formData);
      const redirectPath = getRedirectPath(user);
      toast.success('Login successful!');
      navigate(redirectPath);
    } catch (error) {
      toast.error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <FormInput
              label="Email"
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              autoComplete="email"
            />

            <FormInput
              label="Password"
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}