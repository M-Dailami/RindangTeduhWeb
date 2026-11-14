import { NextResponse } from "next/server";
import { getReservationRules, updateReservationRules } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rules = await getReservationRules();
    return NextResponse.json({ success: true, data: rules });
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal memuat aturan reservasi." },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const actorName = request.headers.get("x-actor-name") || "Owner";
    const actorRole = request.headers.get("x-actor-role") || "OWNER";
    const ipAddress =
      request.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const userAgent = request.headers.get("user-agent") || "Browser";

    const updated = await updateReservationRules(
      body,
      actorName,
      actorRole,
      ipAddress,
      userAgent
    );
    return NextResponse.json({ success: true, data: updated });
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal memperbarui aturan reservasi." },
      { status: 500 }
    );
  }
}
