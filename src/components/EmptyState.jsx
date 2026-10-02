import React from 'react';
import { SearchX, UserX, UserPlus, RotateCcw, FilterX } from 'lucide-react';
import { Link } from 'react-router-dom';

const EmptyState = ({ 
  type = 'no-results', 
  onResetFilters, 
  onResetData 
}) => {
  if (type === 'no-results') {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-4 animate-bounce">
          <SearchX className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-1">No Students Found</h3>
        <p className="text-sm text-slate-500 max-w-sm mb-6">
          No student records match your current search query or applied filters.
        </p>
        <button
          onClick={onResetFilters}
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs shadow-indigo-500/20 transition"
        >
          <FilterX className="w-4 h-4" />
          <span>Clear Filters</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-2xl border border-slate-200/80 shadow-xs">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 mb-4">
        <UserX className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-1">No Student Records</h3>
      <p className="text-sm text-slate-500 max-w-sm mb-6">
        Start by adding your first student record or restore the realistic demonstration dataset.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/students/add"
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs shadow-indigo-500/20 transition"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add Student</span>
        </Link>
        {onResetData && (
          <button
            onClick={onResetData}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Restore Demo Data</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
