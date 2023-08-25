import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    dob: yup
    .date()
    .required('Date of Birth is required')
    .test('is-over-18', 'Must be over 18 years old', value => {
      const today = new Date();
      const birthDate = new Date(value);
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        return age - 1 >= 18;
      }
      
      return age >= 18;
    }),
    city: yup.string().required('City is required'),
    pincode: yup
      .string()
      .matches(/^\d{6}$/, 'Must be a 6-digit pincode')
      .required('Pincode is required'),
  });
  
  interface RegistrationFormProps {
    onSubmit: (data: FormData) => void;
  }
  interface FormData {
    name: string;
    email: string;
    dob:  Date;
    city: string;
    pincode: string;
  }
  

  const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSubmit }) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<FormData>({
      resolver: yupResolver(schema),
    });

  return (
    <div className="registration-form">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <input type="text" placeholder="Name" {...register('name')} />
          {errors.name && <p className="error-message">{errors.name.message}</p>}
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email" {...register('email')} />
          {errors.email && <p className="error-message">{errors.email.message}</p>}
        </div>
        <div className="form-group">
          <input type="date" placeholder="Date of Birth" {...register('dob')} />
          {errors.dob && <p className="error-message">{errors.dob.message}</p>}
        </div>
        <div className="form-group">
          <select {...register('city')}>
            <option value="">Select City</option>
            <option value="guwahati">guwahati</option>
            <option value="mumbai">mumbai</option>
            <option value="kolkata">kolkata</option>

           
          </select>
          {errors.city && <p className="error-message">{errors.city.message}</p>}
        </div>
        <div className="form-group">
          <input type="text" placeholder="Pincode" {...register('pincode')} />
          {errors.pincode && <p className="error-message">{errors.pincode.message}</p>}
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
