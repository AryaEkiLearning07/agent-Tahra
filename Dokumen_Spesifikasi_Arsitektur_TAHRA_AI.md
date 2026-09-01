# BLUEPRINT ARSITEKTUR SISTEM
## DOKUMEN SPESIFIKASI ARSITEKTUR SISTEM: TAHRA AI

**Kategori Lomba:** Business Automation (AI HackFest 2026)  
**Tim:** TAHRA  
**Filosofi Sistem:** Multi-Agent Orchestration, Clean Parameter (Strict Typed & Immutable), dan Unit Economics-First (Anti-Boncos)

---

## 1. EXECUTIVE SUMMARY

**TAHRA AI** adalah Sistem Multi-Agent otonom yang berfungsi sebagai *Digital Marketing Strategist & Executor*. Sistem ini dirancang untuk menggantikan peran agensi marketing tradisional bagi UMKM. Nilai jual utama TAHRA AI terletak pada kemampuannya melakukan simulasi matematika periklanan (CPM, CTR, CVR) untuk menjamin ROAS (*Return on Ad Spend*) yang positif sebelum iklan dijalankan, sehingga meminimalisir risiko boncos.

Sistem ini menggunakan 5 Fase berurutan (*Sequential Pipeline*), di mana setiap Fase dijalankan oleh Sub-Agent spesialis yang memiliki System Prompt dan Domain Knowledge terisolasi. Komunikasi antar Sub-Agent mutlak menggunakan format JSON murni.

---

## 2. ARSITEKTUR MULTI-AGENT (HYPER-DETAILED FLOW)

Data mengalir dari Hulu (Input User) ke Hilir (Laporan ROAS) melalui 5 Fase berikut:

### FASE 1: PRODUCT UNDERSTANDING DEPARTMENT
**Tujuan:** Agent harus menjadi "Ahli" yang memahami produk secara fundamental.

*   **Sub-Agent 1A (The Decoder):**
    *   **Tugas:** Mengekstrak fitur, benefit utama, dan kekurangan produk dari deskripsi teks yang diinput user. Mengkategorikan produk ke dalam kelas daya beli (Murah/Menengah/Premium).
    *   **Output JSON:** `{product_name, key_features, product_class, audience_psychography}`
*   **Sub-Agent 1B (The Vision Analyzer) - *Jika ada upload gambar*:**
    *   **Tugas:** Menganalisis foto produk yang di-upload. Menilai kualitas pencahayaan, kesan premium/murahan, dan kelayakan visual untuk beriklan.
    *   **Output JSON:** `{visual_quality_score, visual_recommendation}`

---

### FASE 2: THE BUSINESS CONSULTANT
**Tujuan:** Memberikan validasi finansial dan nasihat tajam (Mencegah Boncos dari Akar).

*   **Sub-Agent 2 (The Advisor):**
    *   **Tugas:** Menghitung Unit Economics menggunakan data dari Fase 1.
    *   **Logika Domain:** Menghitung Margin = Harga Jual - HPP. Jika Margin < 20%, Agent memveto kampanye dan memberi saran restrukturisasi harga. Jika Margin sehat (>30%), lanjut ke fase perancangan.
    *   **Output JSON:** `{margin_value, margin_percentage, financial_status, consultation_advice}`

---

### FASE 3: THE STRATEGY ARCHITECT
**Tujuan:** Merancang medan perang iklan (Tempat, Target, dan Cara Bayar).

*   **Sub-Agent 3 (The Media Planner):**
    *   **Tugas:** Menentukan platform, demografi target, dan model bidding.
    *   **Logika Domain (Heuristik Channel Fit):**
        *   Produk visual & target Gen-Z $ightarrow$ Pilih TikTok/IG Reels (Format 9:16).
        *   Produk B2B/Jasa & target dewasa $ightarrow$ Pilih Google Search/LinkedIn.
    *   **Logika Domain (Bidding & ROAS):** Menetapkan batas maksimal *Cost Per Acquisition* (CPA) yaitu maksimal 40% dari Margin Profit.
    *   **Output JSON:** `{target_demography, platform, aspect_ratio, bidding_model, max_cpa_limit}`

---

### FASE 4: THE CREATIVE DEPARTMENT
**Tujuan:** Memproduksi materi iklan siap pakai berdasarkan strategi Fase 3.

*   **Sub-Agent 4A (The Copywriter):** Menulis teks iklan menggunakan framework PAS (*Problem - Agitate - Solution*). Menyesuaikan tone suara dengan demografi target.
*   **Sub-Agent 4B (The Art Director):** Membuat prompt bahasa Inggris detail untuk Text-to-Image API, memasukkan aspect ratio dari Sub-Agent 3.
*   **Sub-Agent 4C (The Video Scriptwriter):** Jika platform adalah TikTok/Reels, menulis naskah video per-detik (0-3s Hook, 3-10s Body, 10-15s CTA).
*   **Sub-Agent 4D (Image Executor - Pure Code):** Skrip Python/Node.js yang memanggil API Image Generator menggunakan prompt dari Sub-Agent 4B.
*   **Output JSON:** `{headline, primary_text, cta, image_prompt, generated_image_url, video_script}`

---

### FASE 5: FINANCIAL CONTROLLER & REPORTER
**Tujuan:** Quality Assurance, Adversarial Checking, dan kompilasi laporan akhir.

*   **Sub-Agent 5A (The Adversarial Evaluator):**
    *   **Tugas:** Mengecek konsistensi silang. Apakah harga di Caption (4A) sama dengan input awal? Apakah estimasi ROAS (3) masuk akal dengan budget?
    *   **Self-Improvement Loop:** Jika ada inkonsistensi (Status: `REJECTED`), Agent 5A mengirim feedback ke Sub-Agent 4 untuk mengulang kreasi. Jika sinkron (Status: `APPROVED`), lanjut ke Reporter.
*   **Sub-Agent 5B (The Financial Reporter):** Mengkompilasi seluruh data menjadi *Predictive Financial Report* untuk User.

---

## 3. DESAIN FRONTEND & USER DASHBOARD (REACT)

Frontend dibangun menggunakan React & Tailwind CSS. Dibagi menjadi 3 Halaman/State Utama:

### Halaman 1: Dashboard Utama
*   Menampilkan Grid Card daftar produk yang sedang/sudah dianalisis.
*   Status Badge: `Draft` (Abu-abu), `Agent Thinking...` (Kuning, animasi pulse), `Completed` (Hijau).
*   Tombol di kanan atas: `[+ Buat Kampanye Baru]`.

### Halaman 2: Input Kampanye (Strict Parameter Form)
Form 2 kolom. Field Wajib (Tipe Ketat):
1. Nama Produk (String)
2. Harga Jual (Integer, prefix Rp)
3. HPP / Modal (Integer, prefix Rp)
4. Budget Iklan Harian (Integer, prefix Rp)
5. Kategori (Dropdown: Fisik, Jasa, Digital)
6. Upload Foto Produk (File Image)

*\* Saat Submit, data dikirim ke Backend Endpoint `/api/start-agent`.*

### Halaman 3: Detail Kampanye (Report Output)
Dibagi menjadi 2 State:
1.  **State "Thinking":** Menampilkan Vertical Stepper yang menunjukkan progress Sub-Agent 1 hingga 5 sedang bekerja.
2.  **State "Completed":** Menampilkan 3 Card Utama:
    *   **Card A (Consultant Advice):** Teks analisis dan peringatan finansial dari Sub-Agent 2.
    *   **Card B (Campaign Assets):** Caption Iklan, Script Video, dan Gambar Hasil AI dari Sub-Agent 4.
    *   **Card C (Financial & ROAS Projection):** Tabel prediksi matematis dari Sub-Agent 5.

#### Tabel Laporan Finansial (Card C)

| Metrik | Estimasi AI | Penjelasan untuk User |
| :--- | :--- | :--- |
| **Budget Harian** | Rp 100.000 | Angka yang Anda input |
| **Estimasi Tayangan (CPM)** | 5.000 orang | Orang yang lihat iklanmu |
| **Estimasi Klik (CTR 2%)** | 100 orang | Orang yang klik link |
| **Estimasi Pembeli (CVR 3%)** | 3 orang | Orang yang benar-benar beli |
| **Estimasi Omzet Harian** | Rp 75.000 | 3 x Harga Produk |
| **Estimasi Laba Bersih** | Rp 5.000 | Omzet - HPP - Biaya Iklan |
| **Proyeksi ROAS** | 75% | Setiap Rp 100 dikeluarkan, balik Rp 75 |

*\* (Jika ROAS < 100%, UI menampilkan Warning Merah).*

---

## 4. MEKANISME TRACKING & NARASI DEMO

Karena batasan waktu Hackathon, sistem tidak terintegrasi langsung dengan API Meta/Google Ads secara real-time.

**Mekanisme:** TAHRA AI menghasilkan *Campaign Blueprint JSON Payload* (setup iklan siap copy-paste) dan *Tracking Link* unik (misal: `tahra.ai/track?id=123`).

*   **Narasi Video Demo:** *"TAHRA AI tidak hanya merancang strategi, tetapi juga menyediakan tracking link. Saat UMKM memasang link ini, TAHRA AI secara konseptual dapat melacak siapa yang melakukan pembelian akibat iklan tersebut, dan memperbarui data ROAS-nya secara berkala di Dashboard."*

---

## 5. PANDUAN TEKNIS VIBE CODING & STRATEGI EKSEKUSI

### Strategi Pengembangan Local-First (Wajib):
Dikarenakan waktu kompetisi hanya 5 hari, tim **WAJIB** melakukan development di laptop pribadi masing-masing. Gunakan mock data (data dummy) untuk Frontend dan API OpenAI free tier sementara untuk Backend. Pada hari H saat VPS diaktifkan, kode tinggal di-Git Clone ke VPS, `requirements.txt` di-install, dan endpoint LLM bawaan Herme disambungkan.

#### A. Tugas Backend (Ketua - Python/FastAPI)
1. Buat file `main.py` menggunakan framework FastAPI.
2. Buat endpoint `POST /api/start-agent` yang menerima form input dari Frontend.
3. Buat 5 fungsi Python berurutan (Sub-Agent 1 hingga 5).
4. Panggil LLM di dalam setiap fungsi. Tanamkan System Prompt (Domain Knowledge Marketing) berbeda di setiap fungsi agar bersifat spesialis.
5. Kembalikan response JSON final berisi Blueprint dan Laporan ROAS ke Frontend.

#### B. Tugas Frontend (Anggota - React/Next.js)
1. Gunakan Vite + React + Tailwind CSS.
2. Bangun 3 Halaman sesuai Seksyen 3 di atas menggunakan Mock Data terlebih dahulu agar tidak menunggu Backend.
3. Integrasikan API Backend ke React setelah Backend siap.
4. Pastikan UI menampilkan loading state (Agent Thinking) agar terlihat seperti AI sedang berpikir.

---

> Dokumen ini merupakan cetak biru final yang mematuhi prinsip arsitektur AI (Sub-Agent), keterbatasan infrastruktur Hackathon (Simulasi Laporan), serta fokus pada nilai jual (Presisi ROAS & Anti-Boncos).
