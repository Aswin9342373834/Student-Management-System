import React from 'react';
import { Mail, Phone, Edit3, Trash2, Eye, User } from 'lucide-react';

const StudentCard = ({ student, onView, onEdit, onDelete }) => {
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
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-card-hover transition-all duration-200 p-5 flex flex-col justify-between group">
      <div>
        {/* Header: Avatar, Name & Reg No */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-bold text-sm flex items-center justify-center shadow-xs flex-shrink-0">
              {student.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition text-base">
                {student.name}
              </h3>
              <span className="font-mono text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 inline-block mt-0.5">
                {student.registerNo}
              </span>
            </div>
          </div>
          <button
            onClick={() => onView(student)}
            aria-label={`View ${student.name}`}
            className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Badges: Department, Year, Semester */}
        <div className="flex flex-wrap items-center gap-1.5 my-3.5">
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getDeptBadgeClass(
              student.department
            )}`}
          >
            {student.department}
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            {student.year} Year
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            Sem {student.semester}
          </span>
        </div>

        {/* Contact Info */}
        <div className="space-y-2 py-3 border-t border-slate-100 text-xs text-slate-600">
          <a
            href={`mailto:${student.email}`}
            className="flex items-center gap-2 hover:text-indigo-600 transition truncate"
            title={student.email}
          >
            <Mail className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="truncate">{student.email}</span>
          </a>
          <a
            href={`tel:${student.phone}`}
            className="flex items-center gap-2 hover:text-indigo-600 transition font-mono"
            title={student.phone}
          >
            <Phone className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span>{student.phone}</span>
          </a>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2 pt-3 mt-1 border-t border-slate-100">
        <button
          onClick={() => onEdit(student)}
          className="flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-50 hover:bg-amber-50 text-slate-700 hover:text-amber-700 rounded-xl text-xs font-semibold border border-slate-200 hover:border-amber-200 transition"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Edit</span>
        </button>
        <button
          onClick={() => onDelete(student)}
          className="flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-50 hover:bg-rose-50 text-slate-700 hover:text-rose-700 rounded-xl text-xs font-semibold border border-slate-200 hover:border-rose-200 transition"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};

export default StudentCard;
