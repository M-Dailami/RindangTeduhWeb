import React from "react";
import Link from "next/link";
import { Coffee, Lock } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#080F0C] border-t border-canopy text-warm-cream/80 py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Brand & Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-deep-forest border border-moss/60 flex items-center justify-center text-matcha-mist">
                <Coffee className="w-4 h-4" aria-hidden="true" />
              </div>
              <div>
                <span className="font-serif tracking-widest text-lg font-bold text-warm-cream uppercase block">
                  Rindang Teduh Warkop
                </span>
                <span className="text-xs text-moss tracking-wider uppercase">
                  Politeknik Negeri Media Kreatif
                </span>
              </div>
            </div>

            <p className="text-sm text-warm-cream/70 max-w-md leading-relaxed">
              Teduh Bernaung, Hangat Berbincang di Jakarta Selatan. Ruang temu
              terbuka untuk mahasiswa, pekerja kreatif, dan penikmat kopi lokal.
            </p>

            <p className="text-xs text-warm-cream/50 pt-2">
              (c) 2026 Rindang Teduh Warkop. Seluruh hak cipta dilindungi.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:text-right space-y-3">
            <h2 className="text-xs uppercase tracking-widest text-matcha-mist font-semibold">
              Tautan Navigasi
            </h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="hover:text-matcha-mist transition-colors inline-block py-1"
                >
                  Profil Kafe (/)
                </Link>
              </li>
              <li>
                <Link
                  href="/menu"
                  className="hover:text-matcha-mist transition-colors inline-block py-1"
                >
                  Daftar Menu Digital (/menu)
                </Link>
              </li>
              <li>
                <Link
                  href="/reservasi"
                  className="hover:text-matcha-mist transition-colors inline-block py-1"
                >
                  Kalkulator Reservasi (/reservasi)
                </Link>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/rindangteduh_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-matcha-mist transition-colors inline-flex items-center gap-1.5 py-1"
                >
                  <svg
                    className="w-3.5 h-3.5 text-matcha-mist"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                  <span>Instagram @rindangteduh_</span>
                </a>
              </li>
              <li>
                <Link
                  href="/admin/login"
                  className="text-moss/60 hover:text-matcha-mist transition-colors inline-flex items-center gap-1.5 py-1 text-xs"
                >
                  <Lock className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Portal Staf (/admin/login)</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
