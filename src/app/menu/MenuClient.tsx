"use client";

import React, { useState, useMemo, useEffect } from "react";
import { MenuItem, MenuCategory } from "@/types";
import { Search, X, Check, Coffee, Sparkles } from "lucide-react";

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
  const [tempChoice, setTempChoice] = useState<string>("");

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
      const query = searchQuery.toLowerCase().trim();
      const matchSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        (item.subcategory && item.subcategory.toLowerCase().includes(query)) ||
        (item.description && item.description.toLowerCase().includes(query));
      return matchCategory && matchSearch;
    });
  }, [items, selectedCategory, searchQuery]);

  // Find category name helper
  const getCategoryName = (catId: string) => {
    const cat = categories.find((c) => c.id === catId);
    return cat ? cat.name : "Menu";
  };

  // Group items by category and subcategory
  const groupedByCategory = useMemo(() => {
    const activeCats =
      selectedCategory === "all"
        ? categories
        : categories.filter((c) => c.id === selectedCategory);

    return activeCats
      .map((cat) => {
        const catItems = filteredItems.filter((i) => i.categoryId === cat.id);

        const subcategoryMap = new Map<string, MenuItem[]>();
        for (const item of catItems) {
          const sub = item.subcategory || "Daftar Menu";
          if (!subcategoryMap.has(sub)) {
            subcategoryMap.set(sub, []);
          }
          subcategoryMap.get(sub)!.push(item);
        }

        return {
          category: cat,
          subcategories: Array.from(subcategoryMap.entries()).map(
            ([subName, subItems]) => ({
              name: subName,
              items: subItems,
            })
          ),
          totalItems: catItems.length,
        };
      })
      .filter((group) => group.totalItems > 0);
  }, [categories, filteredItems, selectedCategory]);

  const openDetailModal = (item: MenuItem) => {
    setSelectedItem(item);
    if (item.tempOptions && item.tempOptions.length > 0) {
      setTempChoice(item.tempOptions[0]);
    } else {
      setTempChoice("");
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
                  placeholder="Cari kopi, mie instan, pancong..."
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
              Semua Menu ({items.length})
            </button>

            {categories.map((cat) => {
              const count = items.filter((i) => i.categoryId === cat.id).length;
              return (
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
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* MENU CATALOG (WARM CREAM SURFACE) */}
      <section className="bg-warm-cream text-ink py-10 md:py-14 min-h-[500px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex items-center justify-between border-b border-[#DDD6C6] pb-4">
            <h2 className="text-xs uppercase tracking-widest text-muted-ink font-semibold">
              {selectedCategory === "all"
                ? `Semua Pilihan Menu (${filteredItems.length} Tersedia)`
                : `${getCategoryName(selectedCategory)} (${filteredItems.length} Menu)`}
            </h2>
            <span className="text-[11px] text-muted-ink hidden sm:inline">
              Ketuk menu untuk melihat opsi penyajian
            </span>
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
            /* Category Sections */
            <div className="space-y-12">
              {groupedByCategory.map((group) => (
                <div key={group.category.id} className="space-y-6">
                  {/* Category Header */}
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-forest-night" aria-hidden="true" />
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ink">
                      {group.category.name}
                    </h3>
                    <span className="text-xs font-mono font-medium text-muted-ink">
                      ({group.totalItems} menu)
                    </span>
                  </div>

                  {/* Subcategories Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                    {group.subcategories.map((sub) => (
                      <div
                        key={sub.name}
                        className="bg-paper rounded-xl p-5 sm:p-6 border border-[#DDD6C6] shadow-sm flex flex-col justify-between"
                      >
                        {/* Subcategory Title */}
                        <div className="border-b border-[#DDD6C6] pb-3 mb-3 flex items-center justify-between">
                          <h4 className="font-serif text-base sm:text-lg font-bold text-deep-forest">
                            {sub.name}
                          </h4>
                          <span className="text-[11px] text-muted-ink font-mono">
                            {sub.items.length} pilihan
                          </span>
                        </div>

                        {/* Items List */}
                        <div className="divide-y divide-[#EAE5D9]">
                          {sub.items.map((item) => (
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
                              className={`group py-2.5 px-2 -mx-2 rounded-lg transition-colors flex items-center justify-between gap-3 cursor-pointer min-h-[44px] ${
                                item.isAvailable
                                  ? "hover:bg-[#EAE5D9]/70 focus-visible:bg-[#EAE5D9]/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-night"
                                  : "opacity-60 bg-transparent"
                              }`}
                            >
                              <div className="flex-1 min-w-0 pr-2">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="font-medium text-sm sm:text-base text-ink group-hover:text-deep-forest transition-colors">
                                    {item.name}
                                  </span>
                                  {item.badge && (
                                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wider uppercase bg-forest-night text-matcha-mist border border-moss/40">
                                      {item.badge}
                                    </span>
                                  )}
                                  {!item.isAvailable && (
                                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wider uppercase bg-red-100 text-red-700 border border-red-200">
                                      Habis
                                    </span>
                                  )}
                                </div>
                                {item.tempOptions && item.tempOptions.length > 0 && (
                                  <span className="text-[11px] text-muted-ink mt-0.5 block">
                                    {item.tempOptions.join(" / ")}
                                  </span>
                                )}
                              </div>

                              <div className="flex-shrink-0 text-right">
                                <span className="font-mono text-sm sm:text-base font-bold text-ink">
                                  Rp {item.price.toLocaleString("id-ID")}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* DETAIL MODAL / BOTTOM SHEET */}
      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={() => setSelectedItem(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div
            className="relative w-full max-w-md bg-paper rounded-2xl shadow-2xl border border-[#DDD6C6] p-6 sm:p-8 text-ink space-y-5 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header & Close */}
            <div className="flex items-start justify-between gap-4">
              <span className="text-[10px] tracking-wider uppercase font-semibold text-muted-ink">
                [ {getCategoryName(selectedItem.categoryId)}
                {selectedItem.subcategory ? ` • ${selectedItem.subcategory}` : ""}
                {selectedItem.badge ? ` - ${selectedItem.badge}` : ""} ]
              </span>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="text-muted-ink hover:text-ink p-1 -mr-1"
                aria-label="Tutup detail modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Title & Price */}
            <div className="space-y-1">
              <h2 id="modal-title" className="font-serif text-2xl font-bold text-ink">
                {selectedItem.name}
              </h2>
              <div className="font-mono text-xl font-bold text-deep-forest">
                Rp {selectedItem.price.toLocaleString("id-ID")}
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center gap-2 pt-1 border-t border-[#DDD6C6]">
              <span
                className={`w-2 h-2 rounded-full ${
                  selectedItem.isAvailable ? "bg-green-600" : "bg-red-600"
                }`}
              />
              <span
                className={`text-xs font-semibold ${
                  selectedItem.isAvailable ? "text-green-700" : "text-red-700"
                }`}
              >
                {selectedItem.isAvailable ? "Status: Tersedia" : "Status: Stok Habis"}
              </span>
            </div>

            {/* Temperature Choice */}
            {selectedItem.tempOptions && selectedItem.tempOptions.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-[#DDD6C6]">
                <span className="text-xs uppercase font-semibold tracking-wider text-muted-ink block">
                  Pilihan Suhu Penyajian:
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedItem.tempOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setTempChoice(opt)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md border min-h-[44px] transition-colors ${
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

            {/* Ordering Note */}
            <div className="p-3 rounded-lg bg-[#EAE5D9]/60 text-muted-ink text-xs leading-relaxed">
              💡 Silakan sebutkan nama menu dan pilihan suhu saat memesan di kasir atau via pemesanan meja.
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedItem(null)}
              className="w-full py-3 px-4 rounded-md bg-forest-night text-warm-cream text-xs font-semibold tracking-wider uppercase hover:bg-deep-forest transition-colors min-h-[44px]"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
