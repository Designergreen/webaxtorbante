import { ServiceItem, TestimonialItem, ResourceItem } from './types';

export const PERSONAL_DATA = {
  name: 'Axel Torbante',
  title: 'Consultor en Inteligencia Artificial',
  headline: 'Ayudo a negocios a automatizar procesos y crecer usando IA',
  subheadline:
    'Trabajo con empresas y emprendedores para implementar soluciones prácticas con inteligencia artificial, mejorar su productividad y aumentar sus ingresos.',
  email: 'contacto@axtorbante.com',
  twitter: 'https://twitter.com/axtorbante',
  linkedin: 'https://linkedin.com/in/axtorbante',
  availability: 'Disponible para 2 nuevos proyectos este mes',
  location: 'Madrid / Remoto Internacional',
  experienceYears: '+7 años en automatización y software',
  stats: [
    { label: 'Horas manuales ahorradas / mes', value: '+1,200h' },
    { label: 'Procesos de negocio automatizados', value: '85+' },
    { label: 'Retorno de inversión promedio', value: '4.8x' },
    { label: 'Satisfacción de clientes', value: '100%' },
  ],
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'consultoria-1-1',
    title: 'Consultoría 1:1 en IA',
    subtitle: 'Estrategia y hoja de ruta personalizada',
    description:
      'Sesiones directas donde analizamos tu modelo de negocio, seleccionamos los mejores modelos y herramientas de IA, y diseñamos una hoja de ruta clara paso a paso.',
    result: 'Roadmap estratégico accionable en 14 días y priorización de casos de uso de alto impacto.',
    deliverables: [
      'Diagnóstico de viabilidad tecnológica',
      'Matriz de priorización de casos de uso con IA',
      'Selección de stack de IA (LLMs, frameworks, proveedores)',
      'Plan de implementación paso a paso',
      'Grabaciones y documentación detallada',
    ],
    duration: '2 a 4 semanas',
    badge: 'Más solicitado',
    iconName: 'Compass',
  },
  {
    id: 'auditoria-procesos',
    title: 'Auditoría de Procesos',
    subtitle: 'Detección de cuellos de botella y fugas de tiempo',
    description:
      'Inmersión completa en tus operaciones actuales (ventas, soporte al cliente, marketing, finanzas) para mapear ineficiencias y oportunidades de automatización rentable.',
    result: 'Identificación de +15 horas semanales por empleado listas para automatizar y reporte de ROI proyectado.',
    deliverables: [
      'Mapeo visual de flujos de trabajo actuales',
      'Reporte exhaustivo de ineficiencias y costes ocultos',
      'Análisis de ROI y tiempo de recuperación de inversión',
      'Especificación técnica para automatizaciones prioritarias',
      'Sesión de presentación con el equipo directivo',
    ],
    duration: '1 a 2 semanas',
    badge: 'Alto ROI',
    iconName: 'SearchCheck',
  },
  {
    id: 'implementacion-automatizaciones',
    title: 'Implementación de Automatizaciones',
    subtitle: 'Desarrollo e integración de sistemas con IA llave en mano',
    description:
      'Construcción e integración en producción de agentes de IA, automatizaciones complejas, pipelines de datos y chatbots inteligentes conectados a tus herramientas actuales.',
    result: 'Sistemas autónomos operando 24/7 sin fricción, reduciendo tiempos de respuesta y errores hasta un 80%.',
    deliverables: [
      'Agentes autónomos de IA y flujos n8n / Make / APIs',
      'Integración con tu CRM, ERP, Slack, WhatsApp y base de datos',
      'Pruebas de estrés y control de calidad de respuestas de IA',
      'Capacitación del equipo y manuales de operación',
      '30 días de soporte post-lanzamiento garantizado',
    ],
    duration: '3 a 6 semanas',
    badge: 'Llave en mano',
    iconName: 'Cpu',
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: '1',
    name: 'Martín Vega',
    role: 'CEO & Co-fundador',
    company: 'Nexo Logistics',
    content:
      'Axel auditó nuestro flujo de cotizaciones y atención comercial. En 3 semanas teníamos un sistema con IA que redujo nuestro tiempo de respuesta de 4 horas a solo 2 minutos. Triplicamos la tasa de conversión en clientes B2B.',
    resultMetric: 'Tiempo de respuesta -95%',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    rating: 5,
  },
  {
    id: '2',
    name: 'Elena Salgado',
    role: 'Directora de Operaciones',
    company: 'FintechNova',
    content:
      'La consultoría 1:1 con Axel nos evitó cometer errores costosos al elegir arquitecturas de LLMs. Nos entregó un plan claro y práctico sin tecnicismos innecesarios. El ahorro en costes de procesamiento fue del 40% el primer mes.',
    resultMetric: 'Ahorro operativo de 40%',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    rating: 5,
  },
  {
    id: '3',
    name: 'Javier Méndez',
    role: 'Fundador',
    company: 'GrowthSphere E-commerce',
    content:
      'Implementó una automatización con IA que clasifica tickets de soporte, genera respuestas sugeridas y actualiza inventarios. Nuestro equipo pasó de sentirse saturado a poder enfocarse en ventas estratégicas.',
    resultMetric: '+60 horas/mes liberadas',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rating: 5,
  },
];

export const RESOURCES: ResourceItem[] = [
  {
    id: 'guia-agentes-2026',
    title: 'Guía Práctica: De 0 a 100 en Automatización con Agentes de IA',
    category: 'Guía',
    readTime: '8 min lectura',
    description:
      'Aprende a estructurar flujos de trabajo autónomos sin caer en las trampas comunes de alucinaciones y costes descontrolados de API.',
    tags: ['Agentes IA', 'Automatización', 'Productividad'],
  },
  {
    id: 'checklist-auditoria',
    title: 'Checklist de Auditoría: 15 Procesos que Toda Empresa Debería Automatizar',
    category: 'Framework',
    readTime: '5 min lectura',
    description:
      'Una plantilla paso a paso para evaluar tareas repetitivas en tu equipo y calcular el ahorro económico potencial.',
    tags: ['Auditoría', 'ROI', 'Operaciones'],
  },
  {
    id: 'seleccion-llms',
    title: 'Matriz Comparativa: Cómo Elegir el Modelo de IA Ideal para tu Negocio',
    category: 'Herramienta',
    readTime: '6 min lectura',
    description:
      'Guía técnica y de costes entre Gemini 3, GPT-4o, Claude 3.5 y modelos Open Source según tu caso de uso específico.',
    tags: ['Modelos IA', 'Costes API', 'Arquitectura'],
  },
  {
    id: 'caso-estudio-logistica',
    title: 'Caso de Estudio: Cómo Reducir el Tiempo de Respuesta en un 95% con IA',
    category: 'Caso de Estudio',
    readTime: '7 min lectura',
    description:
      'Desglose técnico de la arquitectura implementada en Nexo Logistics para procesar cotizaciones complejas en tiempo real.',
    tags: ['Caso Real', 'SaaS & B2B', 'Integraciones'],
  },
];
