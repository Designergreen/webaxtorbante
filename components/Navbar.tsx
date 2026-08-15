'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { PERSONAL_DATA } from '@/lib/constants';
import { 
  Sparkles, 
  User as UserIcon, 
  ShieldCheck, 
  LayoutDashboard, 
  LogOut, 
  Menu, 
  X, 
  ArrowRight,
  ChevronDown
} from 'lucide-react';

export default function Navbar() {
  const { user, logout, openAuthModal, switchRole } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Sobre Mí', href: '/#sobre-mi' },
    { name: 'Servicios', href: '/#servicios' },
    { name: 'Diagnóstico IA', href: '/#diagnostico' },
    { name: 'Recursos', href: '/#recursos' },
    { name: 'Testimonios', href: '/#testimonios' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-xs border-b border-slate-200/80 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus:outline-hidden"
            id="brand-logo"
          >
            <div className="w-8 h-8 rounded-lg bg-[#facc15] text-black flex items-center justify-center font-bold text-sm tracking-tight shadow-xs group-hover:scale-105 transition-transform">
              AT
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[#111827] text-lg leading-tight tracking-tight font-serif italic flex items-center gap-1.5">
                {PERSONAL_DATA.name}
              </span>
              <span className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">
                Consultoría en IA
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-6 text-xs font-semibold text-gray-500 uppercase tracking-widest">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-[#facc15] hover:text-black transition-colors py-1 relative"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action & User Controls */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Quick Role Tester / Switcher Pill */}
            <div className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-lg border border-slate-200 text-xs">
              <span className="text-slate-400 font-medium px-1">Rol:</span>
              <button
                id="role-switch-guest"
                onClick={() => logout()}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                  !user ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Ver como visitante público"
              >
                Público
              </button>
              <button
                id="role-switch-user"
                onClick={() => switchRole('user')}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                  user?.role === 'user'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Probar rol Cliente / Usuario"
              >
                Cliente
              </button>
              <button
                id="role-switch-admin"
                onClick={() => switchRole('admin')}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                  user?.role === 'admin'
                    ? 'bg-yellow-400 text-slate-950 font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Probar rol Administrador (Acceso a /admin)"
              >
                Admin
              </button>
            </div>

            {/* Auth / Account button */}
            {user ? (
              <div className="relative">
                <button
                  id="user-menu-btn"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-sm font-medium text-slate-800 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <span className="max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
                  {user.role === 'admin' && (
                    <span className="bg-yellow-400 text-slate-950 text-[10px] font-bold px-1.5 py-0.5 rounded">
                      ADMIN
                    </span>
                  )}
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-semibold text-slate-900 truncate">{user.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                      <span className="inline-block mt-1 text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                        Rol: {user.role}
                      </span>
                    </div>

                    {user.role === 'admin' ? (
                      <Link
                        href="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-yellow-50 hover:text-slate-950"
                        id="nav-admin-link"
                      >
                        <ShieldCheck className="w-4 h-4 text-yellow-600" />
                        Panel de Administración
                      </Link>
                    ) : (
                      <Link
                        href="/dashboard"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                        id="nav-dashboard-link"
                      >
                        <LayoutDashboard className="w-4 h-4 text-slate-600" />
                        Mi Portal de Cliente
                      </Link>
                    )}

                    {user.role === 'admin' && (
                      <Link
                        href="/dashboard"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Ver Portal de Cliente
                      </Link>
                    )}

                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left"
                      id="nav-logout-btn"
                    >
                      <LogOut className="w-4 h-4" />
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                id="nav-login-btn"
                onClick={() => openAuthModal('login')}
                className="text-sm font-medium text-slate-700 hover:text-slate-950 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              >
                Acceder
              </button>
            )}

            {/* Primary CTA button */}
            <Link
              href="/#contacto"
              id="nav-cta-contact"
              className="inline-flex items-center gap-2 bg-slate-950 hover:bg-slate-800 text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-xs transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Trabajar conmigo</span>
              <ArrowRight className="w-4 h-4 text-yellow-400" />
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
              aria-label="Abrir menú"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-base font-medium text-slate-800 hover:bg-slate-100"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-3">
            {/* Quick role selector in mobile */}
            <div className="p-2 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500 font-medium block mb-1">
                Cambiar Rol para probar la app:
              </span>
              <div className="grid grid-cols-3 gap-1">
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className={`py-1 text-xs rounded font-medium text-center ${
                    !user ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 border border-slate-200'
                  }`}
                >
                  Público
                </button>
                <button
                  onClick={() => {
                    switchRole('user');
                    setMobileMenuOpen(false);
                  }}
                  className={`py-1 text-xs rounded font-medium text-center ${
                    user?.role === 'user'
                      ? 'bg-slate-900 text-white'
                      : 'bg-white text-slate-700 border border-slate-200'
                  }`}
                >
                  Cliente
                </button>
                <button
                  onClick={() => {
                    switchRole('admin');
                    setMobileMenuOpen(false);
                  }}
                  className={`py-1 text-xs rounded font-medium text-center ${
                    user?.role === 'admin'
                      ? 'bg-yellow-400 text-slate-950 font-bold'
                      : 'bg-white text-slate-700 border border-slate-200'
                  }`}
                >
                  Admin
                </button>
              </div>
            </div>

            {user ? (
              <div className="space-y-2">
                {user.role === 'admin' ? (
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-yellow-400 text-slate-950 font-bold rounded-xl text-sm"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    Ir al Panel Admin (/admin)
                  </Link>
                ) : (
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-900 text-white font-semibold rounded-xl text-sm"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Mi Portal de Cliente (/dashboard)
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 text-sm text-red-600 font-medium text-center"
                >
                  Cerrar sesión ({user.email})
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  openAuthModal('login');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-900 font-medium rounded-xl text-sm text-center"
              >
                Iniciar Sesión / Registro
              </button>
            )}

            <Link
              href="/#contacto"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 bg-slate-950 text-white font-semibold rounded-xl text-sm text-center"
            >
              <span>Contactar ahora</span>
              <ArrowRight className="w-4 h-4 text-yellow-400" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
