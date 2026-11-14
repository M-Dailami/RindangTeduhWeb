import { NextResponse } from "next/server";
import { getCafeSettings, updateCafeSettings } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const settings = await getCafeSettings();
    return NextResponse.json({ success: true, data: settings });
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal memuat pengaturan cafe." },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const actorName = request.headers.get("x-actor-name") || "Admin";
    const actorRole = request.headers.get("x-actor-role") || "MANAGEMENT";
    const ipAddress =
      request.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const userAgent = request.headers.get("user-agent") || "Browser";

    const updated = await updateCafeSettings(
      body,
      actorName,
      actorRole,
      ipAddress,
      userAgent
    );
    return NextResponse.json({ success: true, data: updated });
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal memperbarui pengaturan cafe." },
      { status: 500 }
    );
  }
}
