import React from 'react';
import './StatsBar.css';

function StatsBar({ totalEmployees, filteredCount, genderCounts, departmentCount }) {
  return (
    <div className="stats-bar-wrapper">
      <div className="stats-container">
        {/* Metric 1: Total Employees */}
        <div className="stat-card total-card">
          <div className="stat-icon-wrapper emerald">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-title">Total Farm Staff</span>
            <div className="stat-metric-row">
              <span className="stat-number">{totalEmployees}</span>
              <span className="stat-subtext">Personnel Enrolled</span>
            </div>
          </div>
        </div>

        {/* Metric 2: Departments Covered */}
        <div className="stat-card dept-card">
          <div className="stat-icon-wrapper teal">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 2 7 12 12 22 7 12 2"/>
              <polyline points="2 17 12 22 22 17"/>
              <polyline points="2 12 12 17 22 12"/>
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-title">Departments</span>
            <div className="stat-metric-row">
              <span className="stat-number">{departmentCount}</span>
              <span className="stat-subtext">Operating Divisions</span>
            </div>
          </div>
        </div>

        {/* Metric 3: Gender Distribution */}
        <div className="stat-card gender-card">
          <div className="stat-icon-wrapper cyan">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 8v8"/>
              <path d="M8 12h8"/>
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-title">Gender Ratio</span>
            <div className="gender-ratio-pills">
              <span className="gender-pill male">👨 {genderCounts.male || 0} Male</span>
              <span className="gender-pill female">👩 {genderCounts.female || 0} Female</span>
              {genderCounts.other > 0 && (
                <span className="gender-pill other">🧑 {genderCounts.other} Other</span>
              )}
            </div>
          </div>
        </div>

        {/* Metric 4: Filter Status */}
        <div className="stat-card filter-card">
          <div className="stat-icon-wrapper amber">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-title">Directory View</span>
            <div className="stat-metric-row">
              <span className="stat-number highlight-amber">{filteredCount}</span>
              <span className="stat-subtext">of {totalEmployees} Matching</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatsBar;
