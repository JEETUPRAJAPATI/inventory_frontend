import { useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { login } from '../services/auth';
import toast from 'react-hot-toast';
import FormInput from './common/FormInput';
import Button from './common/Button';
import { useAuth } from '../hooks/useAuth';

export default function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login: authLogin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      const response = await login(formData);
      const { user, token } = response;
      
      await authLogin(user, token);
      toast.success('Login successful!');
      
      const from = location.state?.from?.pathname || '/';
      navigate(from);
    } catch (error) {
      toast.error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }, [formData, authLogin, navigate, location.state?.from?.pathname]);

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