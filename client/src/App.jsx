import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Carousel from './components/Carousel';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Carousel />
        </main>
        
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
      </div>
    </Router>
  );
};

export default App;