import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import '../styles/SellProduct.css';

const SellProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    discount_price: '',
    categoryId: '',
    condition: 'New',
    location: '',
    quantity: 1,
    tags: [],
    brand: '',
    warranty_info: '',
    negotiable: true,
    status: 'Available',
    images: []
  });

  // Fetch categories for the dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5006/api/category');
        setCategories(response.data);
        // Set default category if available
        if (response.data.length > 0) {
          setFormData(prev => ({ ...prev, categoryId: response.data[0].id }));
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast.error('Failed to load categories');
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()]
      });
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Limit to 5 images
    if (files.length > 5) {
      toast.error('You can upload a maximum of 5 images');
      return;
    }
    
    // Check file sizes
    const oversizedFiles = files.filter(file => file.size > 5 * 1024 * 1024); // 5MB
    if (oversizedFiles.length > 0) {
      toast.error('Some files exceed the 5MB size limit');
      return;
    }
    
    setFormData({
      ...formData,
      images: files
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Create a FormData object to handle file uploads
      const productData = new FormData();
      
      // Append text fields
      productData.append('title', formData.title);
      productData.append('description', formData.description);
      productData.append('price', formData.price);
      productData.append('discount_price', formData.discount_price || '');
      productData.append('categoryId', formData.categoryId);
      productData.append('condition', formData.condition);
      productData.append('location', formData.location);
      productData.append('quantity', formData.quantity);
      productData.append('tags', JSON.stringify(formData.tags));
      productData.append('brand', formData.brand || '');
      productData.append('warranty_info', formData.warranty_info || '');
      productData.append('negotiable', formData.negotiable);
      productData.append('status', formData.status);
      
      // Append image files
      formData.images.forEach((image) => {
        productData.append('images', image);
      });

      // Submit the form data to your API
      const response = await axios.post('http://localhost:5006/api/product', productData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          // Add authorization header if needed
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      toast.success('Product listed successfully!');
      navigate('/my-listings'); // Redirect to listings page after successful submission
    } catch (error) {
      console.error('Error creating product:', error);
      toast.error(error.response?.data?.message || 'Failed to list product');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="sell-product-container">
      <div className="sell-product-wrapper">
        <h1>List Your Product</h1>
        <p className="sell-intro">Fill out the form below to list your product for sale or swap.</p>
        
        <form onSubmit={handleSubmit} className="sell-form">
          {/* Basic Information */}
          <div className="form-section">
            <h2 className="section-title">Basic Information</h2>
            
            <div className="form-group">
              <label htmlFor="title">Product Title*</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter a descriptive title"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Description*</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your product in detail"
                rows={5}
                required
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="brand">Brand</label>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  placeholder="Enter brand name"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="categoryId">Category*</label>
                <select
                  id="categoryId"
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select a category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {/* Price and Condition */}
          <div className="form-section">
            <h2 className="section-title">Price & Condition</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="price">Price ($)*</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="discount_price">Discounted Price ($)</label>
                <input
                  type="number"
                  id="discount_price"
                  name="discount_price"
                  value={formData.discount_price}
                  onChange={handleChange}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="condition">Condition*</label>
                <select
                  id="condition"
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  required
                >
                  <option value="New">New</option>
                  <option value="Like New">Like New</option>
                  <option value="Used">Used</option>
                  <option value="Refurbished">Refurbished</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="warranty_info">Warranty Information</label>
                <input
                  type="text"
                  id="warranty_info"
                  name="warranty_info"
                  value={formData.warranty_info}
                  onChange={handleChange}
                  placeholder="E.g., 1-year manufacturer warranty"
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="quantity">Quantity Available*</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  min="1"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="location">Location*</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="City, State"
                  required
                />
              </div>
            </div>
            
            <div className="form-group checkbox-group">
              <input
                type="checkbox"
                id="negotiable"
                name="negotiable"
                checked={formData.negotiable}
                onChange={handleChange}
              />
              <label htmlFor="negotiable">Price is negotiable</label>
            </div>
          </div>
          
          {/* Tags */}
          <div className="form-section">
            <h2 className="section-title">Product Tags</h2>
            
            <div className="form-group">
              <label htmlFor="tags">Tags (Help buyers find your product)</label>
              <div className="tags-input-container">
                <div className="tag-input-group">
                  <input
                    type="text"
                    id="tags"
                    value={tagInput}
                    onChange={handleTagInputChange}
                    placeholder="Add tags and press Enter"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <button 
                    type="button" 
                    className="tag-add-button"
                    onClick={addTag}
                  >
                    Add
                  </button>
                </div>
                
                {formData.tags.length > 0 && (
                  <div className="tags-container">
                    {formData.tags.map((tag, index) => (
                      <span key={index} className="tag">
                        {tag}
                        <button 
                          type="button" 
                          className="tag-remove" 
                          onClick={() => removeTag(tag)}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Images */}
          <div className="form-section">
            <h2 className="section-title">Product Images</h2>
            
            <div className="form-group">
              <label htmlFor="images">Upload Images*</label>
              <div className="image-upload-container">
                <input
                  type="file"
                  id="images"
                  name="images"
                  onChange={handleImageChange}
                  accept="image/*"
                  multiple
                  required
                />
                <p className="image-tip">You can upload up to 5 images (Max 5MB each)</p>
              </div>
              
              {formData.images.length > 0 && (
                <div className="image-preview">
                  <p>Selected {formData.images.length} image(s)</p>
                  <div className="image-preview-list">
                    {Array.from(formData.images).map((image, index) => (
                      <div key={index} className="image-preview-item">
                        <img 
                          src={URL.createObjectURL(image)} 
                          alt={`Preview ${index}`} 
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="form-actions">
            <button
              type="submit"
              className="submit-button"
              disabled={isLoading}
            >
              {isLoading ? 'Listing...' : 'List Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellProduct;