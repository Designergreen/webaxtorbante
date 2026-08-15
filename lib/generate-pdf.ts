import { jsPDF } from 'jspdf';
import { PERSONAL_DATA } from './constants';
import { User } from './types';

export interface RoiPdfData {
  user: User;
  teamMembers: number;
  hoursPerDayManual: number;
  hourlyCost: number;
  weeklyHoursSaved: number;
  annualSavings: number;
  notes?: string;
}

export function generateRoiReportPdf(data: RoiPdfData): void {
  const { user, teamMembers, hoursPerDayManual, hourlyCost, weeklyHoursSaved, annualSavings } = data;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;
  const now = new Date();
  const dateFormatted = now.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
  const reportCode = `ROI-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;

  // Derived Calculations
  const totalWeeklyManualHours = teamMembers * hoursPerDayManual * 5;
  const totalAnnualManualHours = totalWeeklyManualHours * 48;
  const currentAnnualCost = totalAnnualManualHours * hourlyCost;
  const annualHoursSaved = weeklyHoursSaved * 48;
  const fteEquivalent = (weeklyHoursSaved / 40).toFixed(1);
  const efficiencyPercent = 75; // Standard automation target for routine processes

  // --- 1. HEADER SECTION ---
  // Top header background
  doc.setFillColor(17, 24, 39); // #111827
  doc.rect(0, 0, pageWidth, 40, 'F');

  // Gold accent bar
  doc.setFillColor(250, 204, 21); // #facc15
  doc.rect(0, 40, pageWidth, 2.5, 'F');

  // Brand Name & Subtitle
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('AXEL TORBANTE', margin, 17);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(250, 204, 21);
  doc.text('CONSULTORÍA EN INTELIGENCIA ARTIFICIAL & AUTOMATIZACIÓN DE PROCESOS', margin, 23);

  doc.setTextColor(203, 213, 225);
  doc.setFontSize(8);
  doc.text(`${PERSONAL_DATA.email} | www.axeltorbante.ai`, margin, 29);

  // Document Badge on top-right
  doc.setFillColor(31, 41, 55);
  doc.roundedRect(pageWidth - margin - 52, 10, 52, 20, 2, 2, 'F');
  doc.setTextColor(250, 204, 21);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text('REPORTE EJECUTIVO DE ROI', pageWidth - margin - 50, 16);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.text(`Ref: ${reportCode}`, pageWidth - margin - 50, 21);
  doc.text(`Fecha: ${dateFormatted}`, pageWidth - margin - 50, 26);

  let currentY = 52;

  // --- 2. REPORT TITLE & CLIENT SUMMARY ---
  doc.setTextColor(17, 24, 39);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.text('Estimación de Impacto Financiero y Ahorro Operativo', margin, currentY);

  currentY += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text(
    'Análisis de viabilidad económica para la optimización de flujos repetitivos mediante modelos de IA.',
    margin,
    currentY
  );

  currentY += 9;

  // Client Details Card
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, currentY, contentWidth, 22, 2, 2, 'FD');

  doc.setTextColor(100, 116, 139);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('PREPARADO PARA:', margin + 5, currentY + 7);
  doc.text('EMPRESA / PROYECTO:', margin + 70, currentY + 7);
  doc.text('ESTADO:', margin + 130, currentY + 7);

  doc.setTextColor(17, 24, 39);
  doc.setFontSize(9.5);
  doc.text(user.name || 'Cliente Registrado', margin + 5, currentY + 14);
  doc.text(user.company || 'Organización / Proyecto', margin + 70, currentY + 14);
  doc.setTextColor(16, 185, 129); // Green
  doc.text('Evaluación Preliminar', margin + 130, currentY + 14);

  currentY += 29;

  // --- 3. EXECUTIVE HERO HIGHLIGHTS (2 CARDS) ---
  const cardWidth = (contentWidth - 6) / 2;

  // Card 1: Time Saved
  doc.setFillColor(17, 24, 39);
  doc.roundedRect(margin, currentY, cardWidth, 34, 3, 3, 'F');
  
  doc.setTextColor(250, 204, 21);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('TIEMPO TOTAL LIBERADO', margin + 6, currentY + 8);
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.text(`+${weeklyHoursSaved}h / semana`, margin + 6, currentY + 19);

  doc.setTextColor(148, 163, 184);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text(`Equivalente a ${annualHoursSaved.toLocaleString('es-ES')} horas anuales (~${fteEquivalent} FTEs)`, margin + 6, currentY + 27);

  // Card 2: Annual Cost Savings
  doc.setFillColor(240, 253, 244); // Light Emerald
  doc.setDrawColor(187, 247, 208);
  doc.roundedRect(margin + cardWidth + 6, currentY, cardWidth, 34, 3, 3, 'FD');

  doc.setTextColor(21, 128, 61);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('AHORRO ECONÓMICO ANUAL ESTIMADO', margin + cardWidth + 12, currentY + 8);

  doc.setTextColor(5, 150, 105);
  doc.setFontSize(20);
  doc.text(`${annualSavings.toLocaleString('es-ES')} € / año`, margin + cardWidth + 12, currentY + 19);

  doc.setTextColor(71, 85, 105);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text(`Reducción directa en costes operativos recurrentes`, margin + cardWidth + 12, currentY + 27);

  currentY += 41;

  // --- 4. PARAMETERS & METHODOLOGY BREAKDOWN TABLE ---
  doc.setTextColor(17, 24, 39);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('1. Parámetros del Diagnóstico y Estado Actual', margin, currentY);

  currentY += 5;

  const tableHeaderY = currentY;
  doc.setFillColor(241, 245, 249);
  doc.rect(margin, tableHeaderY, contentWidth, 7, 'F');
  
  doc.setTextColor(71, 85, 105);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('VARIABLE ANALIZADA', margin + 4, tableHeaderY + 5);
  doc.text('VALOR INTRODUCIDO', margin + 105, tableHeaderY + 5);
  doc.text('IMPACTO ANUAL', margin + 145, tableHeaderY + 5);

  currentY += 7;

  const rows = [
    {
      label: 'Tamaño del equipo operativo analizado',
      value: `${teamMembers} personas`,
      impact: `${(teamMembers * 5 * 48 * 8).toLocaleString('es-ES')} h totales`,
    },
    {
      label: 'Dedicación diaria a tareas manuales / repetitivas',
      value: `${hoursPerDayManual} horas / día`,
      impact: `${totalWeeklyManualHours} h / sem del equipo`,
    },
    {
      label: 'Coste horario promedio ponderado',
      value: `${hourlyCost} € / hora`,
      impact: 'Base de cálculo salarial',
    },
    {
      label: 'Gasto operativo actual en tareas rutinarias',
      value: `${(totalWeeklyManualHours * hourlyCost).toLocaleString('es-ES')} € / semana`,
      impact: `${currentAnnualCost.toLocaleString('es-ES')} € / año`,
    },
    {
      label: 'Meta de automatización de procesos con IA (n8n/LLM)',
      value: `${efficiencyPercent}% de absorción`,
      impact: `${annualHoursSaved.toLocaleString('es-ES')} h recuperadas`,
    },
  ];

  rows.forEach((row, idx) => {
    const rowY = currentY;
    if (idx % 2 === 1) {
      doc.setFillColor(248, 250, 252);
      doc.rect(margin, rowY, contentWidth, 7, 'F');
    }
    doc.setDrawColor(241, 245, 249);
    doc.line(margin, rowY + 7, margin + contentWidth, rowY + 7);

    doc.setTextColor(30, 41, 59);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text(row.label, margin + 4, rowY + 5);

    doc.setFont('helvetica', 'bold');
    doc.text(row.value, margin + 105, rowY + 5);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(row.impact, margin + 145, rowY + 5);

    currentY += 7;
  });

  currentY += 8;

  // --- 5. IMPLEMENTATION ROADMAP (HOW TO ACHIEVE THIS) ---
  doc.setTextColor(17, 24, 39);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('2. Hoja de Ruta Recomendada para Materializar el Ahorro', margin, currentY);

  currentY += 6;

  const steps = [
    {
      num: 'Paso 1',
      title: 'Auditoría & Mapeo de Cuellos de Botella (Semana 1):',
      desc: 'Identificación de tareas candidatas (clasificación de correos, sincronización de CRM, extracción de datos de PDFs y atención de primer nivel).',
    },
    {
      num: 'Paso 2',
      title: 'Desarrollo de Flujos & Orquestación de Agentes (Semanas 2-3):',
      desc: 'Configuración de pipelines en n8n conectados con modelos de lenguaje ligeros, prompts estructurados y validaciones humanas en el bucle.',
    },
    {
      num: 'Paso 3',
      title: 'Despliegue Controlado, Métricas de Calidad & Acompañamiento (Semana 4):',
      desc: 'Puesta en marcha supervisada, formación al equipo y monitorización continua de consumo de tokens y retorno de inversión.',
    },
  ];

  steps.forEach((st) => {
    doc.setFillColor(254, 249, 195); // Yellow accent badge
    doc.roundedRect(margin, currentY, 14, 5, 1, 1, 'F');
    doc.setTextColor(113, 63, 18);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.text(st.num, margin + 2.5, currentY + 3.8);

    doc.setTextColor(17, 24, 39);
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    doc.text(st.title, margin + 17, currentY + 4);

    currentY += 6;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    
    const lines = doc.splitTextToSize(st.desc, contentWidth - 4);
    doc.text(lines, margin + 2, currentY);
    currentY += lines.length * 4 + 3;
  });

  // --- 6. CTA / CONTACT BOX AT BOTTOM ---
  currentY = Math.max(currentY + 2, 248);

  doc.setFillColor(17, 24, 39);
  doc.roundedRect(margin, currentY, contentWidth, 24, 2, 2, 'F');

  doc.setTextColor(250, 204, 21);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('¿Siguiente paso para tu empresa?', margin + 6, currentY + 7);

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(
    'Agenda una sesión de consultoría 1:1 de 45 minutos con Axel Torbante para revisar este informe en detalle.',
    margin + 6,
    currentY + 13
  );
  doc.setTextColor(203, 213, 225);
  doc.setFontSize(7.5);
  doc.text(
    `Contacto directo: ${PERSONAL_DATA.email}  |  LinkedIn: Axel Torbante  |  Twitter: @axtorbante`,
    margin + 6,
    currentY + 19
  );

  // --- 7. FOOTER ---
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.text(
    'Documento confidencial generado mediante la Calculadora de ROI de Axel Torbante. Estimaciones basadas en parámetros indicados.',
    margin,
    285
  );
  doc.text('Página 1 de 1', pageWidth - margin - 18, 285);

  // Trigger download
  const filename = `Informe_ROI_${user.name ? user.name.replace(/[^a-zA-Z0-9]/g, '_') : 'Cliente'}_AxelTorbante.pdf`;
  doc.save(filename);
}
