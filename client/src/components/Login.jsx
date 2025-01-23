import React, { useState } from 'react';
import { X } from 'lucide-react';
import '../styles/Login.css';

const Login = ({ onClose, onLogin, onSignUpClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
   
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="auth-container">
          <h2>Welcome Back!</h2>
          <p className="auth-subtitle">Login to access your account</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                Remember me
              </label>
              <button type="button" className="forgot-password">
                Forgot Password?
              </button>
            </div>

            <button type="submit" className="submit-button">
              Login
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
            Don't have an account?{' '}
            <button onClick={onSignUpClick}>Sign Up</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;