import React, { useState } from 'react';
import './EmployeeCard.css';

function EmployeeCard({ employee, onEdit, onDelete }) {
  const [activeAddressTab, setActiveAddressTab] = useState('local'); // 'local' or 'permanent'
  const [copiedField, setCopiedField] = useState('');

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(''), 1800);
  };

  // Compute initials for avatar
  const initials = employee.name
    ? employee.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : 'EM';

  // Get department style theme
  const getDeptColorClass = (dept) => {
    if (dept.includes('Crop')) return 'dept-crop';
    if (dept.includes('Dairy')) return 'dept-dairy';
    if (dept.includes('Organic')) return 'dept-organic';
    if (dept.includes('Machinery')) return 'dept-machinery';
    if (dept.includes('Soil') || dept.includes('Agronomy')) return 'dept-soil';
    return 'dept-logistics';
  };

  return (
    <div className="farm-employee-card">
      {/* Top Banner: ID & Action Buttons */}
      <div className="card-top-bar">
        <div className="emp-id-badge">
          <span className="id-label">ID:</span>
          <code className="id-value">{employee.empId}</code>
        </div>

        <div className="card-actions">
          <button
            className="action-btn edit-btn"
            onClick={() => onEdit(employee)}
            title="Edit Employee Details"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            <span>Edit</span>
          </button>

          <button
            className="action-btn delete-btn"
            onClick={() => onDelete(employee)}
            title="Delete Employee"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              <line x1="10" y1="11" x2="10" y2="17"/>
              <line x1="14" y1="11" x2="14" y2="17"/>
            </svg>
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Main Profile Info */}
      <div className="employee-profile-section">
        <div 
          className="employee-avatar" 
          style={{ background: employee.avatarBg || 'var(--farm-gradient)' }}
        >
          {initials}
        </div>

        <div className="employee-info-main">
          <h3 className="employee-name">{employee.name}</h3>
          <p className="employee-designation">{employee.designation || 'Farm Staff Member'}</p>
          
          <div className="badge-row">
            <span className={`department-badge ${getDeptColorClass(employee.department)}`}>
              🌿 {employee.department}
            </span>

            <span className={`gender-tag ${employee.gender.toLowerCase()}`}>
              {employee.gender === 'Male' ? '👨 Male' : employee.gender === 'Female' ? '👩 Female' : '🧑 Other'}
            </span>
          </div>
        </div>
      </div>

      {/* Contact Details */}
      <div className="contact-box">
        <div className="contact-item">
          <div className="contact-label-row">
            <span className="contact-icon">📞</span>
            <span className="contact-label">Phone Number</span>
          </div>
          <div className="phone-row">
            <a href={`tel:${employee.phone}`} className="phone-link">
              {employee.phone}
            </a>
            <button
              className="copy-btn"
              onClick={() => handleCopy(employee.phone, 'phone')}
              title="Copy Phone Number"
            >
              {copiedField === 'phone' ? '✓ Copied' : 'Copy'}
            </button>
          </div>
        </div>
      </div>

      {/* Addresses Section (Local & Permanent) */}
      <div className="address-section">
        <div className="address-tabs-header">
          <button
            className={`address-tab-btn ${activeAddressTab === 'local' ? 'active' : ''}`}
            onClick={() => setActiveAddressTab('local')}
          >
            <span>🏠 Local Address</span>
          </button>
          <button
            className={`address-tab-btn ${activeAddressTab === 'permanent' ? 'active' : ''}`}
            onClick={() => setActiveAddressTab('permanent')}
          >
            <span>📍 Permanent Address</span>
          </button>
        </div>

        <div className="address-content-box">
          {activeAddressTab === 'local' ? (
            <div className="address-display local-view">
              <div className="address-type-tag">Farm Residence / Local Address</div>
              <p className="address-text">{employee.localAddress}</p>
            </div>
          ) : (
            <div className="address-display permanent-view">
              <div className="address-type-tag">Hometown / Permanent Address</div>
              <p className="address-text">{employee.permanentAddress}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmployeeCard;
