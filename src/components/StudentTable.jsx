import React from 'react';
import { Eye, Edit3, Trash2, Mail, Phone, ExternalLink } from 'lucide-react';

const StudentTable = ({ students, onView, onEdit, onDelete }) => {
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

  const getYearBadgeClass = (year) => {
    switch (year) {
      case 'I':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'II':
        return 'bg-teal-50 text-teal-700 border-teal-200';
      case 'III':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'IV':
        return 'bg-violet-50 text-violet-700 border-violet-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="w-full overflow-hidden bg-white rounded-2xl border border-slate-200/80 shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/90 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <th className="py-3.5 px-4 sm:px-6">Register Number</th>
              <th className="py-3.5 px-4">Student Name</th>
              <th className="py-3.5 px-4">Department</th>
              <th className="py-3.5 px-4">Year</th>
              <th className="py-3.5 px-4">Semester</th>
              <th className="py-3.5 px-4">Email</th>
              <th className="py-3.5 px-4">Phone</th>
              <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {students.map((student, idx) => (
              <tr
                key={student.id || student.registerNo}
                className="hover:bg-indigo-50/30 transition-colors duration-150 group"
              >
                {/* Register Number */}
                <td className="py-4 px-4 sm:px-6 whitespace-nowrap font-mono text-xs font-bold text-slate-900">
                  <span className="px-2.5 py-1 bg-slate-100 group-hover:bg-indigo-100/70 text-slate-800 rounded-lg border border-slate-200 group-hover:border-indigo-200 transition">
                    {student.registerNo}
                  </span>
                </td>

                {/* Student Name & Avatar */}
                <td className="py-4 px-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-bold text-xs flex items-center justify-center shadow-xs flex-shrink-0">
                      {student.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <span className="font-semibold text-slate-900 block group-hover:text-indigo-600 transition">
                        {student.name}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Department */}
                <td className="py-4 px-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${getDeptBadgeClass(
                      student.department
                    )}`}
                  >
                    {student.department}
                  </span>
                </td>

                {/* Year */}
                <td className="py-4 px-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getYearBadgeClass(
                      student.year
                    )}`}
                  >
                    {student.year} Year
                  </span>
                </td>

                {/* Semester */}
                <td className="py-4 px-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                    Sem {student.semester}
                  </span>
                </td>

                {/* Email */}
                <td className="py-4 px-4 whitespace-nowrap text-slate-600 text-xs">
                  <a
                    href={`mailto:${student.email}`}
                    className="flex items-center gap-1.5 hover:text-indigo-600 transition hover:underline"
                    title={`Send email to ${student.email}`}
                  >
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{student.email}</span>
                  </a>
                </td>

                {/* Phone */}
                <td className="py-4 px-4 whitespace-nowrap text-slate-600 font-mono text-xs">
                  <a
                    href={`tel:${student.phone}`}
                    className="flex items-center gap-1.5 hover:text-indigo-600 transition hover:underline"
                    title={`Call ${student.phone}`}
                  >
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{student.phone}</span>
                  </a>
                </td>

                {/* Actions */}
                <td className="py-4 px-4 sm:px-6 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    {/* View Details */}
                    <button
                      onClick={() => onView(student)}
                      aria-label={`View details for ${student.name}`}
                      title="View Student Profile"
                      className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg border border-transparent hover:border-indigo-100 transition"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    {/* Edit Student */}
                    <button
                      onClick={() => onEdit(student)}
                      aria-label={`Edit ${student.name}`}
                      title="Edit Student"
                      className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg border border-transparent hover:border-amber-100 transition"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    {/* Delete Student */}
                    <button
                      onClick={() => onDelete(student)}
                      aria-label={`Delete ${student.name}`}
                      title="Delete Student"
                      className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg border border-transparent hover:border-rose-100 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTable;
