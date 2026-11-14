# Product Requirements Document (PRD): Website Company Profile, Menu Digital (NFC/QR), dan Sistem Estimasi Reservasi Rindang Teduh

| Atribut Dokumen | Detail Informasi |
| :--- | :--- |
| **Nama Produk** | Rindang Teduh Web Platform & Dynamic CMS |
| **Organisasi / Klien** | Cafe Rindang Teduh — Politeknik Negeri Media Kreatif |
| **Versi Dokumen** | 1.0 (Selaras dengan SRS v0.2 & Arsitektur Cloud Gratis) |
| **Tanggal Terbit** | 9 November 2026 |
| **Status Dokumen** | Siap Implementasi (Approved Architecture) |
| **Pemilik Produk (Owner)** | Agus |
| **Tim Pengembang** | Januar Atmaja (Project Manager), Muhammad Dailami (System Analyst), Muhammad Hisyam Patih Masan (Developer), Radzka Adzqara (Designer) |
| **Target Infrastruktur** | Next.js (Vercel Hobby Plan) + Supabase (PostgreSQL, Auth, Storage Free Tier) — Biaya Operasional $0/Bulan |

## 1. Ringkasan Eksekutif & Visi Produk

Rindang Teduh membutuhkan platform web terpadu yang menggabungkan identitas visual bergaya editorial dengan fleksibilitas pengelolaan operasional harian tanpa biaya berlangganan server bulanan. Sistem ini dirancang untuk menyelesaikan keterbatasan visibilitas online yang sebelumnya hanya bergantung pada media sosial, keterbatasan jumlah menu cetak fisik di area cafe, serta proses tanya-jawab estimasi reservasi manual di Direct Message (DM).

Platform ini memiliki **3 fungsi utama untuk pengunjung** dan **1 panel CMS internal untuk pengelola**:

1. **Company Profile (Visibilitas Online):** Menampilkan identitas Rindang Teduh, cerita ruang, foto suasana, jam operasional, peta lokasi interaktif, serta kanal kontak resmi [@rindangteduh_](https://www.instagram.com/rindangteduh_/).
2. **Menu Digital Multi-Akses (NFC, QR Code, dan Browser):** Menyajikan katalog menu digital beserta foto, deskripsi, kategori, harga, dan status ketersediaan stok secara *real-time* yang dapat diakses dengan menempelkan ponsel pada stiker NFC di meja, memindai QR Code cetak, atau mengetik URL secara manual di browser.
3. **Kalkulator Estimasi & Pengajuan Reservasi:** Memungkinkan calon penyewa tempat mensimulasikan estimasi biaya reservasi berdasarkan jumlah orang dan durasi waktu, memeriksa ketentuan serta kapasitas tempat, menyimpan permintaan reservasi, dan melanjutkan konfirmasi akhir ke Instagram DM dengan kode booking unik.
4. **CMS Internal Dinamis (Menu & Parameter Reservasi):** Memungkinkan Pemilik/Manajemen mengubah batas minimal/maksimal kapasitas orang, tarif reservasi, ketentuan, dan item menu kapan saja tanpa mengubah kode program, serta memudahkan Kasir memperbarui status stok menu (`Tersedia` / `Habis`) secara instan.

## 2. Ruang Lingkup Produk (Scope)

### 2.1 Fitur Dalam Lingkup Rilis Pertama (In-Scope MVP)

* Halaman publik Company Profile dengan arah visual *dark editorial* yang terinspirasi dari tata letak [IPPUKU&MATCHA](https://ippukuandmatcha.jp/) namun sepenuhnya menggunakan identitas dan aset asli Rindang Teduh.
* Halaman Menu Digital responsif dengan fitur filter kategori, pencarian cepat, indikator stok, serta dukungan akses langsung via tag NFC dan QR Code.
* Kalkulator Estimasi Reservasi interaktif yang membaca aturan kapasitas (minimal/maksimal kursi) dan formula harga secara dinamis dari database CMS.
* Formulir pengajuan reservasi yang mencatat data pemesan, persetujuan pelindungan data pribadi, *snapshot* estimasi harga, pembuatan kode booking otomatis, fitur salin ringkasan pesan, dan pengalihan (*redirect*) ke Instagram [@rindangteduh_](https://www.instagram.com/rindangteduh_/).
* Dashboard CMS berbasis peran (*Role-Based Access Control*) untuk Pemilik, Manajemen Bisnis, Kasir, dan Pengembang.
* Generator QR Code dan tautan siap-pakai untuk pemrograman tag NFC langsung dari dalam CMS Admin.
* Arsitektur nirbiaya (*Zero-Cost Architecture*) dengan kompresi foto WebP otomatis di sisi browser dan penjadwalan *Keep-Alive Cron* agar database gratis tidak pernah mati otomatis.

### 2.2 Fitur Di Luar Lingkup Rilis Pertama (Out-of-Scope / Fase 2)

* **Modul POS (Point of Sales):** Pencatatan transaksi kasir dan pembayaran pesanan makan di tempat direncanakan untuk pengembangan Fase 2.
* **Modul Chatbot Otomatis:** Otomasi tanya-jawab pelanggan dan konfirmasi reservasi via bot direncanakan untuk Fase 2.
* **Integrasi Payment Gateway:** Tidak ada pembayaran online di dalam website pada rilis awal; seluruh angka biaya reservasi yang tampil berstatus sebagai **estimasi** hingga dikonfirmasi admin.

## 3. Persona Pengguna & Matriks Hak Akses (RBAC)

Untuk menghilangkan ambiguitas antara dokumen perencanaan dan diagram teknis sebelumnya, sistem menerapkan empat peran pengguna terautentikasi di CMS serta satu peran pengunjung publik:

| Peran Pengguna | Kode Role Database | Frekuensi Akses | Hak Akses & Tanggung Jawab Utama di Sistem |
| :--- | :--- | :--- | :--- |
| **Pengunjung / Pelanggan** | `PUBLIC` (Tanpa Login) | Sesuai kebutuhan | Mengakses Company Profile, membuka Menu Digital via NFC/QR/Browser, menghitung estimasi biaya reservasi, dan mengirimkan formulir permintaan reservasi. |
| **Kasir** | `CASHIER` | Harian (Intensif) | Masuk ke CMS untuk mengubah status ketersediaan menu (`Tersedia` / `Habis`) secara cepat, melihat daftar reservasi yang masuk, dan memperbarui status kedatangan reservasi tanpa bisa mengubah harga menu maupun aturan rumus reservasi. |
| **Manajemen Bisnis** | `MANAGEMENT` | Mingguan / Bulanan | Mengelola seluruh data menu (tambah, ubah harga, hapus, kategori), menyunting profil cafe/jam operasional, mengatur parameter kalkulator reservasi (batas min/maks orang, harga, durasi), dan memproses status reservasi. |
| **Pemilik Cafe (Owner)** | `OWNER` | Mingguan / Bulanan | Memiliki seluruh hak akses Manajemen Bisnis ditambah pengelolaan akun staf CMS dan pemantauan log audit aktivitas sistem. |
| **Pengembang (Developer)** | `DEVELOPER` | Berkala (Pemeliharaan) | Memantau kesehatan sistem, log keamanan autentikasi, kuota penyimpanan database/storage, serta pemeliharaan teknis. |

## 4. Kebutuhan Fungsional (Functional Requirements)

### 4.1 Modul Publik: Company Profile & Pengenalan Bisnis

| ID Req. | Nama Fitur | Deskripsi Kebutuhan & Perilaku Sistem | Prioritas |
| :--- | :--- | :--- | :--- |
| **PRD-F-01** | Beranda & Identitas Visual | Sistem menampilkan halaman utama dengan hero fotografi Rindang Teduh, narasi singkat pengenalan cafe, dan CTA utama menuju Menu Digital serta Reservasi. | Tinggi |
| **PRD-F-02** | Informasi Lokasi & Jam Operasional | Sistem menampilkan alamat lengkap, daftar jam operasional per hari (termasuk indikator buka/tutup hari ini), galeri foto suasana tempat, serta tautan/peta lokasi Google Maps. | Tinggi |
| **PRD-F-03** | Integrasi Kontak & Sosial Media | Sistem menyediakan tombol CTA kontak yang mengarahkan pengguna langsung ke profil atau DM Instagram resmi [@rindangteduh_](https://www.instagram.com/rindangteduh_/) maupun nomor WhatsApp yang terdaftar di CMS. | Tinggi |

### 4.2 Modul Publik: Menu Digital (NFC, QR Code & Browser)

| ID Req. | Nama Fitur | Deskripsi Kebutuhan & Perilaku Sistem | Prioritas |
| :--- | :--- | :--- | :--- |
| **PRD-F-04** | Akses Menu Multi-Kanal | Halaman menu dapat diakses melalui URL pendek permanen (`/menu`) yang ditanamkan pada stiker NFC meja, kode QR cetak, maupun navigasi langsung dari beranda maksimal dalam 1 klik. | Tinggi |
| **PRD-F-05** | Katalog, Filter Kategori & Pencarian | Sistem menampilkan daftar menu lengkap (foto proporsional, nama, kategori, deskripsi singkat, harga dalam Rupiah, dan badge ketersediaan) disertai filter kategori instan dan kolom pencarian nama menu tanpa *reload* halaman. | Tinggi |
| **PRD-F-06** | Detail Item Menu | Saat pengunjung memilih salah satu kartu menu, sistem menampilkan tampilan detail berisi foto resolusi jelas, deskripsi lengkap komposisi/rasa, harga, dan status stok terkini. | Sedang |
| **PRD-F-07** | Sinkronisasi Stok Real-Time | Setiap perubahan harga, item menu baru, atau perubahan status stok (`Tersedia` / `Habis`) yang disimpan dari CMS langsung tampil kepada pengunjung melalui mekanisme *On-Demand Cache Revalidation*. | Tinggi |

### 4.3 Modul Publik: Kalkulator Estimasi & Pengajuan Reservasi

| ID Req. | Nama Fitur | Deskripsi Kebutuhan & Perilaku Sistem | Prioritas |
| :--- | :--- | :--- | :--- |
| **PRD-F-08** | Informasi Ketentuan & Kapasitas Reservasi | Sistem menampilkan syarat dan ketentuan reservasi, jam/jadwal yang tersedia, tarif dasar, serta informasi batas kapasitas minimal dan maksimal ruangan yang berlaku saat ini sesuai pengaturan CMS. | Tinggi |
| **PRD-F-09** | Kalkulator Estimasi Biaya Interaktif | Pengunjung dapat memilih tanggal, jam kedatangan, opsi durasi (jika diaktifkan), dan jumlah partisipan. Sistem langsung menghitung dan menampilkan rincian estimasi biaya secara otomatis di layar. | Tinggi |
| **PRD-F-10** | Validasi Batas Minimal & Maksimal Dinamis | Sistem memvalidasi jumlah partisipan terhadap nilai `min_guests` dan `max_guests` dari CMS. Jika jumlah peserta melebihi `max_guests` (misal 80 orang), sistem menerapkan perilaku sesuai pengaturan Owner di CMS: menolak pengiriman (*Strict Mode*) atau tetap mengizinkan dengan peringatan ketersediaan kursi tambahan (*Warning Mode*). | Tinggi |
| **PRD-F-11** | Penyimpanan Permintaan Reservasi | Saat pengunjung menekan tombol lanjut, sistem memvalidasi input (nama lengkap, nomor telepon/WhatsApp aktif, tanggal, jam, durasi, jumlah orang, dan centang persetujuan data pribadi), lalu menyimpan data ke database dengan status awal `PENDING` ("Menunggu Konfirmasi") beserta kode booking unik (contoh: `RT-2611-001`). | Tinggi |
| **PRD-F-12** | Salin Ringkasan & Redirect Konfirmasi Instagram | Setelah reservasi tersimpan di database, sistem menampilkan kartu bukti pengajuan, menyediakan tombol salin format pesan otomatis (berisi Kode Booking, Nama, Jadwal, Jumlah Orang, dan Estimasi Harga), lalu mengarahkan pengguna ke Instagram [@rindangteduh_](https://www.instagram.com/rindangteduh_/) untuk konfirmasi akhir. | Tinggi |

### 4.4 Modul Internal: CMS Admin (Pengelolaan Konten, Menu & Aturan Reservasi)

| ID Req. | Nama Fitur | Deskripsi Kebutuhan & Perilaku Sistem | Prioritas |
| :--- | :--- | :--- | :--- |
| **PRD-F-13** | Autentikasi & Manajemen Sesi Admin | Sistem menyediakan halaman login aman untuk Owner, Manajemen, Kasir, dan Developer menggunakan Supabase Auth, dilengkapi proteksi rute berbasis peran dan pengakhiran sesi otomatis setelah 30 menit tidak aktif. | Tinggi |
| **PRD-F-14** | CMS Pengaturan Parameter Reservasi Dinamis | Owner dan Manajemen dapat mengubah parameter reservasi kapan saja melalui CMS: batas minimal orang (`min_guests`), batas maksimal orang (`max_guests`), mode kelebihan kapasitas (`STRICT` / `WARNING`), model rumus harga (`PER_PERSON`, `PER_HOUR`, atau `COMBINED`), nominal tarif per orang, nominal tarif per jam, pilihan durasi yang diizinkan, teks ketentuan reservasi, serta saklar buka/tutup penerimaan reservasi. | Tinggi |
| **PRD-F-15** | CMS Manajemen Menu & Kategori (CRUD) | Owner dan Manajemen dapat menambah, mengubah, mengurutkan, dan menghapus kategori serta item menu (termasuk unggah foto menu yang otomatis dikompresi menjadi WebP di bawah 200 KB). | Tinggi |
| **PRD-F-16** | Panel Cepat Stok Menu untuk Kasir | Kasir memiliki tampilan daftar menu dengan tombol saklar (*toggle switch*) cepat untuk mengubah status `Tersedia` / `Habis` dalam satu ketukan tanpa akses mengubah harga atau menghapus menu. | Tinggi |
| **PRD-F-17** | Pemrosesan & Riwayat Status Reservasi | Admin berwenang dapat memfilter daftar reservasi berdasarkan tanggal/status, melihat detail kontak pemesan, dan memperbarui status reservasi (`PENDING` / Menunggu Konfirmasi, `CONFIRMED` / Dikonfirmasi, `REJECTED` / Ditolak, `CANCELLED` / Dibatalkan, `COMPLETED` / Selesai). Setiap perubahan status tercatat otomatis di tabel riwayat audit. | Tinggi |
| **PRD-F-18** | CMS Profil Cafe & Generator QR/NFC | Owner dan Manajemen dapat menyunting deskripsi cafe, alamat, link Google Maps, jam operasional harian, foto tempat, serta mengunduh QR Code beranda/menu siap cetak dan menyalin URL terformat untuk dimasukkan ke tag NFC meja. | Sedang |
| **PRD-F-19** | Pencatatan Log Keamanan & Aktivitas | Sistem mencatat riwayat login, logout, percobaan login gagal (waktu, IP/perangkat), serta perubahan status reservasi untuk keperluan audit internal. | Sedang |

## 5. Logika Kalkulator Reservasi & Kustomisasi CMS

Agar pemilik bisnis memiliki kendali penuh saat kondisi cafe berubah (misalnya saat musim ramai, acara khusus, atau perubahan konfigurasi meja), rumus estimasi tidak dikunci secara statis di dalam kode program, melainkan dikendalikan oleh tabel `reservation_rules`:

### 5.1 Variabel yang Dapat Diatur Owner di CMS

1. **Batas Minimal Peserta (`min_guests`):** Nilai integer (contoh default: `1` atau `5` orang). Jika pengunjung mengisi di bawah angka ini, form menampilkan pesan bahwa jumlah peserta belum memenuhi batas minimal reservasi.
2. **Batas Maksimal Peserta (`max_guests`):** Nilai integer (contoh default: `80` orang). Owner dapat menurunkan angka ini (misal menjadi `30` atau `50` orang) kapan saja dari CMS.
3. **Mode Perlakuan Kapasitas Maksimal (`over_capacity_mode`):**
   * `STRICT`: Pengunjung tidak dapat memilih angka di atas `max_guests`.
   * `WARNING`: Pengunjung tetap dapat mengajukan angka di atas `max_guests`, namun sistem memunculkan kotak peringatan kuning berisi informasi kurangnya ketersediaan kursi sesuai ketentuan cafe.
4. **Rumus Perhitungan Estimasi (`pricing_formula`):**
   * `Total Estimasi = (Jumlah Peserta × price_per_person) + (Durasi Jam × price_per_hour) + base_booking_fee`
   * Apabila Rindang Teduh hanya menerapkan tarif per orang tanpa biaya durasi, Owner cukup mengisi `price_per_hour = 0` dan `base_booking_fee = 0` di CMS. Sebaliknya, apabila tarif dihitung murni per jam sewa tempat, Owner cukup mengisi `price_per_person = 0`.

## 6. Spesifikasi Arah Visual & Desain Antarmuka (UI/UX)

Desain antarmuka memadukan ketenangan suasana Rindang Teduh dengan tata letak editorial modern:

### 6.1 Sistem Warna (Color Tokens)

| Nama Token | Kode Hex | Peruntukan Elemen Antarmuka |
| :--- | :--- | :--- |
| `Forest Night` | `#0B1410` | Latar belakang utama area gelap, header solid saat digulir, dan footer. |
| `Canopy` | `#14231B` | Permukaan kartu (*card surface*) dan panel informasi pada section gelap. |
| `Deep Forest` | `#244333` | Tombol aksi utama (CTA) pada latar terang dan elemen indikator aktif. |
| `Moss` | `#74866A` | Aksen sekunder, ikon dekoratif, dan badge kategori. |
| `Matcha Mist` | `#B8C7A3` | Efek *hover* dan sorotan (*focus ring*) lembut pada permukaan gelap. |
| `Warm Cream` | `#F2EEE3` | Latar belakang section terang (katalog menu & form reservasi) serta warna teks utama di atas latar gelap. |
| `Paper` | `#FCFAF5` | Permukaan kartu menu dan kartu input form pada area terang serta latar utama CMS Admin. |
| `Ink` | `#202820` | Warna teks utama berdaya baca tinggi pada latar `Warm Cream` dan `Paper`. |
| `Muted Ink` | `#626B60` | Warna teks sekunder, keterangan harga, dan petunjuk input pada latar terang. |

### 6.2 Prinsip Tata Letak & Responsivitas

* **Ritme Terang-Gelap (Tanpa Toggle Tema):** Halaman publik dibuka dengan nuansa *dark editorial* (`Forest Night`) pada bagian Hero dan Cerita Cafe, lalu berganti ke permukaan terang (`Warm Cream` dan `Paper`) pada bagian Katalog Menu dan Form Reservasi agar teks daftar harga serta input form nyaman dibaca di berbagai kondisi pencahayaan.
* **Optimalisasi Layar Ponsel (NFC/QR First):** Mengingat mayoritas pengunjung di lokasi cafe mengakses menu melalui tap NFC atau scan QR Code dari ponsel, navigasi kategori menu dibuat menempel di atas layar (*sticky horizontal pill bar*) dengan area sentuh tombol minimal `44×44px`.
* **Dashboard CMS Netral & Cepat Dipindai:** Antarmuka `/admin` menggunakan latar terang (`Paper` `#FCFAF5`) dengan tabel dan kartu ringkas tanpa animasi berat agar mudah dioperasikan oleh Kasir maupun Owner.

## 7. Arsitektur Teknis & Strategi Operasional Gratis ($0/Bulan)

Sistem dibangun menggunakan tumpukan teknologi modern yang sepenuhnya berjalan di atas paket gratis permanen tanpa mengorbankan performa maupun keamanan:

### 7.1 Spesifikasi Stack Teknologi

* **Frontend & Backend Framework:** Next.js (App Router, TypeScript) dengan Server Components dan Server Actions.
* **Styling & Komponen UI:** Tailwind CSS dengan variabel warna kustom Rindang Teduh.
* **Hosting & Edge CDN:** Vercel (Hobby Tier — gratis selamanya, HTTPS otomatis, bandwidth 100 GB/bulan).
* **Database, Autentikasi & Penyimpanan:** Supabase (Free Tier — PostgreSQL 500 MB, Supabase Auth 50.000 MAU, Supabase Storage 1 GB).

### 7.2 Tiga Mekanisme Pengaman Kuota Gratis

1. **Strategi *On-Demand ISR* (Nol Beban Database Saat Cafe Ramai):** Halaman Company Profile, Menu Digital, dan aturan kalkulator disimpan di *Edge Cache* Vercel. Saat ratusan pengunjung men-tap NFC atau memindai QR Code di meja, server langsung mengirimkan halaman dari cache CDN dalam waktu kurang dari 1,5 detik tanpa memanggil database Supabase. Cache hanya diperbarui secara instan ketika Owner atau Kasir menekan tombol simpan perubahan di CMS.
2. **Kompresi Gambar Otomatis di Sisi Klien (*Client-Side WebP Compression*):** Sebelum foto menu atau foto tempat diunggah ke Supabase Storage, browser admin secara otomatis mengecilkan dimensi gambar ke batas optimal (maksimal lebar `1200px`) dan mengubah formatnya menjadi `.webp` berukuran di bawah `150 KB`. Dengan cara ini, kuota gratis 1 GB dapat menyimpan lebih dari 6.500 foto dan memenuhi standar waktu muat cepat.
3. **Penjaga Keaktifan Database (*Keep-Alive Cron Job*):** Untuk mencegah aturan Supabase Free Tier yang menghentikan sementara proyek apabila tidak ada aktivitas selama 7 hari, konfigurasi `vercel.json` menjalankan jadwal otomatis setiap 3 hari sekali ke rute `/api/keep-alive` guna memastikan database selalu siaga 24/7.

## 8. Rancangan Skema Database (Supabase PostgreSQL)

Berikut adalah struktur tabel relasional yang mendukung seluruh kebutuhan fungsional dan fleksibilitas CMS:

| Nama Tabel | Kolom & Tipe Data Utama | Deskripsi & Relasi |
| :--- | :--- | :--- |
| **`user_profiles`** | `id` (UUID, PK FK `auth.users`), `full_name` (TEXT), `role` (ENUM: `OWNER`, `MANAGEMENT`, `CASHIER`, `DEVELOPER`), `is_active` (BOOL), `created_at` (TIMESTAMPTZ) | Menyimpan profil staf internal dan peran untuk aturan keamanan *Row Level Security* (RLS). |
| **`cafe_settings`** | `id` (INT, PK), `cafe_name` (TEXT), `tagline` (TEXT), `story_text` (TEXT), `address` (TEXT), `maps_embed_url` (TEXT), `maps_link_url` (TEXT), `instagram_url` (TEXT), `whatsapp_number` (TEXT), `operating_hours` (JSONB), `hero_image_url` (TEXT), `gallery_images` (JSONB), `updated_at` (TIMESTAMPTZ) | Tabel *single-row* yang menyimpan seluruh konten Company Profile yang dapat disunting dari CMS. |
| **`menu_categories`** | `id` (UUID, PK), `name` (TEXT), `slug` (TEXT), `sort_order` (INT), `is_active` (BOOL) | Menyimpan pengelompokan kategori menu (contoh: Signature Coffee, Non-Coffee, Pastry, Makanan Berat). |
| **`menu_items`** | `id` (UUID, PK), `category_id` (UUID, FK), `name` (TEXT), `description` (TEXT), `price` (INT), `image_url` (TEXT), `is_available` (BOOL), `is_featured` (BOOL), `sort_order` (INT), `updated_at` (TIMESTAMPTZ) | Menyimpan seluruh item menu. Kolom `is_available` dapat diubah langsung oleh peran `CASHIER`. |
| **`reservation_rules`** | `id` (INT, PK), `is_booking_open` (BOOL), `min_guests` (INT), `max_guests` (INT), `over_capacity_mode` (ENUM: `STRICT`, `WARNING`), `over_capacity_note` (TEXT), `price_per_person` (INT), `price_per_hour` (INT), `base_fee` (INT), `available_durations` (INT[]), `available_time_slots` (TEXT[]), `terms_and_conditions` (TEXT), `updated_at` (TIMESTAMPTZ) | Tabel *single-row* yang mengendalikan seluruh perilaku kalkulator estimasi reservasi dan validasi batas kapasitas. |
| **`reservations`** | `id` (UUID, PK), `booking_code` (TEXT, UNIQUE), `customer_name` (TEXT), `customer_phone` (TEXT), `booking_date` (DATE), `booking_time` (TIME), `duration_hours` (INT), `guest_count` (INT), `estimated_price` (INT), `customer_notes` (TEXT), `status` (ENUM: `PENDING`, `CONFIRMED`, `REJECTED`, `CANCELLED`, `COMPLETED`), `privacy_consent` (BOOL), `retention_until` (DATE), `processed_by` (UUID, FK), `created_at` (TIMESTAMPTZ) | Menyimpan setiap permintaan reservasi dari pengunjung beserta *snapshot* estimasi biaya saat pengajuan dibuat. |
| **`activity_logs`** | `id` (UUID, PK), `user_id` (UUID, FK), `reservation_id` (UUID, FK, Nullable), `action_type` (TEXT), `previous_state` (TEXT), `new_state` (TEXT), `ip_address` (TEXT), `user_agent` (TEXT), `created_at` (TIMESTAMPTZ) | Mencatat jejak audit autentikasi admin serta riwayat perubahan status reservasi dan aturan CMS. |

## 9. Kebutuhan Non-Fungsional & Kepatuhan (Non-Functional Requirements)

| ID Req. | Kategori | Spesifikasi & Target Pengukuran |
| :--- | :--- | :--- |
| **PRD-NF-01** | **Performa Halaman Publik** | Waktu muat awal (*Largest Contentful Paint*) halaman utama dan halaman `/menu` kurang dari 2,5 detik pada jaringan 4G seluler (melampaui batas minimal SRS 5 detik), dengan skor Google Lighthouse Performance minimal 85. |
| **PRD-NF-02** | **Kapasitas Trafik Bersamaan** | Mampu melayani lebih dari 100 pengunjung bersamaan yang memindai QR Code atau men-tap NFC di area cafe tanpa penurunan performa berkat distribusi statis CDN Vercel. |
| **PRD-NF-03** | **Optimasi Gambar & Koneksi Lambat** | Seluruh gambar tampilan berukuran maksimal 200 KB dalam format WebP, menggunakan *lazy loading* untuk gambar di luar layar awal, serta tetap menampilkan teks nama dan harga menu terlebih dahulu saat kecepatan jaringan di bawah 2 Mbps. |
| **PRD-NF-04** | **Keamanan Aplikasi & Database** | Terlindungi dari celah keamanan mengacu pada OWASP Top 10 (SQL Injection dicegah melalui parameterisasi SDK Supabase, XSS dicegah melalui *auto-escaping* React, serta akses tabel dibatasi langsung oleh kebijakan *Row Level Security* PostgreSQL). |
| **PRD-NF-05** | **Pelindungan Data Pribadi (UU PDP)** | Mengacu pada UU No. 27 Tahun 2022, formulir reservasi wajib menyertakan kotak centang persetujuan pemrosesan data pribadi (`privacy_consent`) dan menerapkan masa retensi data pemesan (`retention_until`, default 1 tahun) yang hanya dapat diakses oleh staf berwenang. |
| **PRD-NF-06** | **Kompatibilitas Perangkat & Browser** | Berjalan optimal pada Chrome, Safari (iOS), Firefox, dan Edge versi terbaru, baik melalui layar smartphone (ketika diakses via NFC/QR) maupun desktop/tablet (untuk operasional CMS Admin). |

## 10. Tahapan Implementasi & Kriteria Penerimaan (Acceptance Criteria)

### 10.1 Urutan Pengerjaan (Roadmap)

1. **Tahap 1 — Fondasi Database & Keamanan Supabase:** Eksekusi skema SQL (7 tabel), konfigurasi *Row Level Security* (RLS), pembuatan bucket *Supabase Storage* untuk foto menu/cafe, dan pembuatan akun awal untuk Owner serta Kasir.
2. **Tahap 2 — Fondasi Next.js & CMS Internal (`/admin`):** Pembuatan halaman login, dashboard pengelolaan kategori/menu, saklar stok cepat untuk Kasir, form pengaturan dinamis aturan reservasi (batas min/maks orang & rumus harga), serta pengelola daftar reservasi masuk.
3. **Tahap 3 — Antarmuka Publik (Company Profile & Menu NFC/QR):** Implementasi halaman beranda bergaya *dark editorial*, halaman `/menu` dengan filter instan, dan fitur generator QR Code / tautan NFC di dalam CMS.
4. **Tahap 4 — Kalkulator Reservasi & Integrasi Redirect Instagram:** Implementasi komponen kalkulator interaktif yang terhubung ke tabel `reservation_rules`, form pengajuan reservasi dengan pembuatan kode booking unik, tombol salin pesan otomatis, dan pengalihan ke DM Instagram.
5. **Tahap 5 — Pengujian End-to-End & Deployment Gratis ke Vercel:** Konfigurasi `vercel.json` untuk *Keep-Alive Cron Job*, pengujian akses via keping NFC dan QR Code, audit performa Lighthouse, serta serah terima akses CMS kepada Owner Rindang Teduh.

### 10.2 Kriteria Selesai (Definition of Done)

* Pengunjung dapat membuka `/menu` dari pemindaian QR Code atau tap NFC dalam waktu di bawah 3 detik, memfilter kategori, dan melihat status stok yang akurat.
* Kasir dapat masuk ke `/admin`, mengubah status stok menu menjadi `Habis`, dan perubahan tersebut langsung terlihat di layar pengunjung saat halaman dimuat ulang.
* Owner dapat mengubah batas maksimal kapasitas reservasi (misalnya dari 80 orang menjadi 40 orang) atau mengubah harga per orang dari `/admin`, dan kalkulator di halaman `/reservasi` langsung mengikuti aturan baru tersebut tanpa perubahan kode.
* Pengunjung dapat menghitung estimasi biaya reservasi, mengisi kontak, menyimpan pengajuan (tercatat di CMS dengan status `PENDING`), menyalin ringkasan pesan berkode booking, dan diarahkan menuju Instagram [@rindangteduh_](https://www.instagram.com/rindangteduh_/).
* Seluruh sistem berjalan di lingkungan produksi Vercel dan Supabase tanpa tagihan bulanan ($0/bulan) dengan mekanisme *anti-pause* aktif.
