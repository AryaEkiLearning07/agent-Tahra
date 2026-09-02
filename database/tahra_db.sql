-- =============================================================
-- TAHRA AI - ENTERPRISE MULTI-AGENT MARKETING DATABASE SCHEMA
-- Compatible with XAMPP MySQL / MariaDB / phpMyAdmin
-- Database Name: tahra_db
-- =============================================================

CREATE DATABASE IF NOT EXISTS `tahra_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `tahra_db`;

-- -------------------------------------------------------------
-- 1. TABEL USERS (Profil Pemilik Bisnis / UMKM)
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(150) NOT NULL,
    `email` VARCHAR(150) NOT NULL UNIQUE,
    `password_hash` VARCHAR(255) NOT NULL COMMENT 'Bcrypt / Argon2 hashed password',
    `business_name` VARCHAR(150) NOT NULL,
    `whatsapp_number` VARCHAR(30) DEFAULT NULL,
    `role` ENUM('umkm_owner', 'agency_admin', 'superadmin') DEFAULT 'umkm_owner',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 2. TABEL AD_WALLETS (Dompet Saldo Iklan & Deposit Prabayar)
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `ad_wallets` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `saldo_aktif` BIGINT DEFAULT 0 COMMENT 'Saldo siap pakai untuk iklan',
    `total_ad_spend` BIGINT DEFAULT 0 COMMENT 'Total uang yang telah disetor ke TikTok/Meta',
    `total_ai_fee` BIGINT DEFAULT 0 COMMENT 'Total potongan fee manajemen AI 10%',
    `last_topup_amount` BIGINT DEFAULT 0,
    `last_topup_at` TIMESTAMP NULL DEFAULT NULL,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 3. TABEL CAMPAIGNS (Data Pokok Kampanye Periklanan)
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `campaigns` (
    `id` BIGINT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `product_name` VARCHAR(255) NOT NULL,
    `kategori` ENUM('Fisik', 'Jasa', 'Digital') DEFAULT 'Fisik',
    `harga_jual` BIGINT NOT NULL,
    `hpp` BIGINT NOT NULL,
    `margin_percentage` DECIMAL(5,2) NOT NULL,
    `budget_harian` BIGINT NOT NULL,
    `platform` VARCHAR(50) DEFAULT 'TikTok',
    `destination_type` ENUM('whatsapp', 'marketplace', 'landing_page') DEFAULT 'whatsapp',
    `destination_value` VARCHAR(255) NOT NULL,
    `status` ENUM('Running', 'Ready', 'Veto', 'Completed') DEFAULT 'Running',
    `funnel_phase` ENUM('fase1', 'fase2', 'fase3') DEFAULT 'fase1' COMMENT 'fase1: Cold, fase2: Warm, fase3: Scale',
    `roas_percentage` DECIMAL(6,2) DEFAULT 105.00,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_user_status` (`user_id`, `status`),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 4. TABEL CAMPAIGN_AGENT_OUTPUTS (Hasil Eksekusi 5 Sub-Agent AI)
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `campaign_agent_outputs` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `campaign_id` BIGINT NOT NULL,
    `agent1_research` JSON NOT NULL COMMENT 'Competitor Proxy, USP, Pain Points, Demografi',
    `agent2_strategy` JSON NOT NULL COMMENT 'Format 9:16, Plafon CPA, Unit Economics',
    `agent3_creative` JSON NOT NULL COMMENT 'Headline, Caption PAS, Naskah Video 15s',
    `agent4_visual` JSON NOT NULL COMMENT 'Prompt Studio 8K, Visual Mood, Audit Foto',
    `agent5_deploy` JSON NOT NULL COMMENT 'Payload Ads Manager, Formula Matematis ROAS',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`campaign_id`) REFERENCES `campaigns`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 5. TABEL AI_MEMORY_LOGS (Catatan Pembelajaran Mesin Lintas Fase)
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `ai_memory_logs` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `campaign_id` BIGINT NOT NULL,
    `funnel_phase` VARCHAR(20) NOT NULL,
    `total_impressions_accumulated` BIGINT DEFAULT 0,
    `total_clicks_accumulated` INT DEFAULT 0,
    `total_conversions_accumulated` INT DEFAULT 0,
    `ai_insight_note` TEXT NOT NULL,
    `logged_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`campaign_id`) REFERENCES `campaigns`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================
-- SEED DATA CONTOH (Untuk Demo & Pengujian Awal)
-- =============================================================

INSERT INTO `users` (`id`, `name`, `email`, `password_hash`, `business_name`, `whatsapp_number`, `role`)
VALUES 
(1, 'Ahmad Rasyid', 'ahmad@tahranusantara.com', '$2b$12$e8Y7Z1K8W9N0J1M2L3K4E5A6B7C8D9E0F1G2H3I4J5K6L7M8N9O0P', 'Sambal TAHRA Nusantara', '081289123456', 'umkm_owner')
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`);

INSERT INTO `ad_wallets` (`user_id`, `saldo_aktif`, `total_ad_spend`, `total_ai_fee`, `last_topup_amount`, `last_topup_at`)
VALUES 
(1, 500000, 450000, 50000, 500000, NOW())
ON DUPLICATE KEY UPDATE `saldo_aktif`=VALUES(`saldo_aktif`);

INSERT INTO `campaigns` (
    `id`, `user_id`, `product_name`, `kategori`, `harga_jual`, `hpp`, 
    `margin_percentage`, `budget_harian`, `platform`, `destination_type`, 
    `destination_value`, `status`, `funnel_phase`, `roas_percentage`
) VALUES 
(1788292353230, 1, 'Sambal Bawang Super Pedas 150g', 'Fisik', 35000, 15000, 57.14, 100000, 'TikTok', 'whatsapp', '081289123456', 'Running', 'fase2', 240.00)
ON DUPLICATE KEY UPDATE `product_name`=VALUES(`product_name`);
