'use client';

import React from 'react';
import Link from 'next/link';
import { PERSONAL_DATA } from '@/lib/constants';
import { useAuth } from '@/lib/auth-context';
import { Mail, ArrowUpRight, ShieldCheck, Lock } from 'lucide-react';

export default function Footer() {
  const { user, openAuthModal } = useAuth();

  return (
    <footer id="main-footer" className="bg-[#111827] text-gray-400 border-t border-gray-800 pt-16 pb-12 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-gray-800">
          {/* Brand & Persona Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#facc15] text-black font-extrabold flex items-center justify-center text-lg font-sora shadow-xs">
                AT
              </div>
              <div>
                <h3 className="text-white font-bold text-lg font-sora">
                  {PERSONAL_DATA.name}
                </h3>
                <p className="text-xs text-[#facc15] font-medium">{PERSONAL_DATA.title}</p>
              </div>
            </div>

            <p className="text-gray-400 text-xs leading-relaxed max-w-sm">
              {PERSONAL_DATA.subheadline}
            </p>

            <div className="pt-2">
              <a
                href={`mailto:${PERSONAL_DATA.email}`}
                className="inline-flex items-center gap-2 text-white hover:text-[#facc15] font-medium text-xs transition-colors bg-gray-900 px-3.5 py-2 rounded-xl border border-gray-800"
              >
                <Mail className="w-4 h-4 text-[#facc15]" />
                <span>{PERSONAL_DATA.email}</span>
              </a>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-200 font-sora">
              Navegación
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/#sobre-mi" className="hover:text-white transition-colors">
                  Sobre Mí
                </Link>
              </li>
              <li>
                <Link href="/#servicios" className="hover:text-white transition-colors">
                  Servicios Especializados
                </Link>
              </li>
              <li>
                <Link href="/#diagnostico" className="hover:text-white transition-colors">
                  Diagnóstico Express IA
                </Link>
              </li>
              <li>
                <Link href="/#recursos" className="hover:text-white transition-colors">
                  Recursos & Guías
                </Link>
              </li>
              <li>
                <Link href="/#testimonios" className="hover:text-white transition-colors">
                  Casos de Éxito
                </Link>
              </li>
              <li>
                <Link href="/#contacto" className="hover:text-white transition-colors">
                  Contacto & Solicitud
                </Link>
              </li>
            </ul>
          </div>

          {/* Social & Private Portals */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-200 font-sora">
              Redes & Plataforma
            </h4>

            <div className="space-y-2 text-xs">
              <a
                href={PERSONAL_DATA.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <span>LinkedIn / Axel Torbante</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#facc15]" />
              </a>

              <a
                href={PERSONAL_DATA.twitter}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <span>Twitter / X (@axtorbante)</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#facc15]" />
              </a>
            </div>

            <div className="pt-4 border-t border-gray-800 space-y-2">
              <p className="text-[11px] text-gray-500 font-medium">Accesos con rol:</p>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-[#facc15] text-xs font-semibold border border-gray-800 transition-colors"
                  id="footer-admin-link"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Panel Admin (/admin)</span>
                </Link>

                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-300 text-xs font-medium border border-gray-800 transition-colors"
                  id="footer-dashboard-link"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Portal Cliente (/dashboard)</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} Axel Torbante. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-gray-400">Política de Privacidad</span>
            <span>•</span>
            <span className="hover:text-gray-400">Términos de Servicio</span>
            <span>•</span>
            <span className="text-[#facc15] font-medium">Consultor en Inteligencia Artificial</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
