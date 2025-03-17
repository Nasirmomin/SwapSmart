import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShoppingCart, Heart } from 'lucide-react';
import axios from 'axios';
import '../styles/FeaturedItems.css';
import placeholderImg from './img.jpg'; // Fallback image

const itemsPerPage = 4;

const FeaturedItemsSection = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.6, 1]);

  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch items from the database
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        // Get featured items from the API
        const response = await axios.get('http://localhost:5006/api/product');
        setItems(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching featured items:', err);
        setError('Failed to load featured items. Please try again later.');
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  // Calculate total pages based on fetched items
  const totalPages = Math.ceil((items?.length || 0) / itemsPerPage);

  // Apply filters to the fetched items
  const filteredItems = items.filter(item => {
    if (filter === 'price') return parseFloat(item.price) <= 500;
    if (filter === 'condition') return item.condition === 'New';
    if (filter === 'name') return item.title.toLowerCase().includes('a');
    return true;
  });

  // Sort the filtered items
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sort === 'priceAsc') return parseFloat(a.price) - parseFloat(b.price);
    if (sort === 'priceDesc') return parseFloat(b.price) - parseFloat(a.price);
    if (sort === 'nameAsc') return a.title.localeCompare(b.title);
    if (sort === 'nameDesc') return b.title.localeCompare(a.title);
    return 0;
  });

  // Paginate the sorted items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle adding to wishlist
  const handleAddToWishlist = async (itemId) => {
    try {
      // Check if user is authenticated
      const token = localStorage.getItem('authToken');
      if (!token) {
        // Handle unauthenticated user
        alert('Please log in to add items to your wishlist');
        return;
      }

      await axios.post('http://localhost:5006/api/wishlist/add', 
        { item_id: itemId }, 
        { headers: { Authorization: `Bearer ${token}` }}
      );
      
      alert('Item added to wishlist!');
    } catch (err) {
      console.error('Error adding to wishlist:', err);
      alert('Failed to add item to wishlist');
    }
  };

  // Handle adding to cart
  const handleAddToCart = async (itemId) => {
    try {
      // Check if user is authenticated
      const token = localStorage.getItem('authToken');
      if (!token) {
        // Handle unauthenticated user
        alert('Please log in to add items to your cart');
        return;
      }

      await axios.post('http://localhost:5006/api/cart/add', 
        { item_id: itemId, quantity: 1 }, 
        { headers: { Authorization: `Bearer ${token}` }}
      );
      
      alert('Item added to cart!');
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Failed to add item to cart');
    }
  };

  if (loading) {
    return <div className="loading-spinner">Loading featured items...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <motion.div 
      style={{ scale, opacity }}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 50, 
        damping: 10,
        duration: 2
      }}
      className="featured-items-container"
    >
      <div className="filter-section">
        <h3>Filter Options</h3>
        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="">All Items</option>
          <option value="name">Filter by Name</option>
          <option value="price">Filter by Price ({`<= 500`})</option>
          <option value="condition">Filter by Condition (New)</option>
        </select>
        <h3>Sort Options</h3>
        <select onChange={(e) => setSort(e.target.value)}>
          <option value="">Default</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
          <option value="nameAsc">Name: A to Z</option>
          <option value="nameDesc">Name: Z to A</option>
        </select>
      </div>
      <motion.h2
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 50,
          duration: 2
        }}
        className="featured-section-title"
      >
        Featured Items
      </motion.h2>
      <motion.div 
        className="featured-items-grid"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              delayChildren: 0.5,
              staggerChildren: 0.5
            }
          }
        }}
      >
        {currentItems.length > 0 ? (
          currentItems.map((item) => (
            <motion.div
              key={item.id}
              variants={{
                hidden: { opacity: 0, y: 75 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    type: "spring",
                    stiffness: 50,
                    duration: 2
                  }
                }
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.5 }
              }}
              className="featured-item-card"
            >
              <div className="featured-item-image">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = placeholderImg;
                  }}
                />
                {item.discount_price && (
                  <div className="discount-badge">Sale</div>
                )}
                <motion.button 
                  className="wishlist-btn"
                  whileHover={{ 
                    scale: 1.2,
                    rotate: 360
                  }}
                  transition={{ 
                    duration: 0.8
                  }}
                  onClick={() => handleAddToWishlist(item.id)}
                  aria-label="Add to wishlist"
                >
                  <Heart size={20} />
                </motion.button>
              </div>
              <div className="featured-item-details">
                <h3>{item.title}</h3>
                <div className="item-price-container">
                  {item.discount_price ? (
                    <>
                      <span className="item-price-original">${item.price}</span>
                      <span className="item-price-discount">${item.discount_price}</span>
                    </>
                  ) : (
                    <div className="item-price">${item.price}</div>
                  )}
                </div>
                <div className="item-condition">Condition: {item.condition}</div>
                <div className="item-location">{item.location}</div>
                {item.negotiable && <div className="negotiable-badge">Negotiable</div>}
                <motion.button 
                  className="add-to-cart-btn"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.6 }}
                  onClick={() => handleAddToCart(item.id)}
                  disabled={!item.is_active || item.status !== 'Available'}
                >
                  <ShoppingCart size={18} />
                  {item.is_active && item.status === 'Available' ? 'Add to Cart' : 'Out of Stock'}
                </motion.button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="no-items-message">No items found matching your criteria.</div>
        )}
      </motion.div>
      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button 
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={currentPage === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default FeaturedItemsSection;