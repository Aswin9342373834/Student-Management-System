import React from 'react';

export const TableSkeleton = () => {
  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
      <div className="p-4 bg-slate-50 border-b border-slate-200">
        <div className="h-4 bg-slate-200 rounded w-1/4 animate-pulse" />
      </div>
      <div className="divide-y divide-slate-100 p-2">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="flex items-center justify-between p-4 animate-pulse">
            <div className="flex items-center gap-4 w-1/3">
              <div className="w-9 h-9 bg-slate-200 rounded-full" />
              <div className="space-y-2 flex-1">
                <div className="h-3.5 bg-slate-200 rounded w-3/4" />
                <div className="h-2.5 bg-slate-200 rounded w-1/2" />
              </div>
            </div>
            <div className="h-4 bg-slate-200 rounded w-20" />
            <div className="h-4 bg-slate-200 rounded w-16" />
            <div className="h-4 bg-slate-200 rounded w-28 hidden md:block" />
            <div className="h-8 bg-slate-200 rounded w-20" />
          </div>
        ))}
      </div>
    </div>
  );
};

export const DashboardStatsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-card animate-pulse space-y-4"
        >
          <div className="flex justify-between items-start">
            <div className="space-y-2 w-2/3">
              <div className="h-3 bg-slate-200 rounded w-1/2" />
              <div className="h-7 bg-slate-200 rounded w-3/4" />
            </div>
            <div className="w-12 h-12 bg-slate-200 rounded-2xl" />
          </div>
          <div className="h-3 bg-slate-200 rounded w-1/3 pt-2" />
        </div>
      ))}
    </div>
  );
};

export const ChartSkeleton = () => {
  return (
    <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs animate-pulse space-y-4">
      <div className="h-4 bg-slate-200 rounded w-1/3" />
      <div className="h-2 bg-slate-200 rounded w-1/4" />
      <div className="h-64 bg-slate-100 rounded-xl mt-4" />
    </div>
  );
};

export default {
  TableSkeleton,
  DashboardStatsSkeleton,
  ChartSkeleton
};
