# 🚀 PANDUAN DEPLOYMENT DOCKER & WORKFLOW UPDATE TAHRA.AI

Dokumen ini berisi panduan lengkap untuk men-deploy **Tahra.ai** di VPS / Server / Docker lokal, serta alur kerja pembaruan otomatis (*Push $\rightarrow$ Pull $\rightarrow$ Up*).

---

## 1. 🏗️ Arsitektur Container Docker

Sistem TAHRA.AI berjalan di 3 container terisolasi:

```
                                  [ INTERNET / DOMAIN: tahra.ai ]
                                                │
                                                ▼ (Port 8080 / 80)
+───────────────────────────────────────────────────────────────────────────────────────────+
| 1. TAHRA-FRONTEND CONTAINER (React SPA + Nginx Alpine)                                     |
| • Melayani UI web modern secepat kilat dengan Gzip Compression.                           |
| • Reverse-proxy otomatis panggilan `/api/*` ke backend FastAPI.                           |
+─────────────────────────────────────────────┬─────────────────────────────────────────────+
                                              │
                                              ▼ (Internal Network: Port 8000 / Host: 8001)
+───────────────────────────────────────────────────────────────────────────────────────────+
| 2. TAHRA-BACKEND CONTAINER (FastAPI Python 3.11 Multi-Agent Engine)                       |
| • Menjalankan orkestrasi 5 Sub-Agent AI otonom secara deterministik & real-time.          |
| • Terhubung ke LLM Gateway (Groq / Llama-3.3-70B / Hermes-3).                             |
+─────────────────────────────────────────────┬─────────────────────────────────────────────+
                                              │
                                              ▼ (Internal Network: Port 3306 / Host: 3307)
+───────────────────────────────────────────────────────────────────────────────────────────+
| 3. TAHRA-DB CONTAINER (MariaDB 11.4 + Volume Persistent)                                   |
| • Database relasional untuk schema kampanye, wallet saldo iklan, dan audit trail UU PDP.  |
| • Data tersimpan aman di volume `tahra_mariadb_data` meski container di-restart.          |
+───────────────────────────────────────────────────────────────────────────────────────────+
```

---

## 2. ⚡ Langkah Deployment Pertama Kali di Server / VPS

### Langkah 1: Clone Repositori
```bash
git clone https://github.com/AryaEkiLearning07/agent-Tahra.git tahra
cd tahra
```

### Langkah 2: Buat & Konfigurasi File `.env`
Salin template konfigurasi:
```bash
cp .env.example .env
```
Buka `.env` dan masukkan API Key LLM Anda (misal Groq API Key):
```ini
GROQ_API_KEY=gsk_your_groq_api_key_here
LLM_PROVIDER=groq
LLM_MODEL=llama-3.3-70b-versatile
```

### Langkah 3: Build & Nyalakan Seluruh Container
```bash
docker compose up -d --build
```

Setelah selesai:
* **Frontend Web:** `http://IP_SERVER:8080` (atau port 80 jika dikonfigurasi)
* **Backend API Docs:** `http://IP_SERVER:8001/docs`

---

## 3. 🔄 Workflow Pembaruan Cepat (*Push $\rightarrow$ Pull $\rightarrow$ Up*)

Setiap kali Anda selesai melakukan perubahan koding di laptop:

### Di Laptop (Local Development):
```bash
git add .
git commit -m "feat: deskripsi perubahan baru"
git push origin main
```

### Di Server / VPS (Production / Staging):
Cukup jalankan 2 baris perintah ini di dalam folder `tahra`:
```bash
git pull origin main
docker compose up -d --build
```
> 💡 *Docker hanya akan me-rebuild layer yang berubah secara instan tanpa kehilangan data database.*

---

## 4. 🛠️ Perintah Berguna Docker Management

| Kebutuhan | Perintah Terminal |
|---|---|
| **Cek Status Semua Container** | `docker compose ps` |
| **Lihat Log Real-Time Backend** | `docker compose logs -f tahra-backend` |
| **Lihat Log Real-Time Frontend** | `docker compose logs -f tahra-frontend` |
| **Restart Seluruh Sistem** | `docker compose restart` |
| **Hentikan Sistem Sementara** | `docker compose down` |
| **Rebuild Total Bersih** | `docker compose down && docker compose up -d --build` |

