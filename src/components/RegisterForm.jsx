import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import toast from 'react-hot-toast';
import RegisterFormFields from './auth/RegisterFormFields';
import { validateRegistration } from '../utils/validation';

export default function RegisterForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
    address: '',
    registrationType: '',
    bagType: '',
    operatorType: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = {
        ...prev,
        [name]: value,
      };

      // Reset dependent fields when registration type changes
      if (name === 'registrationType' && value !== 'production') {
        newData.bagType = '';
        newData.operatorType = '';
      }

      // Reset operator type when bag type changes
      if (name === 'bagType') {
        newData.operatorType = '';
      }

      return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateRegistration(formData);
    if (validationError) {
      toast.error(validationError);
      return;
    }

    try {
      setLoading(true);
      await authService.register(formData);
      toast.success('Registration successful!');
      navigate('/login');
    } catch (error) {
      toast.error(error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <RegisterFormFields 
              formData={formData}
              onChange={handleChange}
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}