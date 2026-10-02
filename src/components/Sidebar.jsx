import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  Settings, 
  HelpCircle, 
  GraduationCap, 
  X,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { useStudents } from '../context/StudentContext';

const Sidebar = ({ isOpen, onClose }) => {
  const { students, resetToDefaultData } = useStudents();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Students', path: '/students', icon: Users, badge: students.length },
    { name: 'Add Student', path: '/students/add', icon: UserPlus },
  ];

  const bottomItems = [
    { name: 'Settings', path: '/settings', icon: Settings },
    { name: 'Help & Docs', path: '/help', icon: HelpCircle },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          aria-label="Close sidebar backdrop"
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col w-64 bg-slate-900 text-slate-300 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Header / Brand */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800">
          <NavLink
            to="/dashboard"
            onClick={onClose}
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-lg font-bold text-white tracking-tight flex items-center gap-1.5">
                StudentHub
              </span>
              <span className="text-xs text-indigo-400 font-medium block">Academic Portal</span>
            </div>
          </NavLink>

          {/* Mobile Close Button */}
          <button
            onClick={onClose}
            aria-label="Close sidebar"
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Navigation */}
        <div className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Main Menu
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span>{item.name}</span>
                </div>
                {item.badge !== undefined && (
                  <span className="px-2 py-0.5 text-xs font-semibold bg-slate-800 text-indigo-300 rounded-full border border-slate-700">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}

          <div className="pt-6 px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Preferences
          </div>
          {bottomItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 ${
                    isActive
                      ? 'bg-slate-800 text-white font-semibold'
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                  }`
                }
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Bottom Quick Card: Reset Demo Data */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/80">
          <div className="p-3 bg-slate-800/90 rounded-xl border border-slate-700/60 text-xs">
            <div className="flex items-center gap-2 text-indigo-400 font-semibold mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Assessment Mode</span>
            </div>
            <p className="text-slate-400 text-[11px] mb-2.5 leading-relaxed">
              Real-time LocalStorage active. Reset sample data anytime.
            </p>
            <button
              onClick={resetToDefaultData}
              className="w-full flex items-center justify-center gap-1.5 py-1.5 px-2 bg-slate-700 hover:bg-slate-600 text-slate-200 hover:text-white rounded-lg font-medium transition text-xs shadow-sm"
              title="Reset records to default sample json data"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Restore Demo Data
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
