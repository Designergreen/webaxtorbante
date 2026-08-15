'use client';

import React, { useState } from 'react';
import { RESOURCES } from '@/lib/constants';
import { ResourceItem } from '@/lib/types';
import { 
  BookOpen, 
  Clock, 
  ArrowUpRight, 
  Sparkles, 
  Download, 
  CheckCircle, 
  X,
  FileText,
  Bookmark
} from 'lucide-react';

export default function Resources() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [activeModalResource, setActiveModalResource] = useState<ResourceItem | null>(null);

  const categories = ['Todos', 'Guía', 'Framework', 'Herramienta', 'Caso de Estudio'];

  const filteredResources =
    selectedCategory === 'Todos'
      ? RESOURCES
      : RESOURCES.filter((r) => r.category === selectedCategory);

  return (
    <section id="recursos" className="py-24 bg-[#F9FAFB] border-b border-gray-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-block px-3 py-1 bg-[#facc15] text-[10px] font-bold uppercase tracking-widest rounded-full text-black mb-3">
            Contenido & Metodología
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] font-sora tracking-tight">
            Recursos y frameworks prácticos sobre IA
          </h2>
          <p className="text-gray-600 mt-4 text-base sm:text-lg">
            Documentación abierta, plantillas y casos reales basados en proyectos de implementación en producción.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === category
                  ? 'bg-[#111827] text-[#facc15] shadow-xs'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredResources.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveModalResource(item)}
              className="bg-white rounded-3xl p-7 border border-gray-100 hover:border-gray-300 hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Category & Read Time */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-[#facc15] text-black uppercase tracking-widest">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{item.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-[#111827] group-hover:text-[#ca8a04] transition-colors font-sora leading-snug">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>

              {/* Tags and CTA link */}
              <div className="pt-6 mt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-medium text-gray-500 bg-gray-50 px-2.5 py-0.5 rounded-full border border-gray-100"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-[#111827] group-hover:text-[#ca8a04] shrink-0">
                  <span>Explorar</span>
                  <ArrowUpRight className="w-4 h-4 text-[#facc15] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resource Detail Modal */}
      {activeModalResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 w-full max-w-2xl max-h-[90vh] overflow-y-auto p-7 sm:p-10 relative">
            <button
              onClick={() => setActiveModalResource(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-black hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-[#facc15] text-black uppercase tracking-widest">
                  {activeModalResource.category}
                </span>
                <span className="text-xs text-gray-500">{activeModalResource.readTime}</span>
              </div>

              <h3 className="text-2xl font-bold text-[#111827] font-sora">
                {activeModalResource.title}
              </h3>

              <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 text-sm text-gray-700 leading-relaxed">
                <p className="font-semibold text-[#111827] mb-2">Resumen ejecutivo del material:</p>
                <p>{activeModalResource.description}</p>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <p className="font-bold text-[#111827]">Puntos clave que aprenderás:</p>
                <ul className="space-y-1.5 list-disc list-inside">
                  <li>Cómo evitar costes desmedidos de tokens con caching y modelos ligeros.</li>
                  <li>Arquitectura de orquestación de agentes con validación humana en el bucle.</li>
                  <li>Métricas de precisión y mitigación de alucinaciones en flujos de producción.</li>
                </ul>
              </div>

              <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
                <a
                  href="#contacto"
                  onClick={() => setActiveModalResource(null)}
                  className="flex-1 py-3.5 px-5 bg-[#111827] hover:bg-black text-white font-bold text-sm rounded-xl text-center shadow-md transition-all hover:scale-[1.02]"
                >
                  Consultar sobre esta metodología
                </a>
                <button
                  onClick={() => {
                    alert('Recurso añadido a tus descargas.');
                    setActiveModalResource(null);
                  }}
                  className="py-3.5 px-5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-sm rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Descargar Plantilla PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
