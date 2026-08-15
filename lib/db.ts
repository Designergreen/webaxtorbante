import { Lead } from './types';

// In-memory data store for server runtime (survives requests in container)
let leadsStore: Lead[] = [
  {
    id: 'lead-1',
    name: 'Carlos Mendoza',
    email: 'carlos.mendoza@innovatech.es',
    service: 'Consultoría 1:1 en IA',
    company: 'InnovaTech Solutions',
    message: 'Hola Axel, queremos implementar IA generativa en nuestro departamento de atención al cliente y ventas B2B. Necesitamos evaluar la viabilidad y estimar costes antes del próximo trimestre.',
    status: 'en_propuesta',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    notes: 'Reunión inicial agendada para el jueves a las 10:00 AM.',
  },
  {
    id: 'lead-2',
    name: 'Lucía Fernández',
    email: 'lucia@growthlab.io',
    service: 'Auditoría de Procesos',
    company: 'GrowthLab Marketing',
    message: 'Tenemos un equipo de 18 personas y sentimos que perdemos muchas horas en reportes semanales y redacción de copys. Nos interesa una auditoría completa.',
    status: 'contactado',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(), // 18 hours ago
    notes: 'Respondido por email con propuesta de auditoría express.',
  },
  {
    id: 'lead-3',
    name: 'Roberto Gómez',
    email: 'rgomez@logisticasur.com',
    service: 'Implementación de Automatizaciones',
    company: 'Logística Sur',
    message: 'Queremos conectar nuestro ERP con un agente inteligente para responder consultas de estado de pedidos vía WhatsApp y correo automáticamente.',
    status: 'nuevo',
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 mins ago
    notes: '',
  },
];

export async function getLeads(): Promise<Lead[]> {
  // Sort descending by creation date
  return [...leadsStore].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function addLead(newLeadData: Omit<Lead, 'id' | 'createdAt' | 'status'> & { status?: Lead['status'] }): Promise<Lead> {
  const newLead: Lead = {
    id: 'lead-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
    name: newLeadData.name,
    email: newLeadData.email,
    message: newLeadData.message,
    service: newLeadData.service || 'Consulta General',
    company: newLeadData.company || '',
    status: newLeadData.status || 'nuevo',
    createdAt: new Date().toISOString(),
    notes: '',
  };

  leadsStore.unshift(newLead);
  return newLead;
}

export async function updateLeadStatus(id: string, status: Lead['status'], notes?: string): Promise<Lead | null> {
  const index = leadsStore.findIndex((lead) => lead.id === id);
  if (index === -1) return null;

  leadsStore[index] = {
    ...leadsStore[index],
    status,
    notes: notes !== undefined ? notes : leadsStore[index].notes,
  };

  return leadsStore[index];
}

export async function deleteLead(id: string): Promise<boolean> {
  const initialLength = leadsStore.length;
  leadsStore = leadsStore.filter((lead) => lead.id !== id);
  return leadsStore.length < initialLength;
}
