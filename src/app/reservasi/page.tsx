import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ReservationClient } from "./ReservationClient";
import { getReservationRules, getCafeSettings } from "@/lib/db";

// On-Demand ISR: Cached at edge and refreshed on-demand when rules change
export const revalidate = 3600;

export const metadata = {
  title: "Kalkulator & Pengajuan Reservasi - Rindang Teduh Warkop",
  description:
    "Simulasikan biaya reservasi ruang kafe untuk rapat, diskusi, workshop, atau gathering komunitas secara transparan.",
};

export default async function ReservationPage() {
  const [rules, settings] = await Promise.all([
    getReservationRules(),
    getCafeSettings(),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-forest-night text-warm-cream">
      <Navbar />
      <main className="flex-1">
        <ReservationClient
          rules={rules}
          instagramUrl={settings.instagramUrl}
        />
      </main>
      <Footer />
    </div>
  );
}
