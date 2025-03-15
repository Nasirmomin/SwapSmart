import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Carousel from './components/Carousel';

// import './App.css';
import FeaturedItemsSection from './components/FeaturedItems';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <div className="app">
        <div >
          <Navbar />
        </div>
      <div >
        <Carousel/>
      </div>
      <div>
        <FeaturedItemsSection />
      </div>
        
        
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
        <Footer/>
      </div>
    </Router>
  );
};

export default App;