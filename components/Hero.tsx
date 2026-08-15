'use client';

import React from 'react';
import Image from 'next/image';
import { PERSONAL_DATA } from '@/lib/constants';
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  Clock, 
  ShieldCheck,
  Zap,
  Calendar
} from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="hero-section"
      className="relative pt-32 pb-20 lg:pt-36 lg:pb-24 overflow-hidden bg-[#F9FAFB] border-b border-gray-100"
    >
      {/* Subtle geometric dot background */}
      <div className="absolute inset-0 bg-dot-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Category / Status Pill */}
            <div className="inline-flex items-center gap-2">
              <span className="inline-block px-3.5 py-1 bg-[#facc15] text-[10px] font-bold uppercase tracking-widest rounded-full text-black shadow-xs">
                Consultoría en IA
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-200 rounded-full text-[10px] font-semibold text-gray-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {PERSONAL_DATA.availability}
              </span>
            </div>

            {/* Main Headline with Natural Tones Display Typography */}
            <h1 className="text-4xl sm:text-6xl lg:text-6xl font-extrabold text-[#111827] tracking-tighter leading-[1.05] font-sora">
              AYUDO A NEGOCIOS A{' '}
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: '1.5px #111827' }}
              >
                CRECER
              </span>{' '}
              CON INTELIGENCIA ARTIFICIAL.
            </h1>

            {/* Subheadline with clear value proposition */}
            <p className="text-lg sm:text-xl text-gray-600 max-w-xl leading-relaxed font-light">
              Automatizo procesos e implemento soluciones prácticas de Inteligencia Artificial para aumentar tu productividad, reducir costes operativos y multiplicar ingresos.
            </p>

            {/* CTAs matching Natural Tones style */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#contacto"
                id="hero-primary-cta"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#111827] text-white font-bold rounded-xl shadow-2xl hover:bg-black transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Empezar Ahora</span>
                <ArrowRight className="w-4 h-4 text-[#facc15]" />
              </a>

              <a
                href="#diagnostico"
                id="hero-secondary-cta"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white border border-gray-200 text-gray-900 font-bold rounded-xl hover:bg-gray-50 shadow-xs transition-all"
              >
                <Zap className="w-4 h-4 text-[#ca8a04]" />
                <span>Diagnóstico Express</span>
              </a>
            </div>

            {/* Stats Counter Row matching Natural Tones */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              <div>
                <div className="text-3xl font-extrabold text-[#111827] font-sora">+45</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold mt-0.5">
                  Proyectos IA
                </div>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-[#111827] font-sora">+1,200h</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold mt-0.5">
                  Ahorro / Mes
                </div>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-[#111827] font-sora">&lt; 24h</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold mt-0.5">
                  Respuesta
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Axel's Card & Natural Tones Signature Feature */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            {/* Photo Card Container */}
            <div className="bg-white p-4 sm:p-5 rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="relative aspect-4/3 sm:aspect-square w-full rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
                <Image
                  src="/axel_portrait.jpg"
                  alt="Axel Torbante - Consultor en Inteligencia Artificial"
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="(max-width: 768px) 100vw, 450px"
                  referrerPolicy="no-referrer"
                />

                {/* Floating Glassmorphic Pill */}
                <div className="absolute bottom-3 left-3 right-3 bg-[#111827]/90 backdrop-blur-md text-white p-3 rounded-xl border border-white/10 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-white font-sora">
                      {PERSONAL_DATA.name}
                    </h4>
                    <p className="text-xs text-[#facc15] font-medium">
                      Consultoría Estratégica & Automatización
                    </p>
                  </div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 ring-4 ring-emerald-400/20" />
                </div>
              </div>

              {/* Sub-metrics */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Retorno Proyectado</span>
                  <p className="text-base font-extrabold text-[#111827] font-sora mt-0.5">4.8x ROI Medio</p>
                </div>
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Integración</span>
                  <p className="text-base font-extrabold text-[#111827] font-sora mt-0.5">100% Producción</p>
                </div>
              </div>
            </div>

            {/* Dark Quote & Founder Signature Box */}
            <div className="bg-[#111827] p-5 rounded-3xl text-white flex items-center space-x-4 shadow-xl border border-gray-800">
              <div className="w-14 h-14 rounded-2xl bg-gray-800 shrink-0 overflow-hidden border border-gray-700">
                <div className="w-full h-full bg-gradient-to-br from-[#facc15] to-yellow-600 flex items-center justify-center text-black font-bold text-xl">
                  AT
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-300 italic font-serif leading-snug">
                  &ldquo;La IA no reemplaza al negocio, el negocio que aprovecha la IA lidera su mercado.&rdquo;
                </p>
                <p className="text-[10px] font-bold mt-1.5 text-[#facc15] uppercase tracking-widest">
                  Axel Torbante — Fundador
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
