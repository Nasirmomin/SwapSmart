import React, { useState } from 'react';
import { FiSearch, FiChevronDown, FiHeart, FiMessageSquare, FiUser, FiMenu } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import '../styles/Navbar.css';

const MainNavbar = () => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
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
          <img src="/api/placeholder/48/48" alt="SmartSwap" />
          <span>SmartSwap</span>
        </Link>

        {/* Hamburger Menu for Mobile */}
        <button 
          className="hamburger-menu"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          <FiMenu />
        </button>

        {/* Main Navigation */}
        <div className={`nav-links ${showMobileMenu ? 'active' : ''}`}>
          {/* Location Selector */}
          <button className="nav-item location-selector">
            <span>{selectedLocation}</span>
            <FiChevronDown />
          </button>

          {/* Search Bar */}
          <div className="nav-item search-container">
            <input
              type="text"
              placeholder="Search for items..."
              className="search-input"
            />
            <button className="search-btn">
              <FiSearch />
            </button>
          </div>

          {/* Language Selector */}
          <button className="nav-item language-selector">
            EN
            <FiChevronDown />
          </button>

          {/* Profile Section */}
          <div className="nav-item profile-section">
            <button 
              className="profile-trigger"
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            >
              <FiUser />
              <span>Profile</span>
            </button>
            {showProfileDropdown && (
              <div className="profile-dropdown">
                <Link to="/profile" className="dropdown-item">
                  <FiUser />
                  <span>My Profile</span>
                </Link>
                <Link to="/favorites" className="dropdown-item">
                  <FiHeart />
                  <span>Favorites</span>
                </Link>
                <Link to="/messages" className="dropdown-item">
                  <FiMessageSquare />
                  <span>Messages</span>
                </Link>
                <button onClick={handleLogout} className="dropdown-item logout">
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Sell Button */}
          <Link to="/sell" className="sell-button">
            + SELL
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default MainNavbar;
