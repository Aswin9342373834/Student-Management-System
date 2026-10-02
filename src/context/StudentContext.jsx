import React, { createContext, useContext, useState, useEffect } from 'react';
import initialStudentsData from '../data/students.json';

const STORAGE_KEY = 'sms_students_data_v1';

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toasts, setToasts] = useState([]);

  // Toast notifications helper
  const showToast = (message, type = 'success', duration = 3500) => {
    const id = Date.now() + Math.random().toString(36).substr(2, 4);
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Load students from LocalStorage or fallback to students.json
  const loadStudents = () => {
    setLoading(true);
    setError(null);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setStudents(parsed);
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialStudentsData));
        setStudents(initialStudentsData);
      }
    } catch (err) {
      console.error('Error loading students from localStorage:', err);
      setError('Unable to load student records from storage.');
      showToast('Error loading student records', 'error');
    } finally {
      // Simulate quick smooth loading for polish
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  // Save to LocalStorage helper
  const persistStudents = (updatedList) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
      setStudents(updatedList);
      return true;
    } catch (err) {
      console.error('Failed to save to localStorage:', err);
      showToast('Failed to save changes to storage.', 'error');
      return false;
    }
  };

  // Add a student
  const addStudent = (newStudent) => {
    try {
      // Check duplicate register number
      const duplicate = students.some(
        (s) => s.registerNo.trim().toUpperCase() === newStudent.registerNo.trim().toUpperCase()
      );
      if (duplicate) {
        return { success: false, error: 'Student with this register number already exists.' };
      }

      const recordToAdd = {
        ...newStudent,
        id: `std_${Date.now()}`,
        registerNo: newStudent.registerNo.trim().toUpperCase(),
        name: newStudent.name.trim(),
        email: newStudent.email.trim().toLowerCase(),
        phone: newStudent.phone.trim(),
        joinedDate: new Date().toISOString().split('T')[0],
        cgpa: newStudent.cgpa || '8.5'
      };

      const updated = [recordToAdd, ...students];
      persistStudents(updated);
      showToast('✓ Student added successfully', 'success');
      return { success: true, student: recordToAdd };
    } catch (err) {
      return { success: false, error: 'Failed to add student.' };
    }
  };

  // Update an existing student
  const updateStudent = (id, updatedData) => {
    try {
      // Check duplicate register number if changed
      const duplicate = students.some(
        (s) =>
          s.id !== id &&
          s.registerNo.trim().toUpperCase() === updatedData.registerNo.trim().toUpperCase()
      );
      if (duplicate) {
        return { success: false, error: 'Student with this register number already exists.' };
      }

      const updated = students.map((s) => {
        if (s.id === id) {
          return {
            ...s,
            ...updatedData,
            registerNo: updatedData.registerNo.trim().toUpperCase(),
            name: updatedData.name.trim(),
            email: updatedData.email.trim().toLowerCase(),
            phone: updatedData.phone.trim()
          };
        }
        return s;
      });

      persistStudents(updated);
      showToast('✓ Student details updated successfully', 'success');
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Failed to update student.' };
    }
  };

  // Delete a student
  const deleteStudent = (id) => {
    try {
      const studentToDelete = students.find((s) => s.id === id);
      const updated = students.filter((s) => s.id !== id);
      persistStudents(updated);
      showToast('✓ Student deleted successfully', 'success');
      return { success: true, deleted: studentToDelete };
    } catch (err) {
      showToast('Failed to delete student.', 'error');
      return { success: false };
    }
  };

  // Get student by ID or RegisterNo
  const getStudentById = (id) => {
    return students.find((s) => s.id === id || s.registerNo.toUpperCase() === id.toUpperCase());
  };

  // Reset to default sample data (for easy testing/grading)
  const resetToDefaultData = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialStudentsData));
    setStudents(initialStudentsData);
    showToast('Sample student data restored successfully!', 'info');
  };

  // Calculate dynamic dashboard statistics
  const getStats = () => {
    const total = students.length;
    const itCount = students.filter((s) => s.department === 'IT').length;
    const cseCount = students.filter((s) => s.department === 'CSE').length;
    const eceCount = students.filter((s) => s.department === 'ECE').length;
    const mechCount = students.filter((s) => s.department === 'MECH').length;

    // Year counts
    const yearCounts = {
      I: students.filter((s) => s.year === 'I').length,
      II: students.filter((s) => s.year === 'II').length,
      III: students.filter((s) => s.year === 'III').length,
      IV: students.filter((s) => s.year === 'IV').length
    };

    // Semester counts (I to VIII)
    const semesterCounts = {
      I: students.filter((s) => s.semester === 'I').length,
      II: students.filter((s) => s.semester === 'II').length,
      III: students.filter((s) => s.semester === 'III').length,
      IV: students.filter((s) => s.semester === 'IV').length,
      V: students.filter((s) => s.semester === 'V').length,
      VI: students.filter((s) => s.semester === 'VI').length,
      VII: students.filter((s) => s.semester === 'VII').length,
      VIII: students.filter((s) => s.semester === 'VIII').length
    };

    // Department Distribution data for charts
    const departmentChartData = [
      { name: 'IT', count: itCount, percentage: total ? Math.round((itCount / total) * 100) : 0, color: '#4f46e5' },
      { name: 'CSE', count: cseCount, percentage: total ? Math.round((cseCount / total) * 100) : 0, color: '#0ea5e9' },
      { name: 'ECE', count: eceCount, percentage: total ? Math.round((eceCount / total) * 100) : 0, color: '#8b5cf6' },
      { name: 'MECH', count: mechCount, percentage: total ? Math.round((mechCount / total) * 100) : 0, color: '#f59e0b' }
    ];

    // Year Distribution chart data
    const yearChartData = [
      { name: 'I Year', count: yearCounts['I'], code: 'I', color: '#6366f1' },
      { name: 'II Year', count: yearCounts['II'], code: 'II', color: '#3b82f6' },
      { name: 'III Year', count: yearCounts['III'], code: 'III', color: '#10b981' },
      { name: 'IV Year', count: yearCounts['IV'], code: 'IV', color: '#f97316' }
    ];

    // Semester Distribution chart data
    const semesterChartData = [
      { name: 'Sem I', count: semesterCounts['I'] },
      { name: 'Sem II', count: semesterCounts['II'] },
      { name: 'Sem III', count: semesterCounts['III'] },
      { name: 'Sem IV', count: semesterCounts['IV'] },
      { name: 'Sem V', count: semesterCounts['V'] },
      { name: 'Sem VI', count: semesterCounts['VI'] },
      { name: 'Sem VII', count: semesterCounts['VII'] },
      { name: 'Sem VIII', count: semesterCounts['VIII'] }
    ];

    return {
      total,
      itCount,
      cseCount,
      eceCount,
      mechCount,
      yearCounts,
      semesterCounts,
      departmentChartData,
      yearChartData,
      semesterChartData
    };
  };

  return (
    <StudentContext.Provider
      value={{
        students,
        loading,
        error,
        toasts,
        showToast,
        removeToast,
        addStudent,
        updateStudent,
        deleteStudent,
        getStudentById,
        getStats,
        loadStudents,
        resetToDefaultData
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudents = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudents must be used within a StudentProvider');
  }
  return context;
};
