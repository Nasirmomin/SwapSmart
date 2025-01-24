import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaBell,
  FaCommentDots, 
  FaUserCircle,
  FaSearch,
  FaShoppingBag
} from 'react-icons/fa';
import Login from './Login';
import SignUp from './SignUp';
import '../styles/Navbar.css';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0); // Corrected from window.scrolly to window.scrollY
    };
  
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger it once when the component mounts
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowProfileMenu(false);
  };

  const handleLogin = (credentials) => {
    console.log('Login:', credentials);
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  const handleSignUp = (userData) => {
    console.log('SignUp:', userData);
    setIsLoggedIn(true);
    setShowSignUpModal(false);
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-left">
          <Link to="/" className="logo">
            SmartSwap
          </Link>
        </div>
        <div className="navbar-center">
          <Link to="/">Home</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/sell">Sell a Product</Link>
          <Link to="/how-it-works">How It Works</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact Us</Link>
        </div>
        <div className="navbar-right">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search product, category or seller"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <FaSearch className="search-icon" />
          </div>
          {isLoggedIn ? (
            <div className="profile-container">
              <Link to="/notifications" className="nav-icon" title="Notifications">
                <FaBell />
              </Link>
              <Link to="/messages" className="nav-icon" title="Messages">
                <FaCommentDots />
              </Link>
              <button 
                className="profile-trigger"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                onBlur={() => setTimeout(() => setShowProfileMenu(false), 200)}
              >
                <FaUserCircle />
              </button>
              {showProfileMenu && (
                <div className="profile-menu">
                  <Link to="/profile" className="profile-item">
                    <FaUserCircle className="menu-icon" />
                    Profile
                  </Link>
                  <Link to="/my-listings" className="profile-item">
                    <FaShoppingBag className="menu-icon" />
                    My Listings
                  </Link>
                  <button onClick={handleLogout} className="profile-item logout">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <button 
                className="login-button"
                onClick={() => setShowLoginModal(true)}
              >
                Login
              </button>
              <button 
                className="signup-button"
                onClick={() => setShowSignUpModal(true)}
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </nav>

      {showLoginModal && (
        <Login 
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLogin}
          onSignUpClick={() => {
            setShowLoginModal(false);
            setShowSignUpModal(true);
          }}
        />
      )}

      {showSignUpModal && (
        <SignUp 
          onClose={() => setShowSignUpModal(false)}
          onSignUp={handleSignUp}
          onLoginClick={() => {
            setShowSignUpModal(false);
            setShowLoginModal(true);
          }}
        />
      )}
    </>
  );
};

export default Navbar;