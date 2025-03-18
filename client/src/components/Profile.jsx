import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Edit2, Save, User, Mail, Phone, MapPin, Home, Flag, ShoppingBag, Check, Settings } from 'lucide-react';
import '../styles/Profile.css';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zip_code: '',
    store_name: '',
    preferences: {}
  });

  // Fetch user profile data
  const fetchUserProfile = async () => {
    setIsLoading(true);
    try {
      // Get auth token from localStorage
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        throw new Error('You must be logged in to view this page');
      }
      
      const response = await axios.get('http://localhost:5006/api/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setUserData(response.data);
      setFormData({
        full_name: response.data.full_name || '',
        email: response.data.email || '',
        phone: response.data.phone || '',
        address: response.data.address || '',
        city: response.data.city || '',
        state: response.data.state || '',
        country: response.data.country || '',
        zip_code: response.data.zip_code || '',
        store_name: response.data.store_name || '',
        preferences: response.data.preferences || {}
      });
      setError('');
    } catch (err) {
      setError(
        err.response?.data?.message || 
        err.message || 
        'Failed to load profile data'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Update user profile
  const updateUserProfile = async () => {
    try {
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        throw new Error('You must be logged in to update your profile');
      }
      
      setIsLoading(true);
      
      const response = await axios.put(
        'http://localhost:5006/api/users/profile',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      setUserData(response.data);
      setIsEditing(false);
      setError('');
    } catch (err) {
      setError(
        err.response?.data?.message || 
        err.message || 
        'Failed to update profile'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserProfile();
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    if (isEditing) {
      // Reset form data if cancelling edit
      setFormData({
        full_name: userData.full_name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        address: userData.address || '',
        city: userData.city || '',
        state: userData.state || '',
        country: userData.country || '',
        zip_code: userData.zip_code || '',
        store_name: userData.store_name || '',
        preferences: userData.preferences || {}
      });
    }
    setIsEditing(!isEditing);
  };

  // Fetch user data on component mount
  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (isLoading && !userData) {
    return <div className="profile-loading">Loading profile...</div>;
  }

  if (error && !userData) {
    return <div className="profile-error">{error}</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>User Profile</h1>
        <div className="profile-status">
          <span className={`status-badge ${userData?.account_status?.toLowerCase()}`}>
            {userData?.account_status || 'Unknown'}
          </span>
          {userData?.is_verified && (
            <span className="verified-badge">
              <Check size={14} /> Verified
            </span>
          )}
        </div>
        <button 
          className={`edit-button ${isEditing ? 'save-mode' : ''}`}
          onClick={isEditing ? handleSubmit : toggleEditMode}
        >
          {isEditing ? (
            <>
              <Save size={18} />
              Save Changes
            </>
          ) : (
            <>
              <Edit2 size={18} />
              Edit Profile
            </>
          )}
        </button>
      </div>

      {error && <div className="profile-error">{error}</div>}

      <div className="profile-content">
        <div className="profile-avatar">
          {userData?.profile_picture ? (
            <img src={userData.profile_picture} alt="Profile" />
          ) : (
            <div className="avatar-placeholder">
              <User size={40} />
            </div>
          )}
          <div className="user-role">{userData?.role || 'Customer'}</div>
        </div>

        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="full_name">
              <User size={16} />
              Full Name
            </label>
            {isEditing ? (
              <input
                type="text"
                id="full_name"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
              />
            ) : (
              <p>{userData?.full_name || 'Not provided'}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">
              <Mail size={16} />
              Email Address
            </label>
            {isEditing ? (
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={true} // Email typically shouldn't be editable
              />
            ) : (
              <p>{userData?.email || 'Not provided'}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phone">
              <Phone size={16} />
              Phone Number
            </label>
            {isEditing ? (
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            ) : (
              <p>{userData?.phone || 'Not provided'}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="address">
              <MapPin size={16} />
              Address
            </label>
            {isEditing ? (
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={2}
              />
            ) : (
              <p>{userData?.address || 'Not provided'}</p>
            )}
          </div>

          <div className="form-row">
            <div className="form-group half">
              <label htmlFor="city">
                <Home size={16} />
                City
              </label>
              {isEditing ? (
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              ) : (
                <p>{userData?.city || 'Not provided'}</p>
              )}
            </div>

            <div className="form-group half">
              <label htmlFor="state">State/Province</label>
              {isEditing ? (
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                />
              ) : (
                <p>{userData?.state || 'Not provided'}</p>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group half">
              <label htmlFor="country">
                <Flag size={16} />
                Country
              </label>
              {isEditing ? (
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                />
              ) : (
                <p>{userData?.country || 'Not provided'}</p>
              )}
            </div>

            <div className="form-group half">
              <label htmlFor="zip_code">ZIP/Postal Code</label>
              {isEditing ? (
                <input
                  type="text"
                  id="zip_code"
                  name="zip_code"
                  value={formData.zip_code}
                  onChange={handleChange}
                />
              ) : (
                <p>{userData?.zip_code || 'Not provided'}</p>
              )}
            </div>
          </div>

          {(userData?.role === 'seller' || isEditing) && (
            <div className="form-group">
              <label htmlFor="store_name">
                <ShoppingBag size={16} />
                Store Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  id="store_name"
                  name="store_name"
                  value={formData.store_name}
                  onChange={handleChange}
                  placeholder={userData?.role === 'seller' ? 'Enter store name' : 'Only available for sellers'}
                  disabled={userData?.role !== 'seller'}
                />
              ) : (
                <p>{userData?.store_name || 'No store name provided'}</p>
              )}
            </div>
          )}

          <div className="form-group">
            <label>
              <Settings size={16} />
              Account Information
            </label>
            <div className="account-info">
              <p><strong>Role:</strong> {userData?.role || 'Customer'}</p>
              <p><strong>Account Status:</strong> {userData?.account_status || 'Active'}</p>
              <p><strong>Last Login:</strong> {userData?.last_login ? new Date(userData.last_login).toLocaleString() : 'Never'}</p>
              <p><strong>Member Since:</strong> {userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString() : 'Unknown'}</p>
            </div>
          </div>

          {isEditing && (
            <div className="form-actions">
              <button type="submit" className="save-button">
                <Save size={16} />
                Save Changes
              </button>
              <button 
                type="button" 
                className="cancel-button" 
                onClick={toggleEditMode}
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;