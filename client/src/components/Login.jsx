import React, { useState } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = ({ onClose, onLogin, onSignUpClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // Replace with your actual API endpoint
      const response = await axios.post('http://localhost:5006/api/users/login', {
        email,
        password
      });
      
      // Store token in localStorage
      localStorage.setItem('authToken', response.data.token);
      
      // Call the onLogin callback with user data
      onLogin(response.data.user);
      
      // Close modal and redirect
      onClose();
      navigate('/');
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'An error occurred during login'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-modal">
      <div className="login-container">
        <button className="close-button" onClick={onClose}>
          <X size={24} />
        </button>
        <h2>Welcome Back!</h2>
        <p>Login to access your account</p>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          <div className="form-options">
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <a href="#forgot-password">Forgot Password?</a>
          </div>
          <button
            type="submit"
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="divider">or</div>
        <div className="social-login">
          <button className="google-button">Continue with Google</button>
          <button className="facebook-button">Continue with Facebook</button>
        </div>
        <p className="signup-prompt">
          Don't have an account?{' '}
          <button className="text-button" onClick={onSignUpClick}>Sign Up</button>
        </p>
      </div>
    </div>
  );
};

export default Login;