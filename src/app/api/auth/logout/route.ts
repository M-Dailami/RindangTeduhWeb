import { NextResponse } from "next/server";
import { logStaffLogout } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const ipAddress =
      request.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const userAgent = request.headers.get("user-agent") || "Browser";

    const sessionCookie = request.headers.get("cookie");
    let userName = "Staf";
    let userRole = "STAFF";

    if (sessionCookie && sessionCookie.includes("rt_session=")) {
      try {
        const raw = sessionCookie
          .split("rt_session=")[1]
          .split(";")[0];
        const parsed = JSON.parse(decodeURIComponent(raw));
        if (parsed?.user) {
          userName = parsed.user.fullName;
          userRole = parsed.user.role;
        }
      } catch {
        // ignore parse error
      }
    }

    await logStaffLogout(userName, userRole, ipAddress, userAgent);

    const response = NextResponse.json({
      success: true,
      message: "Berhasil keluar dari sesi.",
    });

    response.cookies.set({
      name: "rt_session",
      value: "",
      maxAge: 0,
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Gagal memproses logout." },
      { status: 500 }
    );
  }
}
