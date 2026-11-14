import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminClient } from "./AdminClient";
import {
  getCafeSettings,
  getCategories,
  getMenuItems,
  getReservationRules,
  getReservations,
  getActivityLogs,
} from "@/lib/db";
import { AuthSession } from "@/types";

export const revalidate = 0;

export const metadata = {
  title: "Panel CMS Admin - Rindang Teduh Warkop",
  description:
    "Dashboard pengelola internal untuk manajemen menu, pemrosesan reservasi, dan aturan dinamis.",
};

export default async function AdminPage() {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get("rt_session");

  let session: AuthSession | null = null;
  if (sessionCookie?.value) {
    try {
      session = JSON.parse(decodeURIComponent(sessionCookie.value));
      if (!session || !session.expiresAt || Date.now() > session.expiresAt) {
        session = null;
      }
    } catch {
      session = null;
    }
  }

  if (!session) {
    redirect("/admin/login");
  }

  const [settings, categories, items, rules, reservations, logs] =
    await Promise.all([
      getCafeSettings(),
      getCategories(),
      getMenuItems(),
      getReservationRules(),
      getReservations(),
      getActivityLogs(),
    ]);

  return (
    <AdminClient
      session={session}
      initialSettings={settings}
      initialCategories={categories}
      initialItems={items}
      initialRules={rules}
      initialReservations={reservations}
      initialLogs={logs}
    />
  );
}
