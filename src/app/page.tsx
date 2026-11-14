import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getCafeSettings, getMenuItems, getReservationRules } from "@/lib/db";
import { ArrowRight, Coffee, Wifi, MapPin, Clock, Calendar, CheckCircle, ExternalLink } from "lucide-react";

// On-Demand ISR: Cached at the edge and purged on-demand when CMS saves
export const revalidate = 3600;

export default async function HomePage() {
  const [settings, menuItems, rules] = await Promise.all([
    getCafeSettings(),
    getMenuItems(),
    getReservationRules(),
  ]);

  const featuredItems = menuItems.filter((i) => i.isFeatured).slice(0, 3);
  // fallback if fewer than 3 featured
  const displayItems =
    featuredItems.length >= 3
      ? featuredItems
      : menuItems.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-forest-night text-warm-cream">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-12 pb-20 md:py-24 border-b border-canopy">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Narrative & CTA */}
              <div className="lg:col-span-7 space-y-6">
                <span className="text-xs uppercase tracking-widest text-moss font-semibold block">
                  {settings.tagline ? settings.cafeName.toUpperCase() : "RINDANG TEDUH WARKOP"}
                </span>

                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-warm-cream leading-[1.15]">
                  {settings.tagline.includes(",") ? (
                    <>
                      {settings.tagline.split(",")[0]},
                      <br />
                      <span className="text-matcha-mist">{settings.tagline.split(",")[1]}</span>
                    </>
                  ) : (
                    settings.tagline
                  )}
                </h1>

                <p className="text-base sm:text-lg text-warm-cream/80 max-w-xl leading-relaxed font-normal">
                  Menikmati seduhan kopi lokal, kudapan hangat, dan semilir angin di bawah
                  rindangnya pepohonan Politeknik Negeri Media Kreatif. Ruang temu terbuka untuk
                  inspirasi, komunitas, dan jeda sejenak.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                  <Link
                    href="/menu"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold tracking-wider uppercase rounded-md bg-deep-forest border border-moss/80 text-warm-cream hover:bg-moss hover:text-forest-night transition-all min-h-[44px] focus-visible:ring-2 focus-visible:ring-matcha-mist"
                  >
                    <span>Lihat Menu Digital</span>
                    <ArrowRight className="w-4 h-4 text-matcha-mist" aria-hidden="true" />
                  </Link>

                  <Link
                    href="/reservasi"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold tracking-wider uppercase rounded-md border border-moss/50 text-warm-cream/90 hover:bg-canopy hover:border-matcha-mist hover:text-warm-cream transition-all min-h-[44px] focus-visible:ring-2 focus-visible:ring-matcha-mist"
                  >
                    <span>Hitung Estimasi Reservasi</span>
                    <ArrowRight className="w-4 h-4 text-moss" aria-hidden="true" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Hero Visual Container (Matching Reference) */}
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden border border-moss/40 bg-canopy shadow-2xl">
                  {/* Hero Image */}
                  <div className="relative aspect-[4/3] w-full bg-deep-forest overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop"
                      alt="Suasana Teduh di Kafe Rindang Teduh Warkop"
                      width={1200}
                      height={900}
                      fetchPriority="high"
                      className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-canopy via-transparent to-transparent opacity-80" />
                  </div>

                  {/* Caption Card at Bottom */}
                  <div className="p-5 bg-canopy border-t border-moss/20">
                    <h2 className="text-sm font-serif font-bold text-warm-cream tracking-wide">
                      {settings.heroCaptionTitle}
                    </h2>
                    <p className="text-xs text-warm-cream/70 mt-1 leading-relaxed">
                      {settings.heroCaptionDesc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CERITA RUANG SECTION */}
        <section className="py-20 bg-forest-night border-b border-canopy">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Story & Badges */}
              <div className="lg:col-span-7 space-y-6">
                <span className="text-xs uppercase tracking-widest text-moss font-semibold block">
                  CERITA RUANG
                </span>

                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-warm-cream leading-snug">
                  {settings.storyTitle}
                </h2>

                <p className="text-sm sm:text-base text-warm-cream/80 leading-relaxed max-w-xl">
                  {settings.storyText}
                </p>

                {/* Feature Pills */}
                <div className="flex flex-wrap gap-2.5 pt-2">
                  {settings.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-canopy border border-moss/40 text-warm-cream/90"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Feature Cards */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-6 rounded-xl bg-canopy border border-moss/30 space-y-2.5">
                  <div className="w-10 h-10 rounded-lg bg-deep-forest flex items-center justify-center text-matcha-mist">
                    <Coffee className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-serif font-bold text-warm-cream">
                    Racikan Kopi Otentik
                  </h3>
                  <p className="text-xs sm:text-sm text-warm-cream/75 leading-relaxed">
                    Biji kopi pilihan Nusantara diseduh dengan resep khas warkop modern, menghadirkan
                    kehangatan rasa yang konsisten.
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-canopy border border-moss/30 space-y-2.5">
                  <div className="w-10 h-10 rounded-lg bg-deep-forest flex items-center justify-center text-matcha-mist">
                    <Wifi className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-serif font-bold text-warm-cream">
                    Koneksi & Meja Luas
                  </h3>
                  <p className="text-xs sm:text-sm text-warm-cream/75 leading-relaxed">
                    Didukung colokan listrik di setiap sudut dan Wi-Fi stabil untuk kerja kelompok,
                    tugas akhir, atau temu komunitas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SAJIAN PILIHAN HARI INI (WARM CREAM SECTION) */}
        <section className="py-20 bg-warm-cream text-ink">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
              <span className="text-xs uppercase tracking-widest text-muted-ink font-semibold">
                KATALOG RASA
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ink">
                Sajian Pilihan Hari Ini
              </h2>
              <p className="text-xs sm:text-sm text-muted-ink">
                Rekomendasi racikan kopi dan kudapan favorit pelanggan di Rindang Teduh.
              </p>
            </div>

            {/* Menu Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {displayItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-paper rounded-xl overflow-hidden border border-[#DDD6C6] shadow-sm hover:shadow-md transition-shadow flex flex-col"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] w-full bg-[#EAE5D9] overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      width={600}
                      height={450}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    {item.badge && (
                      <span className="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-deep-forest text-matcha-mist">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <span className="text-[10px] tracking-wider uppercase font-semibold text-muted-ink block">
                        [ REKOMENDASI ]
                      </span>
                      <h3 className="font-serif text-lg font-bold text-ink mt-1">
                        {item.name}
                      </h3>
                      <p className="text-xs text-muted-ink mt-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#EAE5D9] flex items-center justify-between">
                      <span className="text-base font-bold text-ink font-mono">
                        Rp {item.price.toLocaleString("id-ID")}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                          item.isAvailable ? "text-green-700" : "text-red-700"
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            item.isAvailable ? "bg-green-600" : "bg-red-600"
                          }`}
                        />
                        {item.isAvailable ? "Tersedia" : "Habis"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Button to Full Menu */}
            <div className="mt-12 text-center">
              <Link
                href="/menu"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-semibold tracking-wider uppercase rounded-md bg-forest-night text-warm-cream hover:bg-deep-forest transition-colors min-h-[44px] focus-visible:ring-2 focus-visible:ring-forest-night"
              >
                <span>Lihat Seluruh Menu Digital</span>
                <ArrowRight className="w-4 h-4 text-matcha-mist" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* SIMULASI & BOOKING RUANG SECTION */}
        <section className="py-20 bg-forest-night border-b border-canopy">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column */}
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs uppercase tracking-widest text-moss font-semibold block">
                  SIMULASI & BOOKING RUANG
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-warm-cream leading-snug">
                  Rencanakan Acara Komunitas & Kumpul Bersama
                </h2>
                <p className="text-sm sm:text-base text-warm-cream/80 leading-relaxed max-w-xl">
                  Menerima reservasi rapat, diskusi buku, workshop kreatif, atau gathering hingga{" "}
                  {rules.maxGuests} orang. Gunakan kalkulator interaktif untuk mendapatkan simulasi
                  biaya transparan secara instan.
                </p>
              </div>

              {/* Right Column: Teaser Card */}
              <div className="lg:col-span-5">
                <div className="p-8 rounded-2xl bg-canopy border border-moss/40 space-y-5">
                  <span className="text-xs uppercase tracking-wider text-moss font-semibold block">
                    TARIF RESERVASI TERJANGKAU
                  </span>

                  <div>
                    <span className="text-sm text-warm-cream/70 block">Mulai</span>
                    <span className="font-mono text-3xl font-bold text-warm-cream">
                      Rp {rules.pricePerPerson.toLocaleString("id-ID")}
                    </span>
                    <span className="text-sm text-warm-cream/70 ml-2">/ orang</span>
                  </div>

                  <p className="text-xs text-warm-cream/75 leading-relaxed">
                    Termasuk pilihan minuman, area khusus di bawah kanopi rindang, dan fasilitas
                    sound system standar warkop.
                  </p>

                  <Link
                    href="/reservasi"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold tracking-wider uppercase rounded-md bg-deep-forest border border-moss/60 text-warm-cream hover:bg-moss hover:text-forest-night transition-colors min-h-[44px]"
                  >
                    <span>Buka Kalkulator Reservasi</span>
                    <ArrowRight className="w-4 h-4 text-matcha-mist" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LOKASI & WAKTU SECTION */}
        <section id="lokasi" className="py-20 bg-forest-night">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div>
              <span className="text-xs uppercase tracking-widest text-moss font-semibold block">
                LOKASI & WAKTU
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-warm-cream mt-2">
                Temukan Kami di Bawah Naungan Rindang
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
              {/* Left Column: Details */}
              <div className="lg:col-span-6 bg-canopy p-8 rounded-2xl border border-moss/30 flex flex-col justify-between space-y-8">
                <div className="space-y-6">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-moss font-semibold block mb-2">
                      ALAMAT KAFE
                    </span>
                    <p className="text-sm text-warm-cream/90 leading-relaxed">
                      {settings.address}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-moss/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs uppercase tracking-wider text-moss font-semibold block">
                        JAM OPERASIONAL
                      </span>
                      {settings.operatingHours.isOpenToday && (
                        <span className="inline-flex items-center gap-1.5 text-xs text-green-400 font-medium">
                          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                          HARI INI BUKA
                        </span>
                      )}
                    </div>
                    <ul className="text-xs sm:text-sm text-warm-cream/80 space-y-1 font-mono">
                      <li>Senin - Jumat : {settings.operatingHours.weekday}</li>
                      <li>Sabtu - Minggu : {settings.operatingHours.weekend}</li>
                    </ul>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-4 border-t border-moss/20">
                  <a
                    href={settings.mapsLinkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wider uppercase rounded-md bg-deep-forest border border-moss/60 text-warm-cream hover:bg-moss hover:text-forest-night transition-colors min-h-[44px]"
                  >
                    <span>Buka Google Maps</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>

                  <a
                    href={settings.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wider uppercase rounded-md border border-moss/40 text-warm-cream/90 hover:bg-canopy hover:border-matcha-mist transition-colors min-h-[44px]"
                  >
                    <span>Instagram @rindangteduh_</span>
                    <ExternalLink className="w-3.5 h-3.5 text-moss" aria-hidden="true" />
                  </a>
                </div>
              </div>

              {/* Right Column: Map Embed / Box */}
              <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-moss/30 bg-canopy relative min-h-[300px] flex items-center justify-center">
                <div className="text-center p-8 space-y-3">
                  <div className="w-14 h-14 rounded-full bg-deep-forest border border-moss flex items-center justify-center text-matcha-mist mx-auto">
                    <MapPin className="w-7 h-7" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-warm-cream">
                    {settings.cafeName}
                  </h3>
                  <p className="text-xs text-warm-cream/70 max-w-sm">
                    Kawasan Kampus Politeknik Negeri Media Kreatif, Srengseng Sawah, Jagakarsa.
                  </p>
                  <a
                    href={settings.mapsLinkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs text-matcha-mist hover:underline font-semibold pt-2"
                  >
                    <span>Petunjuk Arah Menuju Lokasi</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
