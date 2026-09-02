# 🚀 PANDUAN DEPLOYMENT DOCKER & CUSTOM DOMAIN TAHRA AI

Dokumen ini adalah panduan lengkap cara menjalankan TAHRA AI di Docker (laptop lokal) dan menghubungkannya ke **Custom Domain** (misal: `tahra.ai` atau `tahra.my.id`) agar bisa diakses online dari seluruh dunia secara stabil dan aman.

---

## 1. 🏗️ Arsitektur Container Docker

Sistem TAHRA AI telah dikemas menjadi 3 container independen, modular, dan terisolasi:

```
                                  [ CUSTOM DOMAIN: tahra.ai ]
                                                │
                                                ▼ (Port 80 / 443 SSL)
+───────────────────────────────────────────────────────────────────────────────────────────+
| 1. TAHRA-FRONTEND CONTAINER (Nginx Alpine + React Single Page App)                         |
| • Melayani UI web secepat kilat dengan Gzip Compression.                                  |
| • Me-reverse proxy setiap panggilan `/api/*` langsung ke Backend internal.               |
+─────────────────────────────────────────────┬─────────────────────────────────────────────+
                                              │
                                              ▼ (Internal Network: Port 8000)
+───────────────────────────────────────────────────────────────────────────────────────────+
| 2. TAHRA-BACKEND CONTAINER (FastAPI Python 3.11 Multi-Agent Engine)                       |
| • Menjalankan orkestrasi 5 Sub-Agent AI secara paralel & deterministik.                   |
| • Terhubung ke LLM Gateway (Groq / Hermes-3 / OpenAI).                                   |
+─────────────────────────────────────────────┬─────────────────────────────────────────────+
                                              │
                                              ▼ (Internal Network: Port 5432)
+───────────────────────────────────────────────────────────────────────────────────────────+
| 3. TAHRA-DB CONTAINER (PostgreSQL 16 Alpine + Persistent Volume)                          |
| • Menyimpan data kampanye, memori pembelajaran AI, dan riwayat optimasi.                  |
| • Data tetap aman tersimpan di volume `tahra_db_data` meskipun container direstart.       |
+───────────────────────────────────────────────────────────────────────────────────────────+
```

---

## 2. ⚡ Cara Menjalankan di Docker Laptop (1 Perintah)

### Langkah 1: Pastikan Docker Desktop Aktif
Buka aplikasi **Docker Desktop** di laptop Anda.

### Langkah 2: Konfigurasi Environment File
Salin file `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```
Isi `GROQ_API_KEY` atau `OPENAI_API_KEY` Anda di dalam `.env`.

### Langkah 3: Build & Jalankan Seluruh Sistem
Buka terminal di root folder project, lalu jalankan:
```bash
docker compose up -d --build
```

*Selesai!* Seluruh sistem (Database PostgreSQL, Backend FastAPI, dan Frontend Nginx) akan menyala otomatis di background.
* Frontend Web: `http://localhost/`
* Backend API Docs: `http://localhost:8000/docs`

---

## 3. 🌐 Cara Menghubungkan ke Custom Domain (Online dari Laptop)

Karena Anda menjalankan Docker dari laptop lokal, cara terbaik, paling aman, dan **gratis 100% tanpa perlu IP Public / Port Forwarding router** adalah menggunakan **Cloudflare Tunnel (Recommended)**:

### Langkah A: Beli Domain
1. Beli domain di penyedia mana saja (Namecheap, Niagahoster, Domainesia, Cloudflare Registrar).
2. Hubungkan NameServer domain Anda ke **Cloudflare** (Gratis).

### Langkah B: Pasang Cloudflare Tunnel (`cloudflared`)
1. Di Dashboard Cloudflare, buka menu **Zero Trust** $\rightarrow$ **Networks** $\rightarrow$ **Tunnels**.
2. Klik **Create a Tunnel**, beri nama `tahra-prod`.
3. Pilih OS Windows/Docker, copy perintah token yang diberikan Cloudflare.
4. Di bagian **Public Hostname**:
   * **Domain:** Masukkan domain Anda (contoh: `app.tahra.ai` atau `tahra.my.id`)
   * **Service Type:** `HTTP`
   * **URL:** `localhost:80` (mengarahkan ke container frontend Nginx)
5. Simpan! Seketika domain Anda sudah **ONLINE dengan HTTPS/SSL resmi**, proteksi DDoS Cloudflare, dan langsung terhubung ke Docker di laptop Anda!

---

## 4. 🛠️ Perintah Berguna Docker Management

| Kebutuhan | Perintah Terminal |
|---|---|
| **Cek Status Semua Container** | `docker compose ps` |
| **Melihat Log Real-Time Backend** | `docker compose logs -f tahra-backend` |
| **Restart Seluruh Sistem** | `docker compose restart` |
| **Hentikan Sistem** | `docker compose down` |
| **Hapus Bersih & Rebuild** | `docker compose down -v && docker compose up -d --build` |
