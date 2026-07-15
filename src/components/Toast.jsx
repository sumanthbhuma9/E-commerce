import React from 'react';
import { useToast } from '../context/ToastContext';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

export default function Toast() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-white transition-all transform animate-in slide-in-from-right-8 fade-in ${
            toast.type === 'success' ? 'bg-emerald-600' : 'bg-rose-500'
          }`}
        >
          {toast.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <span className="font-medium text-sm">{toast.message}</span>
          <button 
            onClick={() => removeToast(toast.id)}
            className="ml-auto opacity-70 hover:opacity-100 transition-opacity"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
