import { NextResponse } from "next/server";
import {
  getReservations,
  createReservation,
  updateReservationStatus,
} from "@/lib/db";
import { ReservationStatus } from "@/types";

export async function GET() {
  try {
    const reservations = await getReservations();
    return NextResponse.json({ success: true, data: reservations });
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal memuat data reservasi." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const ipAddress =
      request.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const userAgent = request.headers.get("user-agent") || "Visitor";

    if (
      !body.customerName ||
      !body.customerPhone ||
      !body.bookingDate ||
      !body.bookingTime ||
      !body.durationHours ||
      !body.guestCount ||
      !body.privacyConsent
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Mohon lengkapi seluruh kolom formulir dan centang persetujuan privasi.",
        },
        { status: 400 }
      );
    }

    const created = await createReservation(
      {
        customerName: body.customerName,
        customerPhone: body.customerPhone,
        bookingDate: body.bookingDate,
        bookingTime: body.bookingTime,
        durationHours: Number(body.durationHours),
        guestCount: Number(body.guestCount),
        customerNotes: body.customerNotes,
        privacyConsent: Boolean(body.privacyConsent),
      },
      ipAddress,
      userAgent
    );

    return NextResponse.json({ success: true, data: created });
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal menyimpan pengajuan reservasi." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const actorName = request.headers.get("x-actor-name") || "Admin";
    const actorRole = request.headers.get("x-actor-role") || "MANAGEMENT";
    const ipAddress =
      request.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const userAgent = request.headers.get("user-agent") || "Browser";

    if (!body.id || !body.status) {
      return NextResponse.json(
        { success: false, error: "ID dan status reservasi wajib disertakan." },
        { status: 400 }
      );
    }

    const updated = await updateReservationStatus(
      body.id,
      body.status as ReservationStatus,
      actorName,
      actorRole,
      ipAddress,
      userAgent
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Reservasi tidak ditemukan." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal memperbarui status reservasi." },
      { status: 500 }
    );
  }
}
