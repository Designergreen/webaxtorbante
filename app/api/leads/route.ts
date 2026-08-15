import { NextRequest, NextResponse } from 'next/server';
import { getLeads, addLead, updateLeadStatus, deleteLead } from '@/lib/db';

export async function GET() {
  try {
    const leads = await getLeads();
    return NextResponse.json({ success: true, leads });
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      { success: false, error: 'Error al recuperar leads' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message, service, company } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Nombre, email y mensaje son campos obligatorios.' },
        { status: 400 }
      );
    }

    // Email basic validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Por favor, introduce un correo electrónico válido.' },
        { status: 400 }
      );
    }

    const lead = await addLead({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      service: service || 'Consultoría en IA',
      company: company ? company.trim() : undefined,
      status: 'nuevo',
    });

    return NextResponse.json({ success: true, lead }, { status: 201 });
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json(
      { success: false, error: 'No se pudo registrar la solicitud' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status, notes } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: 'ID y estado son requeridos' },
        { status: 400 }
      );
    }

    const updated = await updateLeadStatus(id, status, notes);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Lead no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, lead: updated });
  } catch (error) {
    console.error('Error updating lead:', error);
    return NextResponse.json(
      { success: false, error: 'Error al actualizar el lead' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID es requerido' },
        { status: 400 }
      );
    }

    const deleted = await deleteLead(id);
    return NextResponse.json({ success: deleted });
  } catch (error) {
    console.error('Error deleting lead:', error);
    return NextResponse.json(
      { success: false, error: 'Error al eliminar el lead' },
      { status: 500 }
    );
  }
}
