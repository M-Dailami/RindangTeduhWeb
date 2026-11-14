"use client";

import React, { useState } from "react";
import { ReservationRules, Reservation } from "@/types";
import {
  Calendar,
  Clock,
  Users,
  CheckCircle,
  AlertTriangle,
  Copy,
  Check,
  ExternalLink,
  Info,
  ShieldCheck,
  Send,
} from "lucide-react";

interface ReservationClientProps {
  rules: ReservationRules;
  instagramUrl: string;
}

export function ReservationClient({
  rules,
  instagramUrl,
}: ReservationClientProps) {
  // Form states
  const todayStr = new Date().toISOString().split("T")[0];
  const [bookingDate, setBookingDate] = useState<string>(todayStr);
  const [bookingTime, setBookingTime] = useState<string>(
    rules.availableTimeSlots[1] || rules.availableTimeSlots[0] || "14:00 WIB"
  );
  const [durationHours, setDurationHours] = useState<number>(
    rules.availableDurations[1] || rules.availableDurations[0] || 3
  );
  const [guestCount, setGuestCount] = useState<number>(30);
  const [customerName, setCustomerName] = useState<string>("Ahmad Rizky (Komunitas Sastra)");
  const [customerPhone, setCustomerPhone] = useState<string>("+62 812-3456-7890");
  const [customerNotes, setCustomerNotes] = useState<string>(
    "Perlu 2 colokan listrik tambahan dan proyektor portable untuk presentasi."
  );
  const [privacyConsent, setPrivacyConsent] = useState<boolean>(true);

  // Submission & feedback states
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submittedReservation, setSubmittedReservation] = useState<Reservation | null>(null);
  const [copiedText, setCopiedText] = useState<boolean>(false);

  // Calculation
  const priceFromGuests = guestCount * rules.pricePerPerson;
  const priceFromDuration = durationHours * rules.pricePerHour;
  const totalEstimatedPrice = priceFromGuests + priceFromDuration + rules.baseFee;

  // Validation
  const isBelowMin = guestCount < rules.minGuests;
  const isOverMax = guestCount > rules.maxGuests;
  const isStrictBlocked = isOverMax && rules.overCapacityMode === "STRICT";

  const handleIncrement = () => {
    if (isStrictBlocked) return;
    setGuestCount((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (guestCount > 1) {
      setGuestCount((prev) => prev - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!rules.isBookingOpen) {
      setErrorMsg("Mohon maaf, pemesanan reservasi saat ini sedang ditutup sementara.");
      return;
    }

    if (isStrictBlocked) {
      setErrorMsg(
        `Kapasitas maksimal reservasi adalah ${rules.maxGuests} orang. Mohon sesuaikan jumlah peserta.`
      );
      return;
    }

    if (isBelowMin) {
      setErrorMsg(
        `Batas minimal reservasi adalah ${rules.minGuests} orang.`
      );
      return;
    }

    if (!customerName.trim() || !customerPhone.trim()) {
      setErrorMsg("Nama pemesan dan nomor WhatsApp aktif wajib diisi.");
      return;
    }

    if (!privacyConsent) {
      setErrorMsg("Harap setujui persetujuan pelindungan data pribadi.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          customerPhone,
          bookingDate,
          bookingTime,
          durationHours,
          guestCount,
          customerNotes,
          privacyConsent,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Gagal mengirim pengajuan reservasi.");
      }

      setSubmittedReservation(json.data);
    } catch (err: any) {
      setErrorMsg(err.message || "Terjadi kendala saat menghubungi server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getConfirmationMessage = (res: Reservation) => {
    return `Halo Admin Rindang Teduh, saya ingin konfirmasi reservasi ruangan kafe:
Kode Booking: ${res.bookingCode}
Nama Pemesan: ${res.customerName}
Jadwal: ${res.bookingDate} (${res.bookingTime})
Durasi: ${res.durationHours} Jam
Jumlah Tamu: ${res.guestCount} Orang
Estimasi Biaya: Rp ${res.estimatedPrice.toLocaleString("id-ID")}
Catatan: ${res.customerNotes || "-"}

Mohon dicek ketersediaan jadwalnya. Terima kasih!`;
  };

  const handleCopyText = () => {
    if (!submittedReservation) return;
    const text = getConfirmationMessage(submittedReservation);
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 3000);
  };

  return (
    <div className="space-y-0">
      {/* HEADER SECTION (DARK EDITORIAL) */}
      <section className="bg-forest-night border-b border-canopy py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
          <span className="text-xs uppercase tracking-widest text-moss font-semibold block">
            SIMULASI & BOOKING RUANG KAFE
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-warm-cream">
            Kalkulator Estimasi Biaya Reservasi
          </h1>
          <p className="text-xs sm:text-sm text-warm-cream/75 max-w-xl">
            Hitung biaya acara komunitas, kumpul keluarga, atau rapat kerja Anda secara transparan.
          </p>
        </div>
      </section>

      {/* MAIN TWO-COLUMN SECTION (WARM CREAM SURFACE) */}
      <section className="bg-warm-cream text-ink py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT COLUMN: INFORMASI & KETENTUAN (DARK CARD) */}
            <div className="lg:col-span-5 bg-canopy text-warm-cream p-6 sm:p-8 rounded-2xl border border-moss/40 shadow-md space-y-6">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-warm-cream border-b border-moss/30 pb-4">
                Informasi & Ketentuan Acara
              </h2>

              {/* Box 1: Kapasitas Tempat Duduk */}
              <div className="p-4 rounded-xl bg-forest-night/80 border border-moss/30 space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-moss font-semibold block">
                  KAPASITAS TEMPAT DUDUK
                </span>
                <p className="font-mono text-sm sm:text-base font-bold text-warm-cream">
                  Min. {rules.minGuests} Orang - Maks. {rules.maxGuests} Orang
                </p>
              </div>

              {/* Box 2: Skema Tarif Dasar */}
              <div className="p-4 rounded-xl bg-forest-night/80 border border-moss/30 space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-moss font-semibold block">
                  SKEMA TARIF DASAR
                </span>
                <ul className="text-xs sm:text-sm text-warm-cream/90 space-y-1 font-mono">
                  <li>
                    • Biaya Peserta : Rp {rules.pricePerPerson.toLocaleString("id-ID")} / orang
                  </li>
                  <li>
                    • Biaya Durasi : Rp {rules.pricePerHour.toLocaleString("id-ID")} / jam
                  </li>
                  {rules.baseFee > 0 && (
                    <li>
                      • Biaya Dasar Booking : Rp {rules.baseFee.toLocaleString("id-ID")}
                    </li>
                  )}
                </ul>
              </div>

              {/* Box 3: Alur Reservasi Cepat */}
              <div className="space-y-3 pt-2">
                <span className="text-xs uppercase tracking-wider text-matcha-mist font-semibold block">
                  Alur Reservasi Cepat:
                </span>
                <ol className="space-y-3 text-xs text-warm-cream/80">
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-deep-forest border border-moss text-matcha-mist flex items-center justify-center font-bold text-[11px] shrink-0">
                      1
                    </span>
                    <div>
                      <strong className="text-warm-cream block">Simulasi Perhitungan</strong>
                      <span>Tentukan tanggal, jam, durasi, dan jumlah peserta.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-deep-forest border border-moss text-matcha-mist flex items-center justify-center font-bold text-[11px] shrink-0">
                      2
                    </span>
                    <div>
                      <strong className="text-warm-cream block">Simpan Kode Booking</strong>
                      <span>Isi identitas Anda untuk mendapatkan tiket booking unik.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-deep-forest border border-moss text-matcha-mist flex items-center justify-center font-bold text-[11px] shrink-0">
                      3
                    </span>
                    <div>
                      <strong className="text-warm-cream block">Konfirmasi Instagram</strong>
                      <span>Kirimkan kode booking ke DM @rindangteduh_ untuk kunci jadwal.</span>
                    </div>
                  </li>
                </ol>
              </div>

              {/* Box 4: Syarat & Ketentuan dari CMS */}
              <div className="pt-4 border-t border-moss/30 space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-moss font-semibold block">
                  SYARAT & KETENTUAN (CMS)
                </span>
                <ul className="text-xs text-warm-cream/70 space-y-1.5 leading-relaxed">
                  {rules.termsAndConditions.map((term, idx) => (
                    <li key={idx}>{term}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* RIGHT COLUMN: SIMULATION FORM & BOOKING TICKET */}
            <div className="lg:col-span-7 space-y-8">
              {/* FORMULIR SIMULASI RESERVASI */}
              <div className="bg-paper p-6 sm:p-8 rounded-2xl border border-[#DDD6C6] shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-[#DDD6C6] pb-4">
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink">
                    Formulir Simulasi Reservasi
                  </h2>
                  {!rules.isBookingOpen && (
                    <span className="px-3 py-1 rounded bg-red-100 text-red-800 text-xs font-bold uppercase tracking-wider">
                      Reservasi Ditutup
                    </span>
                  )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Row 1: Tanggal & Waktu */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="bookingDate"
                        className="block text-xs uppercase font-semibold tracking-wider text-muted-ink mb-1.5"
                      >
                        Tanggal Kedatangan Acara:
                      </label>
                      <input
                        id="bookingDate"
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#DDD6C6] text-ink text-sm font-medium focus:ring-2 focus:ring-deep-forest focus:border-deep-forest min-h-[44px]"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="bookingTime"
                        className="block text-xs uppercase font-semibold tracking-wider text-muted-ink mb-1.5"
                      >
                        Waktu Mulai Acara:
                      </label>
                      <select
                        id="bookingTime"
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#DDD6C6] text-ink text-sm font-medium focus:ring-2 focus:ring-deep-forest focus:border-deep-forest min-h-[44px]"
                      >
                        {rules.availableTimeSlots.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 2: Durasi */}
                  <div>
                    <label className="block text-xs uppercase font-semibold tracking-wider text-muted-ink mb-2">
                      Pilih Durasi Pemakaian Ruang:
                    </label>
                    <div className="flex flex-wrap gap-3" role="radiogroup" aria-label="Durasi Reservasi">
                      {rules.availableDurations.map((duration) => {
                        const isSelected = durationHours === duration;
                        return (
                          <button
                            key={duration}
                            type="button"
                            role="radio"
                            aria-checked={isSelected}
                            onClick={() => setDurationHours(duration)}
                            className={`px-5 py-2.5 rounded-lg text-xs font-semibold tracking-wider transition-all min-h-[44px] flex items-center justify-center ${
                              isSelected
                                ? "bg-forest-night text-warm-cream border border-forest-night shadow-sm"
                                : "bg-white text-ink border border-[#DDD6C6] hover:bg-[#EAE5D9]"
                            }`}
                          >
                            {duration} Jam {isSelected ? "(Pilihan)" : ""}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Row 3: Jumlah Peserta Stepper */}
                  <div>
                    <label
                      htmlFor="guestCount"
                      className="block text-xs uppercase font-semibold tracking-wider text-muted-ink mb-2"
                    >
                      Jumlah Peserta / Tamu:
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={handleDecrement}
                        disabled={guestCount <= 1}
                        className="w-12 h-11 rounded-lg bg-white border border-[#DDD6C6] text-ink font-bold text-lg flex items-center justify-center hover:bg-[#EAE5D9] disabled:opacity-40 min-h-[44px]"
                        aria-label="Kurangi peserta"
                      >
                        -
                      </button>

                      <div className="relative flex-1 max-w-[200px]">
                        <input
                          id="guestCount"
                          type="number"
                          min={1}
                          max={rules.overCapacityMode === "STRICT" ? rules.maxGuests : 200}
                          value={guestCount}
                          onChange={(e) => setGuestCount(Number(e.target.value) || 1)}
                          className="w-full text-center px-4 py-2.5 rounded-lg bg-white border border-[#DDD6C6] text-ink font-mono font-bold text-base focus:ring-2 focus:ring-deep-forest min-h-[44px]"
                          required
                        />
                      </div>

                      <button
                        type="button"
                        onClick={handleIncrement}
                        disabled={isStrictBlocked}
                        className="w-12 h-11 rounded-lg bg-white border border-[#DDD6C6] text-ink font-bold text-lg flex items-center justify-center hover:bg-[#EAE5D9] disabled:opacity-40 min-h-[44px]"
                        aria-label="Tambah peserta"
                      >
                        +
                      </button>
                      <span className="text-xs text-muted-ink font-medium">Orang</span>
                    </div>
                  </div>

                  {/* Dynamic Capacity Notification Box */}
                  <div>
                    {isBelowMin && (
                      <div className="p-3.5 rounded-lg bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>
                          Jumlah peserta di bawah batas minimal ({rules.minGuests} orang).
                        </span>
                      </div>
                    )}

                    {!isBelowMin && !isOverMax && (
                      <div className="p-3.5 rounded-lg bg-green-50 border border-green-300 text-green-900 text-xs flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                        <span>
                          Kapasitas kursi tersedia untuk {guestCount} orang (Batas standar:{" "}
                          {rules.maxGuests} orang).
                        </span>
                      </div>
                    )}

                    {isOverMax && rules.overCapacityMode === "WARNING" && (
                      <div className="p-3.5 rounded-lg bg-amber-50 border border-amber-400 text-amber-900 text-xs flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="block font-semibold">
                            Peringatan Kapasitas Tambahan:
                          </strong>
                          <span>{rules.overCapacityNote}</span>
                        </div>
                      </div>
                    )}

                    {isOverMax && rules.overCapacityMode === "STRICT" && (
                      <div className="p-3.5 rounded-lg bg-red-50 border border-red-300 text-red-900 text-xs flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                        <span>
                          Kapasitas maksimal ruangan adalah {rules.maxGuests} orang. Mode Strict
                          aktif.
                        </span>
                      </div>
                    )}
                  </div>

                  {/* RINGKASAN ESTIMASI BIAYA (DARK BOX) */}
                  <div className="p-6 rounded-xl bg-forest-night text-warm-cream border border-canopy space-y-3">
                    <span className="text-[10px] uppercase tracking-widest text-moss font-semibold block">
                      RINGKASAN ESTIMASI BIAYA
                    </span>

                    <div className="space-y-1.5 text-xs text-warm-cream/90 font-mono">
                      <div className="flex justify-between">
                        <span>
                          Biaya Peserta ({guestCount} org x Rp{" "}
                          {rules.pricePerPerson.toLocaleString("id-ID")})
                        </span>
                        <span>Rp {priceFromGuests.toLocaleString("id-ID")}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>
                          Biaya Durasi ({durationHours} jam x Rp{" "}
                          {rules.pricePerHour.toLocaleString("id-ID")})
                        </span>
                        <span>Rp {priceFromDuration.toLocaleString("id-ID")}</span>
                      </div>

                      {rules.baseFee > 0 && (
                        <div className="flex justify-between">
                          <span>Biaya Dasar Booking</span>
                          <span>Rp {rules.baseFee.toLocaleString("id-ID")}</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-canopy flex items-baseline justify-between">
                      <span className="text-xs uppercase tracking-wider text-warm-cream font-bold">
                        Total Estimasi Biaya:
                      </span>
                      <span className="font-mono text-2xl font-bold text-matcha-mist">
                        Rp {totalEstimatedPrice.toLocaleString("id-ID")}
                      </span>
                    </div>

                    <p className="text-[11px] text-warm-cream/50 pt-1 tracking-wide">
                      [ ESTIMASI - BELUM TERMASUK PEMBAYARAN KASIR ]
                    </p>
                  </div>

                  {/* SUB-SECTION: DATA PEMESAN */}
                  <div className="space-y-4 pt-4 border-t border-[#DDD6C6]">
                    <h3 className="text-xs uppercase tracking-wider font-bold text-ink">
                      Data Pemesan Reservasi:
                    </h3>

                    <div>
                      <label
                        htmlFor="customerName"
                        className="block text-xs font-semibold text-muted-ink mb-1"
                      >
                        Nama Lengkap / Nama Komunitas *
                      </label>
                      <input
                        id="customerName"
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#DDD6C6] text-ink text-sm focus:ring-2 focus:ring-deep-forest min-h-[44px]"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="customerPhone"
                        className="block text-xs font-semibold text-muted-ink mb-1"
                      >
                        Nomor WhatsApp Aktif *
                      </label>
                      <input
                        id="customerPhone"
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#DDD6C6] text-ink text-sm font-mono focus:ring-2 focus:ring-deep-forest min-h-[44px]"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="customerNotes"
                        className="block text-xs font-semibold text-muted-ink mb-1"
                      >
                        Catatan Kebutuhan Khusus (Opsional)
                      </label>
                      <textarea
                        id="customerNotes"
                        rows={2}
                        value={customerNotes}
                        onChange={(e) => setCustomerNotes(e.target.value)}
                        placeholder="Contoh: Perlu colokan listrik tambahan, layout meja U-shape..."
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#DDD6C6] text-ink text-xs focus:ring-2 focus:ring-deep-forest"
                      />
                    </div>

                    {/* Privacy consent checkbox per PRD-NF-05 */}
                    <div className="pt-2">
                      <label className="flex items-start gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={privacyConsent}
                          onChange={(e) => setPrivacyConsent(e.target.checked)}
                          className="mt-1 w-4 h-4 rounded text-deep-forest focus:ring-deep-forest"
                          required
                        />
                        <span className="text-xs text-muted-ink leading-relaxed">
                          Saya menyetujui penyimpanan data nama dan kontak untuk keperluan pemrosesan
                          reservasi Rindang Teduh Warkop sesuai kebijakan privasi dan UU PDP.
                        </span>
                      </label>
                    </div>
                  </div>

                  {errorMsg && (
                    <div className="p-3.5 rounded-lg bg-red-100 border border-red-300 text-red-900 text-xs">
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting || !rules.isBookingOpen || isStrictBlocked}
                    className="w-full py-4 px-6 rounded-md bg-forest-night text-warm-cream text-xs font-semibold tracking-wider uppercase hover:bg-deep-forest transition-colors disabled:opacity-50 min-h-[44px] flex items-center justify-center gap-2"
                  >
                    <span>
                      {isSubmitting
                        ? "Menyimpan Pengajuan..."
                        : "Simpan & Lanjutkan Ke Instagram"}
                    </span>
                    <Send className="w-4 h-4 text-matcha-mist" aria-hidden="true" />
                  </button>
                </form>
              </div>

              {/* BUKTI PENGAJUAN RESERVASI (TIKET DIGITAL) */}
              {submittedReservation && (
                <div className="bg-forest-night text-warm-cream p-6 sm:p-8 rounded-2xl border border-moss/60 shadow-xl space-y-6 animate-in slide-in-from-bottom duration-300">
                  <div className="flex items-start justify-between border-b border-canopy pb-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-moss font-semibold block">
                        BUKTI PENGAJUAN RESERVASI (TIKET DIGITAL)
                      </span>
                      <span className="text-xs text-warm-cream/70">KODE BOOKING UNIK:</span>
                      <h3 className="font-mono text-2xl sm:text-3xl font-bold text-matcha-mist mt-1">
                        {submittedReservation.bookingCode}
                      </h3>
                    </div>

                    <span className="px-3 py-1 rounded bg-amber-900/60 text-amber-200 border border-amber-700/60 text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      PENDING REVIEW
                    </span>
                  </div>

                  <ul className="text-xs sm:text-sm text-warm-cream/90 space-y-2 font-mono">
                    <li>• Nama Pemesan : {submittedReservation.customerName}</li>
                    <li>
                      • Jadwal Acara : {submittedReservation.bookingDate} (
                      {submittedReservation.bookingTime})
                    </li>
                    <li>
                      • Durasi & Tamu : {submittedReservation.durationHours} Jam (
                      {submittedReservation.guestCount} Orang)
                    </li>
                    <li>
                      • Total Estimasi : Rp{" "}
                      {submittedReservation.estimatedPrice.toLocaleString("id-ID")}
                    </li>
                    <li>• Kontak HP : {submittedReservation.customerPhone}</li>
                  </ul>

                  <div className="pt-4 border-t border-canopy flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={handleCopyText}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md border border-moss text-warm-cream hover:bg-canopy text-xs font-semibold tracking-wider uppercase transition-colors min-h-[44px]"
                    >
                      {copiedText ? (
                        <>
                          <Check className="w-4 h-4 text-green-400" />
                          <span>Teks Berhasil Disalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-matcha-mist" />
                          <span>Salin Teks Konfirmasi</span>
                        </>
                      )}
                    </button>

                    <a
                      href={instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-deep-forest border border-moss/80 text-warm-cream hover:bg-moss hover:text-forest-night text-xs font-semibold tracking-wider uppercase transition-colors min-h-[44px]"
                    >
                      <span>Buka DM Instagram @rindangteduh_</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
