import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MenuClient } from "./MenuClient";
import { getCategories, getMenuItems } from "@/lib/db";

// On-Demand ISR: Cached at edge and refreshed instantaneously when stock/menu updates
export const revalidate = 3600;

export const metadata = {
  title: "Daftar Menu Digital - Rindang Teduh Warkop (NFC & QR Code)",
  description:
    "Katalog menu resmi meja NFC & QR Code Rindang Teduh Warkop. Espresso robusta, matcha latte, indomie warkop, roti bakar, dan kudapan khas.",
};

export default async function MenuPage() {
  const [categories, items] = await Promise.all([
    getCategories(),
    getMenuItems(),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-forest-night text-warm-cream">
      <Navbar />
      <main className="flex-1">
        <MenuClient initialCategories={categories} initialItems={items} />
      </main>
      <Footer />
    </div>
  );
}
