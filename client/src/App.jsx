import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Carousel from './components/Carousel';
import FeaturedItemsSection from './components/FeaturedItems';
import Footer from './components/Footer';
import SellProduct from './components/SellProduct'; // Import the SellProduct component
import Profile from './components/Profile.jsx';
const App = () => {
  return (
    <Router>
      <div className="app">
        <div>
          <Navbar />
        </div>
        <Routes>
          {/* Home Route */}
          <Route path="/" element={
            <>
              <div>
                <Carousel />
              </div>
              <div>
                <FeaturedItemsSection />
              </div>
            </>
          } />
          
          {/* Sell Product Route */}
          <Route path="/sell" element={<SellProduct />} />
          
          {/* Add other routes as needed */}
          <Route path="/how-it-works" element={<div>How It Works Page</div>} />
          <Route path="/about" element={<div>About Us Page</div>} />
          <Route path="/contact" element={<div>Contact Us Page</div>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/my-listings" element={<div>My Listings Page</div>} />
          <Route path="/categories/:categoryId" element={<div>Category Products Page</div>} />
        </Routes>
        
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1a1a1a',
              color: '#ffffff',
              border: '1px solid #333333',
            },
            success: {
              iconTheme: {
                primary: '#4a90e2',
                secondary: '#ffffff',
              },
            },
            error: {
              iconTheme: {
                primary: '#e74c3c',
                secondary: '#ffffff',
              },
            },
          }}
        />
        <Footer />
      </div>
    </Router>
  );
};

export default App;