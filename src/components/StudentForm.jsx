import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Hash, 
  Mail, 
  Phone, 
  Building2, 
  Calendar, 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  AlertCircle,
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { useStudents } from '../context/StudentContext';

const StudentForm = ({ isEdit = false, initialData = null }) => {
  const navigate = useNavigate();
  const { addStudent, updateStudent, students } = useStudents();

  const [formData, setFormData] = useState({
    registerNo: '',
    name: '',
    email: '',
    phone: '',
    department: 'IT',
    year: 'I',
    semester: 'I',
    cgpa: '8.5'
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Populate data in edit mode
  useEffect(() => {
    if (isEdit && initialData) {
      setFormData({
        registerNo: initialData.registerNo || '',
        name: initialData.name || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        department: initialData.department || 'IT',
        year: initialData.year || 'I',
        semester: initialData.semester || 'I',
        cgpa: initialData.cgpa || '8.5'
      });
    }
  }, [isEdit, initialData]);

  // Semester suggestions based on year
  const yearSemesterMap = {
    I: ['I', 'II'],
    II: ['III', 'IV'],
    III: ['V', 'VI'],
    IV: ['VII', 'VIII']
  };

  const handleYearChange = (newYear) => {
    const suggestedSems = yearSemesterMap[newYear] || ['I', 'II'];
    setFormData((prev) => ({
      ...prev,
      year: newYear,
      // If current semester doesn't belong to the new year, update to the first semester of that year
      semester: suggestedSems.includes(prev.semester) ? prev.semester : suggestedSems[0]
    }));
    if (errors.year) {
      setErrors((prev) => ({ ...prev, year: '' }));
    }
  };

  // Field validation logic
  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'registerNo': {
        const trimmed = value.trim();
        if (!trimmed) {
          error = 'Register number is required.';
        } else if (trimmed.length < 3) {
          error = 'Register number must be at least 3 characters.';
        } else {
          // Check for duplicate register number
          const duplicate = students.some((s) => {
            if (isEdit && initialData && s.id === initialData.id) return false;
            return s.registerNo.trim().toUpperCase() === trimmed.toUpperCase();
          });
          if (duplicate) {
            error = 'Student with this register number already exists.';
          }
        }
        break;
      }

      case 'name': {
        const trimmed = value.trim();
        if (!trimmed) {
          error = 'Student name is required.';
        } else if (trimmed.length < 2) {
          error = 'Student name must be at least 2 characters.';
        } else if (!/^[a-zA-Z\s.]+$/.test(trimmed)) {
          error = 'Student name should contain only letters and spaces.';
        }
        break;
      }

      case 'email': {
        const trimmed = value.trim();
        if (!trimmed) {
          error = 'Email address is required.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
          error = 'Please enter a valid email address (e.g. name@student.edu).';
        }
        break;
      }

      case 'phone': {
        const trimmed = value.trim();
        if (!trimmed) {
          error = 'Phone number is required.';
        } else if (!/^[6-9]\d{9}$/.test(trimmed)) {
          error = 'Phone number must be a valid 10-digit Indian number starting with 6-9.';
        }
        break;
      }

      case 'department':
        if (!value) error = 'Please select a department.';
        break;

      case 'year':
        if (!value) error = 'Please select an academic year.';
        break;

      case 'semester':
        if (!value) error = 'Please select a semester.';
        break;

      case 'cgpa': {
        const val = parseFloat(value);
        if (value && (isNaN(val) || val < 0 || val > 10)) {
          error = 'CGPA must be between 0.0 and 10.0';
        }
        break;
      }

      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const errorMsg = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const errorMsg = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    // Validate all fields
    const validationErrors = {};
    Object.keys(formData).forEach((key) => {
      const errorMsg = validateField(key, formData[key]);
      if (errorMsg) {
        validationErrors[key] = errorMsg;
      }
    });

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    if (isEdit) {
      const result = updateStudent(initialData.id, formData);
      setIsSubmitting(false);
      if (result.success) {
        navigate('/students');
      } else {
        setErrors((prev) => ({ ...prev, form: result.error || 'Update failed' }));
      }
    } else {
      const result = addStudent(formData);
      setIsSubmitting(false);
      if (result.success) {
        navigate('/students');
      } else {
        setErrors((prev) => ({ ...prev, form: result.error || 'Addition failed' }));
      }
    }
  };

  const departments = ['IT', 'CSE', 'ECE', 'MECH'];
  const years = ['I', 'II', 'III', 'IV'];
  const allSemesters = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];

  return (
    <div className="max-w-3xl mx-auto">
      {/* Back link */}
      <button
        type="button"
        onClick={() => navigate('/students')}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-indigo-600 mb-6 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Students List</span>
      </button>

      {/* Main Form Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-card overflow-hidden">
        {/* Header banner */}
        <div className="px-6 py-6 sm:px-8 bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-900 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300 mb-1">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>{isEdit ? 'Update Student Record' : 'New Student Enrollment'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              {isEdit ? `Edit: ${initialData?.name || 'Student'}` : 'Add New Student'}
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              {isEdit
                ? 'Modify academic credentials and contact details'
                : 'Fill in the information below to enroll a new student into the system.'}
            </p>
          </div>

          <div className="hidden sm:flex w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md items-center justify-center text-white border border-white/10">
            <GraduationCap className="w-8 h-8" />
          </div>
        </div>

        {/* Form Error Banner if top level */}
        {errors.form && (
          <div className="mx-6 sm:mx-8 mt-6 p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-3 text-rose-800 text-xs font-medium">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-600" />
            <span>{errors.form}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {/* Register Number */}
            <div className="space-y-1.5">
              <label
                htmlFor="registerNo"
                className="block text-xs font-bold text-slate-700 tracking-wide uppercase"
              >
                Register Number <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Hash className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  id="registerNo"
                  name="registerNo"
                  value={formData.registerNo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. 23IT001"
                  aria-invalid={!!errors.registerNo}
                  className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl text-sm font-medium transition focus:outline-none focus:ring-4 ${
                    errors.registerNo && touched.registerNo
                      ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/10 bg-rose-50/20'
                      : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/10 focus:bg-white'
                  }`}
                />
              </div>
              {errors.registerNo && touched.registerNo && (
                <p role="alert" className="text-xs text-rose-600 font-medium flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{errors.registerNo}</span>
                </p>
              )}
            </div>

            {/* Student Name */}
            <div className="space-y-1.5">
              <label
                htmlFor="name"
                className="block text-xs font-bold text-slate-700 tracking-wide uppercase"
              >
                Student Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. Arun Kumar"
                  aria-invalid={!!errors.name}
                  className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl text-sm font-medium transition focus:outline-none focus:ring-4 ${
                    errors.name && touched.name
                      ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/10 bg-rose-50/20'
                      : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/10 focus:bg-white'
                  }`}
                />
              </div>
              {errors.name && touched.name && (
                <p role="alert" className="text-xs text-rose-600 font-medium flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{errors.name}</span>
                </p>
              )}
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-xs font-bold text-slate-700 tracking-wide uppercase"
              >
                Email Address <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. arun@example.com"
                  aria-invalid={!!errors.email}
                  className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl text-sm font-medium transition focus:outline-none focus:ring-4 ${
                    errors.email && touched.email
                      ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/10 bg-rose-50/20'
                      : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/10 focus:bg-white'
                  }`}
                />
              </div>
              {errors.email && touched.email && (
                <p role="alert" className="text-xs text-rose-600 font-medium flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div className="space-y-1.5">
              <label
                htmlFor="phone"
                className="block text-xs font-bold text-slate-700 tracking-wide uppercase"
              >
                Phone Number (10 Digits) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  maxLength={10}
                  placeholder="e.g. 9876543210"
                  aria-invalid={!!errors.phone}
                  className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl text-sm font-mono font-medium transition focus:outline-none focus:ring-4 ${
                    errors.phone && touched.phone
                      ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/10 bg-rose-50/20'
                      : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/10 focus:bg-white'
                  }`}
                />
              </div>
              {errors.phone && touched.phone && (
                <p role="alert" className="text-xs text-rose-600 font-medium flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{errors.phone}</span>
                </p>
              )}
            </div>

            {/* Department */}
            <div className="space-y-1.5">
              <label
                htmlFor="department"
                className="block text-xs font-bold text-slate-700 tracking-wide uppercase"
              >
                Department <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Building2 className="w-4 h-4" />
                </div>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 cursor-pointer"
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Academic Year */}
            <div className="space-y-1.5">
              <label
                htmlFor="year"
                className="block text-xs font-bold text-slate-700 tracking-wide uppercase"
              >
                Academic Year <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Calendar className="w-4 h-4" />
                </div>
                <select
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={(e) => handleYearChange(e.target.value)}
                  onBlur={handleBlur}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 cursor-pointer"
                >
                  {years.map((yr) => (
                    <option key={yr} value={yr}>
                      {yr} Year
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Semester */}
            <div className="space-y-1.5">
              <label
                htmlFor="semester"
                className="block text-xs font-bold text-slate-700 tracking-wide uppercase"
              >
                Semester <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <select
                  id="semester"
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 cursor-pointer"
                >
                  {allSemesters.map((sem) => (
                    <option key={sem} value={sem}>
                      Semester {sem} {yearSemesterMap[formData.year]?.includes(sem) ? '(Recommended for ' + formData.year + ' Year)' : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* CGPA (Optional Academic Metric) */}
            <div className="space-y-1.5">
              <label
                htmlFor="cgpa"
                className="block text-xs font-bold text-slate-700 tracking-wide uppercase"
              >
                Cumulative CGPA (0.0 - 10.0)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Award className="w-4 h-4" />
                </div>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  id="cgpa"
                  name="cgpa"
                  value={formData.cgpa}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="8.5"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500"
                />
              </div>
              {errors.cgpa && touched.cgpa && (
                <p role="alert" className="text-xs text-rose-600 font-medium flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{errors.cgpa}</span>
                </p>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-6 border-t border-slate-100">
            <button
              type="button"
              onClick={() => navigate('/students')}
              className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 rounded-xl shadow-xs shadow-indigo-600/30 transition transform hover:-translate-y-0.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isEdit ? 'Update Student' : 'Add Student'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;
