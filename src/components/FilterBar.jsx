import React from 'react';
import './FilterBar.css';

function FilterBar({
  searchTerm,
  onSearchChange,
  selectedDepartment,
  onDepartmentChange,
  departmentCounts,
  genderFilter,
  onGenderFilterChange,
  sortBy,
  onSortByChange,
  departments,
  onClearFilters
}) {
  return (
    <div className="filter-bar-section">
      <div className="filter-container">
        {/* Top Control Bar: Search & Selectors */}
        <div className="search-and-controls">
          {/* Search Input */}
          <div className="search-box">
            <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search by Employee Name, ID (e.g. FRM-101), Phone, or Address..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            {searchTerm && (
              <button 
                className="clear-btn" 
                onClick={() => onSearchChange('')}
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Gender Filter Dropdown */}
          <div className="filter-dropdown-wrapper">
            <label className="filter-label">Gender:</label>
            <select
              className="filter-select"
              value={genderFilter}
              onChange={(e) => onGenderFilterChange(e.target.value)}
            >
              <option value="ALL">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="filter-dropdown-wrapper">
            <label className="filter-label">Sort By:</label>
            <select
              className="filter-select"
              value={sortBy}
              onChange={(e) => onSortByChange(e.target.value)}
            >
              <option value="id-asc">Employee ID (Asc)</option>
              <option value="name-asc">Name (A → Z)</option>
              <option value="name-desc">Name (Z → A)</option>
              <option value="dept">Department</option>
            </select>
          </div>

          {/* Reset button if any filter active */}
          {(searchTerm || selectedDepartment !== 'ALL' || genderFilter !== 'ALL') && (
            <button className="reset-all-btn" onClick={onClearFilters}>
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Department Filter Chips Bar */}
        <div className="dept-chips-wrapper">
          <span className="dept-filter-title">Farm Departments:</span>
          <div className="chips-scroller">
            <button
              className={`dept-chip ${selectedDepartment === 'ALL' ? 'active' : ''}`}
              onClick={() => onDepartmentChange('ALL')}
            >
              <span>🌾 All Departments</span>
              <span className="chip-count-badge">{departmentCounts['ALL'] || 0}</span>
            </button>

            {departments.map((dept) => (
              <button
                key={dept}
                className={`dept-chip ${selectedDepartment === dept ? 'active' : ''}`}
                onClick={() => onDepartmentChange(dept)}
              >
                <span>{dept}</span>
                <span className="chip-count-badge">{departmentCounts[dept] || 0}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
