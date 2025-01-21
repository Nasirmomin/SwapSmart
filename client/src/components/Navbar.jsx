import React, { useState } from 'react';
import { FiSearch, FiChevronDown, FiHeart, FiMessageSquare, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import '../styles/Navbar.css';

const MainNavbar = () => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('India');
  
  const handleLogout = () => {
    toast.success('Logged out successfully');
    // Add logout logic here
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="logo">
          <img src="/api/placeholder/32/32" alt="SmartSwap" />
        </Link>

        {/* Location Selector */}
        <button className="location-selector">
          <span className="location-text">{selectedLocation}</span>
          <FiChevronDown />
        </button>

        {/* Search Bar */}
        <div className="search-wrapper">
          <div className="search-container">
            <input
              type="text"
              placeholder="Find Cars, Mobile Phones and more..."
              className="search-input"
            />
            <button className="search-btn">
              <FiSearch />
            </button>
          </div>
        </div>

        {/* Language Selector */}
        <button className="language-selector">
          ENGLISH
          <FiChevronDown />
        </button>

        {/* Profile */}
        <div className="profile-section">
          <button 
            className="profile-trigger"
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
          >
            <FiUser />
            <span>Profile</span>
          </button>
          
          {showProfileDropdown && (
            <div className="profile-dropdown">
              <div className="dropdown-header">
                <FiUser className="header-icon" />
                <div className="header-text">
                  <span className="welcome-text">Welcome to SmartSwap</span>
                  <span className="sub-text">Create an account or log in</span>
                </div>
              </div>
              <div className="dropdown-content">
                <Link to="/profile" className="dropdown-item">
                  <FiUser />
                  <span>My Profile</span>
                </Link>
                <Link to="/favorites" className="dropdown-item">
                  <FiHeart />
                  <span>My Favorites</span>
                </Link>
                <Link to="/messages" className="dropdown-item">
                  <FiMessageSquare />
                  <span>Messages</span>
                </Link>
                <button onClick={handleLogout} className="dropdown-item logout">
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sell Button */}
        <Link to="/sell" className="sell-button">
          + SELL
        </Link>
      </div>
    </nav>
  );
};

export default MainNavbar;