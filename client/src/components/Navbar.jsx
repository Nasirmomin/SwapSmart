import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios
import { 
  FaBell,
  FaCommentDots, 
  FaUserCircle,
  FaSearch,
  FaShoppingBag,
  FaChevronDown // Import dropdown icon
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
  const [categories, setCategories] = useState([]); // State for categories
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false); // State to control dropdown visibility

  // Fetch categories from database
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await axios.get('http://localhost:5006/api/category');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
  
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger it once when the component mounts
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showCategoryDropdown && !event.target.closest('.category-dropdown-container')) {
        setShowCategoryDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCategoryDropdown]);

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
          
          {/* Categories dropdown */}
          <div className="category-dropdown-container">
            <button 
              className="category-dropdown-trigger"
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
            >
              Categories <FaChevronDown />
            </button>
            
            {showCategoryDropdown && (
              <div className="category-dropdown-menu">
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <Link 
                      key={category.id} 
                      to={`/categories/${category.id}`}
                      className="category-item"
                      onClick={() => setShowCategoryDropdown(false)}
                    >
                      {category.name}
                    </Link>
                  ))
                ) : (
                  <div className="category-item">Loading categories...</div>
                )}
              </div>
            )}
          </div>
          
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