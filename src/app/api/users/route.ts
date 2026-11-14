import { NextResponse } from "next/server";
import { getUsers } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const users = await getUsers();
    return NextResponse.json({ success: true, data: users });
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal memuat pengguna staf." },
      { status: 500 }
    );
  }
}
