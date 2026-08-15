'use client';

import React, { useState } from 'react';
import { 
  Zap, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  Clock, 
  Cpu, 
  HelpCircle,
  RotateCcw
} from 'lucide-react';

interface DiagnosisResult {
  summary: string;
  estimatedHoursSavedPerWeek: string;
  estimatedRoiPercent: string;
  recommendedStack: string[];
  actionPlan: Array<{
    step: number;
    title: string;
    description: string;
  }>;
  axelTip: string;
}

export default function AiAssessment({ onApplyToForm }: { onApplyToForm?: (message: string, service: string) => void }) {
  const [businessType, setBusinessType] = useState('Servicios B2B / Consultoría');
  const [teamSize, setTeamSize] = useState('5 a 20 personas');
  const [bottleneck, setBottleneck] = useState('');
  const [currentTools, setCurrentTools] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [error, setError] = useState('');

  const commonBottlenecks = [
    'Atención y cotizaciones lentas a clientes potenciales',
    'Muchas horas en reportes manuales y traspaso de datos entre herramientas',
    'Clasificación y respuesta repetitiva de tickets de soporte',
    'Creación manual de contenidos, propuestas y resúmenes de reuniones',
  ];

  const handleRunAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bottleneck) {
      setError('Por favor indica tu principal cuello de botella o selecciona uno de los ejemplos.');
      return;
    }
    setError('');
    setIsLoading(true);
    setResult(null);

    try {
      const res = await fetch('/app/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessType,
          teamSize,
          bottleneck,
          currentTools,
        }),
      });

      const data = await res.json();
      if (data.success && data.diagnosis) {
        setResult(data.diagnosis);
      } else {
        throw new Error(data.error || 'Error al generar el diagnóstico');
      }
    } catch (err: any) {
      console.error(err);
      setError('Hubo un problema al generar el diagnóstico. Por favor intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyToContact = () => {
    if (!result) return;
    const prefillMsg = `Hola Axel, realicé el diagnóstico de IA para mi negocio de ${businessType} con problema en "${bottleneck}". Me interesa implementar el plan de ${result.estimatedHoursSavedPerWeek} de ahorro.`;
    if (onApplyToForm) {
      onApplyToForm(prefillMsg, 'Auditoría de Procesos');
    }
    const contactElem = document.getElementById('contacto');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="diagnostico" className="py-24 bg-[#111827] text-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#facc15]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#facc15]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-block px-3 py-1 bg-[#facc15] text-[10px] font-bold uppercase tracking-widest rounded-full text-black mb-3 shadow-xs">
            Diagnóstico Express
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-sora tracking-tight">
            ¿Cuántas horas y costes puede ahorrar tu negocio con IA?
          </h2>
          <p className="text-gray-400 mt-4 text-base sm:text-lg">
            Descubre en 30 segundos qué procesos puedes automatizar hoy y qué retorno esperar con una estimación cuantitativa.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Assessment Card */}
          <div className="bg-gray-950/90 backdrop-blur-md rounded-3xl border border-gray-800 p-6 sm:p-10 shadow-2xl">
            {!result ? (
              <form onSubmit={handleRunAudit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Business Type */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
                      Tipo de Negocio / Industria
                    </label>
                    <select
                      value={businessType}
                      onChange={(e) => setBusinessType(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-800 text-white text-sm focus:border-[#facc15] focus:outline-hidden transition-all"
                    >
                      <option>Servicios B2B / Consultoría</option>
                      <option>E-commerce / Retail</option>
                      <option>Agencia de Marketing / Contenidos</option>
                      <option>Software / SaaS</option>
                      <option>Logística y Operaciones</option>
                      <option>Inmobiliaria / Real Estate</option>
                      <option>Salud / Educación</option>
                      <option>Otro tipo de negocio</option>
                    </select>
                  </div>

                  {/* Team Size */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
                      Tamaño del Equipo
                    </label>
                    <select
                      value={teamSize}
                      onChange={(e) => setTeamSize(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-800 text-white text-sm focus:border-[#facc15] focus:outline-hidden transition-all"
                    >
                      <option>1 a 5 personas</option>
                      <option>5 a 20 personas</option>
                      <option>20 a 50 personas</option>
                      <option>Más de 50 personas</option>
                    </select>
                  </div>
                </div>

                {/* Bottleneck Input & Quick Pills */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
                    ¿Cuál es tu mayor cuello de botella o tarea manual que consume tiempo? *
                  </label>
                  <textarea
                    value={bottleneck}
                    onChange={(e) => setBottleneck(e.target.value)}
                    placeholder="Ej. Mi equipo tarda horas en responder consultas de clientes y traspasar datos de correos a nuestro CRM..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-800 text-white placeholder-gray-500 text-sm focus:border-[#facc15] focus:outline-hidden transition-all"
                  />

                  {/* Quick suggestion pills */}
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    <span className="text-[11px] text-gray-400 self-center">O pulsa un ejemplo:</span>
                    {commonBottlenecks.map((item, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => setBottleneck(item)}
                        className="text-xs py-1 px-3 rounded-lg bg-gray-900 hover:bg-gray-800 text-gray-300 hover:text-white border border-gray-800 transition-colors text-left"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Current tools */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
                    Herramientas actuales (opcional)
                  </label>
                  <input
                    type="text"
                    value={currentTools}
                    onChange={(e) => setCurrentTools(e.target.value)}
                    placeholder="Ej. HubSpot, Slack, Google Sheets, WhatsApp, Notion..."
                    className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-800 text-white placeholder-gray-500 text-sm focus:border-[#facc15] focus:outline-hidden transition-all"
                  />
                </div>

                {error && (
                  <p className="text-red-400 text-xs bg-red-950/50 p-3 rounded-lg border border-red-800">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  id="run-audit-btn"
                  className="w-full py-4 px-6 rounded-xl bg-[#facc15] hover:bg-yellow-300 text-black font-bold text-base flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01] active:scale-[0.99] shadow-xl disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      <span>Analizando viabilidad con IA de Axel Torbante...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 fill-black text-black" />
                      <span>Generar Diagnóstico y Hoja de Ruta Gratis</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              /* Diagnosis Result View */
              <div className="space-y-8 animate-in fade-in duration-300">
                {/* Result Top Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-[#facc15]/10 border border-[#facc15]/30">
                    <div className="flex items-center gap-2 text-[#facc15] text-xs font-bold uppercase tracking-wider">
                      <Clock className="w-4 h-4" />
                      <span>Ahorro Estimado</span>
                    </div>
                    <p className="text-2xl sm:text-3xl font-extrabold text-white font-sora mt-1">
                      {result.estimatedHoursSavedPerWeek}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">Recuperadas para tareas de alto valor</p>
                  </div>

                  <div className="p-5 rounded-2xl bg-emerald-400/10 border border-emerald-400/30">
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                      <TrendingUp className="w-4 h-4" />
                      <span>Retorno Proyectado</span>
                    </div>
                    <p className="text-2xl sm:text-3xl font-extrabold text-white font-sora mt-1">
                      {result.estimatedRoiPercent}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">Impacto en velocidad y costes</p>
                  </div>
                </div>

                {/* Summary */}
                <div className="p-5 rounded-2xl bg-gray-900 border border-gray-800">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
                    Diagnóstico Ejecutivo:
                  </h4>
                  <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-medium">
                    {result.summary}
                  </p>
                </div>

                {/* 3 Step Action Plan */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#facc15] mb-3 flex items-center gap-2">
                    <Cpu className="w-4 h-4" />
                    <span>Plan de Implementación en 3 Fases:</span>
                  </h4>
                  <div className="space-y-3">
                    {result.actionPlan.map((plan) => (
                      <div
                        key={plan.step}
                        className="p-4 rounded-2xl bg-gray-900/90 border border-gray-800 flex items-start gap-3.5"
                      >
                        <div className="w-6 h-6 rounded-full bg-[#facc15] text-black font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          {plan.step}
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-white">{plan.title}</h5>
                          <p className="text-xs text-gray-300 mt-0.5 leading-relaxed">
                            {plan.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommended Stack */}
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
                    Stack Tecnológico Sugerido:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {result.recommendedStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-3 py-1.5 rounded-lg bg-gray-900 text-gray-200 border border-gray-800 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Axel's Personal Tip Box */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-[#facc15]/15 via-gray-900 to-gray-900 border border-[#facc15]/40">
                  <p className="text-[10px] font-bold text-[#facc15] uppercase tracking-widest mb-1">
                    Consejo Consultivo de Axel Torbante:
                  </p>
                  <p className="text-xs sm:text-sm text-gray-200 italic leading-relaxed font-serif">
                    &ldquo;{result.axelTip}&rdquo;
                  </p>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={handleApplyToContact}
                    id="apply-diagnosis-cta"
                    className="flex-1 py-4 px-6 rounded-xl bg-[#facc15] hover:bg-yellow-300 text-black font-bold text-sm flex items-center justify-center gap-2 shadow-xl transition-transform active:scale-95"
                  >
                    <span>Implementar este Plan con Axel</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setResult(null)}
                    className="py-4 px-6 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-200 font-medium text-sm flex items-center justify-center gap-2 transition-colors border border-gray-800"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Hacer otro diagnóstico</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
