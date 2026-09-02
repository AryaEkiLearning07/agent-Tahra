@echo off
title TAHRA AI - Import Database ke XAMPP MySQL
color 0C

echo ========================================================
echo   TAHRA AI - AUTO IMPORT DATABASE MYSQL (XAMPP)
echo ========================================================
echo.

if not exist "C:\xampp\mysql\bin\mysql.exe" (
    echo [ERROR] Folder C:\xampp\mysql\bin\mysql.exe tidak ditemukan.
    echo Pastikan XAMPP terpasang di drive C:.
    echo.
    pause
    exit /b
)

echo [1/2] Memeriksa koneksi MySQL di XAMPP...
"C:\xampp\mysql\bin\mysql.exe" -u root -e "SELECT 1;" >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [PERHATIAN] MySQL di XAMPP belum menyala.
    echo Silakan buka 'XAMPP Control Panel', lalu klik tombol [Start] pada MySQL.
    echo.
    pause
    echo Mencoba menghubungkan kembali...
    "C:\xampp\mysql\bin\mysql.exe" -u root -e "SELECT 1;" >nul 2>&1
    if %ERRORLEVEL% NEQ 0 (
        echo [GAGAL] Masih belum bisa terhubung ke MySQL.
        echo Pastikan status MySQL di XAMPP Control Panel berwarna HIJAU.
        echo.
        pause
        exit /b
    )
)

echo.
echo [2/2] Mengimpor 11 Tabel Database tahra_db ke MySQL...
"C:\xampp\mysql\bin\mysql.exe" -u root < "%~dp0database\tahra_db.sql"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================================
    echo   [SUKSES] Database 'tahra_db' Berhasil Dibuat di XAMPP!
    echo ========================================================
    echo.
    echo Anda bisa melihat tabelnya di phpMyAdmin:
    echo URL: http://localhost/phpmyadmin/index.php?route=/database/structure&db=tahra_db
    echo.
) else (
    echo.
    echo [ERROR] Gagal mengimpor database. Periksa log error phpMyAdmin.
    echo.
)

pause
