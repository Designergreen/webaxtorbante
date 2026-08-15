export type UserRole = 'admin' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  company?: string;
  createdAt: string;
}

export type LeadStatus = 'nuevo' | 'contactado' | 'en_propuesta' | 'cerrado';

export interface Lead {
  id: string;
  name: string;
  email: string;
  message: string;
  service?: string;
  company?: string;
  status: LeadStatus;
  createdAt: string;
  notes?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  result: string;
  deliverables: string[];
  duration: string;
  badge: string;
  iconName: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  resultMetric: string;
  avatarUrl: string;
  rating: number;
}

export interface ResourceItem {
  id: string;
  title: string;
  category: 'Guía' | 'Framework' | 'Herramienta' | 'Caso de Estudio';
  readTime: string;
  description: string;
  tags: string[];
  downloadUrl?: string;
}
