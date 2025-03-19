import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  FaBell,
  FaCommentDots, 
  FaUserCircle,
  FaSearch,
  FaShoppingBag,
  FaChevronDown
} from 'react-icons/fa';
import Login from './Login';
import SignUp from './SignUp';
import '../styles/Navbar.css';

const Navbar = ({ isLoggedIn, handleLogout, handleLogin }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const navigate = useNavigate();

  // Fetch categories from database
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5006/api/category');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Check auth token on component mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      axios.defaults.headers.common['Authorization'] = token;
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
  
    window.addEventListener('scroll', handleScroll);
    handleScroll();
  
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
      
      if (showProfileMenu && !event.target.closest('.profile-container')) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCategoryDropdown, showProfileMenu]);

  const onLogout = () => {
    // Remove the auth token when logging out
    localStorage.removeItem('authToken');
    delete axios.defaults.headers.common['Authorization'];
    
    handleLogout();
    setShowProfileMenu(false);
    navigate('/');
  };

  const onLogin = (userData) => {
    handleLogin(userData);
    setShowLoginModal(false);
  };

  const onSignUp = (userData) => {
    handleLogin(userData);
    setShowSignUpModal(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleProfileClick = () => {
    setShowProfileMenu(false);
    
    // Make sure the token is set in authorization header
    const token = localStorage.getItem('authToken');
    if (token) {
      axios.defaults.headers.common['Authorization'] = token;
    }
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
          <form className="search-container" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search product, category or seller"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              <FaSearch className="search-icon" />
            </button>
          </form>
          
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
              >
                <FaUserCircle />
              </button>
              {showProfileMenu && (
                <div className="profile-menu">
                  <Link to="/profile" className="profile-item" onClick={handleProfileClick}>
                    <FaUserCircle className="menu-icon" />
                    Profile
                  </Link>
                  <Link to="/my-listings" className="profile-item" onClick={() => setShowProfileMenu(false)}>
                    <FaShoppingBag className="menu-icon" />
                    My Listings
                  </Link>
                  <button onClick={onLogout} className="profile-item logout">
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
          onLogin={onLogin}
          onSignUpClick={() => {
            setShowLoginModal(false);
            setShowSignUpModal(true);
          }}
        />
      )}

      {showSignUpModal && (
        <SignUp 
          onClose={() => setShowSignUpModal(false)}
          onSignUp={onSignUp}
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