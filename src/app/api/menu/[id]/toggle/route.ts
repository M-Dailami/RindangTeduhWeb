import { NextResponse } from "next/server";
import { toggleMenuItemStock } from "@/lib/db";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const actorName = request.headers.get("x-actor-name") || "Kasir";
    const actorRole = request.headers.get("x-actor-role") || "CASHIER";
    const ipAddress =
      request.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const userAgent = request.headers.get("user-agent") || "Browser";

    const updated = await toggleMenuItemStock(
      params.id,
      actorName,
      actorRole,
      ipAddress,
      userAgent
    );
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Menu tidak ditemukan." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal mengubah ketersediaan menu." },
      { status: 500 }
    );
  }
}
