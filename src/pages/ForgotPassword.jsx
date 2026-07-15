import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, KeyRound, ArrowRight, ArrowLeft } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { addToast } = useToast();

  const handleReset = (e) => {
    e.preventDefault();
    if (!email) {
      addToast('Please enter your email address', 'error');
      return;
    }
    
    // Mock reset success
    setIsSubmitted(true);
    addToast('Password reset link sent to your email', 'success');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <div className="w-full max-w-md relative">
        {/* Background decorative elements */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-rose-500/20 rounded-full blur-3xl"></div>
        
        {/* Card */}
        <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-500">
          
          <Link to="/login" className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors mb-6">
            <ArrowLeft size={16} /> Back to Login
          </Link>

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/10 text-amber-500 mb-4">
              <KeyRound size={32} />
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Reset Password</h1>
            <p className="text-slate-500 dark:text-slate-400">
              {isSubmitted 
                ? "Check your email for the reset link." 
                : "Enter your email and we'll send you a link to reset your password."}
            </p>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleReset} className="space-y-5">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Email</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-amber-500 transition-colors">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all dark:text-white shadow-sm"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-slate-900 dark:bg-amber-500 hover:bg-slate-800 dark:hover:bg-amber-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition-transform hover:-translate-y-0.5 mt-4"
              >
                Send Reset Link
                <ArrowRight size={18} />
              </button>
            </form>
          ) : (
            <div className="flex flex-col items-center">
               <button
                onClick={() => setIsSubmitted(false)}
                className="text-sm font-semibold text-amber-500 hover:text-amber-600 transition-colors"
              >
                Try another email address
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
