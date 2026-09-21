import React from 'react';
import EmployeeCard from './EmployeeCard';
import './EmployeeList.css';

function EmployeeList({
  employees,
  onEditEmployee,
  onDeleteEmployee,
  searchTerm,
  selectedDepartment,
  onClearFilters,
  onOpenAddModal
}) {
  return (
    <section className="employee-list-section">
      <div className="list-container">
        {/* Conditional Rendering: Check if matching employees exist */}
        {employees.length > 0 ? (
          <div className="employee-grid">
            {employees.map((employee) => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                onEdit={onEditEmployee}
                onDelete={onDeleteEmployee}
              />
            ))}
          </div>
        ) : (
          /* Empty Search / Filter State (Conditional Rendering) */
          <div className="empty-state-card">
            <div className="empty-icon-bubble">🌱</div>
            <h3 className="empty-title">No Farm Employees Found</h3>
            <p className="empty-desc">
              No staff records match your current criteria
              {searchTerm && <span> for search <strong>"{searchTerm}"</strong></span>}
              {selectedDepartment !== 'ALL' && <span> in <strong>"{selectedDepartment}"</strong></span>}.
            </p>
            <div className="empty-action-buttons">
              <button className="empty-btn reset-btn" onClick={onClearFilters}>
                Reset Search & Filters
              </button>
              <button className="empty-btn add-btn" onClick={onOpenAddModal}>
                + Add New Employee
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default EmployeeList;
