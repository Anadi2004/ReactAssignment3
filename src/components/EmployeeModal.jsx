import React, { useState, useEffect } from 'react';
import { DEPARTMENTS } from '../data/initialEmployees';
import './EmployeeModal.css';

function EmployeeModal({ isOpen, mode, employeeData, onSave, onClose }) {
  // Form State using useState()
  const [formData, setFormData] = useState({
    name: '',
    empId: '',
    department: DEPARTMENTS[0],
    gender: 'Male',
    phone: '',
    localAddress: '',
    permanentAddress: '',
    designation: ''
  });

  const [sameAsLocal, setSameAsLocal] = useState(false);
  const [errors, setErrors] = useState({});

  // Populate form state when editing or resetting on modal open
  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && employeeData) {
        setFormData({
          name: employeeData.name || '',
          empId: employeeData.empId || '',
          department: employeeData.department || DEPARTMENTS[0],
          gender: employeeData.gender || 'Male',
          phone: employeeData.phone || '',
          localAddress: employeeData.localAddress || '',
          permanentAddress: employeeData.permanentAddress || '',
          designation: employeeData.designation || ''
        });
        setSameAsLocal(employeeData.localAddress === employeeData.permanentAddress);
      } else {
        // Generate automatic ID suggestion for new employee
        const randomNum = Math.floor(100 + Math.random() * 900);
        setFormData({
          name: '',
          empId: `FRM-${randomNum}`,
          department: DEPARTMENTS[0],
          gender: 'Male',
          phone: '+91 ',
          localAddress: '',
          permanentAddress: '',
          designation: ''
        });
        setSameAsLocal(false);
      }
      setErrors({});
    }
  }, [isOpen, mode, employeeData]);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      // If "Same as local" is checked and localAddress changed, mirror it
      if (name === 'localAddress' && sameAsLocal) {
        updated.permanentAddress = value;
      }
      return updated;
    });

    // Clear field-specific error on edit
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Toggle "Same as Local Address"
  const handleSameAddressToggle = (e) => {
    const isChecked = e.target.checked;
    setSameAsLocal(isChecked);
    if (isChecked) {
      setFormData(prev => ({
        ...prev,
        permanentAddress: prev.localAddress
      }));
    }
  };

  // Form Validation & Submission Event Handling
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full Name is required.';
    if (!formData.empId.trim()) newErrors.empId = 'Employee ID is required.';
    if (!formData.phone.trim() || formData.phone.trim() === '+91') newErrors.phone = 'Valid Phone Number is required.';
    if (!formData.localAddress.trim()) newErrors.localAddress = 'Local Address is required.';
    if (!formData.permanentAddress.trim()) newErrors.permanentAddress = 'Permanent Address is required.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Pass data back up to parent App state handler
    onSave(formData);
  };

  // Conditional Rendering: If not open, render nothing
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-container"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="modal-badge-icon">
              {mode === 'edit' ? '✏️' : '🌱'}
            </span>
            <div>
              <h2 className="modal-title">
                {mode === 'edit' ? 'Edit Employee Details' : 'Add New Farm Employee'}
              </h2>
              <p className="modal-subtitle">
                {mode === 'edit' 
                  ? `Modifying record for ${employeeData?.name} (${employeeData?.empId})`
                  : 'Enter complete personal, contact, and address records'}
              </p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} title="Close">
            ✕
          </button>
        </div>

        {/* Form Body */}
        <form className="modal-form" onSubmit={handleSubmit}>
          {/* Row 1: Name & ID */}
          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">
                Full Name <span className="req">*</span>
              </label>
              <input
                type="text"
                name="name"
                className={`form-input ${errors.name ? 'input-error' : ''}`}
                placeholder="e.g. Rajesh Kumar Mandal"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">
                Employee ID <span className="req">*</span>
              </label>
              <input
                type="text"
                name="empId"
                className={`form-input ${errors.empId ? 'input-error' : ''}`}
                placeholder="e.g. FRM-101"
                value={formData.empId}
                onChange={handleChange}
              />
              {errors.empId && <span className="error-text">{errors.empId}</span>}
            </div>
          </div>

          {/* Row 2: Department & Designation */}
          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">
                Department Name <span className="req">*</span>
              </label>
              <select
                name="department"
                className="form-select"
                value={formData.department}
                onChange={handleChange}
              >
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Role / Designation</label>
              <input
                type="text"
                name="designation"
                className="form-input"
                placeholder="e.g. Senior Agronomist"
                value={formData.designation}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Row 3: Gender & Phone Number */}
          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">
                Gender <span className="req">*</span>
              </label>
              <div className="gender-radio-group">
                {['Male', 'Female', 'Other'].map((gen) => (
                  <label key={gen} className={`gender-radio-option ${formData.gender === gen ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="gender"
                      value={gen}
                      checked={formData.gender === gen}
                      onChange={handleChange}
                    />
                    <span>{gen === 'Male' ? '👨 Male' : gen === 'Female' ? '👩 Female' : '🧑 Other'}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                Phone Number <span className="req">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                className={`form-input ${errors.phone ? 'input-error' : ''}`}
                placeholder="+91 98301 24567"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <span className="error-text">{errors.phone}</span>}
            </div>
          </div>

          {/* Row 4: Local Address */}
          <div className="form-group">
            <label className="form-label">
              Local Address (Farm Campus / Current Residence) <span className="req">*</span>
            </label>
            <textarea
              name="localAddress"
              rows="2"
              className={`form-textarea ${errors.localAddress ? 'input-error' : ''}`}
              placeholder="e.g. Staff Quarters A-12, GreenValley Farm Complex, Kolkata - 700091"
              value={formData.localAddress}
              onChange={handleChange}
            />
            {errors.localAddress && <span className="error-text">{errors.localAddress}</span>}
          </div>

          {/* Helper: Same Address Checkbox */}
          <div className="same-address-checkbox-row">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={sameAsLocal}
                onChange={handleSameAddressToggle}
              />
              <span>Permanent Address is the same as Local Address</span>
            </label>
          </div>

          {/* Row 5: Permanent Address */}
          <div className="form-group">
            <label className="form-label">
              Permanent Address (Hometown / Native Place) <span className="req">*</span>
            </label>
            <textarea
              name="permanentAddress"
              rows="2"
              disabled={sameAsLocal}
              className={`form-textarea ${errors.permanentAddress ? 'input-error' : ''} ${sameAsLocal ? 'disabled' : ''}`}
              placeholder="e.g. Vill: Joynagar, P.O: Canning, South 24 Parganas, WB - 743329"
              value={formData.permanentAddress}
              onChange={handleChange}
            />
            {errors.permanentAddress && !sameAsLocal && (
              <span className="error-text">{errors.permanentAddress}</span>
            )}
          </div>

          {/* Modal Footer Actions */}
          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              {mode === 'edit' ? 'Update Employee Record' : 'Save & Add Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmployeeModal;
