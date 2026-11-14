"use client";

import React, { useState, useMemo, useEffect } from "react";
import { MenuItem, MenuCategory } from "@/types";
import { Search, X, Check, Flame, Coffee, Sparkles } from "lucide-react";

interface MenuClientProps {
  initialCategories: MenuCategory[];
  initialItems: MenuItem[];
}

export function MenuClient({
  initialCategories,
  initialItems,
}: MenuClientProps) {
  const [categories, setCategories] = useState<MenuCategory[]>(initialCategories);
  const [items, setItems] = useState<MenuItem[]>(initialItems);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [tempChoice, setTempChoice] = useState<string>("Dingin (Es)");

  // Handle Escape key to close modal per R-32
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedItem) {
        setSelectedItem(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedItem]);

  // Filter items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchCategory =
        selectedCategory === "all" || item.categoryId === selectedCategory;
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [items, selectedCategory, searchQuery]);

  // Find category name helper
  const getCategoryName = (catId: string) => {
    const cat = categories.find((c) => c.id === catId);
    return cat ? cat.name.toUpperCase() : "MENU";
  };

  const openDetailModal = (item: MenuItem) => {
    setSelectedItem(item);
    if (item.tempOptions && item.tempOptions.length > 0) {
      setTempChoice(item.tempOptions[0]);
    }
  };

  return (
    <div className="space-y-0">
      {/* HEADER SECTION (DARK EDITORIAL) */}
      <section className="bg-forest-night border-b border-canopy py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-moss font-semibold block">
                KATALOG RESMI MEJA NFC & QR
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-warm-cream">
                Daftar Menu Rindang Teduh
              </h1>
              <p className="text-xs sm:text-sm text-warm-cream/70 max-w-xl">
                Harga dalam Rupiah. Ketersediaan menu diperbarui langsung secara real-time oleh kasir.
              </p>
            </div>

            {/* Search Input */}
            <div className="w-full md:w-80">
              <label htmlFor="menu-search" className="sr-only">
                Cari Menu
              </label>
              <div className="relative">
                <Search
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-moss"
                  aria-hidden="true"
                />
                <input
                  id="menu-search"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari kopi, mie instan, camilan..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-canopy border border-moss/40 text-warm-cream text-xs placeholder:text-warm-cream/40 focus:border-matcha-mist focus:ring-1 focus:ring-matcha-mist transition-colors min-h-[44px]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-moss hover:text-warm-cream p-1"
                    aria-label="Bersihkan pencarian"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STICKY CATEGORY FILTER BAR */}
      <div className="sticky top-20 z-40 bg-warm-cream border-b border-[#DDD6C6] shadow-sm py-3 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none"
            role="tablist"
            aria-label="Filter Kategori Menu"
          >
            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === "all"}
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider whitespace-nowrap transition-all min-h-[44px] flex items-center justify-center ${
                selectedCategory === "all"
                  ? "bg-forest-night text-warm-cream shadow-sm"
                  : "bg-paper text-ink border border-[#D5CEC0] hover:bg-[#EAE5D9]"
              }`}
            >
              Semua Menu
            </button>

            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={selectedCategory === cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider whitespace-nowrap transition-all min-h-[44px] flex items-center justify-center ${
                  selectedCategory === cat.id
                    ? "bg-forest-night text-warm-cream shadow-sm"
                    : "bg-paper text-ink border border-[#D5CEC0] hover:bg-[#EAE5D9]"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CATALOG GRID (WARM CREAM SURFACE) */}
      <section className="bg-warm-cream text-ink py-12 min-h-[500px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xs uppercase tracking-widest text-muted-ink font-semibold">
              {selectedCategory === "all"
                ? `Kategori Pilihan (${filteredItems.length} Menu Tersedia)`
                : `${getCategoryName(selectedCategory)} (${filteredItems.length} Menu)`}
            </h2>
          </div>

          {/* Empty State per R-27 */}
          {filteredItems.length === 0 ? (
            <div className="bg-paper p-12 rounded-2xl border border-[#DDD6C6] text-center space-y-4 max-w-md mx-auto my-12">
              <div className="w-12 h-12 rounded-full bg-[#EAE5D9] flex items-center justify-center text-muted-ink mx-auto">
                <Search className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-lg font-bold text-ink">
                Menu Tidak Ditemukan
              </h3>
              <p className="text-xs text-muted-ink leading-relaxed">
                Tidak ada menu yang sesuai dengan kata kunci &quot;{searchQuery}&quot;. Silakan coba
                nama lain atau reset pencarian Anda.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="px-5 py-2.5 rounded-md bg-forest-night text-warm-cream text-xs font-semibold tracking-wider uppercase hover:bg-deep-forest transition-colors min-h-[44px]"
              >
                Tampilkan Semua Menu
              </button>
            </div>
          ) : (
            /* Menu Card Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => openDetailModal(item)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openDetailModal(item);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`Lihat detail ${item.name}`}
                  className="group bg-paper rounded-xl overflow-hidden border border-[#DDD6C6] shadow-sm hover:shadow-md hover:border-moss/60 transition-all flex flex-col focus-visible:ring-2 focus-visible:ring-deep-forest text-left cursor-pointer"
                >
                  {/* Photo Container */}
                  <div className="relative aspect-[4/3] w-full bg-[#EAE5D9] overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      width={600}
                      height={450}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {item.badge && (
                      <span className="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-forest-night text-matcha-mist border border-moss/50">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <span className="text-[10px] tracking-wider uppercase font-semibold text-muted-ink block">
                        [ {getCategoryName(item.categoryId)} ]
                      </span>
                      <h3 className="font-serif text-base font-bold text-ink mt-1 group-hover:text-deep-forest transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-xs text-muted-ink mt-1.5 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#EAE5D9] flex items-center justify-between">
                      <span className="text-sm font-bold text-ink font-mono">
                        Rp {item.price.toLocaleString("id-ID")}
                      </span>

                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
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
          )}
        </div>
      </section>

      {/* DETAIL MODAL / BOTTOM SHEET (POP-UP PRATINJAU MENU) */}
      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div
            className="relative w-full max-w-2xl bg-paper rounded-2xl shadow-2xl border border-[#DDD6C6] overflow-hidden text-ink flex flex-col md:flex-row max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image */}
            <div className="relative md:w-1/2 aspect-video md:aspect-auto bg-[#EAE5D9] min-h-[200px]">
              <img
                src={selectedItem.imageUrl}
                alt={selectedItem.name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="md:hidden absolute top-3 right-3 p-2 bg-forest-night/80 rounded-full text-warm-cream hover:bg-forest-night"
                aria-label="Tutup detail modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8 md:w-1/2 flex flex-col justify-between space-y-4 overflow-y-auto">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] tracking-wider uppercase font-semibold text-muted-ink">
                    [ {getCategoryName(selectedItem.categoryId)}
                    {selectedItem.badge ? ` - ${selectedItem.badge}` : ""} ]
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedItem(null)}
                    className="hidden md:block text-muted-ink hover:text-ink p-1"
                    aria-label="Tutup pratinjau"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <h2 id="modal-title" className="font-serif text-2xl font-bold text-ink">
                  {selectedItem.name}
                </h2>

                <div className="font-mono text-xl font-bold text-deep-forest">
                  Rp {selectedItem.price.toLocaleString("id-ID")}
                </div>

                <div className="pt-2 border-t border-[#DDD6C6]">
                  <span className="text-xs uppercase font-semibold tracking-wider text-muted-ink block mb-1">
                    Deskripsi & Komposisi Rasa:
                  </span>
                  <p className="text-xs text-ink/80 leading-relaxed">
                    {selectedItem.description}
                  </p>
                </div>

                {selectedItem.tempOptions && selectedItem.tempOptions.length > 0 && (
                  <div className="pt-2">
                    <span className="text-xs uppercase font-semibold tracking-wider text-muted-ink block mb-2">
                      Pilihan Suhu Penyajian:
                    </span>
                    <div className="flex gap-2">
                      {selectedItem.tempOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setTempChoice(opt)}
                          className={`px-3 py-1.5 text-xs font-semibold rounded-md border min-h-[36px] transition-colors ${
                            tempChoice === opt
                              ? "bg-deep-forest text-warm-cream border-deep-forest"
                              : "bg-paper text-ink border-[#DDD6C6] hover:bg-[#EAE5D9]"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="pt-4 border-t border-[#DDD6C6]">
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="w-full py-3 px-4 rounded-md bg-forest-night text-warm-cream text-xs font-semibold tracking-wider uppercase hover:bg-deep-forest transition-colors min-h-[44px]"
                >
                  Tutup Detail Menu X
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
