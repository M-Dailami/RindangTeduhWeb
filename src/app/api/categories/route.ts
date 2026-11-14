import { NextResponse } from "next/server";
import { getCategories, saveCategory, deleteCategory } from "@/lib/db";

export async function GET() {
  try {
    const categories = await getCategories();
    return NextResponse.json({ success: true, data: categories });
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal memuat kategori menu." },
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

    if (!body.name) {
      return NextResponse.json(
        { success: false, error: "Nama kategori wajib diisi." },
        { status: 400 }
      );
    }

    const saved = await saveCategory(
      body,
      actorName,
      actorRole,
      ipAddress,
      userAgent
    );
    return NextResponse.json({ success: true, data: saved });
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal menyimpan kategori menu." },
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
        { success: false, error: "ID kategori diperlukan." },
        { status: 400 }
      );
    }

    const success = await deleteCategory(
      id,
      actorName,
      actorRole,
      ipAddress,
      userAgent
    );
    return NextResponse.json({ success });
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal menghapus kategori." },
      { status: 500 }
    );
  }
}
