import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShoppingCart, Heart } from 'lucide-react';
import '../styles/FeaturedItems.css'
import img from './img.jpg'

const featuredItems = [
  { id: 1, image: img, title: 'iPhone 12 Pro', price: 499.99, condition: 'Like New', seller: 'TechDeals' },
  { id: 2, image: img, title: 'Modern Leather Sofa', price: 799.50, condition: 'Excellent', seller: 'FurnishNow' },
  { id: 3, image: img, title: 'Vintage Leather Jacket', price: 149.99, condition: 'Good', seller: 'StyleVintage' },
  { id: 4, image: img, title: 'Smart TV 55"', price: 699.99, condition: 'New', seller: 'HomeTech' },
  { id: 5, image: img, title: 'Gaming Laptop', price: 1199.99, condition: 'Like New', seller: 'TechWorld' },
  { id: 6, image: img, title: 'Wireless Headphones', price: 199.99, condition: 'Excellent', seller: 'SoundHub' },
  { id: 7, image: img, title: 'Electric Scooter', price: 299.99, condition: 'Good', seller: 'EcoRide' },
  { id: 8, image: img, title: 'Smartwatch Series 7', price: 399.99, condition: 'New', seller: 'GadgetZone' },
  { id: 9, image: img, title: 'DSLR Camera', price: 899.99, condition: 'Like New', seller: 'PhotoPro' },
  { id: 10, image: img, title: 'Bookshelf', price: 120.00, condition: 'Excellent', seller: 'FurnishNow' }
];

const itemsPerPage = 4;

const FeaturedItemsSection = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.6, 1]);

  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');
  const totalPages = Math.ceil(featuredItems.length / itemsPerPage);

  const filteredItems = featuredItems.filter(item =>
    filter === 'price' ? item.price <= 500 :
    filter === 'condition' ? item.condition === 'New' :
    filter === 'name' ? item.title.toLowerCase().includes('a') :
    true
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sort === 'priceAsc') return a.price - b.price;
    if (sort === 'priceDesc') return b.price - a.price;
    if (sort === 'nameAsc') return a.title.localeCompare(b.title);
    if (sort === 'nameDesc') return b.title.localeCompare(a.title);
    return 0;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
        {currentItems.map((item) => (
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
              <img src={item.image} alt={item.title} />
              <motion.button 
                className="wishlist-btn"
                whileHover={{ 
                  scale: 1.2,
                  rotate: 360
                }}
                transition={{ 
                  duration: 0.8
                }}
              >
                <Heart size={20} />
              </motion.button>
            </div>
            <div className="featured-item-details">
              <h3>{item.title}</h3>
              <div className="item-price">${item.price.toFixed(2)}</div>
              <div className="item-condition">Condition: {item.condition}</div>
              <motion.button 
                className="add-to-cart-btn"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.6 }}
              >
                <ShoppingCart size={18} />
                Add to Cart
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
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
    </motion.div>
  );
};

export default FeaturedItemsSection;
