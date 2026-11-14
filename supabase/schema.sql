-- Skema Database PostgreSQL Supabase untuk Rindang Teduh Web Platform
-- PRD Versi 1.0 (Selaras dengan SRS & Zero-Cost Architecture)

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ENUM TYPES
CREATE TYPE user_role_type AS ENUM ('OWNER', 'MANAGEMENT', 'CASHIER', 'DEVELOPER');
CREATE TYPE over_capacity_mode_type AS ENUM ('STRICT', 'WARNING');
CREATE TYPE reservation_status_type AS ENUM ('PENDING', 'CONFIRMED', 'REJECTED', 'CANCELLED', 'COMPLETED');

-- 2. TABEL: user_profiles
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  role user_role_type NOT NULL DEFAULT 'CASHIER',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. TABEL: cafe_settings (Single-row)
CREATE TABLE IF NOT EXISTS cafe_settings (
  id INT PRIMARY KEY DEFAULT 1,
  cafe_name TEXT NOT NULL DEFAULT 'Rindang Teduh Warkop',
  tagline TEXT NOT NULL DEFAULT 'Teduh Bernaung, Hangat Berbincang',
  story_title TEXT NOT NULL DEFAULT 'Lebih Dari Sekadar Tempat Duduk & Kopi',
  story_text TEXT NOT NULL,
  features JSONB NOT NULL DEFAULT '[]'::jsonb,
  address TEXT NOT NULL,
  maps_embed_url TEXT,
  maps_link_url TEXT,
  instagram_url TEXT NOT NULL DEFAULT 'https://www.instagram.com/rindangteduh_/',
  whatsapp_number TEXT NOT NULL DEFAULT '+6281234567890',
  operating_hours JSONB NOT NULL,
  hero_caption_title TEXT NOT NULL DEFAULT 'Suasana Teduh & Semilir Angin Senja',
  hero_caption_desc TEXT NOT NULL DEFAULT 'Dikelilingi pepohonan rindang dengan pencahayaan hangat saat malam tiba.',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT single_settings_row CHECK (id = 1)
);

-- 4. TABEL: menu_categories
CREATE TABLE IF NOT EXISTS menu_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  sort_order INT NOT NULL DEFAULT 1,
  is_active BOOLEAN NOT NULL DEFAULT TRUE
);

-- 5. TABEL: menu_items
CREATE TABLE IF NOT EXISTS menu_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID NOT NULL REFERENCES menu_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price INT NOT NULL DEFAULT 0,
  image_url TEXT,
  is_available BOOLEAN NOT NULL DEFAULT TRUE,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  sort_order INT NOT NULL DEFAULT 1,
  badge TEXT,
  temp_options TEXT[] DEFAULT ARRAY['Dingin (Es)', 'Panas (Hot)'],
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. TABEL: reservation_rules (Single-row)
CREATE TABLE IF NOT EXISTS reservation_rules (
  id INT PRIMARY KEY DEFAULT 1,
  is_booking_open BOOLEAN NOT NULL DEFAULT TRUE,
  min_guests INT NOT NULL DEFAULT 5,
  max_guests INT NOT NULL DEFAULT 80,
  over_capacity_mode over_capacity_mode_type NOT NULL DEFAULT 'WARNING',
  over_capacity_note TEXT NOT NULL,
  price_per_person INT NOT NULL DEFAULT 25000,
  price_per_hour INT NOT NULL DEFAULT 50000,
  base_fee INT NOT NULL DEFAULT 0,
  available_durations INT[] DEFAULT ARRAY[2, 3, 4],
  available_time_slots TEXT[] DEFAULT ARRAY['10:00 WIB (Pagi)', '14:00 WIB (Siang/Sore)', '16:00 WIB (Sore)', '19:00 WIB (Malam)'],
  terms_and_conditions TEXT[] DEFAULT ARRAY[
    '1. Pengajuan reservasi wajib diajukan minimal H-2 sebelum kegiatan.',
    '2. Pembatalan tanpa biaya dapat dilakukan hingga H-1.',
    '3. Fasilitas mencakup area kursi terpusat, sound standar, dan akses colokan listrik.',
    '4. Dilarang membawa makanan berat dari luar tanpa izin pengelola.'
  ],
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT single_rules_row CHECK (id = 1)
);

-- 7. TABEL: reservations
CREATE TABLE IF NOT EXISTS reservations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_code TEXT NOT NULL UNIQUE,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  booking_date DATE NOT NULL,
  booking_time TEXT NOT NULL,
  duration_hours INT NOT NULL DEFAULT 2,
  guest_count INT NOT NULL DEFAULT 5,
  estimated_price INT NOT NULL DEFAULT 0,
  customer_notes TEXT,
  status reservation_status_type NOT NULL DEFAULT 'PENDING',
  privacy_consent BOOLEAN NOT NULL DEFAULT TRUE,
  retention_until DATE DEFAULT (CURRENT_DATE + INTERVAL '1 year'),
  processed_by TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. TABEL: activity_logs
CREATE TABLE IF NOT EXISTS activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  user_name TEXT NOT NULL,
  user_role TEXT NOT NULL,
  action_type TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE cafe_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservation_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- Publik hanya membaca menu, aturan, dan profil cafe
CREATE POLICY "Public read cafe_settings" ON cafe_settings FOR SELECT USING (true);
CREATE POLICY "Public read menu_categories" ON menu_categories FOR SELECT USING (is_active = true);
CREATE POLICY "Public read menu_items" ON menu_items FOR SELECT USING (true);
CREATE POLICY "Public read reservation_rules" ON reservation_rules FOR SELECT USING (true);

-- Publik dapat membuat pengajuan reservasi baru
CREATE POLICY "Public insert reservations" ON reservations FOR INSERT WITH CHECK (true);
