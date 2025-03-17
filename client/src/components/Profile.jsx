import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Edit2, Save, User, Mail, Phone, MapPin } from 'lucide-react';
import '../styles/Profile.css';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    bio: ''
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
        name: response.data.name || '',
        email: response.data.email || '',
        phone: response.data.phone || '',
        address: response.data.address || '',
        bio: response.data.bio || ''
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
        name: userData.name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        address: userData.address || '',
        bio: userData.bio || ''
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
          {userData?.profileImage ? (
            <img src={userData.profileImage} alt="Profile" />
          ) : (
            <div className="avatar-placeholder">
              <User size={40} />
            </div>
          )}
        </div>

        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">
              <User size={16} />
              Full Name
            </label>
            {isEditing ? (
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            ) : (
              <p>{userData?.name || 'Not provided'}</p>
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

          <div className="form-group">
            <label htmlFor="bio">About Me</label>
            {isEditing ? (
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
              />
            ) : (
              <p className="bio-text">{userData?.bio || 'No bio provided'}</p>
            )}
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