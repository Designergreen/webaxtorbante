'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { PERSONAL_DATA } from '@/lib/constants';
import Navbar from '@/components/Navbar';
import AuthModal from '@/components/AuthModal';
import { generateRoiReportPdf } from '@/lib/generate-pdf';
import { 
  Sparkles, 
  Calendar, 
  Download, 
  FileText, 
  Calculator, 
  CheckCircle, 
  ArrowRight, 
  Lock,
  Building,
  Check,
  Printer
} from 'lucide-react';

export default function ClientDashboardPage() {
  const { user, isLoading, openAuthModal, switchRole } = useAuth();
  
  // Interactive ROI Calculator State
  const [teamMembers, setTeamMembers] = useState(6);
  const [hoursPerDayManual, setHoursPerDayManual] = useState(2.5);
  const [hourlyCost, setHourlyCost] = useState(28);
  const [customCompany, setCustomCompany] = useState('');
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfDownloaded, setPdfDownloaded] = useState(false);

  // Booking simulator state
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Calculations
  const weeklyHoursSaved = Math.round(teamMembers * hoursPerDayManual * 5 * 0.75);
  const annualSavings = Math.round(weeklyHoursSaved * hourlyCost * 48);

  const handleDownloadRoiPdf = async () => {
    if (!user) return;
    setIsGeneratingPdf(true);
    try {
      // Simulate small delay for visual feedback if needed, then generate with jsPDF
      await new Promise((resolve) => setTimeout(resolve, 300));
      generateRoiReportPdf({
        user: {
          ...user,
          company: customCompany.trim() || user.company || 'Empresa / Organización',
        },
        teamMembers,
        hoursPerDayManual,
        hourlyCost,
        weeklyHoursSaved,
        annualSavings,
      });
      setPdfDownloaded(true);
      setTimeout(() => setPdfDownloaded(false), 4000);
    } catch (err) {
      console.error('Error generating ROI PDF with jsPDF', err);
      alert('Hubo un error al generar el PDF. Por favor inténtalo de nuevo.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const availableSlots = [
    'Martes, 10:00 AM (CET)',
    'Martes, 4:00 PM (CET)',
    'Miércoles, 11:30 AM (CET)',
    'Jueves, 3:00 PM (CET)',
    'Viernes, 12:00 PM (CET)',
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  // Not logged in guard
  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
        <Navbar />
        <div className="max-w-md mx-auto my-auto p-8 bg-white rounded-2xl border border-slate-200 shadow-xl text-center space-y-5">
          <div className="w-14 h-14 rounded-full bg-yellow-100 text-yellow-800 flex items-center justify-center mx-auto">
            <Lock className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 font-sora">
              Portal Privado para Clientes
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Inicia sesión o regístrate para acceder a los recursos exclusivos, plantillas de automatización y agendador de consultas con <span className="font-semibold text-slate-900">Axel Torbante</span>.
            </p>
          </div>

          <div className="space-y-2.5">
            <button
              onClick={() => openAuthModal('login')}
              className="w-full py-3 bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => switchRole('user')}
              className="w-full py-2.5 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold text-xs rounded-xl transition-colors"
            >
              Acceso Rápido como Cliente Demo
            </button>
          </div>

          <div className="pt-2">
            <Link
              href="/"
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 underline"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
        <div className="py-6 text-center text-xs text-slate-400">
          Axel Torbante - Consultoría en Inteligencia Artificial
        </div>
        <AuthModal />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-slate-900">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 space-y-8">
        {/* Welcome Banner */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-yellow-400 text-slate-950">
                Portal de Cliente
              </span>
              <span className="text-xs text-slate-400">Rol: {user.role}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-sora text-slate-950">
              Bienvenido/a, {user.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Espacio exclusivo de trabajo, cálculo de ROI y recursos técnicos de automatización con <span className="font-semibold text-slate-800">Axel Torbante</span>.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#agendador"
              className="py-3 px-5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-xs transition-colors"
            >
              <Calendar className="w-4 h-4" />
              <span>Agendar Sesión 1:1</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Interactive ROI Calculator & Deliverables (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Interactive ROI Calculator Card */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-yellow-400/20 text-slate-900">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-950 font-sora text-lg">
                      Calculadora de ROI de Automatización
                    </h3>
                    <p className="text-xs text-slate-500">
                      Estima el impacto financiero antes de implementar tus flujos de IA.
                    </p>
                  </div>
                </div>
              </div>

              {/* Sliders */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                    <span>Tamaño del equipo operativo:</span>
                    <span className="text-slate-950 font-mono text-sm">{teamMembers} personas</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={teamMembers}
                    onChange={(e) => setTeamMembers(Number(e.target.value))}
                    className="w-full accent-yellow-400 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                    <span>Horas diarias por persona en tareas manuales / repetitivas:</span>
                    <span className="text-slate-950 font-mono text-sm">{hoursPerDayManual} h/día</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="6"
                    step="0.5"
                    value={hoursPerDayManual}
                    onChange={(e) => setHoursPerDayManual(Number(e.target.value))}
                    className="w-full accent-yellow-400 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                    <span>Coste horario promedio por empleado (€):</span>
                    <span className="text-slate-950 font-mono text-sm">{hourlyCost} €/h</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="100"
                    step="1"
                    value={hourlyCost}
                    onChange={(e) => setHourlyCost(Number(e.target.value))}
                    className="w-full accent-yellow-400 cursor-pointer"
                  />
                </div>
              </div>

              {/* Calculation Result Box */}
              <div className="p-6 rounded-2xl bg-slate-950 text-white space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[11px] font-bold text-yellow-400 uppercase tracking-wider">
                      Tiempo Ahorrado
                    </span>
                    <p className="text-2xl sm:text-3xl font-extrabold font-sora mt-0.5">
                      +{weeklyHoursSaved}h
                    </p>
                    <p className="text-[11px] text-slate-400">semanales liberadas ({(weeklyHoursSaved * 48).toLocaleString('es-ES')}h/año)</p>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                      Ahorro Estimado / Año
                    </span>
                    <p className="text-2xl sm:text-3xl font-extrabold font-sora mt-0.5 text-emerald-400">
                      {annualSavings.toLocaleString('es-ES')} €
                    </p>
                    <p className="text-[11px] text-slate-400">en costes laborales directos</p>
                  </div>
                </div>

                {/* PDF Generation & Export Section */}
                <div className="pt-4 border-t border-slate-800/90 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-yellow-400 shrink-0" />
                      <span className="text-xs font-semibold text-slate-200">
                        Exportar Informe Ejecutivo Oficial
                      </span>
                    </div>

                    <div className="relative w-full sm:w-auto">
                      <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1">
                        <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <input
                          type="text"
                          value={customCompany}
                          onChange={(e) => setCustomCompany(e.target.value)}
                          placeholder={user.company || 'Nombre de tu empresa'}
                          className="bg-transparent text-xs text-white placeholder-slate-500 focus:outline-hidden w-full sm:w-44"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <button
                      onClick={handleDownloadRoiPdf}
                      disabled={isGeneratingPdf}
                      id="download-roi-pdf-btn"
                      className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                    >
                      {isGeneratingPdf ? (
                        <>
                          <span className="w-4 h-4 border-2 border-slate-950/20 border-t-slate-950 rounded-full animate-spin" />
                          <span>Generando documento PDF con jsPDF...</span>
                        </>
                      ) : pdfDownloaded ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-800" />
                          <span className="text-emerald-950 font-bold">¡PDF de ROI Descargado con Éxito!</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          <span>Descargar Reporte PDF del ROI (.pdf)</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-[10px] text-slate-400 flex items-center gap-1.5">
                    <span>* Documento formal con desglose metodológico, comparativa de horas y hoja de ruta recomendada listo para presentar a dirección.</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Exclusive Automation Toolkits */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-bold text-slate-950 font-sora text-base">
                  Kits y Blueprints Descargables (Exclusivo Clientes)
                </h3>
                <span className="text-[11px] font-bold text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded">
                  Acceso Total
                </span>
              </div>

              <div className="space-y-3">
                {/* Dynamic ROI PDF Card inside toolkits */}
                <div className="p-4 rounded-xl bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-yellow-400 text-slate-950 font-bold flex items-center justify-center shrink-0 mt-0.5">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-slate-900">
                          Informe de Impacto & ROI en PDF (Valores Actuales)
                        </h4>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-yellow-400 text-slate-950 uppercase tracking-wider">
                          Dinámico
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        Reporte personalizado con {teamMembers} personas, +{weeklyHoursSaved}h/sem liberadas y {annualSavings.toLocaleString('es-ES')} €/año.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleDownloadRoiPdf}
                    disabled={isGeneratingPdf}
                    className="p-2.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-yellow-400 border border-slate-800 text-xs shrink-0 font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Descargar PDF</span>
                  </button>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-slate-700 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">
                        Plantilla n8n: Automatización de Atención Comercial con Gemini 3.7
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Workflow JSON listo para importar y conectar a WhatsApp y CRM.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => alert('Descargando archivo blueprint_n8n_gemini.json')}
                    className="p-2 rounded-lg bg-white hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs shrink-0 font-medium flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Descargar JSON</span>
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-slate-700 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">
                        Checklist Excel de Auditoría de Procesos con IA
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Hoja de cálculo con fórmulas de cálculo de horas y priorización.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => alert('Descargando archivo auditoria_procesos_ia.xlsx')}
                    className="p-2 rounded-lg bg-white hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs shrink-0 font-medium flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Descargar XLSX</span>
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-slate-700 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">
                        Prompt Engineering & Metodología de Validación
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Guía para evitar alucinaciones en agentes en producción.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => alert('Descargando archivo prompt_validation_guide.pdf')}
                    className="p-2 rounded-lg bg-white hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs shrink-0 font-medium flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Descargar PDF</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 1:1 Booking Calendar Simulator & Direct Contact (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            {/* 1:1 Booking Module */}
            <div id="agendador" className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-950 text-yellow-400 font-bold flex items-center justify-center">
                  AT
                </div>
                <div>
                  <h3 className="font-bold text-slate-950 font-sora text-base">
                    Agendador de Sesión con Axel
                  </h3>
                  <p className="text-xs text-slate-500">Sesión 1:1 por Google Meet (45 min)</p>
                </div>
              </div>

              {bookingConfirmed ? (
                <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-3 animate-in fade-in">
                  <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
                  <div>
                    <h4 className="font-bold text-emerald-900 text-sm">
                      ¡Sesión Agendada con Éxito!
                    </h4>
                    <p className="text-xs text-emerald-700 mt-1">
                      Horario reservado: <span className="font-semibold">{selectedSlot}</span>
                    </p>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Hemos enviado el enlace de Google Meet a tu correo ({user.email}).
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setBookingConfirmed(false);
                      setSelectedSlot(null);
                    }}
                    className="text-xs font-bold text-slate-900 hover:underline pt-2"
                  >
                    Cambiar horario o agendar otra
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-xs text-slate-600">
                    Selecciona un espacio disponible para tu consultoría o seguimiento de proyecto:
                  </p>

                  <div className="space-y-2">
                    {availableSlots.map((slot, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedSlot(slot)}
                        className={`w-full p-3 rounded-xl text-xs font-semibold flex items-center justify-between border transition-all text-left ${
                          selectedSlot === slot
                            ? 'bg-slate-950 text-white border-slate-950 ring-2 ring-yellow-400'
                            : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-yellow-500 shrink-0" />
                          <span>{slot}</span>
                        </div>
                        <span className="text-[10px] uppercase font-bold text-slate-400">
                          {selectedSlot === slot ? 'Seleccionado' : 'Disponible'}
                        </span>
                      </button>
                    ))}
                  </div>

                  <button
                    disabled={!selectedSlot}
                    onClick={() => setBookingConfirmed(true)}
                    className="w-full py-3 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Confirmar Reserva 1:1
                  </button>
                </div>
              )}
            </div>

            {/* Direct Contact Info */}
            <div className="bg-slate-950 text-white p-6 sm:p-7 rounded-2xl space-y-4">
              <div className="flex items-center gap-2 text-yellow-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Canal Prioritario de Cliente</span>
              </div>
              <h4 className="text-base font-bold font-sora">
                ¿Necesitas respuesta urgente?
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Como cliente registrado, tienes prioridad de respuesta en mi bandeja de entrada principal.
              </p>
              <a
                href={`mailto:${PERSONAL_DATA.email}?subject=Consulta Cliente - ${user.name}`}
                className="inline-flex items-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold border border-slate-800 transition-colors"
              >
                <span>Escribir a Axel ({PERSONAL_DATA.email})</span>
                <ArrowRight className="w-3.5 h-3.5 text-yellow-400" />
              </a>
            </div>
          </div>
        </div>
      </main>

      <AuthModal />
    </div>
  );
}
