import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bell, 
  MessageSquare, 
  Heart, 
  User, 
  Search, 
  ChevronDown, 
  LogIn,
  ShoppingBag,
  Settings,
  LogOut 
} from 'lucide-react';
import '../styles/Navbar.css';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const categories = [
    { name: 'Electronics', icon: '📱' },
    { name: 'Vehicles', icon: '🚗' },
    { name: 'Furniture', icon: '🪑' },
    { name: 'Fashion', icon: '👕' },
    { name: 'Books', icon: '📚' },
    { name: 'Sports', icon: '⚽' },
    { name: 'Home Appliances', icon: '🏠' }
  ];

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowProfileMenu(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">
          SmartSwap
        </Link>

        <div className="categories-dropdown">
          <button 
            className="dropdown-trigger"
            onClick={() => setShowDropdown(!showDropdown)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
          >
            Categories <ChevronDown size={16} />
          </button>
          {showDropdown && (
            <div className="dropdown-menu">
              {categories.map((category) => (
                <Link 
                  key={category.name} 
                  to={`/category/${category.name.toLowerCase()}`}
                  className="dropdown-item"
                >
                  <span className="category-icon">{category.icon}</span>
                  {category.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <Search className="search-icon" size={20} />
        </div>
      </div>

      <div className="navbar-right">
        {isLoggedIn ? (
          <>
            <Link to="/notifications" className="nav-icon" title="Notifications">
              <Bell size={24} />
              <span className="notification-badge">3</span>
            </Link>
            <Link to="/messages" className="nav-icon" title="Messages">
              <MessageSquare size={24} />
            </Link>
            <Link to="/wishlist" className="nav-icon" title="Wishlist">
              <Heart size={24} />
            </Link>
            <Link to="/sell" className="sell-button">
              Sell
            </Link>
            <div className="profile-container">
              <button 
                className="profile-trigger"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                onBlur={() => setTimeout(() => setShowProfileMenu(false), 200)}
              >
                <User size={24} />
              </button>
              {showProfileMenu && (
                <div className="profile-menu">
                  <Link to="/profile" className="profile-item">
                    <User size={18} />
                    Profile
                  </Link>
                  <Link to="/my-listings" className="profile-item">
                    <ShoppingBag size={18} />
                    My Listings
                  </Link>
                  <Link to="/settings" className="profile-item">
                    <Settings size={18} />
                    Settings
                  </Link>
                  <button onClick={handleLogout} className="profile-item logout">
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="login-button">
              <LogIn size={20} />
              Login
            </Link>
            <Link to="/signup" className="signup-button">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;