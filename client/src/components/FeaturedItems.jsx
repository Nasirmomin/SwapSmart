import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShoppingCart, Heart } from 'lucide-react';
import '../styles/FeaturedItems.css'
import img from './img.jpg'
const featuredItems = [
  {
    id: 1,
    image: img,
    title: 'iPhone 12 Pro',
    price: 499.99,
    condition: 'Like New',
    seller: 'TechDeals'
  },
  {
    id: 2,
    image: img,
    title: 'Modern Leather Sofa',
    price: 799.50,
    condition: 'Excellent',
    seller: 'FurnishNow'
  },
  {
    id: 3,
    image: img,
    title: 'Vintage Leather Jacket',
    price: 149.99,
    condition: 'Good',
    seller: 'StyleVintage'
  },
  {
    id: 4,
    image: img,
    title: 'iPhone 12 Pro',
    price: 499.99,
    condition: 'Like New',
    seller: 'TechDeals'
  }, {
    id: 5,
    image: img,
    title: 'iPhone 12 Pro',
    price: 499.99,
    condition: 'Like New',
    seller: 'TechDeals'
  }, {
    id: 6,
    image: img,
    title: 'iPhone 12 Pro',
    price: 499.99,
    condition: 'Like New',
    seller: 'TechDeals'
  },
];

const FeaturedItemsSection = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.6, 1]);

  return (
    <motion.div 
      style={{ scale, opacity }}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 50, 
        damping: 10,
        duration: 2  // Increased duration
      }}
      className="featured-items-container"
    >
      <motion.h2
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 50,
          duration: 2  // Increased duration
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
              staggerChildren: 0.5  // Increased stagger time
            }
          }
        }}
      >
        {featuredItems.map((item) => (
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
                  duration: 2  // Increased duration
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
                  duration: 0.8  // Longer hover animation
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
    </motion.div>
  );
};

export default FeaturedItemsSection;