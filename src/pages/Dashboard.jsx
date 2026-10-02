import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  UserPlus, 
  Laptop, 
  Code2, 
  Cpu, 
  Wrench, 
  ArrowUpRight, 
  TrendingUp,
  BarChart3,
  PieChart as PieIcon,
  Calendar,
  Layers,
  Sparkles,
  Award
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { useStudents } from '../context/StudentContext';
import DashboardCard from '../components/DashboardCard';
import { DashboardStatsSkeleton, ChartSkeleton } from '../components/SkeletonLoader';

const Dashboard = () => {
  const { students, loading, getStats } = useStudents();
  const stats = getStats();

  if (loading) {
    return (
      <div className="space-y-6">
        <DashboardStatsSkeleton />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartSkeleton />
          <ChartSkeleton />
        </div>
      </div>
    );
  }

  // Custom Chart Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 text-white px-3 py-2 rounded-xl text-xs shadow-xl border border-slate-700">
          <p className="font-bold">{label || payload[0].name}</p>
          <p className="text-indigo-300">
            Students: <span className="text-white font-mono font-bold">{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-card border border-slate-800">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-indigo-300 text-xs font-semibold backdrop-blur-md border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Academic Session 2026-2027</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Student Management Dashboard
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              Monitor student records, departments and academic distribution from one place.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/students"
              className="px-4 py-2.5 bg-white/10 hover:bg-white/15 text-white rounded-xl text-xs font-bold backdrop-blur-md border border-white/15 transition flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              <span>View Directory</span>
            </Link>
            <Link
              to="/students/add"
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 transition transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>+ Add Student</span>
            </Link>
          </div>
        </div>

        {/* Decorative background gradients */}
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 4 Top Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <DashboardCard
          title="Total Students"
          value={stats.total}
          subtitle="Enrolled candidates"
          icon={Users}
          trend="+8% from last sem"
          accentColor="indigo"
        />
        <DashboardCard
          title="IT Students"
          value={stats.itCount}
          subtitle="Information Tech"
          icon={Laptop}
          trend={`${stats.total ? Math.round((stats.itCount / stats.total) * 100) : 0}% share`}
          accentColor="blue"
        />
        <DashboardCard
          title="CSE Students"
          value={stats.cseCount}
          subtitle="Computer Science"
          icon={Code2}
          trend={`${stats.total ? Math.round((stats.cseCount / stats.total) * 100) : 0}% share`}
          accentColor="purple"
        />
        <DashboardCard
          title="ECE Students"
          value={stats.eceCount}
          subtitle="Electronics & Comm."
          icon={Cpu}
          trend={`${stats.total ? Math.round((stats.eceCount / stats.total) * 100) : 0}% share`}
          accentColor="emerald"
        />
      </div>

      {/* Additional MECH Department Banner */}
      <div className="p-4 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent rounded-2xl border border-amber-200/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-xs">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-800">Mechanical Engineering (MECH)</div>
            <div className="text-[11px] text-slate-500">Core Engineering Division</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-lg font-extrabold text-amber-700">{stats.mechCount} Students</div>
            <div className="text-[10px] font-semibold text-slate-400">
              {stats.total ? Math.round((stats.mechCount / stats.total) * 100) : 0}% of campus
            </div>
          </div>
          <Link
            to="/students"
            className="hidden sm:flex items-center gap-1 text-xs font-semibold text-amber-700 hover:text-amber-800 bg-amber-100/80 px-3 py-1.5 rounded-lg transition"
          >
            <span>Filter MECH</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Analytics Grid: Department Distribution & Year Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Distribution Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                <PieIcon className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Department Distribution</h3>
                <p className="text-xs text-slate-500">Enrollment ratio across branches</p>
              </div>
            </div>
            <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-lg">
              4 Branches
            </span>
          </div>

          {/* Department Progress Bars Breakdown */}
          <div className="space-y-3.5">
            {stats.departmentChartData.map((dept) => (
              <div key={dept.name} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700 flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: dept.color }}
                    />
                    {dept.name} Engineering
                  </span>
                  <span className="text-slate-900">
                    <span className="font-bold">{dept.count}</span> students ({dept.percentage}%)
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${dept.percentage}%`,
                      backgroundColor: dept.color
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Recharts Department Donut Chart */}
          <div className="h-56 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.departmentChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="count"
                >
                  {stats.departmentChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Year Distribution Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Year Distribution</h3>
                <p className="text-xs text-slate-500">Student count by Academic Year</p>
              </div>
            </div>
            <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-lg">
              Years I - IV
            </span>
          </div>

          {/* Year Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {stats.yearChartData.map((yr) => (
              <div
                key={yr.name}
                className="p-3.5 bg-slate-50/80 hover:bg-slate-100 rounded-2xl border border-slate-200/70 text-center transition"
              >
                <span className="text-xs font-bold text-slate-500 block mb-1">{yr.name}</span>
                <span className="text-2xl font-black text-slate-900 block">{yr.count}</span>
                <span className="text-[10px] text-slate-400 font-medium">Students</span>
              </div>
            ))}
          </div>

          {/* Recharts Year Bar Chart */}
          <div className="h-56 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.yearChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis allowDecimals={false} stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" fill="#4f46e5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Semester Distribution (Semester I through Semester VIII) */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Semester Distribution</h3>
              <p className="text-xs text-slate-500">
                Enrollments across all 8 academic semesters (I - VIII)
              </p>
            </div>
          </div>
          <div className="text-xs text-slate-500 font-medium">
            Total active cohorts: <span className="font-bold text-slate-800">8 Semesters</span>
          </div>
        </div>

        {/* Semester Bar Chart */}
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={stats.semesterChartData}
              margin={{ top: 15, right: 15, left: -20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis allowDecimals={false} stroke="#94a3b8" fontSize={11} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Semester Pill Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 pt-2 border-t border-slate-100">
          {stats.semesterChartData.map((sem, idx) => (
            <div
              key={sem.name}
              className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-center"
            >
              <div className="text-[10px] font-bold text-slate-400">Sem {idx + 1}</div>
              <div className="text-sm font-bold text-slate-800">{sem.count}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Recent Registrations Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Recent Student Registrations</h3>
            <p className="text-xs text-slate-500">Latest students recorded in the portal</p>
          </div>
          <Link
            to="/students"
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {students.slice(0, 4).map((s) => (
            <div
              key={s.id || s.registerNo}
              className="p-3.5 bg-slate-50/70 hover:bg-indigo-50/40 rounded-2xl border border-slate-200/70 transition"
            >
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                  {s.name.charAt(0)}
                </div>
                <div className="truncate">
                  <div className="text-xs font-bold text-slate-900 truncate">{s.name}</div>
                  <div className="text-[10px] font-mono text-slate-500">{s.registerNo}</div>
                </div>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200/60">
                <span className="font-semibold text-indigo-600">{s.department}</span>
                <span>{s.year} Year / Sem {s.semester}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
