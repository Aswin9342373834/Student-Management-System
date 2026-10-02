import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

const DeleteModal = ({ isOpen, student, onCancel, onConfirm }) => {
  if (!isOpen || !student) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <button
              onClick={onCancel}
              aria-label="Cancel and close dialog"
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <h3 id="delete-modal-title" className="text-lg font-bold text-slate-900">
            Delete Student?
          </h3>

          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            Are you sure you want to delete{' '}
            <span className="font-semibold text-slate-900">{student.name}</span> (
            <span className="font-mono font-semibold text-slate-700">{student.registerNo}</span>)?
            This action cannot be undone.
          </p>

          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition focus:outline-none focus:ring-2 focus:ring-slate-400"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => onConfirm(student.id)}
              className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs shadow-rose-600/30 transition focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete Student</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
