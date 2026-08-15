'use client';

import React from 'react';
import Image from 'next/image';
import { TESTIMONIALS } from '@/lib/constants';
import { Star, Quote, CheckCircle2, TrendingUp } from 'lucide-react';

export default function Testimonials() {
  return (
    <section id="testimonios" className="py-24 bg-white border-b border-gray-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block px-3 py-1 bg-[#facc15] text-[10px] font-bold uppercase tracking-widest rounded-full text-black mb-3">
            Resultados & Testimonios
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] font-sora tracking-tight">
            Lo que dicen líderes y fundadores que trabajan conmigo
          </h2>
          <p className="text-gray-600 mt-4 text-base sm:text-lg">
            Proyectos reales enfocados en reducir tiempos de respuesta, eliminar tareas repetitivas y generar retorno medible.
          </p>
        </div>

        {/* 3 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-8 border border-gray-100 hover:border-gray-300 hover:shadow-xl transition-all flex flex-col justify-between shadow-xs"
            >
              <div className="space-y-4">
                {/* Rating & Quantifiable Result Metric Pill */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#facc15]">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#facc15] text-[#facc15]" />
                    ))}
                  </div>

                  <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-[#facc15] text-black uppercase tracking-widest shadow-xs">
                    {item.resultMetric}
                  </span>
                </div>

                {/* Content */}
                <p className="text-sm text-gray-700 leading-relaxed italic font-serif">
                  &ldquo;{item.content}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-6 mt-6 border-t border-gray-100 flex items-center gap-3.5">
                <div className="relative w-11 h-11 rounded-full overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                  <Image
                    src={item.avatarUrl}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="44px"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#111827] font-sora flex items-center gap-1.5">
                    <span>{item.name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  </h4>
                  <p className="text-xs text-gray-500">
                    {item.role} en <span className="font-semibold text-[#111827]">{item.company}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
