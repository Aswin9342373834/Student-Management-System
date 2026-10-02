import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  UserPlus, 
  Download, 
  Sparkles, 
  Users,
  FileSpreadsheet
} from 'lucide-react';
import { useStudents } from '../context/StudentContext';
import FilterBar from '../components/FilterBar';
import StudentTable from '../components/StudentTable';
import StudentCard from '../components/StudentCard';
import StudentDetailModal from '../components/StudentDetailModal';
import DeleteModal from '../components/DeleteModal';
import EmptyState from '../components/EmptyState';
import { TableSkeleton } from '../components/SkeletonLoader';

const Students = () => {
  const navigate = useNavigate();
  const { students, loading, deleteStudent, resetToDefaultData, showToast } = useStudents();

  // Search, Filter, Sort States
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [yearFilter, setYearFilter] = useState('All');
  const [semesterFilter, setSemesterFilter] = useState('All');
  const [sortBy, setSortBy] = useState('name'); // 'name' | 'registerNo' | 'department' | 'year'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' | 'desc'
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'grid'

  // Modals state
  const [selectedStudentForView, setSelectedStudentForView] = useState(null);
  const [selectedStudentForDelete, setSelectedStudentForDelete] = useState(null);

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setDepartmentFilter('All');
    setYearFilter('All');
    setSemesterFilter('All');
    setSortBy('name');
    setSortOrder('asc');
  };

  // Filtered and Sorted Students calculation
  const filteredAndSortedStudents = useMemo(() => {
    let result = [...students];

    // 1. Search filter (Name or Register Number)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.registerNo.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q)
      );
    }

    // 2. Department filter
    if (departmentFilter !== 'All') {
      result = result.filter((s) => s.department === departmentFilter);
    }

    // 3. Year filter
    if (yearFilter !== 'All') {
      result = result.filter((s) => s.year === yearFilter);
    }

    // 4. Semester filter
    if (semesterFilter !== 'All') {
      result = result.filter((s) => s.semester === semesterFilter);
    }

    // 5. Sorting
    result.sort((a, b) => {
      let valA = '';
      let valB = '';

      if (sortBy === 'registerNo') {
        valA = a.registerNo.toLowerCase();
        valB = b.registerNo.toLowerCase();
      } else if (sortBy === 'department') {
        valA = a.department.toLowerCase();
        valB = b.department.toLowerCase();
      } else if (sortBy === 'year') {
        valA = a.year;
        valB = b.year;
      } else {
        // Default: sort by name
        valA = a.name.toLowerCase();
        valB = b.name.toLowerCase();
      }

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [students, searchQuery, departmentFilter, yearFilter, semesterFilter, sortBy, sortOrder]);

  // Action handlers
  const handleView = (student) => {
    setSelectedStudentForView(student);
  };

  const handleEdit = (student) => {
    navigate(`/students/edit/${student.id || student.registerNo}`);
  };

  const handleDeleteClick = (student) => {
    setSelectedStudentForDelete(student);
  };

  const handleConfirmDelete = (id) => {
    deleteStudent(id);
    setSelectedStudentForDelete(null);
  };

  // CSV Export utility
  const handleExportCSV = () => {
    if (filteredAndSortedStudents.length === 0) {
      showToast('No records to export.', 'info');
      return;
    }

    const headers = ['Register Number,Name,Department,Year,Semester,Email,Phone,CGPA'];
    const rows = filteredAndSortedStudents.map(
      (s) =>
        `"${s.registerNo}","${s.name}","${s.department}","${s.year}","${s.semester}","${s.email}","${s.phone}","${s.cgpa || ''}"`
    );

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `students_directory_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('CSV export downloaded successfully!', 'success');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Students</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
              {students.length} Total
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage and monitor all student records.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 shadow-xs transition"
            title="Export filtered records as CSV"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Export CSV</span>
          </button>

          <Link
            to="/students/add"
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs shadow-indigo-600/30 transition transform hover:-translate-y-0.5"
          >
            <UserPlus className="w-4 h-4" />
            <span>+ Add Student</span>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        departmentFilter={departmentFilter}
        onDepartmentChange={setDepartmentFilter}
        yearFilter={yearFilter}
        onYearChange={setYearFilter}
        semesterFilter={semesterFilter}
        onSemesterChange={setSemesterFilter}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
        onResetFilters={handleResetFilters}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        totalResults={filteredAndSortedStudents.length}
        totalAll={students.length}
      />

      {/* Main Content Area: Loading, Empty or Student Table/Grid */}
      {loading ? (
        <TableSkeleton />
      ) : students.length === 0 ? (
        <EmptyState type="no-data" onResetData={resetToDefaultData} />
      ) : filteredAndSortedStudents.length === 0 ? (
        <EmptyState type="no-results" onResetFilters={handleResetFilters} />
      ) : (
        <>
          {/* Desktop/Tablet Table View (or when table view is active) */}
          {viewMode === 'table' ? (
            <div>
              {/* Responsive Table for medium/large screens */}
              <div className="hidden md:block">
                <StudentTable
                  students={filteredAndSortedStudents}
                  onView={handleView}
                  onEdit={handleEdit}
                  onDelete={handleDeleteClick}
                />
              </div>

              {/* Mobile View: Cards layout automatically for small screens */}
              <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredAndSortedStudents.map((student) => (
                  <StudentCard
                    key={student.id || student.registerNo}
                    student={student}
                    onView={handleView}
                    onEdit={handleEdit}
                    onDelete={handleDeleteClick}
                  />
                ))}
              </div>
            </div>
          ) : (
            /* Grid View */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredAndSortedStudents.map((student) => (
                <StudentCard
                  key={student.id || student.registerNo}
                  student={student}
                  onView={handleView}
                  onEdit={handleEdit}
                  onDelete={handleDeleteClick}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* Student Details Modal */}
      <StudentDetailModal
        student={selectedStudentForView}
        isOpen={!!selectedStudentForView}
        onClose={() => setSelectedStudentForView(null)}
        onEdit={(st) => {
          setSelectedStudentForView(null);
          handleEdit(st);
        }}
        onDelete={(st) => {
          setSelectedStudentForView(null);
          handleDeleteClick(st);
        }}
      />

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={!!selectedStudentForDelete}
        student={selectedStudentForDelete}
        onCancel={() => setSelectedStudentForDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default Students;
