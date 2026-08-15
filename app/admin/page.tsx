'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Lead, LeadStatus } from '@/lib/types';
import Navbar from '@/components/Navbar';
import AuthModal from '@/components/AuthModal';
import { 
  ShieldCheck, 
  Users, 
  Mail, 
  Calendar, 
  Clock, 
  Search, 
  Filter, 
  Download, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  MessageSquare, 
  Trash2, 
  Edit3, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Sparkles,
  ArrowLeft,
  X
} from 'lucide-react';

export default function AdminPage() {
  const { user, isLoading: authLoading, switchRole } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [serviceFilter, setServiceFilter] = useState<string>('todos');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [leadNotes, setLeadNotes] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);
  const [actionSuccessMsg, setActionSuccessMsg] = useState('');

  const fetchLeads = async () => {
    setLoadingLeads(true);
    try {
      const res = await fetch('/api/leads');
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }
      const data = await res.json();
      if (data.success && data.leads) {
        setLeads(data.leads);
      }
    } catch (err) {
      console.error('Error fetching leads:', err);
    } finally {
      setLoadingLeads(false);
    }
  };

  useEffect(() => {
    let active = true;
    if (user?.role === 'admin') {
      fetch('/api/leads')
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP error ${res.status}`);
          return res.json();
        })
        .then((data) => {
          if (active && data.success && data.leads) {
            setLeads(data.leads);
            setLoadingLeads(false);
          }
        })
        .catch((err) => {
          console.error('Error loading leads', err);
          if (active) setLoadingLeads(false);
        });
    }
    return () => {
      active = false;
    };
  }, [user]);

  const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
    try {
      const res = await fetch('/api/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: leadId, status: newStatus }),
      });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();
      if (data.success) {
        setLeads((prev) =>
          prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
        );
        if (selectedLead?.id === leadId) {
          setSelectedLead((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
        showToast('Estado del lead actualizado');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedLead) return;
    setSavingNotes(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedLead.id,
          status: selectedLead.status,
          notes: leadNotes,
        }),
      });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();
      if (data.success) {
        setLeads((prev) =>
          prev.map((l) => (l.id === selectedLead.id ? { ...l, notes: leadNotes } : l))
        );
        setSelectedLead((prev) => (prev ? { ...prev, notes: leadNotes } : null));
        showToast('Notas guardadas');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSavingNotes(false);
    }
  };

  const handleDeleteLead = async (leadId: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este lead?')) return;
    try {
      const res = await fetch(`/api/leads?id=${leadId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();
      if (data.success) {
        setLeads((prev) => prev.filter((l) => l.id !== leadId));
        if (selectedLead?.id === leadId) setSelectedLead(null);
        showToast('Lead eliminado');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const showToast = (msg: string) => {
    setActionSuccessMsg(msg);
    setTimeout(() => setActionSuccessMsg(''), 3000);
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Nombre', 'Email', 'Empresa', 'Servicio', 'Estado', 'Fecha', 'Mensaje', 'Notas'];
    const rows = leads.map((l) => [
      l.id,
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.email.replace(/"/g, '""')}"`,
      `"${(l.company || '').replace(/"/g, '""')}"`,
      `"${(l.service || '').replace(/"/g, '""')}"`,
      l.status,
      new Date(l.createdAt).toLocaleString('es-ES'),
      `"${l.message.replace(/"/g, '""')}"`,
      `"${(l.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `leads_axel_torbante_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.company && lead.company.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'todos' || lead.status === statusFilter;
    const matchesService = serviceFilter === 'todos' || lead.service === serviceFilter;

    return matchesSearch && matchesStatus && matchesService;
  });

  // Calculate Metrics
  const totalCount = leads.length;
  const nuevosCount = leads.filter((l) => l.status === 'nuevo').length;
  const contactadosCount = leads.filter((l) => l.status === 'contactado').length;
  const propuestasCount = leads.filter((l) => l.status === 'en_propuesta').length;
  const cerradosCount = leads.filter((l) => l.status === 'cerrado').length;

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-slate-500 font-medium">Verificando credenciales...</p>
        </div>
      </div>
    );
  }

  // Access Denied / Role Guard view
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
        <Navbar />
        <div className="max-w-md mx-auto my-auto p-8 bg-white rounded-2xl border border-slate-200 shadow-xl text-center space-y-5">
          <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 font-sora">
              Acceso Restringido
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Esta sección está reservada exclusivamente para el administrador (<span className="font-semibold text-slate-800">Axel Torbante</span>).
            </p>
            {user && (
              <p className="text-xs text-slate-500 mt-1">
                Tu rol actual es: <span className="font-bold uppercase text-slate-700">{user.role}</span>
              </p>
            )}
          </div>

          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-xs text-yellow-900 text-left space-y-2">
            <p className="font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              ¿Deseas probar el panel de administración?
            </p>
            <p>
              Haz clic abajo para cambiar instantáneamente al rol de <span className="font-bold">Admin</span>.
            </p>
            <button
              onClick={() => switchRole('admin')}
              id="admin-override-btn"
              className="w-full mt-1 py-2 px-3 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold rounded-lg text-xs transition-colors shadow-xs"
            >
              Cambiar a Modo Administrador
            </button>
          </div>

          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-slate-950"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a la página principal</span>
            </Link>
          </div>
        </div>
        <div className="py-6 text-center text-xs text-slate-400">
          Axel Torbante - Sistema de Administración
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: LeadStatus) => {
    switch (status) {
      case 'nuevo':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800 border border-yellow-300">Nuevo</span>;
      case 'contactado':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">Contactado</span>;
      case 'en_propuesta':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">En Propuesta</span>;
      case 'cerrado':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">Cerrado / Cliente</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">{status}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-slate-900">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 space-y-8">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-yellow-400 text-slate-950 rounded-lg">
                <ShieldCheck className="w-5 h-5" />
              </span>
              <h1 className="text-2xl font-bold font-sora text-slate-950">
                Panel de Leads & Contactos
              </h1>
            </div>
            <p className="text-xs text-slate-500">
              Gestión centralizada de prospectos, solicitudes de auditoría y clientes potenciales.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchLeads}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Refrescar lista"
            >
              <RefreshCw className={`w-4 h-4 ${loadingLeads ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Actualizar</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-2 transition-colors shadow-xs"
            >
              <Download className="w-4 h-4 text-yellow-400" />
              <span>Exportar CSV</span>
            </button>
          </div>
        </div>

        {/* Toast Alert */}
        {actionSuccessMsg && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{actionSuccessMsg}</span>
          </div>
        )}

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Total Leads</span>
              <Users className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-sora mt-1">
              {totalCount}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">En base de datos</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-yellow-200 bg-yellow-50/30 shadow-xs">
            <div className="flex items-center justify-between text-xs text-yellow-800 font-medium">
              <span>Nuevos (Sin contactar)</span>
              <Sparkles className="w-4 h-4 text-yellow-600" />
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-yellow-900 font-sora mt-1">
              {nuevosCount}
            </p>
            <p className="text-[11px] text-yellow-700 mt-0.5">Requieren atención</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-purple-200 bg-purple-50/20 shadow-xs">
            <div className="flex items-center justify-between text-xs text-purple-800 font-medium">
              <span>En Propuesta</span>
              <TrendingUp className="w-4 h-4 text-purple-600" />
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-purple-900 font-sora mt-1">
              {propuestasCount}
            </p>
            <p className="text-[11px] text-purple-700 mt-0.5">En negociación</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-emerald-200 bg-emerald-50/20 shadow-xs">
            <div className="flex items-center justify-between text-xs text-emerald-800 font-medium">
              <span>Cerrados / Clientes</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-900 font-sora mt-1">
              {cerradosCount}
            </p>
            <p className="text-[11px] text-emerald-700 mt-0.5">En ejecución</p>
          </div>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nombre, email o mensaje..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-yellow-400"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 font-medium focus:outline-hidden"
            >
              <option value="todos">Todos los Estados</option>
              <option value="nuevo">Nuevo</option>
              <option value="contactado">Contactado</option>
              <option value="en_propuesta">En Propuesta</option>
              <option value="cerrado">Cerrado</option>
            </select>

            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 font-medium focus:outline-hidden"
            >
              <option value="todos">Todos los Servicios</option>
              <option value="Consultoría 1:1 en IA">Consultoría 1:1</option>
              <option value="Auditoría de Procesos">Auditoría</option>
              <option value="Implementación de Automatizaciones">Automatizaciones</option>
            </select>
          </div>
        </div>

        {/* Leads Table Container */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          {loadingLeads ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs text-slate-500">Cargando colección de leads...</p>
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="py-16 text-center space-y-2">
              <Users className="w-10 h-10 text-slate-300 mx-auto" />
              <h4 className="text-sm font-bold text-slate-700">No se encontraron leads</h4>
              <p className="text-xs text-slate-400">
                {searchQuery || statusFilter !== 'todos'
                  ? 'Prueba ajustando los filtros de búsqueda'
                  : 'Aún no hay leads registrados en el sistema.'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="px-6 py-3.5">Nombre & Contacto</th>
                    <th className="px-4 py-3.5">Servicio Solicitado</th>
                    <th className="px-4 py-3.5">Mensaje del Lead</th>
                    <th className="px-4 py-3.5">Fecha</th>
                    <th className="px-4 py-3.5">Estado</th>
                    <th className="px-6 py-3.5 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                      onClick={() => {
                        setSelectedLead(lead);
                        setLeadNotes(lead.notes || '');
                      }}
                    >
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900 font-sora text-sm">
                          {lead.name}
                        </div>
                        <div className="text-slate-500 text-[11px] font-mono mt-0.5">
                          {lead.email}
                        </div>
                        {lead.company && (
                          <div className="text-slate-400 text-[10px] mt-0.5">
                            {lead.company}
                          </div>
                        )}
                      </td>

                      <td className="px-4 py-4 font-medium text-slate-800">
                        {lead.service || 'Consultoría en IA'}
                      </td>

                      <td className="px-4 py-4 max-w-xs truncate text-slate-600" title={lead.message}>
                        {lead.message}
                      </td>

                      <td className="px-4 py-4 text-slate-500 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{new Date(lead.createdAt).toLocaleDateString('es-ES')}</span>
                        </div>
                        <span className="text-[10px] text-slate-400">
                          {new Date(lead.createdAt).toLocaleTimeString('es-ES', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </td>

                      <td className="px-4 py-4 whitespace-nowrap">
                        {getStatusBadge(lead.status)}
                      </td>

                      <td className="px-6 py-4 text-right whitespace-nowrap space-x-2" onClick={(e) => e.stopPropagation()}>
                        <a
                          href={`mailto:${lead.email}?subject=Respuesta a tu consulta de IA - Axel Torbante`}
                          className="inline-flex items-center p-1.5 rounded-lg bg-slate-100 hover:bg-yellow-400 hover:text-slate-950 text-slate-700 transition-colors"
                          title="Responder por email"
                        >
                          <Mail className="w-4 h-4" />
                        </a>

                        <button
                          onClick={() => {
                            setSelectedLead(lead);
                            setLeadNotes(lead.notes || '');
                          }}
                          className="inline-flex items-center p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                          title="Ver detalle y editar notas"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDeleteLead(lead.id)}
                          className="inline-flex items-center p-1.5 rounded-lg bg-slate-100 hover:bg-red-100 hover:text-red-600 text-slate-400 transition-colors"
                          title="Eliminar lead"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Lead Detail & Notes Drawer Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative space-y-5">
            <button
              onClick={() => setSelectedLead(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2 mb-1">
                {getStatusBadge(selectedLead.status)}
                <span className="text-xs text-slate-400">ID: {selectedLead.id}</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-950 font-sora">
                {selectedLead.name}
              </h3>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                {selectedLead.email} {selectedLead.company && `• ${selectedLead.company}`}
              </p>
            </div>

            {/* Change Status Fast Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Cambiar Estado del Prospecto:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {(['nuevo', 'contactado', 'en_propuesta', 'cerrado'] as LeadStatus[]).map(
                  (st) => (
                    <button
                      key={st}
                      onClick={() => handleStatusChange(selectedLead.id, st)}
                      className={`py-1.5 px-2.5 rounded-lg text-xs font-bold capitalize transition-all ${
                        selectedLead.status === st
                          ? 'bg-slate-950 text-yellow-400 shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {st.replace('_', ' ')}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Message Detail Box */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Mensaje recibido:
              </span>
              <p className="text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">
                {selectedLead.message}
              </p>
            </div>

            {/* Internal Notes / Follow-up */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Notas internas de seguimiento:
              </label>
              <textarea
                value={leadNotes}
                onChange={(e) => setLeadNotes(e.target.value)}
                placeholder="Añade recordatorios, acuerdos de llamada, presupuesto cotizado..."
                rows={3}
                className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-900 focus:ring-2 focus:ring-yellow-400 focus:outline-hidden"
              />
              <button
                onClick={handleSaveNotes}
                disabled={savingNotes}
                className="py-1.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg transition-colors"
              >
                {savingNotes ? 'Guardando...' : 'Guardar Notas'}
              </button>
            </div>

            {/* Actions Footer */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
              <a
                href={`mailto:${selectedLead.email}?subject=Propuesta de Automatización con IA - Axel Torbante&body=Hola ${selectedLead.name},%0D%0A%0D%0AGracias por contactarme respecto a ${selectedLead.service}.`}
                className="flex-1 py-3 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Responder por Correo</span>
              </a>

              <button
                onClick={() => setSelectedLead(null)}
                className="py-3 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      <AuthModal />
    </div>
  );
}
