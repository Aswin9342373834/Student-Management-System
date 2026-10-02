import React from 'react';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  RotateCcw, 
  LayoutGrid, 
  List, 
  X,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';

const FilterBar = ({
  searchQuery,
  onSearchChange,
  departmentFilter,
  onDepartmentChange,
  yearFilter,
  onYearChange,
  semesterFilter,
  onSemesterChange,
  sortBy,
  onSortByChange,
  sortOrder,
  onSortOrderChange,
  onResetFilters,
  viewMode,
  onViewModeChange,
  totalResults,
  totalAll
}) => {
  const departments = ['All', 'IT', 'CSE', 'ECE', 'MECH'];
  const years = ['All', 'I', 'II', 'III', 'IV'];
  const semesters = ['All', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    departmentFilter !== 'All' ||
    yearFilter !== 'All' ||
    semesterFilter !== 'All' ||
    sortBy !== 'name' ||
    sortOrder !== 'asc';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 sm:p-5 space-y-4">
      {/* Top row: Search input & View mode toggle */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search students by name or register number..."
            className="w-full pl-10 pr-10 py-2.5 bg-slate-50/80 hover:bg-slate-50 focus:bg-white border border-slate-200 focus:border-indigo-500 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* View Toggle (Table / Grid) & Reset */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          {/* Active Result Pill */}
          <div className="text-xs font-semibold text-slate-500 px-3 py-2 bg-slate-100/80 rounded-xl">
            Showing <span className="text-indigo-600 font-bold">{totalResults}</span> of {totalAll}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/70">
            <button
              onClick={() => onViewModeChange('table')}
              title="Table view"
              className={`p-1.5 rounded-lg text-xs font-medium transition ${
                viewMode === 'table'
                  ? 'bg-white text-indigo-600 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('grid')}
              title="Grid cards view"
              className={`p-1.5 rounded-lg text-xs font-medium transition ${
                viewMode === 'grid'
                  ? 'bg-white text-indigo-600 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Sort Controls Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-3 border-t border-slate-100">
        {/* Department Filter */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-500 flex items-center gap-1">
            <span>Department</span>
          </label>
          <div className="relative">
            <select
              value={departmentFilter}
              onChange={(e) => onDepartmentChange(e.target.value)}
              className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium rounded-xl px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept === 'All' ? 'All Departments' : dept}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Year Filter */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-500">Year</label>
          <div className="relative">
            <select
              value={yearFilter}
              onChange={(e) => onYearChange(e.target.value)}
              className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium rounded-xl px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer"
            >
              {years.map((yr) => (
                <option key={yr} value={yr}>
                  {yr === 'All' ? 'All Years' : `${yr} Year`}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Semester Filter */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-500">Semester</label>
          <div className="relative">
            <select
              value={semesterFilter}
              onChange={(e) => onSemesterChange(e.target.value)}
              className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium rounded-xl px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer"
            >
              {semesters.map((sem) => (
                <option key={sem} value={sem}>
                  {sem === 'All' ? 'All Semesters' : `Semester ${sem}`}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Sort By Field */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-500 flex items-center gap-1">
            <ArrowUpDown className="w-3 h-3 text-slate-400" />
            <span>Sort By</span>
          </label>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortByChange(e.target.value)}
              className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium rounded-xl px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer"
            >
              <option value="name">Student Name</option>
              <option value="registerNo">Register Number</option>
              <option value="department">Department</option>
              <option value="year">Academic Year</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Sort Order (Asc / Desc) & Reset */}
        <div className="space-y-1 flex flex-col justify-end">
          <label className="text-xs font-semibold text-slate-500">Order</label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="flex-1 flex items-center justify-between px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 transition"
              title="Toggle ascending / descending"
            >
              <span>{sortOrder === 'asc' ? 'Ascending (A-Z)' : 'Descending (Z-A)'}</span>
              <span className="text-xs text-indigo-600 font-mono">
                {sortOrder === 'asc' ? '↑' : '↓'}
              </span>
            </button>

            {hasActiveFilters && (
              <button
                onClick={onResetFilters}
                className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl border border-rose-200 transition"
                title="Clear all active filters"
                aria-label="Clear all filters"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Active Filter Badges */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
          <span className="text-slate-400 font-medium">Applied:</span>
          {searchQuery && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-full font-medium">
              Search: "{searchQuery}"
              <button onClick={() => onSearchChange('')} className="hover:text-indigo-900">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {departmentFilter !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-sky-50 border border-sky-200 text-sky-700 rounded-full font-medium">
              Dept: {departmentFilter}
              <button onClick={() => onDepartmentChange('All')} className="hover:text-sky-900">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {yearFilter !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-purple-50 border border-purple-200 text-purple-700 rounded-full font-medium">
              Year: {yearFilter}
              <button onClick={() => onYearChange('All')} className="hover:text-purple-900">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {semesterFilter !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 border border-amber-200 text-amber-700 rounded-full font-medium">
              Sem: {semesterFilter}
              <button onClick={() => onSemesterChange('All')} className="hover:text-amber-900">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          <button
            onClick={onResetFilters}
            className="text-xs text-rose-600 hover:text-rose-800 font-semibold underline decoration-dotted ml-1"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
