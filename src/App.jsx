import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import StatsBar from './components/StatsBar';
import FilterBar from './components/FilterBar';
import EmployeeList from './components/EmployeeList';
import EmployeeModal from './components/EmployeeModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import Toast from './components/Toast';
import Footer from './components/Footer';
import { initialEmployees, DEPARTMENTS } from './data/initialEmployees';
import './App.css';

function App() {
  // 1. Primary State for Employee Directory
  const [employees, setEmployees] = useState(initialEmployees);

  // 2. Filter & Search State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('ALL');
  const [genderFilter, setGenderFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('id-asc');

  // 3. Modal States (Conditional Rendering)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit'
  const [currentEmployee, setCurrentEmployee] = useState(null);

  // 4. Delete Confirmation Modal State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  // 5. Toast Feedback State
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast({ message: '', type: 'success' });
    }, 3500);
  };

  // --- CRUD Handlers ---

  // Open Add Modal
  const handleOpenAddModal = () => {
    setModalMode('add');
    setCurrentEmployee(null);
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEditModal = (employee) => {
    setModalMode('edit');
    setCurrentEmployee(employee);
    setIsModalOpen(true);
  };

  // Save (Add or Update) Employee
  const handleSaveEmployee = (formData) => {
    if (modalMode === 'add') {
      const newEmp = {
        id: Date.now().toString(),
        ...formData,
        avatarBg: 'linear-gradient(135deg, #10b981, #059669)',
        joinedDate: new Date().toISOString().split('T')[0]
      };
      setEmployees(prev => [newEmp, ...prev]);
      showToast(`Added new employee: ${formData.name} (${formData.empId})`, 'success');
    } else {
      // Edit existing employee
      setEmployees(prev =>
        prev.map(emp =>
          emp.id === currentEmployee.id ? { ...emp, ...formData } : emp
        )
      );
      showToast(`Updated record for ${formData.name}`, 'edit');
    }
    setIsModalOpen(false);
    setCurrentEmployee(null);
  };

  // Open Delete Confirmation
  const handleOpenDeleteModal = (employee) => {
    setEmployeeToDelete(employee);
    setDeleteModalOpen(true);
  };

  // Confirm Delete Employee
  const handleConfirmDelete = (id) => {
    const deletedName = employeeToDelete?.name || 'Employee';
    setEmployees(prev => prev.filter(emp => emp.id !== id));
    setDeleteModalOpen(false);
    setEmployeeToDelete(null);
    showToast(`Deleted employee: ${deletedName}`, 'delete');
  };

  // Reset Filters Handler
  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedDepartment('ALL');
    setGenderFilter('ALL');
    setSortBy('id-asc');
  };

  // --- Computed Statistics & Filtered List ---

  // Department counts
  const departmentCounts = useMemo(() => {
    const map = { ALL: employees.length };
    DEPARTMENTS.forEach(dept => {
      map[dept] = 0;
    });
    employees.forEach(emp => {
      if (map[emp.department] !== undefined) {
        map[emp.department] += 1;
      }
    });
    return map;
  }, [employees]);

  // Gender counts
  const genderCounts = useMemo(() => {
    const counts = { male: 0, female: 0, other: 0 };
    employees.forEach(emp => {
      if (emp.gender === 'Male') counts.male += 1;
      else if (emp.gender === 'Female') counts.female += 1;
      else counts.other += 1;
    });
    return counts;
  }, [employees]);

  // Filtered & Sorted Employees
  const processedEmployees = useMemo(() => {
    let list = [...employees];

    // 1. Department filter
    if (selectedDepartment !== 'ALL') {
      list = list.filter(emp => emp.department === selectedDepartment);
    }

    // 2. Gender filter
    if (genderFilter !== 'ALL') {
      list = list.filter(emp => emp.gender === genderFilter);
    }

    // 3. Search query across Name, ID, Phone, Local & Permanent Addresses
    if (searchTerm.trim() !== '') {
      const q = searchTerm.toLowerCase().trim();
      list = list.filter(emp =>
        emp.name.toLowerCase().includes(q) ||
        emp.empId.toLowerCase().includes(q) ||
        emp.phone.toLowerCase().includes(q) ||
        emp.localAddress.toLowerCase().includes(q) ||
        emp.permanentAddress.toLowerCase().includes(q) ||
        emp.department.toLowerCase().includes(q)
      );
    }

    // 4. Sorting
    list.sort((a, b) => {
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
      if (sortBy === 'dept') return a.department.localeCompare(b.department);
      if (sortBy === 'id-asc') return a.empId.localeCompare(b.empId, undefined, { numeric: true });
      return 0;
    });

    return list;
  }, [employees, selectedDepartment, genderFilter, searchTerm, sortBy]);

  return (
    <div className="farm-app">
      {/* 1. Header / Navbar */}
      <Navbar
        onOpenAddModal={handleOpenAddModal}
        totalEmployees={employees.length}
      />

      <main className="farm-main-content">
        {/* 2. Employee KPI Count & Stats Bar */}
        <StatsBar
          totalEmployees={employees.length}
          filteredCount={processedEmployees.length}
          genderCounts={genderCounts}
          departmentCount={DEPARTMENTS.length}
        />

        {/* 3. Search & Filter Bar */}
        <FilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedDepartment={selectedDepartment}
          onDepartmentChange={setSelectedDepartment}
          departmentCounts={departmentCounts}
          genderFilter={genderFilter}
          onGenderFilterChange={setGenderFilter}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          departments={DEPARTMENTS}
          onClearFilters={handleClearFilters}
        />

        {/* 4. Employee List & Cards */}
        <EmployeeList
          employees={processedEmployees}
          onEditEmployee={handleOpenEditModal}
          onDeleteEmployee={handleOpenDeleteModal}
          searchTerm={searchTerm}
          selectedDepartment={selectedDepartment}
          onClearFilters={handleClearFilters}
          onOpenAddModal={handleOpenAddModal}
        />
      </main>

      {/* 5. Add / Edit Modal (Conditional Rendering) */}
      <EmployeeModal
        isOpen={isModalOpen}
        mode={modalMode}
        employeeData={currentEmployee}
        onSave={handleSaveEmployee}
        onClose={() => setIsModalOpen(false)}
      />

      {/* 6. Delete Confirmation Modal (Conditional Rendering) */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        employee={employeeToDelete}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteModalOpen(false)}
      />

      {/* 7. Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'success' })}
      />

      {/* 8. Footer */}
      <Footer />
    </div>
  );
}

export default App;
