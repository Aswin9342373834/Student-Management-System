import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStudents } from '../context/StudentContext';
import StudentForm from '../components/StudentForm';
import { AlertCircle, ArrowLeft } from 'lucide-react';

const StudentFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getStudentById, loading } = useStudents();

  const isEdit = Boolean(id);
  const student = isEdit ? getStudentById(id) : null;

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-12 text-center">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm font-semibold text-slate-600">Loading student details...</p>
      </div>
    );
  }

  if (isEdit && !student) {
    return (
      <div className="max-w-md mx-auto p-8 bg-white rounded-3xl border border-rose-200 shadow-xl text-center">
        <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-7 h-7" />
        </div>
        <h2 className="text-lg font-bold text-slate-900 mb-2">Student Not Found</h2>
        <p className="text-xs text-slate-500 mb-6">
          No student record was found with ID or Register Number "{id}".
        </p>
        <button
          onClick={() => navigate('/students')}
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Students List</span>
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in pb-12">
      <StudentForm isEdit={isEdit} initialData={student} />
    </div>
  );
};

export default StudentFormPage;
