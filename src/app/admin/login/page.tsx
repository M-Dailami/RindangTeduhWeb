"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield, Lock, Mail, ArrowRight, AlertCircle, Coffee, Check } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Pre-configured staff accounts for quick testing
  const demoAccounts = [
    { label: "Agus (Owner)", email: "owner@rindangteduh.com", role: "OWNER" },
    { label: "Dailami (Manajemen)", email: "dailami@rindangteduh.com", role: "MANAGEMENT" },
    { label: "Budi (Kasir Warkop)", email: "kasir@rindangteduh.com", role: "CASHIER" },
    { label: "Hisyam (Developer)", email: "developer@rindangteduh.com", role: "DEVELOPER" },
  ];

  const handleFillDemo = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword("password123");
    setErrorMessage(null);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !password.trim()) {
      setErrorMessage("Silakan masukkan email dan kata sandi.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password: password.trim() }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Email atau kata sandi tidak valid.");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setErrorMessage(err.message || "Gagal masuk ke sistem.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-forest-night text-warm-cream flex flex-col justify-center items-center p-4 sm:p-6">
      {/* Brand Header */}
      <div className="w-full max-w-md text-center space-y-3 mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-3 group focus-visible:ring-2 focus-visible:ring-matcha-mist rounded-sm p-1"
        >
          <div className="w-12 h-12 rounded-full bg-deep-forest border border-moss flex items-center justify-center text-matcha-mist shadow-lg group-hover:border-matcha-mist transition-colors">
            <Coffee className="w-6 h-6" aria-hidden="true" />
          </div>
          <div className="text-left">
            <span className="font-serif tracking-widest text-lg font-bold text-warm-cream uppercase block">
              Rindang Teduh
            </span>
            <span className="text-[10px] tracking-widest text-moss uppercase font-medium">
              Panel Pengelola Internal (CMS)
            </span>
          </div>
        </Link>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-canopy rounded-2xl border border-moss/40 p-8 shadow-2xl space-y-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-warm-cream">
            Masuk ke Panel Admin
          </h1>
          <p className="text-xs text-warm-cream/70 mt-1">
            Gunakan kredensial staf resmi Anda. Sesi aktif dilindungi dan berakhir otomatis setelah 30 menit tidak aktif.
          </p>
        </div>

        {errorMessage && (
          <div className="p-3.5 rounded-lg bg-red-900/60 border border-red-700 text-red-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-xs uppercase font-semibold tracking-wider text-moss mb-1.5"
            >
              Email Akun Staf:
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-moss" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@rindangteduh.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-forest-night border border-moss/50 text-warm-cream text-xs placeholder:text-warm-cream/40 focus:border-matcha-mist focus:ring-1 focus:ring-matcha-mist min-h-[44px]"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs uppercase font-semibold tracking-wider text-moss mb-1.5"
            >
              Kata Sandi:
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-moss" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-forest-night border border-moss/50 text-warm-cream text-xs placeholder:text-warm-cream/40 focus:border-matcha-mist focus:ring-1 focus:ring-matcha-mist min-h-[44px]"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-4 rounded-lg bg-deep-forest border border-moss/80 text-warm-cream text-xs font-semibold tracking-wider uppercase hover:bg-moss hover:text-forest-night transition-colors disabled:opacity-50 min-h-[44px] flex items-center justify-center gap-2 pt-3"
          >
            <span>{isLoading ? "Memeriksa Autentikasi..." : "Masuk Ke Dashboard"}</span>
            <ArrowRight className="w-4 h-4 text-matcha-mist" />
          </button>
        </form>

        {/* Demo Fast Login Switcher for Evaluator/Testing */}
        <div className="pt-4 border-t border-moss/30 space-y-2.5">
          <span className="text-[10px] uppercase font-bold tracking-wider text-moss block text-center">
            Pilih Akun Demo (Uji Coba Hak Akses Cepat):
          </span>
          <div className="grid grid-cols-2 gap-2">
            {demoAccounts.map((acc) => (
              <button
                key={acc.email}
                type="button"
                onClick={() => handleFillDemo(acc.email)}
                className={`p-2 rounded border text-left transition-colors min-h-[44px] flex flex-col justify-center ${
                  email === acc.email
                    ? "bg-deep-forest border-matcha-mist text-matcha-mist"
                    : "bg-forest-night/60 border-moss/30 text-warm-cream/80 hover:bg-forest-night hover:border-moss"
                }`}
              >
                <span className="text-xs font-semibold leading-tight">{acc.label}</span>
                <span className="text-[10px] text-moss/90 font-mono">pass: password123</span>
              </button>
            ))}
          </div>
        </div>

        <div className="text-center pt-2">
          <Link
            href="/"
            className="text-xs text-warm-cream/60 hover:text-matcha-mist transition-colors inline-block py-1"
          >
            Kembali ke Halaman Beranda Kafe
          </Link>
        </div>
      </div>
    </div>
  );
}
