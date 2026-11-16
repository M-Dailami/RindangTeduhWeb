"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import QRCode from "qrcode";
import {
  CafeSettings,
  MenuCategory,
  MenuItem,
  ReservationRules,
  Reservation,
  ActivityLog,
  AuthSession,
  ReservationStatus,
} from "@/types";
import { compressImageToWebP, CompressedImageResult } from "@/lib/imageCompression";
import {
  Coffee,
  Calendar,
  Settings,
  ToggleRight,
  Plus,
  Trash2,
  Edit,
  Save,
  QrCode,
  ListOrdered,
  Shield,
  Search,
  Copy,
  LogOut,
  Upload,
  CheckCircle2,
  Clock,
  AlertTriangle,
} from "lucide-react";

interface AdminClientProps {
  session: AuthSession;
  initialSettings: CafeSettings;
  initialCategories: MenuCategory[];
  initialItems: MenuItem[];
  initialRules: ReservationRules;
  initialReservations: Reservation[];
  initialLogs: ActivityLog[];
}

export function AdminClient({
  session,
  initialSettings,
  initialCategories,
  initialItems,
  initialRules,
  initialReservations,
  initialLogs,
}: AdminClientProps) {
  const router = useRouter();
  const currentUser = session.user;

  // Tab navigation
  const [activeTab, setActiveTab] = useState<
    "menu" | "cashier" | "rules" | "reservations" | "settings" | "qr" | "logs"
  >(currentUser.role === "CASHIER" ? "cashier" : "menu");

  // State slices
  const [settings, setSettings] = useState<CafeSettings>(initialSettings);
  const [categories, setCategories] = useState<MenuCategory[]>(initialCategories);
  const [items, setItems] = useState<MenuItem[]>(initialItems);
  const [rules, setRules] = useState<ReservationRules>(initialRules);
  const [reservations, setReservations] = useState<Reservation[]>(initialReservations);
  const [logs, setLogs] = useState<ActivityLog[]>(initialLogs);

  // Notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Menu editing modal / state
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isNewItemModalOpen, setIsNewItemModalOpen] = useState(false);

  // Image upload compression state
  const [compressedImage, setCompressedImage] = useState<CompressedImageResult | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Category new modal
  const [newCategoryName, setNewCategoryName] = useState("");

  // Reservation filter
  const [resStatusFilter, setResStatusFilter] = useState<string>("ALL");
  const [resSearchQuery, setResSearchQuery] = useState<string>("");

  // QR Code generator data
  const [qrMenuDataUrl, setQrMenuDataUrl] = useState<string>("");
  const [qrRsvpDataUrl, setQrRsvpDataUrl] = useState<string>("");

  // Inactivity timeout tracker (30 minutes per PRD-F-13)
  const [remainingMinutes, setRemainingMinutes] = useState(30);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // 30-minute Inactivity Timer Handler
  useEffect(() => {
    const checkExpiry = () => {
      const left = Math.max(0, Math.floor((session.expiresAt - Date.now()) / (60 * 1000)));
      setRemainingMinutes(left);
      if (left <= 0) {
        handleLogout("Sesi Anda telah berakhir setelah 30 menit tidak aktif.");
      }
    };

    const interval = setInterval(checkExpiry, 30000); // Check every 30s
    checkExpiry();
    return () => clearInterval(interval);
  }, [session.expiresAt]);

  // Generate QR Codes on client
  useEffect(() => {
    if (typeof window !== "undefined") {
      const origin = window.location.origin;
      QRCode.toDataURL(`${origin}/menu`, { width: 300, margin: 2 }).then(setQrMenuDataUrl);
      QRCode.toDataURL(`${origin}/reservasi`, { width: 300, margin: 2 }).then(setQrRsvpDataUrl);
    }
  }, []);

  // Logout handler
  const handleLogout = async (reason?: string) => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // ignore
    } finally {
      if (reason) alert(reason);
      router.push("/admin/login");
      router.refresh();
    }
  };

  // Compress image on client to WebP (<150KB) per PRD 7.2
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsCompressing(true);
    try {
      const result = await compressImageToWebP(file, 1200, 1200, 0.82);
      setCompressedImage(result);
      showToast(
        `Gambar berhasil dikompresi ke WebP: ${result.originalSizeKb} KB -> ${result.compressedSizeKb} KB.`
      );
    } catch (err: any) {
      alert(err.message || "Gagal memproses gambar.");
    } finally {
      setIsCompressing(false);
    }
  };

  // Toggle item stock (Cashier fast toggle)
  const handleToggleStock = async (itemId: string) => {
    try {
      const res = await fetch(`/api/menu/${itemId}/toggle`, {
        method: "POST",
        headers: {
          "x-actor-name": currentUser.fullName,
          "x-actor-role": currentUser.role,
        },
      });
      const data = await res.json();
      if (data.success) {
        setItems((prev) =>
          prev.map((i) => (i.id === itemId ? { ...i, isAvailable: !i.isAvailable } : i))
        );
        showToast(
          `Stok menu berhasil diperbarui menjadi ${
            !items.find((i) => i.id === itemId)?.isAvailable ? "Tersedia" : "Habis"
          }.`
        );
      }
    } catch {
      showToast("Gagal memperbarui stok.");
    }
  };

  // Save Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-actor-name": currentUser.fullName,
          "x-actor-role": currentUser.role,
        },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (data.success) {
        showToast("Pengaturan profil cafe berhasil disimpan.");
      }
    } catch {
      showToast("Gagal menyimpan pengaturan.");
    }
  };

  // Save Rules
  const handleSaveRules = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/reservation-rules", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-actor-name": currentUser.fullName,
          "x-actor-role": currentUser.role,
        },
        body: JSON.stringify(rules),
      });
      const data = await res.json();
      if (data.success) {
        showToast("Parameter kalkulator reservasi berhasil disimpan.");
      }
    } catch {
      showToast("Gagal menyimpan parameter reservasi.");
    }
  };

  // Update Reservation Status
  const handleUpdateResStatus = async (id: string, status: ReservationStatus) => {
    try {
      const res = await fetch("/api/reservations", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-actor-name": currentUser.fullName,
          "x-actor-role": currentUser.role,
        },
        body: JSON.stringify({ id, status }),
      });
      const data = await res.json();
      if (data.success) {
        setReservations((prev) =>
          prev.map((r) => (r.id === id ? { ...r, status, processedBy: currentUser.fullName } : r))
        );
        showToast(`Status reservasi diperbarui menjadi ${status}.`);
      }
    } catch {
      showToast("Gagal mengubah status reservasi.");
    }
  };

  // Save or Update Menu Item
  const handleSaveMenuItem = async (itemData: Partial<MenuItem>) => {
    try {
      // Use compressed image WebP dataUrl if available
      if (compressedImage?.dataUrl) {
        itemData.imageUrl = compressedImage.dataUrl;
      }

      const res = await fetch("/api/menu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-actor-name": currentUser.fullName,
          "x-actor-role": currentUser.role,
        },
        body: JSON.stringify(itemData),
      });
      const data = await res.json();
      if (data.success) {
        setItems((prev) => {
          const index = prev.findIndex((i) => i.id === data.data.id);
          if (index >= 0) {
            const next = [...prev];
            next[index] = data.data;
            return next;
          }
          return [...prev, data.data];
        });
        setEditingItem(null);
        setIsNewItemModalOpen(false);
        setCompressedImage(null);
        showToast("Item menu berhasil disimpan.");
      }
    } catch {
      showToast("Gagal menyimpan item menu.");
    }
  };

  // Delete Menu Item
  const handleDeleteMenuItem = async (id: string) => {
    if (!confirm("Hapus item menu ini?")) return;
    try {
      const res = await fetch(`/api/menu?id=${id}`, {
        method: "DELETE",
        headers: {
          "x-actor-name": currentUser.fullName,
          "x-actor-role": currentUser.role,
        },
      });
      const data = await res.json();
      if (data.success) {
        setItems((prev) => prev.filter((i) => i.id !== id));
        showToast("Item menu berhasil dihapus.");
      }
    } catch {
      showToast("Gagal menghapus item.");
    }
  };

  // Create Category
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-actor-name": currentUser.fullName,
          "x-actor-role": currentUser.role,
        },
        body: JSON.stringify({ name: newCategoryName.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        setCategories((prev) => [...prev, data.data]);
        setNewCategoryName("");
        showToast(`Kategori '${data.data.name}' berhasil ditambahkan.`);
      }
    } catch {
      showToast("Gagal menambahkan kategori.");
    }
  };

  // Delete Category
  const handleDeleteCategory = async (id: string) => {
    if (!confirm("Hapus kategori ini beserta menu di dalamnya?")) return;
    try {
      const res = await fetch(`/api/categories?id=${id}`, {
        method: "DELETE",
        headers: {
          "x-actor-name": currentUser.fullName,
          "x-actor-role": currentUser.role,
        },
      });
      const data = await res.json();
      if (data.success) {
        setCategories((prev) => prev.filter((c) => c.id !== id));
        setItems((prev) => prev.filter((i) => i.categoryId !== id));
        showToast("Kategori berhasil dihapus.");
      }
    } catch {
      showToast("Gagal menghapus kategori.");
    }
  };

  // Filtered reservations
  const filteredReservations = reservations.filter((r) => {
    const matchStatus = resStatusFilter === "ALL" || r.status === resStatusFilter;
    const matchSearch =
      r.bookingCode.toLowerCase().includes(resSearchQuery.toLowerCase()) ||
      r.customerName.toLowerCase().includes(resSearchQuery.toLowerCase()) ||
      r.customerPhone.includes(resSearchQuery);
    return matchStatus && matchSearch;
  });

  const canEditEverything =
    currentUser.role === "OWNER" ||
    currentUser.role === "MANAGEMENT" ||
    currentUser.role === "DEVELOPER";

  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col font-sans">
      {/* CMS TOP BAR */}
      <header className="bg-forest-night text-warm-cream border-b border-canopy px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-deep-forest border border-moss flex items-center justify-center text-matcha-mist">
            <Shield className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <h1 className="font-serif text-sm sm:text-base font-bold text-warm-cream tracking-wide">
              Rindang Teduh CMS Admin
            </h1>
            <span className="text-[10px] text-moss tracking-wider uppercase">
              Dynamic Content & Reservation Manager
            </span>
          </div>
        </div>

        {/* LOGGED IN USER INFO & LOGOUT */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-canopy px-3 py-1.5 rounded-lg border border-moss/40 text-xs">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-warm-cream font-medium">{currentUser.fullName}</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-deep-forest text-matcha-mist border border-moss/40">
              {currentUser.role}
            </span>
          </div>

          {/* Session Inactivity Counter */}
          <div
            className="flex items-center gap-1.5 text-[11px] text-warm-cream/70 bg-canopy/70 px-2.5 py-1 rounded border border-moss/30"
            title="Sesi otomatis berakhir setelah 30 menit tidak aktif (PRD-F-13)"
          >
            <Clock className="w-3.5 h-3.5 text-moss" />
            <span>{remainingMinutes}m</span>
          </div>

          {/* Official Logout Button */}
          <button
            type="button"
            onClick={() => handleLogout()}
            className="px-3 py-1.5 rounded-lg border border-red-700/60 bg-red-950/40 text-red-300 hover:bg-red-900/60 transition-colors text-xs font-semibold flex items-center gap-1.5 min-h-[36px]"
            title="Keluar dari sesi CMS"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar</span>
          </button>
        </div>
      </header>

      {/* TOAST ALERT */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-forest-night text-warm-cream px-4 py-3 rounded-lg border border-moss shadow-xl flex items-center gap-2 text-xs font-medium animate-in fade-in slide-in-from-bottom">
          <CheckCircle2 className="w-4 h-4 text-green-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* MAIN LAYOUT */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* TABS NAVIGATION */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#DDD6C6] pb-3">
          <button
            type="button"
            onClick={() => setActiveTab("cashier")}
            className={`px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wider transition-colors flex items-center gap-1.5 min-h-[44px] ${
              activeTab === "cashier"
                ? "bg-deep-forest text-warm-cream shadow-sm"
                : "bg-white text-ink border border-[#DDD6C6] hover:bg-[#EAE5D9]"
            }`}
          >
            <ToggleRight className="w-4 h-4" />
            <span>Panel Kasir (Stok Cepat)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("reservations")}
            className={`px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wider transition-colors flex items-center gap-1.5 min-h-[44px] ${
              activeTab === "reservations"
                ? "bg-deep-forest text-warm-cream shadow-sm"
                : "bg-white text-ink border border-[#DDD6C6] hover:bg-[#EAE5D9]"
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Reservasi ({reservations.length})</span>
          </button>

          {canEditEverything && (
            <>
              <button
                type="button"
                onClick={() => setActiveTab("menu")}
                className={`px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wider transition-colors flex items-center gap-1.5 min-h-[44px] ${
                  activeTab === "menu"
                    ? "bg-deep-forest text-warm-cream shadow-sm"
                    : "bg-white text-ink border border-[#DDD6C6] hover:bg-[#EAE5D9]"
                }`}
              >
                <Coffee className="w-4 h-4" />
                <span>Katalog Menu & Kategori</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("rules")}
                className={`px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wider transition-colors flex items-center gap-1.5 min-h-[44px] ${
                  activeTab === "rules"
                    ? "bg-deep-forest text-warm-cream shadow-sm"
                    : "bg-white text-ink border border-[#DDD6C6] hover:bg-[#EAE5D9]"
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Aturan & Rumus Reservasi</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("settings")}
                className={`px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wider transition-colors flex items-center gap-1.5 min-h-[44px] ${
                  activeTab === "settings"
                    ? "bg-deep-forest text-warm-cream shadow-sm"
                    : "bg-white text-ink border border-[#DDD6C6] hover:bg-[#EAE5D9]"
                }`}
              >
                <Edit className="w-4 h-4" />
                <span>Profil Kafe & Jam Buka</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("qr")}
                className={`px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wider transition-colors flex items-center gap-1.5 min-h-[44px] ${
                  activeTab === "qr"
                    ? "bg-deep-forest text-warm-cream shadow-sm"
                    : "bg-white text-ink border border-[#DDD6C6] hover:bg-[#EAE5D9]"
                }`}
              >
                <QrCode className="w-4 h-4" />
                <span>Generator QR & NFC</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("logs")}
                className={`px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wider transition-colors flex items-center gap-1.5 min-h-[44px] ${
                  activeTab === "logs"
                    ? "bg-deep-forest text-warm-cream shadow-sm"
                    : "bg-white text-ink border border-[#DDD6C6] hover:bg-[#EAE5D9]"
                }`}
              >
                <ListOrdered className="w-4 h-4" />
                <span>Log Audit Sistem</span>
              </button>
            </>
          )}
        </div>

        {/* TAB 1: FAST CASHIER STOCK TOGGLE (PRD-F-16) */}
        {activeTab === "cashier" && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-[#DDD6C6] shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="font-serif text-xl font-bold text-ink">
                  Panel Cepat Stok Menu (Kasir)
                </h2>
                <p className="text-xs text-muted-ink mt-1">
                  Ubah ketersediaan stok menu dalam 1 ketukan. Perubahan langsung tersinkronisasi ke
                  halaman /menu pengunjung via On-Demand Revalidation.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-ink">Dioperasikan sebagai:</span>
                <span className="px-2.5 py-1 rounded bg-[#EAE5D9] text-ink font-semibold text-xs">
                  {currentUser.fullName} ({currentUser.role})
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-xl border border-[#DDD6C6] shadow-sm flex items-center justify-between gap-3 hover:border-moss/60 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        width={52}
                        height={52}
                        className="w-13 h-13 rounded-lg object-cover bg-[#EAE5D9] border"
                      />
                    ) : (
                      <div className="w-13 h-13 rounded-lg bg-[#EAE5D9] border border-[#DDD6C6] flex items-center justify-center text-moss font-bold text-xs uppercase">
                        {item.name.slice(0, 2)}
                      </div>
                    )}
                    <div>
                      <h3 className="font-medium text-sm text-ink">{item.name}</h3>
                      <span className="text-xs text-muted-ink font-mono">
                        Rp {item.price.toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleToggleStock(item.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all min-h-[44px] flex items-center gap-1.5 ${
                      item.isAvailable
                        ? "bg-green-100 text-green-800 hover:bg-green-200"
                        : "bg-red-100 text-red-800 hover:bg-red-200"
                    }`}
                    aria-label={`Ubah status stok ${item.name}`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        item.isAvailable ? "bg-green-600" : "bg-red-600"
                      }`}
                    />
                    <span>{item.isAvailable ? "Tersedia" : "Habis"}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: RESERVATIONS LIST & PROCESSING (PRD-F-17) */}
        {activeTab === "reservations" && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-[#DDD6C6] shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="font-serif text-xl font-bold text-ink">
                    Daftar Permintaan Reservasi
                  </h2>
                  <p className="text-xs text-muted-ink">
                    Kelola dan perbarui status pengajuan reservasi yang masuk dari form publik.
                  </p>
                </div>

                {/* Filter and Search */}
                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-60">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-ink" />
                    <input
                      type="text"
                      placeholder="Cari kode booking / nama..."
                      value={resSearchQuery}
                      onChange={(e) => setResSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-md border border-[#DDD6C6] text-xs min-h-[40px]"
                    />
                  </div>

                  <select
                    value={resStatusFilter}
                    onChange={(e) => setResStatusFilter(e.target.value)}
                    className="border border-[#DDD6C6] rounded-md px-3 py-2 text-xs min-h-[40px] font-medium"
                  >
                    <option value="ALL">Semua Status</option>
                    <option value="PENDING">PENDING</option>
                    <option value="CONFIRMED">CONFIRMED</option>
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="REJECTED">REJECTED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Reservations Table */}
            <div className="bg-white rounded-xl border border-[#DDD6C6] overflow-x-auto shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#EAE5D9] text-muted-ink uppercase font-semibold border-b border-[#DDD6C6]">
                  <tr>
                    <th className="p-3.5">Kode Booking</th>
                    <th className="p-3.5">Pemesan</th>
                    <th className="p-3.5">Jadwal & Durasi</th>
                    <th className="p-3.5">Tamu</th>
                    <th className="p-3.5">Estimasi Biaya</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Aksi Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DDD6C6]">
                  {filteredReservations.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-muted-ink">
                        Belum ada reservasi yang sesuai filter.
                      </td>
                    </tr>
                  ) : (
                    filteredReservations.map((r) => (
                      <tr key={r.id} className="hover:bg-amber-50/40">
                        <td className="p-3.5 font-mono font-bold text-deep-forest">
                          {r.bookingCode}
                        </td>
                        <td className="p-3.5">
                          <strong className="block text-ink">{r.customerName}</strong>
                          <span className="text-muted-ink font-mono">{r.customerPhone}</span>
                          {r.customerNotes && (
                            <span className="block text-[11px] text-muted-ink/80 italic mt-0.5 max-w-xs">
                              Note: {r.customerNotes}
                            </span>
                          )}
                        </td>
                        <td className="p-3.5">
                          <span>{r.bookingDate}</span>
                          <span className="block text-muted-ink font-mono">
                            {r.bookingTime} ({r.durationHours} Jam)
                          </span>
                        </td>
                        <td className="p-3.5 font-bold">{r.guestCount} Orang</td>
                        <td className="p-3.5 font-mono font-bold">
                          Rp {r.estimatedPrice.toLocaleString("id-ID")}
                        </td>
                        <td className="p-3.5">
                          <span
                            className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                              r.status === "CONFIRMED"
                                ? "bg-green-100 text-green-800"
                                : r.status === "PENDING"
                                ? "bg-amber-100 text-amber-800"
                                : r.status === "COMPLETED"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {r.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {r.status === "PENDING" && (
                              <>
                                <button
                                  type="button"
                                  onClick={() => handleUpdateResStatus(r.id, "CONFIRMED")}
                                  className="px-2.5 py-1.5 rounded bg-green-700 text-white font-medium hover:bg-green-800 transition-colors min-h-[36px]"
                                  title="Konfirmasi Reservasi"
                                >
                                  Konfirmasi
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleUpdateResStatus(r.id, "REJECTED")}
                                  className="px-2.5 py-1.5 rounded bg-red-700 text-white font-medium hover:bg-red-800 transition-colors min-h-[36px]"
                                  title="Tolak Reservasi"
                                >
                                  Tolak
                                </button>
                              </>
                            )}

                            {r.status === "CONFIRMED" && (
                              <button
                                type="button"
                                onClick={() => handleUpdateResStatus(r.id, "COMPLETED")}
                                className="px-2.5 py-1.5 rounded bg-deep-forest text-warm-cream font-medium hover:bg-moss transition-colors min-h-[36px]"
                              >
                                Tandai Selesai
                              </button>
                            )}

                            {r.status !== "PENDING" && r.status !== "CONFIRMED" && (
                              <button
                                type="button"
                                onClick={() => handleUpdateResStatus(r.id, "PENDING")}
                                className="px-2 py-1 rounded border border-[#DDD6C6] text-muted-ink hover:text-ink min-h-[36px]"
                              >
                                Reset Pending
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: MENU & CATEGORY MANAGEMENT (PRD-F-15) */}
        {activeTab === "menu" && canEditEverything && (
          <div className="space-y-8">
            {/* Categories Management */}
            <div className="bg-white p-6 rounded-xl border border-[#DDD6C6] shadow-sm space-y-4">
              <h2 className="font-serif text-lg font-bold text-ink">
                Kelola Kategori Menu
              </h2>

              <div className="flex flex-wrap items-center gap-3">
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-paper border border-[#DDD6C6] text-xs font-semibold"
                  >
                    <span>{cat.name}</span>
                    <button
                      type="button"
                      onClick={() => handleDeleteCategory(cat.id)}
                      className="text-muted-ink hover:text-red-700 p-1"
                      aria-label={`Hapus kategori ${cat.name}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Form Add Category */}
              <form onSubmit={handleAddCategory} className="flex gap-2 max-w-md pt-2">
                <input
                  type="text"
                  placeholder="Nama Kategori Baru..."
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs rounded border border-[#DDD6C6] min-h-[44px]"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-forest-night text-warm-cream rounded text-xs font-semibold hover:bg-deep-forest min-h-[44px]"
                >
                  Tambah Kategori
                </button>
              </form>
            </div>

            {/* Menu Items CRUD */}
            <div className="bg-white p-6 rounded-xl border border-[#DDD6C6] shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="font-serif text-xl font-bold text-ink">
                    Daftar Item Menu ({items.length})
                  </h2>
                  <p className="text-xs text-muted-ink">
                    Tambah, edit foto dengan kompresi WebP otomatis, harga, rekomendasi, dan status.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEditingItem(null);
                    setCompressedImage(null);
                    setIsNewItemModalOpen(true);
                  }}
                  className="px-4 py-2.5 rounded-md bg-forest-night text-warm-cream text-xs font-semibold tracking-wider uppercase hover:bg-deep-forest flex items-center gap-2 min-h-[44px]"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Menu Baru</span>
                </button>
              </div>

              {/* Table of items */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#EAE5D9] text-muted-ink uppercase font-semibold">
                    <tr>
                      <th className="p-3">Foto</th>
                      <th className="p-3">Nama Menu</th>
                      <th className="p-3">Kategori</th>
                      <th className="p-3">Harga</th>
                      <th className="p-3">Rekomendasi</th>
                      <th className="p-3">Stok</th>
                      <th className="p-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DDD6C6]">
                    {items.map((item) => {
                      const cat = categories.find((c) => c.id === item.categoryId);
                      return (
                        <tr key={item.id} className="hover:bg-amber-50/40">
                          <td className="p-3">
                            {item.imageUrl ? (
                              <img
                                src={item.imageUrl}
                                alt={item.name}
                                width={44}
                                height={44}
                                className="w-11 h-11 rounded object-cover bg-[#EAE5D9] border"
                              />
                            ) : (
                              <div className="w-11 h-11 rounded bg-[#EAE5D9] border border-[#DDD6C6] flex items-center justify-center text-moss font-bold text-xs uppercase">
                                {item.name.slice(0, 2)}
                              </div>
                            )}
                          </td>
                          <td className="p-3">
                            <strong className="block text-ink">{item.name}</strong>
                            <span className="text-muted-ink line-clamp-1 max-w-xs">
                              {item.description}
                            </span>
                          </td>
                          <td className="p-3 font-medium text-muted-ink">
                            {cat ? cat.name : "-"}
                          </td>
                          <td className="p-3 font-mono font-bold text-ink">
                            Rp {item.price.toLocaleString("id-ID")}
                          </td>
                          <td className="p-3">
                            {item.isFeatured ? (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-moss/20 text-deep-forest">
                                Rekomendasi
                              </span>
                            ) : (
                              "-"
                            )}
                          </td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                item.isAvailable
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {item.isAvailable ? "Tersedia" : "Habis"}
                            </span>
                          </td>
                          <td className="p-3 text-right space-x-2">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingItem(item);
                                setCompressedImage(null);
                              }}
                              className="px-2.5 py-1.5 rounded border border-[#DDD6C6] hover:bg-paper min-h-[36px]"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteMenuItem(item.id)}
                              className="px-2.5 py-1.5 rounded text-red-700 hover:bg-red-50 min-h-[36px]"
                            >
                              Hapus
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Modal Edit / Add Item with Client-Side WebP Compression */}
            {(editingItem || isNewItemModalOpen) && (
              <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto border border-[#DDD6C6] shadow-2xl">
                  <h3 className="font-serif text-xl font-bold text-ink">
                    {editingItem ? "Edit Item Menu" : "Tambah Item Menu Baru"}
                  </h3>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const form = e.currentTarget;
                      const formData = new FormData(form);
                      const name = formData.get("name") as string;
                      const categoryId = formData.get("categoryId") as string;
                      const price = Number(formData.get("price"));
                      const description = formData.get("description") as string;
                      const manualUrl = formData.get("imageUrl") as string;
                      const badge = formData.get("badge") as string;
                      const isFeatured = formData.get("isFeatured") === "on";
                      const isAvailable = formData.get("isAvailable") === "on";

                      const finalImageUrl =
                        compressedImage?.dataUrl || manualUrl || editingItem?.imageUrl || "";

                      handleSaveMenuItem({
                        id: editingItem ? editingItem.id : undefined,
                        name,
                        categoryId,
                        price,
                        description,
                        imageUrl: finalImageUrl,
                        badge,
                        isFeatured,
                        isAvailable,
                      });
                    }}
                    className="space-y-4 text-xs"
                  >
                    <div>
                      <label className="block font-semibold mb-1">Nama Menu *</label>
                      <input
                        name="name"
                        defaultValue={editingItem?.name || ""}
                        className="w-full px-3 py-2 border rounded"
                        required
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-1">Kategori *</label>
                      <select
                        name="categoryId"
                        defaultValue={editingItem?.categoryId || categories[0]?.id}
                        className="w-full px-3 py-2 border rounded"
                        required
                      >
                        {categories.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold mb-1">Harga (Rupiah) *</label>
                      <input
                        type="number"
                        name="price"
                        defaultValue={editingItem?.price || 15000}
                        className="w-full px-3 py-2 border rounded font-mono"
                        required
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-1">Deskripsi & Komposisi</label>
                      <textarea
                        name="description"
                        rows={2}
                        defaultValue={editingItem?.description || ""}
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>

                    {/* CLIENT-SIDE WEBP COMPRESSION FILE UPLOADER (PRD 7.2) */}
                    <div className="p-3.5 bg-paper rounded-xl border border-[#DDD6C6] space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-deep-forest block">
                          Unggah Foto (Kompresi WebP Otomatis &lt; 150 KB)
                        </span>
                        {compressedImage && (
                          <span className="text-[11px] text-green-700 font-bold">
                            WebP {compressedImage.compressedSizeKb} KB
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={isCompressing}
                          className="px-3.5 py-2 rounded-lg bg-deep-forest text-warm-cream hover:bg-moss flex items-center gap-2 transition-colors min-h-[38px]"
                        >
                          <Upload className="w-4 h-4" />
                          <span>{isCompressing ? "Mengompresi..." : "Pilih File Foto"}</span>
                        </button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileSelect}
                          className="hidden"
                        />
                        <span className="text-[11px] text-muted-ink">
                          {compressedImage
                            ? `Dioptimasi ke ${compressedImage.width}x${compressedImage.height}px`
                            : "Atau gunakan URL manual di bawah"}
                        </span>
                      </div>

                      {/* Image Preview */}
                      {(compressedImage || editingItem?.imageUrl) && (
                        <div className="flex items-center gap-3 pt-1">
                          <img
                            src={compressedImage?.dataUrl || editingItem?.imageUrl}
                            alt="Pratinjau Foto"
                            className="w-16 h-16 rounded object-cover border"
                          />
                          <span className="text-[11px] text-muted-ink">
                            {compressedImage ? "Pratinjau WebP Baru Siap Simpan" : "Foto Saat Ini"}
                          </span>
                        </div>
                      )}

                      <div>
                        <label className="block font-semibold text-[11px] text-muted-ink mb-1">
                          URL Foto Cadangan:
                        </label>
                        <input
                          name="imageUrl"
                          defaultValue={editingItem?.imageUrl || ""}
                          placeholder="https://..."
                          className="w-full px-3 py-1.5 border rounded font-mono text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold mb-1">Badge Khusus (Opsional)</label>
                      <input
                        name="badge"
                        placeholder="Contoh: TERLARIS, RESEP NENEK"
                        defaultValue={editingItem?.badge || ""}
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>

                    <div className="flex gap-6 pt-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="isFeatured"
                          defaultChecked={editingItem?.isFeatured || false}
                        />
                        <span>Tampilkan di Beranda (Rekomendasi)</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="isAvailable"
                          defaultChecked={editingItem ? editingItem.isAvailable : true}
                        />
                        <span>Stok Tersedia</span>
                      </label>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingItem(null);
                          setIsNewItemModalOpen(false);
                          setCompressedImage(null);
                        }}
                        className="px-4 py-2 border rounded text-muted-ink min-h-[44px]"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-forest-night text-warm-cream font-semibold rounded hover:bg-deep-forest min-h-[44px]"
                      >
                        Simpan Menu
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: RESERVATION RULES & DYNAMIC PARAMETERS (PRD-F-14) */}
        {activeTab === "rules" && canEditEverything && (
          <form
            onSubmit={handleSaveRules}
            className="bg-white p-6 sm:p-8 rounded-2xl border border-[#DDD6C6] shadow-sm space-y-6"
          >
            <div>
              <h2 className="font-serif text-xl font-bold text-ink">
                CMS Pengaturan Parameter Reservasi Dinamis
              </h2>
              <p className="text-xs text-muted-ink mt-1">
                Rumus estimasi harga dan batasan kapasitas di halaman reservasi dikendalikan
                sepenuhnya oleh nilai di bawah ini tanpa mengubah kode program.
              </p>
            </div>

            {/* Toggle Booking Open */}
            <div className="p-4 rounded-xl bg-paper border border-[#DDD6C6] flex items-center justify-between">
              <div>
                <strong className="block text-sm text-ink">Status Penerimaan Reservasi</strong>
                <span className="text-xs text-muted-ink">
                  Aktifkan saklar untuk membuka atau menutup formulir pengajuan reservasi.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setRules({ ...rules, isBookingOpen: !rules.isBookingOpen })}
                className={`px-4 py-2 rounded-full text-xs font-bold min-h-[44px] flex items-center gap-2 ${
                  rules.isBookingOpen
                    ? "bg-green-700 text-white"
                    : "bg-red-700 text-white"
                }`}
              >
                <span>{rules.isBookingOpen ? "Penerimaan Dibuka" : "Ditutup Sementara"}</span>
              </button>
            </div>

            {/* Kapasitas Minimal & Maksimal */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase font-semibold text-muted-ink mb-1.5">
                  Batas Minimal Orang (min_guests):
                </label>
                <input
                  type="number"
                  value={rules.minGuests}
                  onChange={(e) => setRules({ ...rules, minGuests: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDD6C6] font-mono min-h-[44px]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-muted-ink mb-1.5">
                  Batas Maksimal Kursi Standar (max_guests):
                </label>
                <input
                  type="number"
                  value={rules.maxGuests}
                  onChange={(e) => setRules({ ...rules, maxGuests: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDD6C6] font-mono min-h-[44px]"
                  required
                />
              </div>
            </div>

            {/* Mode Kapasitas Lebih */}
            <div className="space-y-2">
              <label className="block text-xs uppercase font-semibold text-muted-ink">
                Mode Perlakuan Kelebihan Kapasitas (over_capacity_mode):
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-xs cursor-pointer">
                  <input
                    type="radio"
                    name="overCapacityMode"
                    value="WARNING"
                    checked={rules.overCapacityMode === "WARNING"}
                    onChange={() => setRules({ ...rules, overCapacityMode: "WARNING" })}
                  />
                  <span>
                    <strong>WARNING:</strong> Boleh mengisi di atas batas, tampilkan peringatan
                  </span>
                </label>

                <label className="flex items-center gap-2 text-xs cursor-pointer">
                  <input
                    type="radio"
                    name="overCapacityMode"
                    value="STRICT"
                    checked={rules.overCapacityMode === "STRICT"}
                    onChange={() => setRules({ ...rules, overCapacityMode: "STRICT" })}
                  />
                  <span>
                    <strong>STRICT:</strong> Pengunjung dilarang memilih di atas batas maksimal
                  </span>
                </label>
              </div>

              {rules.overCapacityMode === "WARNING" && (
                <div className="pt-2">
                  <label className="block text-xs font-semibold text-muted-ink mb-1">
                    Teks Pesan Peringatan Kelebihan Kursi:
                  </label>
                  <textarea
                    rows={2}
                    value={rules.overCapacityNote}
                    onChange={(e) => setRules({ ...rules, overCapacityNote: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-[#DDD6C6] text-xs"
                  />
                </div>
              )}
            </div>

            {/* Formula Tarif */}
            <div className="pt-4 border-t border-[#DDD6C6] space-y-4">
              <span className="text-xs uppercase font-bold tracking-wider text-ink block">
                Formula Rumus Estimasi Biaya
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-ink mb-1">
                    Tarif Per Orang (price_per_person)
                  </label>
                  <input
                    type="number"
                    value={rules.pricePerPerson}
                    onChange={(e) =>
                      setRules({ ...rules, pricePerPerson: Number(e.target.value) })
                    }
                    className="w-full px-3.5 py-2.5 rounded border border-[#DDD6C6] font-mono min-h-[44px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-ink mb-1">
                    Tarif Per Jam (price_per_hour)
                  </label>
                  <input
                    type="number"
                    value={rules.pricePerHour}
                    onChange={(e) =>
                      setRules({ ...rules, pricePerHour: Number(e.target.value) })
                    }
                    className="w-full px-3.5 py-2.5 rounded border border-[#DDD6C6] font-mono min-h-[44px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-ink mb-1">
                    Biaya Dasar Booking (base_fee)
                  </label>
                  <input
                    type="number"
                    value={rules.baseFee}
                    onChange={(e) => setRules({ ...rules, baseFee: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded border border-[#DDD6C6] font-mono min-h-[44px]"
                  />
                </div>
              </div>
            </div>

            {/* Syarat & Ketentuan Teks */}
            <div className="pt-4 border-t border-[#DDD6C6]">
              <label className="block text-xs uppercase font-semibold text-muted-ink mb-2">
                Teks Ketentuan Reservasi (1 baris per poin):
              </label>
              <textarea
                rows={4}
                value={rules.termsAndConditions.join("\n")}
                onChange={(e) =>
                  setRules({
                    ...rules,
                    termsAndConditions: e.target.value.split("\n").filter((t) => t.trim() !== ""),
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDD6C6] text-xs font-mono"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-md bg-forest-night text-warm-cream text-xs font-semibold tracking-wider uppercase hover:bg-deep-forest min-h-[44px] flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Perubahan Aturan Reservasi</span>
            </button>
          </form>
        )}

        {/* TAB 5: CAFE PROFILE SETTINGS (PRD-F-18) */}
        {activeTab === "settings" && canEditEverything && (
          <form
            onSubmit={handleSaveSettings}
            className="bg-white p-6 sm:p-8 rounded-2xl border border-[#DDD6C6] shadow-sm space-y-6"
          >
            <div>
              <h2 className="font-serif text-xl font-bold text-ink">
                CMS Profil Kafe, Jam Buka & Narasi
              </h2>
              <p className="text-xs text-muted-ink mt-1">
                Semua teks, alamat, kontak, dan tautan sosial media yang tampil di beranda dapat
                disunting di sini.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-muted-ink mb-1">
                  Nama Cafe
                </label>
                <input
                  type="text"
                  value={settings.cafeName}
                  onChange={(e) => setSettings({ ...settings, cafeName: e.target.value })}
                  className="w-full px-3 py-2 border rounded text-xs min-h-[44px]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-ink mb-1">
                  Tagline Utama
                </label>
                <input
                  type="text"
                  value={settings.tagline}
                  onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                  className="w-full px-3 py-2 border rounded text-xs min-h-[44px]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-ink mb-1">
                Judul Cerita Ruang
              </label>
              <input
                type="text"
                value={settings.storyTitle}
                onChange={(e) => setSettings({ ...settings, storyTitle: e.target.value })}
                className="w-full px-3 py-2 border rounded text-xs min-h-[44px]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-ink mb-1">
                Teks Narasi Cerita Kafe
              </label>
              <textarea
                rows={3}
                value={settings.storyText}
                onChange={(e) => setSettings({ ...settings, storyText: e.target.value })}
                className="w-full px-3 py-2 border rounded text-xs leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-muted-ink mb-1">
                  Alamat Lengkap
                </label>
                <textarea
                  rows={2}
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  className="w-full px-3 py-2 border rounded text-xs"
                />
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-muted-ink mb-1">
                    Instagram URL
                  </label>
                  <input
                    type="url"
                    value={settings.instagramUrl}
                    onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
                    className="w-full px-3 py-2 border rounded text-xs min-h-[40px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-ink mb-1">
                    Nomor WhatsApp Admin
                  </label>
                  <input
                    type="text"
                    value={settings.whatsappNumber}
                    onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                    className="w-full px-3 py-2 border rounded text-xs min-h-[40px]"
                  />
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="pt-4 border-t border-[#DDD6C6] space-y-3">
              <span className="text-xs uppercase font-bold tracking-wider text-ink block">
                Jam Operasional
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-ink mb-1">
                    Senin - Jumat
                  </label>
                  <input
                    type="text"
                    value={settings.operatingHours.weekday}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        operatingHours: {
                          ...settings.operatingHours,
                          weekday: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 border rounded text-xs font-mono min-h-[40px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-ink mb-1">
                    Sabtu - Minggu
                  </label>
                  <input
                    type="text"
                    value={settings.operatingHours.weekend}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        operatingHours: {
                          ...settings.operatingHours,
                          weekend: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 border rounded text-xs font-mono min-h-[40px]"
                  />
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.operatingHours.isOpenToday}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          operatingHours: {
                            ...settings.operatingHours,
                            isOpenToday: e.target.checked,
                          },
                        })
                      }
                    />
                    <span>Tampilkan Status &quot;HARI INI BUKA&quot;</span>
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-md bg-forest-night text-warm-cream text-xs font-semibold tracking-wider uppercase hover:bg-deep-forest min-h-[44px] flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Profil Cafe</span>
            </button>
          </form>
        )}

        {/* TAB 6: QR CODE & NFC GENERATOR (PRD-F-18 & PRD-F-04) */}
        {activeTab === "qr" && canEditEverything && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#DDD6C6] shadow-sm space-y-8">
            <div>
              <h2 className="font-serif text-xl font-bold text-ink">
                Generator QR Code Meja & Pemrograman Tag NFC
              </h2>
              <p className="text-xs text-muted-ink mt-1">
                Unduh gambar QR code siap cetak untuk ditempel di meja kafe, atau salin URL permanen
                untuk dituliskan ke dalam stiker keping NFC.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* QR Code Menu Digital */}
              <div className="p-6 rounded-xl border border-[#DDD6C6] bg-paper flex flex-col items-center text-center space-y-4">
                <span className="text-xs uppercase tracking-wider font-bold text-deep-forest">
                  QR Code Menu Digital (/menu)
                </span>

                {qrMenuDataUrl ? (
                  <img
                    src={qrMenuDataUrl}
                    alt="QR Code Menu Digital Rindang Teduh"
                    width={200}
                    height={200}
                    className="w-48 h-48 bg-white p-2 rounded-lg border shadow-sm"
                  />
                ) : (
                  <div className="w-48 h-48 bg-gray-100 flex items-center justify-center text-xs text-muted-ink">
                    Memuat QR...
                  </div>
                )}

                <div className="space-y-2 w-full pt-2">
                  <a
                    href={qrMenuDataUrl}
                    download="qrcode-menu-rindang-teduh.png"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-forest-night text-warm-cream text-xs font-semibold tracking-wider uppercase hover:bg-deep-forest min-h-[44px]"
                  >
                    <span>Unduh Gambar QR Menu</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      const url = `${window.location.origin}/menu`;
                      navigator.clipboard.writeText(url);
                      showToast("Tautan NFC /menu berhasil disalin.");
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md border border-[#DDD6C6] bg-white text-ink text-xs font-semibold hover:bg-[#EAE5D9] min-h-[44px]"
                  >
                    <Copy className="w-4 h-4 text-moss" />
                    <span>Salin URL Tag NFC Meja</span>
                  </button>
                </div>
              </div>

              {/* QR Code Reservasi */}
              <div className="p-6 rounded-xl border border-[#DDD6C6] bg-paper flex flex-col items-center text-center space-y-4">
                <span className="text-xs uppercase tracking-wider font-bold text-deep-forest">
                  QR Code Reservasi Ruangan (/reservasi)
                </span>

                {qrRsvpDataUrl ? (
                  <img
                    src={qrRsvpDataUrl}
                    alt="QR Code Reservasi Rindang Teduh"
                    width={200}
                    height={200}
                    className="w-48 h-48 bg-white p-2 rounded-lg border shadow-sm"
                  />
                ) : (
                  <div className="w-48 h-48 bg-gray-100 flex items-center justify-center text-xs text-muted-ink">
                    Memuat QR...
                  </div>
                )}

                <div className="space-y-2 w-full pt-2">
                  <a
                    href={qrRsvpDataUrl}
                    download="qrcode-reservasi-rindang-teduh.png"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-forest-night text-warm-cream text-xs font-semibold tracking-wider uppercase hover:bg-deep-forest min-h-[44px]"
                  >
                    <span>Unduh Gambar QR Reservasi</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      const url = `${window.location.origin}/reservasi`;
                      navigator.clipboard.writeText(url);
                      showToast("Tautan NFC /reservasi berhasil disalin.");
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md border border-[#DDD6C6] bg-white text-ink text-xs font-semibold hover:bg-[#EAE5D9] min-h-[44px]"
                  >
                    <Copy className="w-4 h-4 text-moss" />
                    <span>Salin URL Tag NFC Reservasi</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: AUDIT LOGS (PRD-F-19) */}
        {activeTab === "logs" && canEditEverything && (
          <div className="bg-white p-6 rounded-xl border border-[#DDD6C6] shadow-sm space-y-4">
            <h2 className="font-serif text-lg font-bold text-ink">
              Log Keamanan, Percobaan Login & Jejak Audit Sistem
            </h2>
            <div className="divide-y divide-[#DDD6C6]">
              {logs.map((log) => (
                <div key={log.id} className="py-3 flex items-start justify-between gap-4 text-xs">
                  <div>
                    <span className="font-semibold text-deep-forest">{log.userName}</span>{" "}
                    <span className="text-[10px] uppercase font-bold text-moss">
                      [{log.userRole}]
                    </span>
                    <p className="text-ink mt-0.5">{log.description}</p>
                    <span className="text-[10px] text-muted-ink font-mono mt-0.5 block">
                      IP: {log.ipAddress || "127.0.0.1"} | Device: {log.userAgent || "Browser"}
                    </span>
                  </div>
                  <span className="text-[11px] text-muted-ink font-mono shrink-0">
                    {new Date(log.createdAt).toLocaleString("id-ID")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
