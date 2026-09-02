-- ============================================================================
-- TAHRA AI: PRODUCTION ENTERPRISE RELATIONAL DATABASE SCHEMA
-- RDBMS Engine: MySQL 8.0+ / MariaDB / XAMPP phpMyAdmin Compatible
-- Database Name: tahra_db
-- ============================================================================

CREATE DATABASE IF NOT EXISTS `tahra_db` 
DEFAULT CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE `tahra_db`;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `campaign_daily_telemetry`;
DROP TABLE IF EXISTS `agent_deploy_outputs`;
DROP TABLE IF EXISTS `agent_visual_outputs`;
DROP TABLE IF EXISTS `agent_creative_outputs`;
DROP TABLE IF EXISTS `agent_strategy_outputs`;
DROP TABLE IF EXISTS `agent_research_outputs`;
DROP TABLE IF EXISTS `campaigns`;
DROP TABLE IF EXISTS `products`;
DROP TABLE IF EXISTS `wallet_transactions`;
DROP TABLE IF EXISTS `ad_wallets`;
DROP TABLE IF EXISTS `users`;
SET FOREIGN_KEY_CHECKS = 1;

-- ----------------------------------------------------------------------------
-- 1. TABEL USERS (Autentikasi & Profil Pemilik Bisnis UMKM)
-- ----------------------------------------------------------------------------
CREATE TABLE `users` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(150) NOT NULL COMMENT 'Nama Lengkap Pemilik',
    `email` VARCHAR(150) NOT NULL UNIQUE COMMENT 'Email Login',
    `password_hash` VARCHAR(255) NOT NULL COMMENT 'Bcrypt Password Hash',
    `business_name` VARCHAR(150) NOT NULL COMMENT 'Nama Brand / Toko UMKM',
    `whatsapp_number` VARCHAR(30) NOT NULL COMMENT 'Nomor WhatsApp Utama',
    `role` ENUM('umkm_owner', 'agency_admin', 'superadmin') DEFAULT 'umkm_owner',
    `is_active` BOOLEAN DEFAULT TRUE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 2. TABEL AD_WALLETS (Dompet Saldo Iklan Prabayar UMKM)
-- ----------------------------------------------------------------------------
CREATE TABLE `ad_wallets` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL UNIQUE,
    `saldo_tersedia` BIGINT DEFAULT 0 COMMENT 'Saldo aktif siap pakai untuk iklan',
    `total_ad_spend_murni` BIGINT DEFAULT 0 COMMENT 'Total 90% saldo yang telah terserap ke media iklan',
    `total_ai_service_fee` BIGINT DEFAULT 0 COMMENT 'Total 10% keuntungan platform TAHRA AI',
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 3. TABEL WALLET_TRANSACTIONS (Mutasi & Riwayat Pembayaran QRIS/VA)
-- ----------------------------------------------------------------------------
CREATE TABLE `wallet_transactions` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `transaction_type` ENUM('TOPUP_DEPOSIT', 'DAILY_AD_SPEND', 'AI_FEE_DEDUCTION', 'REFUND') NOT NULL,
    `amount` BIGINT NOT NULL COMMENT 'Nominal Rupiah',
    `payment_gateway` VARCHAR(50) DEFAULT 'QRIS_MIDTRANS',
    `payment_status` ENUM('PENDING', 'SUCCESS', 'FAILED', 'EXPIRED') DEFAULT 'SUCCESS',
    `reference_invoice` VARCHAR(100) NOT NULL UNIQUE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 4. TABEL PRODUCTS (Master Data Produk yang Diiklankan)
-- ----------------------------------------------------------------------------
CREATE TABLE `products` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `product_name` VARCHAR(255) NOT NULL,
    `kategori` ENUM('Fisik', 'Jasa', 'Digital') DEFAULT 'Fisik',
    `harga_jual` BIGINT NOT NULL COMMENT 'Harga ritel ke pembeli',
    `hpp` BIGINT NOT NULL COMMENT 'Biaya modal produksi (HPP)',
    `margin_nominal` BIGINT NOT NULL COMMENT 'Harga Jual - HPP',
    `margin_percentage` DECIMAL(5,2) NOT NULL COMMENT '(Margin Nominal / Harga Jual) * 100',
    `photo_url` VARCHAR(500) DEFAULT NULL COMMENT 'Tautan foto produk asli jika ada',
    `destination_type` ENUM('whatsapp', 'marketplace') DEFAULT 'whatsapp',
    `destination_value` VARCHAR(255) NOT NULL COMMENT 'Nomor WA Admin atau URL Shopee/TikTok Shop',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 5. TABEL CAMPAIGNS (Data Pokok Kampanye Periklanan)
-- ----------------------------------------------------------------------------
CREATE TABLE `campaigns` (
    `id` BIGINT PRIMARY KEY COMMENT 'Unique Campaign Epoch ID',
    `user_id` INT NOT NULL,
    `product_id` INT NOT NULL,
    `campaign_name` VARCHAR(255) NOT NULL,
    `budget_harian` BIGINT NOT NULL,
    `platform_terpilih` VARCHAR(50) NOT NULL COMMENT 'Diputuskan AI: TikTok, Instagram, Google, Facebook',
    `status` ENUM('Running', 'Ready', 'Veto', 'Paused', 'Completed') DEFAULT 'Running',
    `funnel_phase` ENUM('fase1', 'fase2', 'fase3') DEFAULT 'fase1' COMMENT 'fase1: Cold, fase2: Warm, fase3: Scale',
    `is_vetoed` BOOLEAN DEFAULT FALSE,
    `veto_reason` TEXT DEFAULT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 6. TABEL AGENT_RESEARCH_OUTPUTS (Sub-Agent 1: The Explorer)
-- ----------------------------------------------------------------------------
CREATE TABLE `agent_research_outputs` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `campaign_id` BIGINT NOT NULL UNIQUE,
    `competitor_proxy` VARCHAR(255) NOT NULL COMMENT 'Brand pesaing terdekat di pasar',
    `usp` TEXT NOT NULL COMMENT 'Unique Selling Proposition produk',
    `pain_points` JSON NOT NULL COMMENT 'Array 3 masalah utama konsumen',
    `target_demography` VARCHAR(255) NOT NULL COMMENT 'Segmen usia, gender, lokasi',
    `audience_psychography` TEXT NOT NULL COMMENT 'Perilaku belanja dan motif emosional',
    `data_foundation` TEXT NOT NULL COMMENT 'Dasar data benchmark riset pasar',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`campaign_id`) REFERENCES `campaigns`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 7. TABEL AGENT_STRATEGY_OUTPUTS (Sub-Agent 2: The Planner)
-- ----------------------------------------------------------------------------
CREATE TABLE `agent_strategy_outputs` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `campaign_id` BIGINT NOT NULL UNIQUE,
    `format_iklan` VARCHAR(100) NOT NULL COMMENT 'e.g. Video Vertikal 9:16',
    `aspect_ratio` VARCHAR(20) DEFAULT '9:16',
    `bidding_model` VARCHAR(50) NOT NULL COMMENT 'CPM / CPA / Target ROAS',
    `max_cpa_limit` BIGINT NOT NULL COMMENT 'Batas plafon maksimal CPA (40% margin)',
    `strategic_rationale` TEXT NOT NULL COMMENT 'Alasan pemilihan platform & bidding',
    `data_foundation` TEXT NOT NULL COMMENT 'Dasar kalkulasi anti-boncos',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`campaign_id`) REFERENCES `campaigns`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 8. TABEL AGENT_CREATIVE_OUTPUTS (Sub-Agent 3: The Wordsmith)
-- ----------------------------------------------------------------------------
CREATE TABLE `agent_creative_outputs` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `campaign_id` BIGINT NOT NULL UNIQUE,
    `headline` VARCHAR(255) NOT NULL COMMENT 'Headline pemikat perhatian',
    `primary_text_pas` TEXT NOT NULL COMMENT 'Caption formula Problem-Agitate-Solution',
    `cta_text` VARCHAR(100) NOT NULL COMMENT 'Call to Action',
    `video_hook_0_3s` TEXT NOT NULL COMMENT 'Visual & script detik 0-3',
    `video_body_3_10s` TEXT NOT NULL COMMENT 'Visual & script detik 3-10',
    `video_cta_10_15s` TEXT NOT NULL COMMENT 'Visual & script detik 10-15',
    `data_foundation` TEXT NOT NULL COMMENT 'Dasar psikologi konversi naskah',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`campaign_id`) REFERENCES `campaigns`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 9. TABEL AGENT_VISUAL_OUTPUTS (Sub-Agent 4: The Creator / Vision Auditor)
-- ----------------------------------------------------------------------------
CREATE TABLE `agent_visual_outputs` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `campaign_id` BIGINT NOT NULL UNIQUE,
    `image_prompt_8k` TEXT NOT NULL COMMENT 'Prompt Text-to-Image Midjourney/DALL-E',
    `visual_mood` VARCHAR(150) NOT NULL COMMENT 'e.g. Cinematic, Moody Studio Lighting',
    `recommended_composition` TEXT NOT NULL COMMENT 'Saran penataan kamera & lighting',
    `photo_audit_result` JSON DEFAULT NULL COMMENT 'Hasil audit Vision AI jika user upload foto',
    `data_foundation` TEXT NOT NULL COMMENT 'Dasar teori visual & CTR boost',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`campaign_id`) REFERENCES `campaigns`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 10. TABEL AGENT_DEPLOY_OUTPUTS (Sub-Agent 5: The QA & Deployer)
-- ----------------------------------------------------------------------------
CREATE TABLE `agent_deploy_outputs` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `campaign_id` BIGINT NOT NULL UNIQUE,
    `qc_status` ENUM('APPROVED', 'REJECTED') DEFAULT 'APPROVED',
    `qc_notes` TEXT NOT NULL COMMENT 'Catatan hasil audit silang antar-agen',
    `ads_manager_payload` JSON NOT NULL COMMENT 'JSON payload siap deploy ke Meta/TikTok Ads',
    `roas_percentage` DECIMAL(6,2) NOT NULL COMMENT 'Proyeksi nilai balik modal (e.g. 240.00)',
    `estimasi_tayangan` BIGINT NOT NULL,
    `estimasi_klik` INT NOT NULL,
    `estimasi_pembeli` INT NOT NULL,
    `estimasi_omzet` BIGINT NOT NULL,
    `estimasi_laba_bersih` BIGINT NOT NULL,
    `formula_breakdown` TEXT NOT NULL COMMENT 'Langkah matematis CPM -> CTR -> CVR -> Laba',
    `tracking_link` VARCHAR(500) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`campaign_id`) REFERENCES `campaigns`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 11. TABEL CAMPAIGN_DAILY_TELEMETRY (Pemantauan Performa Iklan Harian)
-- ----------------------------------------------------------------------------
CREATE TABLE `campaign_daily_telemetry` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `campaign_id` BIGINT NOT NULL,
    `record_date` DATE NOT NULL,
    `saldo_terpakai` BIGINT NOT NULL,
    `tayangan_aktual` BIGINT NOT NULL,
    `klik_aktual` INT NOT NULL,
    `transaksi_aktual` INT NOT NULL,
    `omzet_aktual` BIGINT NOT NULL,
    `roas_aktual` DECIMAL(6,2) NOT NULL,
    `ai_action_taken` ENUM('MAINTAIN', 'SCALE_UP_BUDGET', 'CUT_LOSS_PAUSE', 'REFRESH_CREATIVE') DEFAULT 'MAINTAIN',
    `ai_telemetry_note` VARCHAR(255) DEFAULT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`campaign_id`) REFERENCES `campaigns`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- DATABASE INITIALIZATION COMPLETE (READY FOR LIVE CAMPAIGNS)
-- ============================================================================

