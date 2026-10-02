import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  Search, 
  Bell, 
  UserPlus, 
  ChevronRight, 
  GraduationCap,
  ShieldCheck,
  Check
} from 'lucide-react';
import { useStudents } from '../context/StudentContext';

const Header = ({ onToggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { students } = useStudents();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationsRead, setNotificationsRead] = useState(false);

  // Breadcrumb mapping
  const getPageInfo = () => {
    const path = location.pathname;
    if (path.startsWith('/students/edit')) {
      return { title: 'Edit Student', section: 'Students', sub: 'Edit Record' };
    }
    if (path === '/students/add') {
      return { title: 'Add New Student', section: 'Students', sub: 'New Enrollment' };
    }
    if (path === '/students') {
      return { title: 'Students', section: 'Student Management', sub: 'Directory' };
    }
    if (path === '/settings') {
      return { title: 'Settings', section: 'System', sub: 'Preferences' };
    }
    if (path === '/help') {
      return { title: 'Help & Documentation', section: 'Support', sub: 'User Guide' };
    }
    return { title: 'Dashboard', section: 'Student Management', sub: 'Overview' };
  };

  const pageInfo = getPageInfo();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 md:px-8 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      {/* Left: Mobile Hamburger & Breadcrumb */}
      <div className="flex items-center gap-3 md:gap-4">
        <button
          onClick={onToggleSidebar}
          aria-label="Toggle navigation sidebar"
          className="p-2 -ml-1 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
            <span>StudentHub</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-600">{pageInfo.section}</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
            <span className="text-indigo-600 font-semibold hidden sm:inline">{pageInfo.sub}</span>
          </nav>
          {/* Page Title */}
          <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
            {pageInfo.title}
          </h1>
        </div>
      </div>

      {/* Right: Quick Action, Search, Notifications, Admin Profile */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Quick Add Button on Desktop */}
        {location.pathname !== '/students/add' && (
          <Link
            to="/students/add"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs shadow-indigo-500/20 hover:shadow-indigo-500/30 transition transform hover:-translate-y-0.5"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Add Student</span>
          </Link>
        )}

        {/* Search Navigation Shortcut */}
        <button
          onClick={() => navigate('/students')}
          aria-label="Search student records"
          className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-100/90 hover:bg-slate-200/80 border border-slate-200 text-slate-500 rounded-xl text-xs transition"
          title="Go to student directory search"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Quick search...</span>
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white rounded border border-slate-300 text-slate-500">
            Ctrl+K
          </kbd>
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setNotificationsRead(true);
            }}
            aria-label="View notifications"
            className="relative p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition"
          >
            <Bell className="w-4 h-4" />
            {!notificationsRead && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-full ring-2 ring-white animate-pulse" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 py-3 z-50 animate-fade-in">
              <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">Notifications</span>
                <span className="text-[11px] text-indigo-600 font-medium">System Alert</span>
              </div>
              <div className="divide-y divide-slate-50 max-h-64 overflow-y-auto">
                <div className="p-3.5 hover:bg-slate-50 transition flex gap-3 text-xs">
                  <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Academic Database Active</p>
                    <p className="text-slate-500 text-[11px] mt-0.5">
                      {students.length} student records currently loaded in memory.
                    </p>
                  </div>
                </div>
                <div className="p-3.5 hover:bg-slate-50 transition flex gap-3 text-xs">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">LocalStorage Sync OK</p>
                    <p className="text-slate-500 text-[11px] mt-0.5">Offline-first persistence ready.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Pill */}
        <div className="flex items-center gap-2.5 pl-2 sm:pl-3 border-l border-slate-200">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-slate-900 to-indigo-900 text-white flex items-center justify-center font-bold text-sm shadow-xs">
              AD
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white" />
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-xs font-bold text-slate-900 leading-tight">Admin Portal</div>
            <div className="text-[11px] text-slate-500">College Administration</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
