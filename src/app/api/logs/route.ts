import { NextResponse } from "next/server";
import { getActivityLogs } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const logs = await getActivityLogs();
    return NextResponse.json({ success: true, data: logs });
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal memuat log aktivitas." },
      { status: 500 }
    );
  }
}
