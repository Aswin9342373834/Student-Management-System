import React from 'react';
import { 
  HelpCircle, 
  BookOpen, 
  Search, 
  PlusCircle, 
  Filter, 
  ArrowUpDown, 
  ShieldAlert, 
  Sparkles,
  GraduationCap
} from 'lucide-react';

const Help = () => {
  const guides = [
    {
      title: 'Managing Student Records',
      icon: GraduationCap,
      description:
        'Easily add, edit, view, and delete students. Every action updates dashboard analytics and persists to browser storage immediately.'
    },
    {
      title: 'Real-Time Search & Filters',
      icon: Search,
      description:
        'Search instantly by student name or register number. Filter across 4 departments (IT, CSE, ECE, MECH), 4 academic years, and 8 semesters.'
    },
    {
      title: 'Advanced Sorting',
      icon: ArrowUpDown,
      description:
        'Sort records alphabetically or by register number in ascending (A-Z) or descending (Z-A) order.'
    },
    {
      title: 'Safe Deletions',
      icon: ShieldAlert,
      description:
        'Records are never deleted without explicit confirmation. A clean modal prevents accidental deletion of records.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-12">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Help & Documentation</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Everything you need to know about the Student Management System.
        </p>
      </div>

      {/* Guide Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {guides.map((g, idx) => {
          const Icon = g.icon;
          return (
            <div
              key={idx}
              className="p-5 bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-card transition space-y-3"
            >
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">{g.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{g.description}</p>
            </div>
          );
        })}
      </div>

      {/* FAQ Accordion or Box */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-4">
        <h3 className="text-base font-bold text-slate-900">Frequently Asked Questions</h3>
        <div className="space-y-3 divide-y divide-slate-100 text-xs text-slate-600">
          <div className="pt-2">
            <h4 className="font-bold text-slate-800 mb-1">Where is the student data stored?</h4>
            <p className="text-slate-500">
              Data is stored securely in your browser's HTML5 LocalStorage. If you refresh or reopen the tab, all records remain intact.
            </p>
          </div>
          <div className="pt-3">
            <h4 className="font-bold text-slate-800 mb-1">How does form validation work?</h4>
            <p className="text-slate-500">
              The system validates unique register numbers, authentic 10-digit Indian phone numbers starting with 6-9, standard email structures, and recommended academic year-to-semester mappings.
            </p>
          </div>
          <div className="pt-3">
            <h4 className="font-bold text-slate-800 mb-1">Can I reset the sample data?</h4>
            <p className="text-slate-500">
              Yes! Click the "Restore Demo Data" button in the sidebar or Settings page at any time to reload the 16 comprehensive student records.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
