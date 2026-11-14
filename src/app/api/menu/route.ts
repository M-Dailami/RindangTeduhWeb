import { NextResponse } from "next/server";
import { getMenuItems, saveMenuItem, deleteMenuItem } from "@/lib/db";

export async function GET() {
  try {
    const items = await getMenuItems();
    return NextResponse.json({ success: true, data: items });
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal memuat item menu." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const actorName = request.headers.get("x-actor-name") || "Admin";
    const actorRole = request.headers.get("x-actor-role") || "MANAGEMENT";
    const ipAddress =
      request.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const userAgent = request.headers.get("user-agent") || "Browser";

    if (!body.name || !body.categoryId || body.price === undefined) {
      return NextResponse.json(
        { success: false, error: "Nama, kategori, dan harga wajib diisi." },
        { status: 400 }
      );
    }

    const saved = await saveMenuItem(
      body,
      actorName,
      actorRole,
      ipAddress,
      userAgent
    );
    return NextResponse.json({ success: true, data: saved });
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal menyimpan menu item." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const actorName = request.headers.get("x-actor-name") || "Admin";
    const actorRole = request.headers.get("x-actor-role") || "MANAGEMENT";
    const ipAddress =
      request.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const userAgent = request.headers.get("user-agent") || "Browser";

    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID menu item diperlukan." },
        { status: 400 }
      );
    }

    const success = await deleteMenuItem(
      id,
      actorName,
      actorRole,
      ipAddress,
      userAgent
    );
    return NextResponse.json({ success });
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal menghapus menu item." },
      { status: 500 }
    );
  }
}
