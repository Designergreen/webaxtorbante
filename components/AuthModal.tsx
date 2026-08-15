'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { X, ShieldCheck, User, Sparkles, Check, ArrowRight, Lock, Mail } from 'lucide-react';

export default function AuthModal() {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalMode,
    openAuthModal,
    login,
    register,
    switchRole,
  } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (authModalMode === 'login') {
        if (!email) {
          setError('Por favor introduce tu correo electrónico');
          setLoading(false);
          return;
        }
        await login(email);
      } else {
        if (!name || !email) {
          setError('Nombre y correo electrónico son obligatorios');
          setLoading(false);
          return;
        }
        await register(name, email, company);
      }
    } catch (err: any) {
      setError(err?.message || 'Error al autenticar');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = (role: 'admin' | 'user') => {
    switchRole(role);
    closeAuthModal();
  };

  return (
    <div
      id="auth-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        id="auth-modal-card"
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          id="close-auth-modal"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="p-6 pb-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Axel Torbante Platform
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 font-sora">
            {authModalMode === 'login' ? 'Acceso a la Plataforma' : 'Crear Cuenta de Cliente'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {authModalMode === 'login'
              ? 'Inicia sesión para ver tu portal privado o el panel de administración.'
              : 'Regístrate para acceder al Kit de Herramientas de IA y seguimiento.'}
          </p>
        </div>

        {/* Quick Demo Logins Banner */}
        <div className="p-4 mx-6 mt-4 bg-amber-50/80 border border-amber-200/70 rounded-xl">
          <div className="flex items-center gap-1.5 text-amber-900 text-xs font-bold mb-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Accesos rápidos de demostración:</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              id="quick-demo-admin-btn"
              onClick={() => handleQuickDemo('admin')}
              className="flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-900 hover:bg-slate-800 text-yellow-400 font-semibold text-xs rounded-lg transition-transform active:scale-95 shadow-xs"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Entrar como Admin</span>
            </button>
            <button
              type="button"
              id="quick-demo-user-btn"
              onClick={() => handleQuickDemo('user')}
              className="flex items-center justify-center gap-1.5 py-2 px-3 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-medium text-xs rounded-lg transition-transform active:scale-95"
            >
              <User className="w-3.5 h-3.5 text-slate-600" />
              <span>Entrar como Cliente</span>
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 pt-4 space-y-3.5">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">
              {error}
            </div>
          )}

          {authModalMode === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nombre Completo *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Sofía Navarro"
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Correo Electrónico *
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@empresa.com"
                className="w-full pl-9 pr-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                required
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>

          {authModalMode === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Empresa / Negocio
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Ej. Mi Startup S.L."
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Contraseña
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            id="auth-submit-btn"
            className="w-full py-2.5 bg-slate-950 hover:bg-slate-800 text-white font-semibold rounded-xl text-sm transition-all shadow-xs flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
          >
            {loading ? (
              <span className="inline-block w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>{authModalMode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}</span>
                <ArrowRight className="w-4 h-4 text-yellow-400" />
              </>
            )}
          </button>

          <div className="text-center pt-2">
            {authModalMode === 'login' ? (
              <p className="text-xs text-slate-500">
                ¿No tienes cuenta?{' '}
                <button
                  type="button"
                  onClick={() => openAuthModal('register')}
                  className="text-slate-900 font-bold hover:underline"
                >
                  Regístrate aquí
                </button>
              </p>
            ) : (
              <p className="text-xs text-slate-500">
                ¿Ya tienes cuenta?{' '}
                <button
                  type="button"
                  onClick={() => openAuthModal('login')}
                  className="text-slate-900 font-bold hover:underline"
                >
                  Inicia sesión aquí
                </button>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
