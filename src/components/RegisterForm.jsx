import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/api';
import toast from 'react-hot-toast';
import FormInput from './common/FormInput';
import FormSelect from './common/FormSelect';
import FormTextarea from './common/FormTextarea';
import Button from './common/Button';

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
    registrationType: ''
  });

  const registrationTypes = [
    { value: 'sales', label: 'Sales Manager' },
    { value: 'production', label: 'Production Manager' },
    { value: 'delivery', label: 'Delivery Manager' },
    { value: 'admin', label: 'Super Admin' },
  ];

  const operatorTypes = [
    { value: 'flexo_printing', label: 'Flexo Printing Operator' },
    { value: 'bag_making', label: 'Bag Making Operator' },
    { value: 'opsert_printing', label: 'Opsert Printing Operator' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      // If changing registration type and it's not production,
      // reset the operatorType
      if (name === 'registrationType' && value !== 'production') {
        return { ...prev, [name]: value, operatorType: '' };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      await register(formData);
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
            <FormInput
              label="Full Name"
              id="fullName"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
            />

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
              label="Mobile Number"
              id="mobileNumber"
              name="mobileNumber"
              type="tel"
              required
              value={formData.mobileNumber}
              onChange={handleChange}
              placeholder="Enter your mobile number"
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
              autoComplete="new-password"
            />

            <FormInput
              label="Confirm Password"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              autoComplete="new-password"
            />

            <FormTextarea
              label="Address"
              id="address"
              name="address"
              required
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
            />

            <FormSelect
              label="Registration Type"
              id="registrationType"
              name="registrationType"
              required
              value={formData.registrationType}
              onChange={handleChange}
              options={registrationTypes}
            />



            <Button
              type="submit"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}