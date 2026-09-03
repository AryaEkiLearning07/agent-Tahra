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
DROP TABLE IF EXISTS `campaign_trackings`;
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
    `name` VARCHAR(150) NOT NULL DEFAULT 'Owner UMKM',
    `email` VARCHAR(150) NOT NULL UNIQUE,
    `password_hash` VARCHAR(255) NOT NULL DEFAULT '',
    `business_name` VARCHAR(150) NOT NULL DEFAULT 'Bisnis UMKM',
    `whatsapp_number` VARCHAR(30) NOT NULL DEFAULT '',
    `role` ENUM('umkm_owner', 'agency_admin', 'superadmin') DEFAULT 'umkm_owner',
    `is_active` BOOLEAN DEFAULT TRUE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 2. TABEL CAMPAIGNS (Tabel Utama Kampanye Multi-Agent AI)
-- ----------------------------------------------------------------------------
CREATE TABLE `campaigns` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `product_name` VARCHAR(255) NOT NULL,
    `harga_jual` BIGINT NOT NULL DEFAULT 0,
    `hpp` BIGINT NOT NULL DEFAULT 0,
    `budget_harian` BIGINT NOT NULL DEFAULT 0,
    `kategori` VARCHAR(100) NOT NULL DEFAULT 'Fisik',
    `platform` VARCHAR(100) NOT NULL DEFAULT 'TikTok',
    `status` VARCHAR(50) NOT NULL DEFAULT 'Completed',
    `roas` VARCHAR(50) NOT NULL DEFAULT '210%',
    `margin_percentage` DECIMAL(5,2) NOT NULL DEFAULT 0.00,
    `result_json` LONGTEXT DEFAULT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_product_name` (`product_name`),
    INDEX `idx_platform` (`platform`),
    INDEX `idx_status` (`status`),
    INDEX `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 3. TABEL CAMPAIGN_TRACKINGS (Tracking Klik & Konversi URL Iklan)
-- ----------------------------------------------------------------------------
CREATE TABLE `campaign_trackings` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `campaign_id` INT NOT NULL,
    `click_count` INT DEFAULT 0,
    `conversion_count` INT DEFAULT 0,
    `revenue_generated` BIGINT DEFAULT 0,
    `last_clicked_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`campaign_id`) REFERENCES `campaigns`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 4. TABEL AD_WALLETS (Dompet Saldo Iklan Prabayar UMKM)
-- ----------------------------------------------------------------------------
CREATE TABLE `ad_wallets` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL UNIQUE,
    `saldo_tersedia` BIGINT DEFAULT 0,
    `total_ad_spend_murni` BIGINT DEFAULT 0,
    `total_ai_service_fee` BIGINT DEFAULT 0,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 5. TABEL WALLET_TRANSACTIONS (Riwayat Transaksi Topup Saldo)
-- ----------------------------------------------------------------------------
CREATE TABLE `wallet_transactions` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `transaction_type` ENUM('TOPUP_DEPOSIT', 'DAILY_AD_SPEND', 'AI_FEE_DEDUCTION', 'REFUND') NOT NULL,
    `amount` BIGINT NOT NULL,
    `payment_gateway` VARCHAR(50) DEFAULT 'QRIS_MIDTRANS',
    `payment_status` ENUM('PENDING', 'SUCCESS', 'FAILED', 'EXPIRED') DEFAULT 'SUCCESS',
    `reference_invoice` VARCHAR(100) NOT NULL UNIQUE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- DATABASE INITIALIZATION COMPLETE
-- ============================================================================
