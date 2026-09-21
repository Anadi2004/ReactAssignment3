import React from 'react';
import './DeleteConfirmModal.css';

function DeleteConfirmModal({ isOpen, employee, onConfirm, onCancel }) {
  if (!isOpen || !employee) return null;

  return (
    <div className="delete-modal-backdrop" onClick={onCancel}>
      <div 
        className="delete-modal-box"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="delete-icon-wrapper">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        </div>

        <h3 className="delete-modal-title">Delete Employee Record?</h3>
        <p className="delete-modal-desc">
          Are you sure you want to delete <strong>{employee.name}</strong> (<code>{employee.empId}</code>) from the <strong>{employee.department}</strong> department?
        </p>

        <div className="delete-modal-actions">
          <button className="delete-btn-cancel" onClick={onCancel}>
            Keep Record
          </button>
          <button className="delete-btn-confirm" onClick={() => onConfirm(employee.id)}>
            Yes, Delete Employee
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
