'use client';

import React from 'react';
import { SERVICES } from '@/lib/constants';
import { 
  Compass, 
  SearchCheck, 
  Cpu, 
  Check, 
  ArrowRight, 
  Zap, 
  Clock,
  Sparkles
} from 'lucide-react';

const iconMap = {
  Compass,
  SearchCheck,
  Cpu,
};

export default function Services({ onSelectService }: { onSelectService?: (serviceTitle: string) => void }) {
  const handleServiceClick = (serviceTitle: string) => {
    if (onSelectService) {
      onSelectService(serviceTitle);
    }
    const contactSection = document.getElementById('contacto');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="servicios" className="py-24 bg-white border-b border-gray-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block px-3 py-1 bg-[#facc15] text-[10px] font-bold uppercase tracking-widest rounded-full text-black mb-3">
            Servicios Especializados
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] font-sora tracking-tight">
            Cómo podemos colaborar para transformar tus operaciones
          </h2>
          <p className="text-gray-600 mt-4 text-base sm:text-lg">
            Soluciones adaptadas al nivel de madurez tecnológica de tu empresa, desde la estrategia inicial hasta el despliegue de sistemas en producción.
          </p>
        </div>

        {/* Services 3-Columns / Cards Grid with Distinct Depth */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => {
            const Icon = iconMap[service.iconName as keyof typeof iconMap] || Compass;
            const isFeatured = index === 0;

            return (
              <div
                key={service.id}
                id={`service-card-${service.id}`}
                className={`relative flex flex-col justify-between rounded-3xl p-7 sm:p-8 transition-all duration-300 ${
                  isFeatured
                    ? 'bg-[#111827] text-white shadow-2xl border border-gray-800'
                    : 'bg-white text-[#111827] border border-gray-100 hover:border-gray-300 shadow-xl'
                }`}
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`p-3.5 rounded-2xl ${
                      isFeatured
                        ? 'bg-[#facc15] text-black shadow-xs'
                        : 'bg-gray-50 text-[#111827] border border-gray-200'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span
                    className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest ${
                      isFeatured
                        ? 'bg-white/10 text-[#facc15] border border-[#facc15]/30'
                        : 'bg-[#facc15] text-black shadow-xs'
                    }`}
                  >
                    {service.badge}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div>
                    <h3
                      className={`text-xl font-bold font-sora ${
                        isFeatured ? 'text-white' : 'text-[#111827]'
                      }`}
                    >
                      {service.title}
                    </h3>
                    <p
                      className={`text-xs font-medium mt-1 ${
                        isFeatured ? 'text-gray-400' : 'text-gray-500'
                      }`}
                    >
                      {service.subtitle}
                    </p>
                  </div>

                  <p
                    className={`text-sm leading-relaxed ${
                      isFeatured ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    {service.description}
                  </p>

                  {/* Concrete Result Callout Box */}
                  <div
                    className={`p-4 rounded-2xl border ${
                      isFeatured
                        ? 'bg-[#facc15]/10 border-[#facc15]/30 text-[#facc15]'
                        : 'bg-gray-50 border-gray-200 text-[#111827]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider mb-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#ca8a04]" />
                      <span className="text-[10px] uppercase font-bold tracking-wider">Resultado concreto:</span>
                    </div>
                    <p className="text-xs font-semibold leading-relaxed">
                      {service.result}
                    </p>
                  </div>

                  {/* Deliverables List */}
                  <div className="pt-2">
                    <p
                      className={`text-[10px] font-bold uppercase tracking-widest mb-2.5 ${
                        isFeatured ? 'text-gray-400' : 'text-gray-400'
                      }`}
                    >
                      Qué incluye:
                    </p>
                    <ul className="space-y-2 text-xs">
                      {service.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check
                            className={`w-4 h-4 shrink-0 mt-0.5 ${
                              isFeatured ? 'text-[#facc15]' : 'text-black font-bold'
                            }`}
                          />
                          <span className={isFeatured ? 'text-gray-300' : 'text-gray-700'}>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Duration & CTA */}
                <div className="pt-6 mt-6 border-t border-gray-100/20 flex flex-col gap-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className={isFeatured ? 'text-gray-400' : 'text-gray-400 uppercase text-[10px] font-bold tracking-wider'}>
                      Duración estimada:
                    </span>
                    <span
                      className={`font-semibold ${
                        isFeatured ? 'text-white' : 'text-[#111827]'
                      }`}
                    >
                      {service.duration}
                    </span>
                  </div>

                  <button
                    onClick={() => handleServiceClick(service.title)}
                    className={`w-full py-3.5 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all transform active:scale-98 ${
                      isFeatured
                        ? 'bg-[#facc15] hover:bg-yellow-300 text-black shadow-lg hover:scale-[1.02]'
                        : 'bg-[#111827] hover:bg-black text-white shadow-md hover:scale-[1.02]'
                    }`}
                  >
                    <span>Solicitar {service.title}</span>
                    <ArrowRight className={`w-4 h-4 ${isFeatured ? 'text-black' : 'text-[#facc15]'}`} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
