import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rindang Teduh Warkop - Profil Kafe, Menu Digital & Reservasi",
  description:
    "Nikmati seduhan kopi lokal, kudapan hangat, dan semilir angin di bawah naungan rindang Politeknik Negeri Media Kreatif Jakarta Selatan.",
  keywords: [
    "Rindang Teduh",
    "Warkop Polimedia",
    "Kopi Jagakarsa",
    "Menu Digital NFC QR",
    "Reservasi Kafe Jakarta",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${playfair.variable} ${plusJakarta.variable}`}>
      <body className="font-sans antialiased bg-forest-night text-warm-cream selection:bg-moss selection:text-paper">
        {children}
      </body>
    </html>
  );
}
