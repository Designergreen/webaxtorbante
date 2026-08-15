'use client';

import React from 'react';
import { PERSONAL_DATA } from '@/lib/constants';
import { ArrowRight, Sparkles, ShieldCheck, Mail, Calendar } from 'lucide-react';

export default function FinalCta() {
  return (
    <section className="py-20 bg-[#111827] text-white relative overflow-hidden">
      {/* Warm glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-80 bg-[#facc15]/10 blur-3xl pointer-events-none -z-0" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        {/* Availability Badge */}
        <div className="inline-block px-3 py-1 bg-[#facc15] text-[10px] font-bold uppercase tracking-widest rounded-full text-black shadow-xs">
          {PERSONAL_DATA.availability}
        </div>

        {/* Big Impact Headline */}
        <h2 className="text-3xl sm:text-5xl font-extrabold font-sora tracking-tight leading-tight max-w-3xl mx-auto text-white">
          ¿Listo para automatizar tus tareas repetitivas y escalar con IA?
        </h2>

        <p className="text-base sm:text-xl text-gray-300 max-w-2xl mx-auto font-sans leading-relaxed">
          Cuéntame sobre los cuellos de botella de tu negocio. Evaluaremos la viabilidad técnica y te presentaré un plan de acción concreto en menos de 24 horas.
        </p>

        {/* Actions */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contacto"
            id="final-cta-btn"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#facc15] hover:bg-yellow-300 text-black font-bold text-base shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Enviar Solicitud de Proyecto</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href={`mailto:${PERSONAL_DATA.email}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-200 border border-gray-800 font-semibold text-base transition-colors"
          >
            <Mail className="w-4 h-4 text-[#facc15]" />
            <span>{PERSONAL_DATA.email}</span>
          </a>
        </div>

        {/* Guarantees */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#facc15]" />
            Respuesta en menos de 24 horas laborables
          </span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#facc15]" />
            Sin compromisos ni costes ocultos
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-[#facc15]" />
            Llamada inicial de 20 min gratuita
          </span>
        </div>
      </div>
    </section>
  );
}
