import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="farm-footer">
      <div className="footer-content">
        <div className="footer-left">
          <span className="footer-title">GreenValley Agro Farms Ltd.</span>
          <span className="footer-meta">EM-4, Sector V, Salt Lake, Kolkata - 700091</span>
        </div>
        <div className="footer-center">
          <span className="footer-assignment-badge">
            Assignment 3: useState() • Event Handling • Conditional Rendering
          </span>
        </div>
        <div className="footer-right">
          <span className="footer-author">Submitted by: <strong>Anadi Mondal</strong> (BCA)</span>
          <span className="footer-roll">Roll No: <code>231001102091</code> • Techno India University</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
