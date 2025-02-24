import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>About SwapSmart</h3>
          <p>SwapSmart is your smart HRM solution, simplifying attendance and leave management with ease and efficiency.</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: support@swapsmart.com</p>
          <p>Phone: +91 12345 67890</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 SwapSmart. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
