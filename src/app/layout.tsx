import type { Metadata, Viewport } from "next";
import "./globals.css";

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
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-forest-night text-warm-cream selection:bg-moss selection:text-paper">
        {children}
      </body>
    </html>
  );
}
