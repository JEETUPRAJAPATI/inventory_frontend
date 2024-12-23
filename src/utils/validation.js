export const validateRegistration = (formData) => {
  const { password, confirmPassword, email } = formData;

  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }

  if (password.length < 8) {
    return 'Password must be at least 8 characters long';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }

  return null;
};