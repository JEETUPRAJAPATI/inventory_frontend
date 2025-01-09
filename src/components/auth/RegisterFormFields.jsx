import FormInput from '../common/FormInput';
import FormSelect from '../common/FormSelect';
import FormTextarea from '../common/FormTextarea';
import ProductionFields from './ProductionFields';
import { registrationTypes } from '../../constants/userTypes';

export default function RegisterFormFields({ formData, onChange }) {
  return (
    <>
      <FormInput
        label="Full Name"
        id="fullName"
        name="fullName"
        required
        value={formData.fullName}
        onChange={onChange}
        placeholder="Enter your full name"
      />

      <FormInput
        label="Email"
        id="email"
        name="email"
        type="email"
        required
        value={formData.email}
        onChange={onChange}
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
        onChange={onChange}
        placeholder="Enter your mobile number"
      />

      <FormInput
        label="Password"
        id="password"
        name="password"
        type="password"
        required
        value={formData.password}
        onChange={onChange}
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
        onChange={onChange}
        placeholder="Confirm your password"
        autoComplete="new-password"
      />

      <FormTextarea
        label="Address"
        id="address"
        name="address"
        required
        value={formData.address}
        onChange={onChange}
        placeholder="Enter your address"
      />

      <FormSelect
        label="Registration Type"
        id="registrationType"
        name="registrationType"
        required
        value={formData.registrationType}
        onChange={onChange}
        options={registrationTypes}
      />

      <ProductionFields 
        formData={formData}
        onChange={onChange}
      />
    </>
  );
}