import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const cookieHeader = request.headers.get("cookie");

  if (!cookieHeader || !cookieHeader.includes("rt_session=")) {
    return NextResponse.json(
      { success: false, error: "Tidak ada sesi aktif." },
      { status: 401 }
    );
  }

  try {
    const raw = cookieHeader
      .split("rt_session=")[1]
      .split(";")[0];
    const session = JSON.parse(decodeURIComponent(raw));

    if (Date.now() > session.expiresAt) {
      const expiredResponse = NextResponse.json(
        { success: false, error: "Sesi telah berakhir karena 30 menit tidak aktif." },
        { status: 401 }
      );
      expiredResponse.cookies.set({
        name: "rt_session",
        value: "",
        maxAge: 0,
        path: "/",
      });
      return expiredResponse;
    }

    return NextResponse.json({ success: true, data: session });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Sesi tidak valid." },
      { status: 401 }
    );
  }
}
