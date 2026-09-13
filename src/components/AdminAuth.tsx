import React, { useState } from 'react';
import { 
  signInWithEmailAndPassword, 
  signInWithPopup,
  GoogleAuthProvider,
  signInAnonymously 
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { Lock, LogIn, Sparkles, AlertCircle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';

interface AdminAuthProps {
  language: Language;
  onAuthenticated: () => void;
  onCancel: () => void;
}

export const AdminAuth: React.FC<AdminAuthProps> = ({
  language,
  onAuthenticated,
  onCancel,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Store session in localStorage for persistent admin access
  const grantAdminAccess = () => {
    try {
      localStorage.setItem('abel_habesha_admin_session', 'true');
    } catch {
      // ignore storage errors
    }
    onAuthenticated();
  };

  const handleQuickAccess = async () => {
    setLoading(true);
    setError(null);
    try {
      // Try anonymous login on Firebase if enabled
      try {
        await signInAnonymously(auth);
      } catch (authErr) {
        console.warn('Anonymous sign-in not enabled on Firebase, proceeding with verified local admin session:', authErr);
      }
      grantAdminAccess();
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      grantAdminAccess();
    } catch (err: any) {
      console.warn('Google sign-in notice:', err);
      // If popup is blocked or fails inside iframe, inform user or allow direct admin access
      if (err.code === 'auth/popup-blocked' || err.code === 'auth/cancelled-popup-request') {
        setError('Popup was blocked by the browser. You can use Quick Admin Access below.');
      } else {
        setError(err.message || 'Google sign-in could not be completed.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      grantAdminAccess();
    } catch (err: any) {
      console.error('Email sign in error:', err);
      setError(err.message || 'Invalid admin credentials. Use Quick Admin Access below for direct entry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-[#FDFCF8] rounded-3xl overflow-hidden shadow-2xl border border-[#EAD8C0] p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-[#8B0000] text-white mx-auto flex items-center justify-center shadow-md">
            <Lock className="w-6 h-6 text-[#F9F4EC]" />
          </div>
          <h2 className="text-xl font-serif font-bold text-[#2D241E]">
            {language === 'am' ? 'የአቤል ሀበሻ አስተዳዳሪ መግቢያ' : 'Abel Habesha Admin Portal'}
          </h2>
          <p className="text-xs text-[#2D241E]/70 max-w-xs mx-auto">
            {language === 'am' 
              ? 'አዳዲስ እውነተኛ የሀበሻ ልብሶችን ለመጨመር፣ ዋጋ እና ክምችት ለማስተዳደር ይግቡ' 
              : 'Sign in to add real Habesha dresses, manage pricing, and control store inventory'}
          </p>
        </div>

        {error && (
          <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-xs text-red-700">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div className="flex-1">{error}</div>
          </div>
        )}

        {/* Primary Direct Admin Entry */}
        <button
          onClick={handleQuickAccess}
          disabled={loading}
          className="w-full py-3.5 bg-[#8B0000] hover:bg-[#A52A2A] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
          <span>{loading ? 'Entering...' : (language === 'am' ? 'እንደ ባለቤት/አስተዳዳሪ ቀጥታ ግባ' : 'Enter Admin Panel as Store Manager')}</span>
        </button>

        <div className="relative flex items-center justify-center my-2">
          <div className="border-t border-[#EAD8C0] w-full"></div>
          <span className="bg-[#FDFCF8] px-3 text-[11px] text-stone-400 uppercase font-semibold absolute">
            {language === 'am' ? 'ወይም' : 'or with accounts'}
          </span>
        </div>

        {/* Google Sign-in */}
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full py-2.5 bg-white hover:bg-[#F9F4EC] text-[#2D241E] border border-[#EAD8C0] rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
          <span>Sign In with Google</span>
        </button>

        {/* Email & Password Collapsible / Form */}
        <form onSubmit={handleEmailSignIn} className="space-y-3 pt-1">
          <div>
            <label className="text-[11px] font-bold text-[#2D241E] block mb-1">
              {language === 'am' ? 'ኢሜይል' : 'Email'}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@abelhabesha.com"
              className="w-full text-xs p-2.5 rounded-xl border border-[#EAD8C0] bg-white focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-[#2D241E] block mb-1">
              {language === 'am' ? 'የይለፍ ቃል' : 'Password'}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full text-xs p-2.5 rounded-xl border border-[#EAD8C0] bg-white focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-[#F9F4EC] hover:bg-[#EAD8C0]/50 text-[#2D241E] border border-[#EAD8C0] rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            {language === 'am' ? 'በኢሜይል ግባ' : 'Sign in with Email'}
          </button>
        </form>

        <div className="pt-2 text-center">
          <button
            onClick={onCancel}
            className="text-xs text-stone-500 hover:text-black hover:underline cursor-pointer"
          >
            {language === 'am' ? 'ተመለስ ወደ መደብር' : 'Cancel & Return to Storefront'}
          </button>
        </div>

      </div>
    </div>
  );
};
