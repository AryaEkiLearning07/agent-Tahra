# 📑 BLUEPRINT SPESIFIKASI 5 SUB-AGENT AI TAHRA
### *Dokumen Panduan Teknis: Tupoksi, Skills, Input, Reasoning, Output, & Standar Kualitas*

Dokumen ini menjadi acuan baku untuk menyempurnakan ke-5 Sub-Agent TAHRA AI satu per satu secara terstruktur, terukur, dan berstandar agensi digital marketing kelas dunia.

---

## 🧭 PETA ALUR KERJA MULTI-AGENT PIPELINE

```
[ INPUT USER ]
  │ (Nama Produk, Kategori, Harga Jual, Modal/HPP, Target Kota/Wilayah)
  ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 🧠 SUB-AGENT 1: THE MARKET INTELLIGENCE RESEARCHER                          │
│ Tupoksi : Riset Pasar, Intelijen Kompetitor, Analisis Masalah & Emosi Audiens│
└─────────────────────────────────────┬───────────────────────────────────────┘
                                      │ Data Riset Pasar & Persona
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 🎯 SUB-AGENT 2: THE CHIEF MARKETING STRATEGIST                              │
│ Tupoksi : Perumusan Strategi Saluran (Channel), Marketing Angle, & Funnel   │
└─────────────────────────────────────┬───────────────────────────────────────┘
                                      │ Blueprint Strategi Iklan
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ ✍️ SUB-AGENT 3: THE CREATIVE DIRECTOR & WORDSMITH                           │
│ Tupoksi : Copywriting Persuasif & Storyboard Naskah Video 15 Detik (PAS)   │
└─────────────────────────────────────┬───────────────────────────────────────┘
                                      │ Naskah Video & Teks Iklan
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 🎨 SUB-AGENT 4: THE VISUAL & ART DIRECTOR                                   │
│ Tupoksi : Desain Visual Komersial, Palet Warna, & Prompt Generator 8K       │
└─────────────────────────────────────┬───────────────────────────────────────┘
                                      │ Paket Aset Kreatif Lengkap
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 🛡️ SUB-AGENT 5: THE CAMPAIGN QA & AUTONOMOUS DEPLOYER                       │
│ Tupoksi : Validasi Kebijakan Iklan, Proyeksi Finansial ROAS, & Payload API  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🧠 SUB-AGENT 1: The Market Intelligence Researcher

### 1. Tupoksi (Tugas Pokok & Fungsi)
* Meneliti ekosistem pasar Indonesia untuk kategori produk yang dimasukkan.
* Mengidentifikasi kompetitor nyata (benchmark) di pasar lokal beserta kelemahan utama mereka (*Competitor Friction Points*).
* Membedah 3 masalah utama konsumen (*Customer Pain Points*) yang belum terpecahkan dengan baik oleh kompetitor.
* Merumuskan *Unique Selling Proposition (USP)* tajam yang membedakan produk pengguna dari pasaran.
* Memetakan 2 Persona Pembeli Riil (*Demografi, Psikografi, & Trigger Pembelian*).

### 2. Skills & Domain Knowledge
* **Market Gap Identification:** Kemampuan mendeteksi celah pasar berdasarkan keluhan umum pembeli produk sejenis.
* **Consumer Psychology (Indonesian Market):** Pemahaman mendalam tentang pola belanja orang Indonesia (mencari diskon, kemudahan pembayaran COD/QRIS, kecepatan respon WhatsApp, bukti sosial/testimoni).
* **Persona Mapping Framework:** Kemampuan memecah audiens menjadi profil spesifik yang memiliki motivasi beli berbeda.

### 3. Kontrak Input Data
```json
{
  "product_name": "string (Contoh: Jasa Cuci Sepatu Premium)",
  "kategori": "string (Contoh: Jasa / Kuliner / Fashion)",
  "harga_jual": "number (Contoh: 35000)",
  "hpp": "number (Contoh: 15000)",
  "target_market_hint": "string (Opsional: Lokasi atau target khusus)"
}
```

### 4. Kontrak Output Data (JSON Schema)
```json
{
  "market_overview": {
    "category_name": "string",
    "market_saturation_level": "RED_OCEAN | BLUE_OCEAN | GROWING_TREND",
    "core_market_gap": "string (Celah pasar yang belum digarap kompetitor)"
  },
  "competitor_intelligence": {
    "competitor_proxy_name": "string (Nama tipe kompetitor umum di Indonesia)",
    "competitor_weakness": "string (Titik lemah produk kompetitor yang bisa kita serang)",
    "price_benchmark": "string"
  },
  "customer_pain_points": [
    "string (Pain point 1 spesifik)",
    "string (Pain point 2 spesifik)",
    "string (Pain point 3 spesifik)"
  ],
  "usp_statement": "string (Kalimat keunggulan pembeda)",
  "buyer_personas": [
    {
      "persona_name": "string (Contoh: Dimas - Mahasiswa Aktif)",
      "age_range": "string",
      "daily_struggle": "string (Masalah harian yang dialami)",
      "core_buying_trigger": "string (Alasan emosional utama mau beli)"
    },
    {
      "persona_name": "string (Contoh: Rina - Pekerja Kantoran)",
      "age_range": "string",
      "daily_struggle": "string",
      "core_buying_trigger": "string"
    }
  ]
}
```

---

## 🎯 SUB-AGENT 2: The Chief Marketing Strategist

### 1. Tupoksi (Tugas Pokok & Fungsi)
* Menganalisis hasil riset Agent 1 dan menentukan **Saluran Periklanan Terbaik** (*TikTok Ads / Meta Ads / Google Search Ads*).
* Menentukan **Marketing Attack Angle** (Sudut serang promosi: *Problem-Relief, Urgency/FOMO, Social Proof, atau Price/Promotion*).
* Merancang **Struktur Funnel Kampanye** (*Fase 1: Cold Discovery vs Fase 2: Warm Retargeting*).
* Menentukan **Format Iklan & Rasio** (*Video Vertikal 9:16 vs Feed Square 1:1*).
* Menetapkan **Strategi Penargetan Audiens** (*Interest targeting, Broad targeting, atau Search intent keywords*).

### 2. Skills & Domain Knowledge
* **Channel Suitability Analysis:** Tahu persis kapan produk cocok di TikTok (produk visual/impulsif), kapan di Instagram/Facebook (gaya hidup/B2B/usia matang), dan kapan di Google (kebutuhan darurat/jasa spesifik).
* **Marketing Angle Engineering:** Mengubah masalah teknis menjadi sudut pandang emosional yang menarik perhatian audiens.
* **Direct Response Advertising Principles:** Menguasai formula iklan berkonversi tinggi untuk pasar Indonesia.

### 3. Kontrak Input Data
* Seluruh output dari **Sub-Agent 1**.
* Data Unit Economics ($Harga Jual, Modal/HPP, Margin$).

### 4. Kontrak Output Data (JSON Schema)
```json
{
  "recommended_channel": "TikTok | Instagram | Facebook | Google Search",
  "channel_justification": "string (Alasan strategis memilih saluran ini)",
  "marketing_attack_angle": "PROBLEM_AGITATE | FOMO_SCARCITY | SOCIAL_PROOF | PRICE_VALUE",
  "angle_explanation": "string (Penjelasan sudut pandang komunikasi promosi)",
  "funnel_strategy": {
    "cold_audience_tactic": "string (Cara menarik orang baru)",
    "retargeting_tactic": "string (Cara menutup penjualan orang yang sudah klik)"
  },
  "ad_format": {
    "format_type": "Video Pendek (9:16) | Gambar / Poster (1:1) | Teks Search",
    "aspect_ratio": "9:16 | 1:1 | 16:9",
    "bidding_model": "CPA | CPM | CPC"
  },
  "targeting_directives": {
    "core_interests": ["string", "string"],
    "age_targeting": "string",
    "gender_targeting": "Semua | Pria | Wanita"
  }
}
```

---

## ✍️ SUB-AGENT 3: The Creative Director & Wordsmith

### 1. Tupoksi (Tugas Pokok & Fungsi)
* Menulis **Headline Iklan Hipnotis** yang langsung menghentikan *scrolling* audiens.
* Menyusun **Storyboard Naskah Video 15 Detik Siap Syuting** dengan pembagian waktu presisi:
  * **0 - 3 Detik (Hook / Pattern Interrupt):** Adegan visual mengejutkan & kalimat pembuka.
  * **3 - 10 Detik (Body / Story / Solution):** Demonstrasi produk menyelesaikan masalah.
  * **10 - 15 Detik (Call To Action):** Perintah tindakan yang jelas dan mendesak.
* Menulis **Caption Iklan Lengkap** menggunakan formula **PAS (*Problem - Agitate - Solution*)**.
* Merumuskan **Teks On-Screen (Tulisan Besar di Video)** dan **Instruksi Voiceover**.

### 2. Skills & Domain Knowledge
* **Short-form Video Retention Psychology:** Pemahaman mendalam tentang *3-second drop-off rate* di TikTok/Reels.
* **Persuasive Indonesian Copywriting:** Menggunakan gaya bahasa yang natural, relevan, tidak kaku, dan memicu rasa butuh.
* **PAS Framework & Urgency Triggers:** Memperjelas penderitaan konsumen akibat masalah, lalu menyodorkan produk sebagai penyelamat instan.

### 3. Kontrak Input Data
* Output Strategi dari **Sub-Agent 2** (*Platform, Angle, Format*).
* Output Masalah & Persona dari **Sub-Agent 1** (*Pain points, Persona, USP*).

### 4. Kontrak Output Data (JSON Schema)
```json
{
  "headline": "string (Maksimal 10 kata, punchy & memicu klik)",
  "video_storyboard_15s": {
    "hook_scene_0_3s": {
      "visual_action": "string (Instruksi visual apa yang direkam kamera)",
      "on_screen_text": "string (Tulisan besar yang muncul di layar video)",
      "voiceover_narration": "string (Kalimat yang diucapkan narator)"
    },
    "body_scene_3_10s": {
      "visual_action": "string",
      "on_screen_text": "string",
      "voiceover_narration": "string"
    },
    "cta_scene_10_15s": {
      "visual_action": "string",
      "on_screen_text": "string",
      "voiceover_narration": "string"
    }
  },
  "primary_caption_pas": {
    "problem": "string (Paragraf pembuka mengangkat masalah)",
    "agitate": "string (Paragraf memperjelas dampak buruk jika dibiarkan)",
    "solution": "string (Paragraf solusi menghadirkan produk)",
    "call_to_action": "string (Ajak klik keranjang/link)"
  },
  "recommended_hashtags": ["#tag1", "#tag2", "#tag3"]
}
```

---

## 🎨 SUB-AGENT 4: The Visual & Art Director

### 1. Tupoksi (Tugas Pokok & Fungsi)
* Merancang **Prompt Gambar Komersial Studio 8K** berstandar Midjourney / DALL-E / Stable Diffusion.
* Menentukan **Pencahayaan Sinematik & Pengaturan Lensa** (*Softbox lighting, 85mm macro lens, dramatic rim light*).
* Menentukan **Psikologi Warna & Mood Visual** yang cocok dengan karakter brand dan emosi naskah Agent 3.
* Menyusun **Panduan Komposisi Banner Poster Iklan** (*Letak produk, penempatan logo, hierarki teks*).

### 2. Skills & Domain Knowledge
* **Generative AI Prompt Crafting (Midjourney v6 & DALL-E 3):** Penguasaan parameter teknis (*aspect ratio, styling, camera angles, photographic rendering*).
* **Color Psychology in Advertising:** Memilih warna yang memicu lapar (makanan), rasa percaya (jasa/finansial), atau estetika (fashion/kecantikan).
* **Commercial Studio Staging:** Pengaturan properti latar belakang agar produk terlihat mewah dan bernilai tinggi.

### 3. Kontrak Input Data
* Naskah & Hook Visual dari **Sub-Agent 3**.
* Platform & Rasio Aspek dari **Sub-Agent 2**.
* Kategori Produk & USP dari **Sub-Agent 1**.

### 4. Kontrak Output Data (JSON Schema)
```json
{
  "midjourney_prompt_8k": "string (Prompt bahasa Inggris lengkap dengan instruksi kamera, pencahayaan, dan rasio)",
  "visual_mood": "string (Contoh: Clean Minimalist Studio, Warm Golden Glow)",
  "color_palette_guide": {
    "primary_color": "string (Hex code & nama warna)",
    "accent_color": "string",
    "psychological_reason": "string"
  },
  "composition_guideline": "string (Panduan penataan layout visual)"
}
```

---

## 🛡️ SUB-AGENT 5: The Campaign QA & Autonomous Deployer

### 1. Tupoksi (Tugas Pokok & Fungsi)
* Melakukan **Audit Kebijakan Periklanan (*Ad Policy Compliance Check*)** untuk memastikan teks tidak melanggar aturan Meta/TikTok (menolak overclaim, kata terlarang, dll).
* Menjalankan **Simulasi Finansial Deterministik Anti-Boncos** ($\text{Budget} \rightarrow \text{Tayangan} \rightarrow \text{Klik} \rightarrow \text{Order} \rightarrow \text{Omzet} \rightarrow \text{Laba Bersih}$).
* Membungkus seluruh aset dari Agent 2, 3, dan 4 menjadi **Standar JSON Payload Resmi Meta Marketing API & TikTok Business API**.
* Menyiapkan endpoint penayangan iklan otonom (*Deploy Execution*).

### 2. Skills & Domain Knowledge
* **Ad Network Policy Auditing:** Mengetahui kata-kata pemicu *banned* atau *ad rejection* di Meta Ads dan TikTok Ads.
* **Performance Marketing Mathematics:** Menguasai korelasi metrik iklan nyata ($\text{CPM}, \text{CTR}, \text{CPC}, \text{CVR}, \text{CPA}, \text{ROAS}$).
* **API Payload Architecture:** Mampu memetakan strategi ke dalam objek `Campaign`, `AdSet/AdGroup`, dan `AdCreative` sesuai dokumentasi resmi Meta Graph API / TikTok API.

### 3. Kontrak Input Data
* Seluruh output dari **Sub-Agent 1, 2, 3, dan 4**.
* Parameter Budget Harian & Link Tujuan dari Pengguna.

### 4. Kontrak Output Data (JSON Schema)
```json
{
  "qc_audit_verdict": {
    "status": "APPROVED | REVISED | VETO",
    "policy_compliance_notes": "string",
    "safety_score": 95
  },
  "deterministic_roas_projection": {
    "daily_budget": 100000,
    "est_impressions": 5000,
    "est_clicks": 100,
    "est_conversions": 4,
    "est_gross_revenue": 140000,
    "est_net_profit": 40000,
    "projected_roas_percentage": 140.0
  },
  "ad_network_api_payload": {
    "campaign_name": "string",
    "objective": "OUTCOME_SALES | CONVERSIONS",
    "daily_budget_cents": 10000000,
    "placements": ["TIKTOK_FOR_YOU_FEED"],
    "creative_spec": {
      "headline": "string",
      "primary_text": "string",
      "cta_type": "ORDER_NOW | CONTACT_US"
    },
    "destination_url": "string"
  }
}
```

---

## 🛠️ RENCANA AKSI PERBAIKAN BERTAHAP (STEP-BY-STEP ACTION PLAN)

Kita akan menyempurnakan sistem ini secara bertahap:

1. **Langkah 1 (Fokus Sub-Agent 1):** Sempurnakan prompt riset pasar di `orchestrator.py` agar mengeluarkan data celah kompetitor, masalah mendalam, dan persona riil Indonesia.
2. **Langkah 2 (Fokus Sub-Agent 2):** Rombak prompt Agent 2 agar fokus murni sebagai *Pakar Strategi Marketing* (Attack Angle, Funnel, & Channel Selection) tanpa terdistraksi rumus akuntansi.
3. **Langkah 3 (Fokus Sub-Agent 3):** Perkaya prompt Agent 3 agar menghasilkan Storyboard Video 15 Detik lengkap (Visual + Audio + On-Screen Text) dengan formula PAS.
4. **Langkah 4 (Fokus Sub-Agent 4):** Tajamkan prompt visual komersial 8K Midjourney dan panduan palet warna.
5. **Langkah 5 (Fokus Sub-Agent 5):** Sempurnakan audit policy dan struktur payload JSON API siap tembak ke Meta/TikTok Ads.
