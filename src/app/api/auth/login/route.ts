import { NextResponse } from "next/server";
import { authenticateStaff } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email dan kata sandi wajib diisi." },
        { status: 400 }
      );
    }

    const ipAddress =
      request.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const userAgent = request.headers.get("user-agent") || "Browser";

    const result = await authenticateStaff(email, password, ipAddress, userAgent);

    if (!result.success || !result.session) {
      return NextResponse.json(
        { success: false, error: result.error || "Autentikasi gagal." },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      data: result.session,
    });

    // Set HTTP-only session cookie expiring in 30 minutes (PRD-F-13)
    response.cookies.set({
      name: "rt_session",
      value: JSON.stringify(result.session),
      httpOnly: false, // Accessible to client-side session listener
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 60, // 30 minutes
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan server saat login." },
      { status: 500 }
    );
  }
}
