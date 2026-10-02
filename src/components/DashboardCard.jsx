import React from 'react';

const DashboardCard = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend, 
  accentColor = 'indigo', 
  onClick 
}) => {
  const colorMap = {
    indigo: {
      bg: 'bg-indigo-50/70',
      text: 'text-indigo-600',
      border: 'hover:border-indigo-300',
      glow: 'group-hover:shadow-indigo-500/10',
      pill: 'bg-indigo-50 text-indigo-700 border-indigo-200'
    },
    blue: {
      bg: 'bg-sky-50/70',
      text: 'text-sky-600',
      border: 'hover:border-sky-300',
      glow: 'group-hover:shadow-sky-500/10',
      pill: 'bg-sky-50 text-sky-700 border-sky-200'
    },
    purple: {
      bg: 'bg-purple-50/70',
      text: 'text-purple-600',
      border: 'hover:border-purple-300',
      glow: 'group-hover:shadow-purple-500/10',
      pill: 'bg-purple-50 text-purple-700 border-purple-200'
    },
    amber: {
      bg: 'bg-amber-50/70',
      text: 'text-amber-600',
      border: 'hover:border-amber-300',
      glow: 'group-hover:shadow-amber-500/10',
      pill: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    emerald: {
      bg: 'bg-emerald-50/70',
      text: 'text-emerald-600',
      border: 'hover:border-emerald-300',
      glow: 'group-hover:shadow-emerald-500/10',
      pill: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    }
  };

  const scheme = colorMap[accentColor] || colorMap.indigo;

  return (
    <div
      onClick={onClick}
      className={`group relative p-5 bg-white rounded-2xl border border-slate-200/80 shadow-card hover:shadow-card-hover transition-all duration-200 ${scheme.border} ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {title}
          </p>
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {value}
          </div>
        </div>
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center ${scheme.bg} ${scheme.text} shadow-xs group-hover:scale-110 transition-transform duration-200`}
        >
          {Icon && <Icon className="w-6 h-6" />}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs pt-3 border-t border-slate-100">
        <span className="text-slate-500 font-medium">
          {subtitle || 'Active academic record'}
        </span>
        {trend && (
          <span className={`px-2 py-0.5 rounded-full font-semibold text-[11px] border ${scheme.pill}`}>
            {trend}
          </span>
        )}
      </div>
    </div>
  );
};

export default DashboardCard;
