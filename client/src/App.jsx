import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Carousel from './components/Carousel';
import FeaturedItemsSection from './components/FeaturedItems';
import Footer from './components/Footer';
import Login from './components/Login';
import SignUp from './components/SignUp';
import SellProduct from './components/SellProduct';
import Profile from './components/Profile';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));

  // Check token validity on component mount
  useEffect(() => {
    checkTokenValidity();
  }, []);

  const checkTokenValidity = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        // Decode JWT token
        const tokenData = JSON.parse(atob(token.split('.')[1]));
        const isTokenValid = tokenData.exp * 1000 > Date.now();
        
        if (!isTokenValid) {
          localStorage.removeItem('authToken');
          setIsAuthenticated(false);
          return false;
        }
        setIsAuthenticated(true);
        return true;
      } catch (error) {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
        return false;
      }
    }
    return false;
  };

  // Protected route component
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <Router>
      <div className="app">
        <div>
          <Navbar 
            isLoggedIn={isAuthenticated} 
            handleLogout={() => {
              localStorage.removeItem('authToken');
              setIsAuthenticated(false);
            }}
            handleLogin={(userData) => {
              setIsAuthenticated(true);
            }}
          />
        </div>
        <Routes>
          {/* Public Routes */}
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
          <Route path="/how-it-works" element={<div>How It Works Page</div>} />
          <Route path="/about" element={<div>About Us Page</div>} />
          <Route path="/contact" element={<div>Contact Us Page</div>} />
          <Route path="/categories/:categoryId" element={<div>Category Products Page</div>} />

          {/* Protected Routes */}
          <Route 
            path="/sell" 
            element={
              <ProtectedRoute>
                <SellProduct />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/my-listings" 
            element={
              <ProtectedRoute>
                <div>My Listings Page</div>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/notifications" 
            element={
              <ProtectedRoute>
                <div>Notifications Page</div>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/messages" 
            element={
              <ProtectedRoute>
                <div>Messages Page</div>
              </ProtectedRoute>
            } 
          />

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
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