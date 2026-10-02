import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useStudents } from '../context/StudentContext';

export const ToastContainer = () => {
  const { toasts, removeToast } = useStudents();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={() => removeToast(toast.id)} />
      ))}
    </div>
  );
};

const ToastItem = ({ toast, onDismiss }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, toast.duration || 3500);

    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />,
    info: <Info className="w-5 h-5 text-indigo-600 flex-shrink-0" />
  };

  const bgStyles = {
    success: 'bg-emerald-50 border-emerald-200 text-emerald-900',
    error: 'bg-rose-50 border-rose-200 text-rose-900',
    info: 'bg-indigo-50 border-indigo-200 text-indigo-900'
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-xl border shadow-lg animate-slide-in backdrop-blur-md ${bgStyles[toast.type] || bgStyles.info}`}
    >
      <div className="flex items-center gap-3">
        {icons[toast.type] || icons.info}
        <span className="text-sm font-semibold">{toast.message}</span>
      </div>
      <button
        onClick={onDismiss}
        aria-label="Close notification"
        className="text-slate-400 hover:text-slate-700 transition p-1 rounded-lg hover:bg-black/5"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ToastContainer;
