import React, { useState } from 'react';
import { X } from 'lucide-react';
import '../styles/Auth.css';

const SignUp = ({ onClose, onSignUp, onLoginClick }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignUp(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="auth-container">
          <h2>Create Account</h2>
          <p className="auth-subtitle">Join our community today</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Create a password"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm your password"
              />
            </div>

            <div className="terms-checkbox">
              <label>
                <input type="checkbox" required />
                I agree to the Terms of Service and Privacy Policy
              </label>
            </div>

            <button type="submit" className="submit-button">
              Create Account
            </button>
          </form>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <div className="social-login">
            <button className="google-button">
              Continue with Google
            </button>
            <button className="facebook-button">
              Continue with Facebook
            </button>
          </div>

          <p className="switch-auth">
            Already have an account?{' '}
            <button onClick={onLoginClick}>Login</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;