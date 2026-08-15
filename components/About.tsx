'use client';

import React from 'react';
import Image from 'next/image';
import { PERSONAL_DATA } from '@/lib/constants';
import { 
  Target, 
  Cpu, 
  Workflow, 
  CheckCircle, 
  Award, 
  Layers,
  ArrowRight
} from 'lucide-react';

export default function About() {
  const pillars = [
    {
      title: 'Pragmatismo sobre el Hype',
      description:
        'No implementamos IA por moda. Analizamos cada proceso para asegurarnos de que la solución aporte valor financiero o ahorro real de tiempo desde el primer mes.',
      icon: Target,
    },
    {
      title: 'Soluciones a Medida de tus Herramientas',
      description:
        'Conectamos modelos avanzados (Gemini, LLMs especializados) directamente a tus sistemas existentes: CRM, ERP, bases de datos, Slack o WhatsApp.',
      icon: Workflow,
    },
    {
      title: 'Capacitación y Autonomía',
      description:
        'Entrego código, documentación y entreno a tu equipo para que no dependan eternamente de consultores externos para iterar.',
      icon: Cpu,
    },
  ];

  return (
    <section id="sobre-mi" className="py-24 bg-[#F9FAFB] border-b border-gray-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Tag */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 bg-[#facc15] text-[10px] font-bold uppercase tracking-widest rounded-full text-black mb-3">
            Sobre Mí
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] font-sora tracking-tight">
            Consultoría de IA pensada para resultados, no para especular.
          </h2>
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Image & Credentials Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-3xl overflow-hidden bg-white p-4 border border-gray-100 shadow-xl">
              <div className="relative aspect-4/5 w-full rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
                <Image
                  src="/axel_portrait.jpg"
                  alt="Axel Torbante - Sobre Mí"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 420px"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-4 bg-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-[#111827] font-sora text-base">
                      {PERSONAL_DATA.name}
                    </h3>
                    <p className="text-xs text-gray-500 font-medium">
                      {PERSONAL_DATA.location}
                    </p>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-800 border border-gray-200">
                    {PERSONAL_DATA.experienceYears}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 gap-3">
              {PERSONAL_DATA.stats.slice(0, 2).map((stat, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white border border-gray-100 shadow-xs"
                >
                  <p className="text-2xl font-extrabold text-[#111827] font-sora">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Bio & Core Pillars */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-[#111827] font-sora">
                Hola, soy Axel Torbante.
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed font-sans font-medium">
                {PERSONAL_DATA.subheadline}
              </p>
              <p className="text-base text-gray-600 leading-relaxed">
                Mi objetivo es simple: eliminar las horas muertas y tareas mecánicas que frenan a tu equipo comercial, operativo y de soporte, sustituyéndolas por agentes y flujos de automatización que trabajan las 24 horas del día con precisión quirúrgica.
              </p>
            </div>

            {/* 3 Pillars List */}
            <div className="space-y-4 pt-2">
              {pillars.map((pillar, idx) => {
                const IconComponent = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white border border-gray-100 hover:border-[#facc15] transition-all shadow-xs flex items-start gap-4"
                  >
                    <div className="p-3 rounded-xl bg-[#facc15] text-black shrink-0 mt-0.5 shadow-xs">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#111827] text-base font-sora mb-1">
                        {pillar.title}
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Contact quick CTA */}
            <div className="pt-2 flex items-center gap-4">
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#111827] hover:text-[#ca8a04] transition-colors group"
              >
                <span>Hablemos de tu proyecto</span>
                <ArrowRight className="w-4 h-4 text-[#facc15] transition-transform group-hover:translate-x-1" />
              </a>
              <span className="text-gray-300">|</span>
              <a
                href={`mailto:${PERSONAL_DATA.email}`}
                className="text-sm font-medium text-gray-500 hover:text-black transition-colors"
              >
                {PERSONAL_DATA.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
