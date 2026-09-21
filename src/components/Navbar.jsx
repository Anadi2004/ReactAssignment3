import React from 'react';
import './Navbar.css';

function Navbar({ onOpenAddModal, totalEmployees }) {
  return (
    <nav className="farm-navbar">
      <div className="navbar-glow"></div>
      <div className="navbar-container">
        {/* Brand */}
        <div className="brand-group">
          <div className="brand-logo-badge">
            <span className="farm-icon">🌱</span>
          </div>
          <div className="brand-titles">
            <div className="brand-name-wrapper">
              <h1 className="brand-name">GreenValley Agro Farms</h1>
              <span className="live-status-pill">
                <span className="pulse-dot"></span>
                <span>Active Portal</span>
              </span>
            </div>
            <p className="brand-subtitle">Employee Directory & Farm Personnel Management</p>
          </div>
        </div>

        {/* Actions */}
        <div className="navbar-actions">
          <div className="nav-stat-chip">
            <span className="chip-label">Staff Enrolled</span>
            <span className="chip-count">{totalEmployees}</span>
          </div>

          <button className="add-employee-btn" onClick={onOpenAddModal}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            <span>Add New Employee</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
