import React, { useState } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/SignUp.css';

const SignUp = ({ onClose, onSignUp, onLoginClick }) => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zip_code: '',
    termsAccepted: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.full_name.trim()) {
      newErrors.full_name = 'Full name is required';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Phone validation
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9\s\-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    // City validation
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    // State validation
    if (!formData.state.trim()) {
      newErrors.state = 'State/Province is required';
    }

    // Country validation
    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
    }

    // ZIP code validation
    if (!formData.zip_code) {
      newErrors.zip_code = 'ZIP/Postal code is required';
    } else if (!/^[0-9a-zA-Z\s\-]+$/.test(formData.zip_code)) {
      newErrors.zip_code = 'Invalid ZIP/Postal code';
    }

    // Terms acceptance
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'You must accept the Terms of Service';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // Create user data object to match the User model structure
        const userData = {
          full_name: formData.full_name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          zip_code: formData.zip_code,
          profile_picture: null, // Default null - could add image upload later
          role: "customer" // Default role
        };
        
        // Send POST request to your backend API
        const response = await axios.post('http://localhost:5006/api/users/sign', userData);
        
        // Store the token with proper Bearer format
        if (response.data.token) {
          localStorage.setItem('authToken', `Bearer ${response.data.token}`);
          
          // Also set it as the default header for future requests
          axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        }
        
        // Call the onSignUp function with the response data
        onSignUp(response.data.user);
        
        // Close signup modal and open login modal
        onClose();
        onLoginClick();
        
      } catch (error) {
        console.error('Error registering user:', error);
        
        // Handle different types of errors
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          if (error.response.status === 400 && error.response.data.message === 'User already exists') {
            setSubmitError('Email already exists. Please try a different email.');
          } else if (error.response.data && error.response.data.message) {
            setSubmitError(error.response.data.message);
          } else {
            setSubmitError('Registration failed. Please try again later.');
          }
        } else if (error.request) {
          // The request was made but no response was received
          setSubmitError('Server not responding. Please check your internet connection.');
        } else {
          // Something happened in setting up the request
          setSubmitError('An error occurred. Please try again.');
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="modal-scrollable">
          <div className="auth-container">
            <h2>Create Account</h2>
            <p className="auth-subtitle">Join our community today</p>
            
            {submitError && (
              <div className="error-banner">
                {submitError}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="full_name">Full Name</label>
                <input
                  type="text"
                  id="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
                {errors.full_name && <p className="error-message">{errors.full_name}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
                {errors.email && <p className="error-message">{errors.email}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                />
                {errors.password && <p className="error-message">{errors.password}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                />
                {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                />
                {errors.phone && <p className="error-message">{errors.phone}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  required
                />
                {errors.address && <p className="error-message">{errors.address}</p>}
              </div>
              <div className="form-row">
                <div className="form-group half">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    required
                  />
                  {errors.city && <p className="error-message">{errors.city}</p>}
                </div>
                <div className="form-group half">
                  <label htmlFor="state">State/Province</label>
                  <input
                    type="text"
                    id="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State/Province"
                    required
                  />
                  {errors.state && <p className="error-message">{errors.state}</p>}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group half">
                  <label htmlFor="country">Country</label>
                  <input
                    type="text"
                    id="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Country"
                    required
                  />
                  {errors.country && <p className="error-message">{errors.country}</p>}
                </div>
                <div className="form-group half">
                  <label htmlFor="zip_code">ZIP/Postal Code</label>
                  <input
                    type="text"
                    id="zip_code"
                    value={formData.zip_code}
                    onChange={handleChange}
                    placeholder="ZIP/Postal Code"
                    required
                  />
                  {errors.zip_code && <p className="error-message">{errors.zip_code}</p>}
                </div>
              </div>
              <div className="terms-checkbox">
                <input
                  type="checkbox"
                  id="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="termsAccepted">
                  I agree to the Terms of Service and Privacy Policy
                </label>
                {errors.termsAccepted && <p className="error-message">{errors.termsAccepted}</p>}
              </div>
              <button 
                type="submit" 
                className="submit-button" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading-spinner"></span>
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>
            <div className="auth-divider">
              <span>or</span>
            </div>
            <div className="social-login">
              <button className="google-button" disabled={isSubmitting}>
                Continue with Google
              </button>
              <button className="facebook-button" disabled={isSubmitting}>
                Continue with Facebook
              </button>
            </div>
            <p className="switch-auth">
              Already have an account?{' '}
              <button onClick={onLoginClick} disabled={isSubmitting}>Login</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;