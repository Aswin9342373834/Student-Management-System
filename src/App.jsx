import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { StudentProvider } from './context/StudentContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ToastContainer from './components/Toast';
import ErrorBoundary from './components/ErrorBoundary';

// Pages
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import StudentFormPage from './pages/StudentFormPage';
import Settings from './pages/Settings';
import Help from './pages/Help';

function AppLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar Navigation */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 py-6 max-w-7xl w-full mx-auto">
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </main>
      </div>

      {/* Global Toast Notifications */}
      <ToastContainer />
    </div>
  );
}

function App() {
  return (
    <StudentProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/students" element={<Students />} />
            <Route path="/students/add" element={<StudentFormPage />} />
            <Route path="/students/edit/:id" element={<StudentFormPage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/help" element={<Help />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </StudentProvider>
  );
}

export default App;
