import React from 'react';
import { 
  X, 
  GraduationCap, 
  Mail, 
  Phone, 
  Calendar, 
  Award, 
  Edit3, 
  Trash2,
  BookOpen,
  UserCheck
} from 'lucide-react';

const StudentDetailModal = ({ student, isOpen, onClose, onEdit, onDelete }) => {
  if (!isOpen || !student) return null;

  const getDeptBadgeClass = (dept) => {
    switch (dept) {
      case 'IT':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'CSE':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'ECE':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'MECH':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="student-profile-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
      >
        {/* Modal Header Card */}
        <div className="relative bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-900 text-white p-6 pb-8">
          <button
            onClick={onClose}
            aria-label="Close profile modal"
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-4 mt-2">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 text-white font-extrabold text-2xl flex items-center justify-center shadow-lg ring-4 ring-white/10">
              {student.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-white/15 text-indigo-200 border border-white/10">
                {student.registerNo}
              </span>
              <h2 id="student-profile-title" className="text-xl font-bold mt-1 tracking-tight">
                {student.name}
              </h2>
              <p className="text-xs text-indigo-300">Department of {student.department}</p>
            </div>
          </div>
        </div>

        {/* Modal Body Info Grid */}
        <div className="p-6 -mt-3 bg-white rounded-t-3xl space-y-5">
          {/* Key Academic Tags */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
              <span className="text-[11px] font-semibold text-slate-400 block uppercase">
                Department
              </span>
              <span className="text-sm font-bold text-slate-800">{student.department}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
              <span className="text-[11px] font-semibold text-slate-400 block uppercase">
                Academic Year
              </span>
              <span className="text-sm font-bold text-slate-800">{student.year} Year</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
              <span className="text-[11px] font-semibold text-slate-400 block uppercase">
                Semester
              </span>
              <span className="text-sm font-bold text-slate-800">Sem {student.semester}</span>
            </div>
          </div>

          {/* Details list */}
          <div className="space-y-3 divide-y divide-slate-100 text-sm">
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2.5 text-slate-500 text-xs">
                <Mail className="w-4 h-4 text-indigo-500" />
                <span>Email Address</span>
              </div>
              <a
                href={`mailto:${student.email}`}
                className="font-medium text-slate-800 hover:text-indigo-600 transition text-xs"
              >
                {student.email}
              </a>
            </div>

            <div className="flex items-center justify-between pt-3">
              <div className="flex items-center gap-2.5 text-slate-500 text-xs">
                <Phone className="w-4 h-4 text-indigo-500" />
                <span>Phone Contact</span>
              </div>
              <a
                href={`tel:${student.phone}`}
                className="font-medium font-mono text-slate-800 hover:text-indigo-600 transition text-xs"
              >
                {student.phone}
              </a>
            </div>

            <div className="flex items-center justify-between pt-3">
              <div className="flex items-center gap-2.5 text-slate-500 text-xs">
                <Calendar className="w-4 h-4 text-indigo-500" />
                <span>Enrollment Date</span>
              </div>
              <span className="font-medium text-slate-800 text-xs">
                {student.joinedDate || '2023-08-10'}
              </span>
            </div>

            <div className="flex items-center justify-between pt-3">
              <div className="flex items-center gap-2.5 text-slate-500 text-xs">
                <Award className="w-4 h-4 text-indigo-500" />
                <span>Cumulative CGPA</span>
              </div>
              <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-full border border-emerald-200">
                {student.cgpa || '8.8'} / 10.0
              </span>
            </div>
          </div>

          {/* Actions Footer */}
          <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
            <button
              onClick={() => {
                onClose();
                onEdit(student);
              }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-100 hover:bg-amber-50 text-slate-700 hover:text-amber-700 rounded-xl font-semibold text-xs border border-slate-200 hover:border-amber-200 transition"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Details</span>
            </button>
            <button
              onClick={() => {
                onClose();
                onDelete(student);
              }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 rounded-xl font-semibold text-xs border border-slate-200 hover:border-rose-200 transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Record</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailModal;
