'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { PERSONAL_DATA, SERVICES } from '@/lib/constants';
import { 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Mail, 
  User, 
  MessageSquare, 
  Building, 
  Layers,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface ContactFormProps {
  initialService?: string;
  initialMessage?: string;
}

export default function ContactForm({ initialService = '', initialMessage = '' }: ContactFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [service, setService] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [submittedLeadId, setSubmittedLeadId] = useState('');

  const currentService = service || initialService || 'Consultoría 1:1 en IA';
  const currentMessage = message || initialMessage || '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !currentMessage.trim()) {
      setError('Por favor completa todos los campos requeridos (nombre, email y mensaje).');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/app/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message: currentMessage,
          service: currentService,
          company,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(true);
        setSubmittedLeadId(data.lead.id);

        // Trigger celebratory confetti
        try {
          confetti({
            particleCount: 90,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#facc15', '#0f172a', '#3b82f6'],
          });
        } catch (e) {
          // ignore if canvas-confetti fails
        }
      } else {
        throw new Error(data.error || 'No se pudo enviar el mensaje.');
      }
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Error de conexión al enviar el formulario. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setCompany('');
    setMessage('');
    setSuccess(false);
    setError('');
  };

  return (
    <section id="contacto" className="py-24 bg-[#F9FAFB] border-b border-gray-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Info & Value */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-block px-3 py-1 bg-[#facc15] text-[10px] font-bold uppercase tracking-widest rounded-full text-black mb-1">
              Contacto Directo
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] font-sora tracking-tight">
              Iniciemos una conversación sobre tu negocio
            </h2>

            <p className="text-gray-600 text-base leading-relaxed">
              Completa el formulario describiendo brevemente tu caso o qué proceso te gustaría automatizar. Recibirás una respuesta personalizada de Axel en menos de 24 horas.
            </p>

            {/* Direct Contact Card */}
            <div className="p-7 rounded-3xl bg-white border border-gray-100 shadow-xs space-y-4">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                Canales oficiales:
              </h4>

              <a
                href={`mailto:${PERSONAL_DATA.email}`}
                className="flex items-center gap-3 text-[#111827] hover:text-[#ca8a04] transition-colors font-medium text-sm group"
              >
                <div className="w-10 h-10 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-700 group-hover:bg-[#facc15] group-hover:text-black transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <span>{PERSONAL_DATA.email}</span>
              </a>

              <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-gray-600">
                <a
                  href={PERSONAL_DATA.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-black underline decoration-[#facc15] decoration-2"
                >
                  LinkedIn Profile
                </a>
                <span>•</span>
                <a
                  href={PERSONAL_DATA.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-black underline decoration-[#facc15] decoration-2"
                >
                  Twitter / X (@axtorbante)
                </a>
              </div>
            </div>

            {/* Security Guarantee Box */}
            <div className="flex items-start gap-3 text-xs text-gray-500">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                Tus datos están 100% protegidos y solo se utilizarán para coordinar la propuesta de consultoría. Cero spam.
              </span>
            </div>
          </div>

          {/* Right Column: Lead Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-7 sm:p-10 border border-gray-100 shadow-xl relative">
              {success ? (
                /* Success State */
                <div className="text-center py-10 space-y-5 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 rounded-full bg-[#facc15] text-black flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-[#111827] font-sora">
                      ¡Solicitud Recibida con Éxito!
                    </h3>
                    <p className="text-gray-600 text-sm max-w-md mx-auto leading-relaxed">
                      Gracias <span className="font-semibold text-[#111827]">{name}</span>. He registrado tu solicitud en mi agenda (ID: <span className="font-mono text-xs font-bold text-black">{submittedLeadId}</span>).
                    </p>
                    <p className="text-xs text-gray-500">
                      Revisaré la información y te contactaré a <span className="font-semibold text-gray-700">{email}</span> en menos de 24 horas laborables.
                    </p>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={handleReset}
                      className="px-6 py-3 rounded-xl bg-[#111827] hover:bg-black text-white text-xs font-semibold shadow-xs"
                    >
                      Enviar otro mensaje
                    </button>
                    <a
                      href="#recursos"
                      className="px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-200 text-xs font-semibold"
                    >
                      Explorar recursos mientras esperas
                    </a>
                  </div>
                </div>
              ) : (
                /* Main Form */
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-gray-100 pb-4 mb-2">
                    <h3 className="text-xl font-bold text-[#111827] font-sora">
                      Formulario de Contacto & Solicitud
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Campos marcados con * son obligatorios para generar tu propuesta.
                    </p>
                  </div>

                  {error && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-1.5">
                        Nombre Completo *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="lead-name-input"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Tu nombre y apellido"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-[#111827] focus:outline-hidden focus:border-[#facc15] focus:bg-white transition-all"
                          required
                        />
                        <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-1.5">
                        Correo Electrónico *
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          id="lead-email-input"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="tu@empresa.com"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-[#111827] focus:outline-hidden focus:border-[#facc15] focus:bg-white transition-all"
                          required
                        />
                        <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Company (optional) */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-1.5">
                        Empresa / Proyecto (opcional)
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="lead-company-input"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="Nombre de tu empresa o web"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-[#111827] focus:outline-hidden focus:border-[#facc15] focus:bg-white transition-all"
                        />
                        <Building className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                      </div>
                    </div>

                    {/* Service Selection */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-1.5">
                        Servicio de Interés
                      </label>
                      <div className="relative">
                        <select
                          id="lead-service-select"
                          value={currentService}
                          onChange={(e) => setService(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-[#111827] focus:outline-hidden focus:border-[#facc15] focus:bg-white transition-all"
                        >
                          <option value="Consultoría 1:1 en IA">Consultoría 1:1 en IA</option>
                          <option value="Auditoría de Procesos">Auditoría de Procesos</option>
                          <option value="Implementación de Automatizaciones">
                            Implementación de Automatizaciones
                          </option>
                          <option value="Otro proyecto a medida">Otro proyecto a medida</option>
                        </select>
                        <Layers className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-1.5">
                      ¿Qué cuello de botella u objetivo te gustaría abordar? *
                    </label>
                    <div className="relative">
                      <textarea
                        id="lead-message-input"
                        value={currentMessage}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Describe brevemente tus procesos actuales, tareas repetitivas o qué te gustaría automatizar con IA..."
                        rows={4}
                        className="w-full p-4 rounded-xl bg-gray-50 border border-gray-200 text-sm text-[#111827] focus:outline-hidden focus:border-[#facc15] focus:bg-white transition-all"
                        required
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    id="submit-lead-btn"
                    className="w-full py-4 px-6 rounded-xl bg-[#facc15] hover:bg-yellow-300 text-black font-bold text-base flex items-center justify-center gap-2.5 transition-all shadow-xl transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <span className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                        <span>Enviando información...</span>
                      </>
                    ) : (
                      <>
                        <span>Enviar Solicitud a Axel Torbante</span>
                        <ArrowRight className="w-4 h-4 text-black" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
