import React, { createContext, useState, useCallback, useContext } from 'react';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    setToasts(prev => {
      // Prevent rapid duplicate toasts
      if (prev.some(toast => toast.message === message)) {
        return prev;
      }
      
      const id = Date.now() + Math.random();
      
      // Auto-remove after 3 seconds
      setTimeout(() => {
        setToasts(current => current.filter(t => t.id !== id));
      }, 3000);
      
      return [...prev, { id, message, type }];
    });
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
