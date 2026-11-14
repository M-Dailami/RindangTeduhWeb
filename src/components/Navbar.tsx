"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "PROFIL CAFE", href: "/" },
    { label: "DAFTAR MENU", href: "/menu" },
    { label: "KALKULATOR RESERVASI", href: "/reservasi" },
    { label: "LOKASI", href: "/#lokasi" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false;
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-forest-night/95 backdrop-blur-md border-b border-canopy/80 text-warm-cream transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Identity */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus-visible:ring-2 focus-visible:ring-matcha-mist rounded-sm p-1"
            aria-label="Rindang Teduh Warkop - Beranda"
          >
            <div className="w-10 h-10 rounded-full bg-deep-forest border border-moss/60 flex items-center justify-center text-matcha-mist shadow-inner group-hover:border-matcha-mist transition-colors">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 2L8 8h3v5H8l4 6 4-6h-3V8h3L12 2z" />
                <path d="M12 19v3" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-serif tracking-widest text-base sm:text-lg font-bold text-warm-cream uppercase leading-tight group-hover:text-matcha-mist transition-colors">
                Rindang Teduh
              </span>
              <span className="text-[10px] tracking-widest text-moss uppercase font-medium">
                Warkop & Ruang Temu
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center space-x-8"
            aria-label="Navigasi Utama"
          >
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs uppercase tracking-wider font-medium transition-colors py-2 relative focus-visible:ring-1 focus-visible:ring-matcha-mist rounded-sm ${
                    active
                      ? "text-matcha-mist font-semibold"
                      : "text-warm-cream/80 hover:text-warm-cream"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-matcha-mist rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Action Button */}
          <div className="hidden md:flex items-center">
            <Link
              href="/reservasi"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wider uppercase rounded-md border border-moss/70 text-warm-cream hover:bg-deep-forest hover:border-matcha-mist hover:text-paper transition-all focus-visible:ring-2 focus-visible:ring-matcha-mist"
            >
              <span>Booking Tempat</span>
              <ArrowRight className="w-3.5 h-3.5 text-matcha-mist" aria-hidden="true" />
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-warm-cream hover:text-matcha-mist rounded-md hover:bg-canopy focus-visible:ring-2 focus-visible:ring-matcha-mist min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Tutup navigasi" : "Buka navigasi"}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-canopy bg-forest-night px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2" aria-label="Navigasi Mobile">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2.5 text-sm uppercase tracking-wider rounded-md font-medium transition-colors ${
                    active
                      ? "bg-canopy text-matcha-mist font-semibold border-l-2 border-matcha-mist"
                      : "text-warm-cream hover:bg-canopy/60"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="pt-2">
            <Link
              href="/reservasi"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold tracking-wider uppercase rounded-md bg-deep-forest border border-moss/80 text-warm-cream hover:bg-deep-forest/80 min-h-[44px]"
            >
              <span>Booking Tempat</span>
              <ArrowRight className="w-4 h-4 text-matcha-mist" aria-hidden="true" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
