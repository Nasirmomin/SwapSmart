// App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
// import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          {/* Your other content will go here */}
          <h1>Welcome to SwapSmart</h1>
        </main>
        
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
            style: {
              background: 'var(--background-light)',
              color: 'var(--text-primary)',
              border: '1px solid var(--background-gray)',
            },
            success: {
              iconTheme: {
                primary: 'var(--success)',
                secondary: 'white',
              },
            },
            error: {
              iconTheme: {
                primary: 'var(--error)',
                secondary: 'white',
              },
            },
          }}
        />
      </div>
    </Router>
  );
};

export default App;