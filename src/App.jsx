import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Filter,
  ShoppingBag,
  ClipboardList,
  Wallet,
  MoreHorizontal,
  Plus,
  Minus,
  X,
  Cloud,
  CloudOff,
  RefreshCw,
  Download,
  UserPlus,
  Merge,
  Trash2,
  Edit3,
  Package,
  UtensilsCrossed,
  Settings,
  LogOut,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  TrendingUp,
  Copy,
  RotateCcw,
  Upload,
  Smartphone
} from 'lucide-react';

// ============================================================================
// 1. MASTER DATABASE 161 SKU ASLI DARI DELTA CAFE.XLSX
// ============================================================================

const RAW_161_SKUS = [
  { kode: 'NSJ-K1', nama: 'Nutrisari Jeruk Kecil', hargaJual: 6000, hargaBeli: 1500, hpp: 3000 },
  { kode: 'NSJ-B1', nama: 'Nutrisari Jeruk Besar', hargaJual: 7000, hargaBeli: 1500, hpp: 3000 },
  { kode: 'NSB-K2', nama: 'Nutrisari Jambu Kecil', hargaJual: 6000, hargaBeli: 1500, hpp: 3000 },
  { kode: 'NSB-B2', nama: 'Nutrisari Jambu Besar', hargaJual: 7000, hargaBeli: 1500, hpp: 3000 },
  { kode: 'NSS-K3', nama: 'Nutrisari Semangka Kecil', hargaJual: 6000, hargaBeli: 1500, hpp: 3000 },
  { kode: 'NSS-B3', nama: 'Nutrisari Semangka Besar', hargaJual: 7000, hargaBeli: 1500, hpp: 3000 },
  { kode: 'NSA-K4', nama: 'Nutrisari Anggur Kecil', hargaJual: 6000, hargaBeli: 1500, hpp: 3000 },
  { kode: 'NSA-B4', nama: 'Nutrisari Anggur Besar', hargaJual: 7000, hargaBeli: 1500, hpp: 3000 },
  { kode: 'NSM-K5', nama: 'Nutrisari Mangga Kecil', hargaJual: 6000, hargaBeli: 1500, hpp: 3000 },
  { kode: 'NSM-B5', nama: 'Nutrisari Mangga Besar', hargaJual: 7000, hargaBeli: 1500, hpp: 3000 },
  { kode: 'NSK-K6', nama: 'Nutrisari Kelapa Muda Kecil', hargaJual: 6000, hargaBeli: 1500, hpp: 3000 },
  { kode: 'NSK-B6', nama: 'Nutrisari Kelapa Muda Besar', hargaJual: 7000, hargaBeli: 1500, hpp: 3000 },
  { kode: 'NSN-K7', nama: 'Nutrisari Jeruk Nipis Kecil', hargaJual: 6000, hargaBeli: 1500, hpp: 3000 },
  { kode: 'NSN-B7', nama: 'Nutrisari Jeruk Nipis Besar', hargaJual: 7000, hargaBeli: 1500, hpp: 3000 },
  { kode: 'NSR-K8', nama: 'Nutrisari Sirsak Kecil', hargaJual: 6000, hargaBeli: 1500, hpp: 3000 },
  { kode: 'NSR-B8', nama: 'Nutrisari Sirsak Besar', hargaJual: 7000, hargaBeli: 1500, hpp: 3000 },
  { kode: 'NSL-K9', nama: 'Nutrisari Leci Kecil', hargaJual: 6000, hargaBeli: 1500, hpp: 3000 },
  { kode: 'NSL-B9', nama: 'Nutrisari Leci Besar', hargaJual: 7000, hargaBeli: 1500, hpp: 3000 },
  { kode: 'NSC-K10', nama: 'Nutrisari Cincau Kecil', hargaJual: 6000, hargaBeli: 1500, hpp: 3000 },
  { kode: 'NSC-B10', nama: 'Nutrisari Cincau Besar', hargaJual: 7000, hargaBeli: 1500, hpp: 3000 },
  { kode: 'NSW-K11', nama: 'Nutrisari Strawberry Kecil', hargaJual: 6000, hargaBeli: 1500, hpp: 3000 },
  { kode: 'NSW-B11', nama: 'Nutrisari Strawberry Besar', hargaJual: 7000, hargaBeli: 1500, hpp: 3000 },
  { kode: 'NSH-K12', nama: 'Nutrisari Blewah Kecil', hargaJual: 6000, hargaBeli: 1500, hpp: 3000 },
  { kode: 'NSH-B12', nama: 'Nutrisari Blewah Besar', hargaJual: 7000, hargaBeli: 1500, hpp: 3000 },
  { kode: 'NKN-K13', nama: 'Nutrisari Kuwud Nipis Kecil', hargaJual: 7000, hargaBeli: 1500, hpp: 3000 },
  { kode: 'NKN-B13', nama: 'Nutrisari Kuwud Nipis Besar', hargaJual: 7000, hargaBeli: 1500, hpp: 3000 },
  { kode: 'STH-P', nama: 'Teh Panas', hargaJual: 4000, hargaBeli: 500, hpp: 2000 },
  { kode: 'STH-K', nama: 'Es Teh Kecil', hargaJual: 4000, hargaBeli: 500, hpp: 2000 },
  { kode: 'STH-B', nama: 'Es Teh Besar', hargaJual: 5000, hargaBeli: 500, hpp: 2000 },
  { kode: 'TJA-K1', nama: 'Teajus Apel Kecil', hargaJual: 3000, hargaBeli: 300, hpp: 1800 },
  { kode: 'TJA-B1', nama: 'Teajus Apel Besar', hargaJual: 4000, hargaBeli: 300, hpp: 1800 },
  { kode: 'TJL-K2', nama: 'Teajus Lemon Kecil', hargaJual: 3000, hargaBeli: 300, hpp: 1800 },
  { kode: 'TJL-B2', nama: 'Teajus Lemon Besar', hargaJual: 4000, hargaBeli: 300, hpp: 1800 },
  { kode: 'TJG-K3', nama: 'Teajus Gulabatu Kecil', hargaJual: 3000, hargaBeli: 300, hpp: 1800 },
  { kode: 'TJG-B3', nama: 'Teajus Gulabatu Besar', hargaJual: 4000, hargaBeli: 300, hpp: 1800 },
  { kode: 'PIA-K1', nama: 'PopIce Alpukat Kecil', hargaJual: 6000, hargaBeli: 1500, hpp: 3000 },
  { kode: 'PIA-B1', nama: 'PopIce Alpukat Besar', hargaJual: 7000, hargaBeli: 1500, hpp: 3000 },
  { kode: 'PIM-K2', nama: 'PopIce Melon Kecil', hargaJual: 6000, hargaBeli: 1500, hpp: 3000 },
  { kode: 'PIM-B2', nama: 'PopIce Melon Besar', hargaJual: 7000, hargaBeli: 1500, hpp: 3000 },
  { kode: 'PIP-K3', nama: 'PopIce Permen Karet Kecil', hargaJual: 6000, hargaBeli: 1500, hpp: 3000 },
  { kode: 'PIP-B3', nama: 'PopIce Permen Karet Besar', hargaJual: 7000, hargaBeli: 1500, hpp: 3000 },
  { kode: 'PIV-K4', nama: 'PopIce Vanilla Blue Kecil', hargaJual: 6000, hargaBeli: 1500, hpp: 3000 },
  { kode: 'PIV-B4', nama: 'PopIce Vanilla Blue Besar', hargaJual: 7000, hargaBeli: 1500, hpp: 3000 },
  { kode: 'PIB-K5', nama: 'PopIce Blueberry Kecil', hargaJual: 6000, hargaBeli: 1500, hpp: 3000 },
  { kode: 'PIB-B5', nama: 'PopIce Blueberry Besar', hargaJual: 7000, hargaBeli: 1500, hpp: 3000 },
  { kode: 'PIG-K6', nama: 'PopIce Anggur Kecil', hargaJual: 6000, hargaBeli: 1500, hpp: 3000 },
  { kode: 'PIG-B6', nama: 'PopIce Anggur Besar', hargaJual: 7000, hargaBeli: 1500, hpp: 3000 },
  { kode: 'PIN-K7', nama: 'PopIce Mangga Kecil', hargaJual: 6000, hargaBeli: 1500, hpp: 3000 },
  { kode: 'PIN-B7', nama: 'PopIce Mangga Besar', hargaJual: 7000, hargaBeli: 1500, hpp: 3000 },
  { kode: 'PIL-K8', nama: 'PopIce Leci Kecil', hargaJual: 6000, hargaBeli: 1500, hpp: 3000 },
  { kode: 'PIL-B8', nama: 'PopIce Leci Besar', hargaJual: 7000, hargaBeli: 1500, hpp: 3000 },
  { kode: 'PID-K9', nama: 'PopIce Durian Kecil', hargaJual: 6000, hargaBeli: 1500, hpp: 3000 },
  { kode: 'PID-B9', nama: 'PopIce Durian Besar', hargaJual: 7000, hargaBeli: 1500, hpp: 3000 },
  { kode: 'PIC-K10', nama: 'PopIce Cappucino Kecil', hargaJual: 6000, hargaBeli: 1500, hpp: 3000 },
  { kode: 'PIC-B10', nama: 'PopIce Cappucino Besar', hargaJual: 7000, hargaBeli: 1500, hpp: 3000 },
  { kode: 'PIS-K11', nama: 'PopIce Strawberry Kecil', hargaJual: 6000, hargaBeli: 1500, hpp: 3000 },
  { kode: 'PIS-B11', nama: 'PopIce Strawberry Besar', hargaJual: 7000, hargaBeli: 1500, hpp: 3000 },
  { kode: 'PIO-K12', nama: 'PopIce Coklat Kecil', hargaJual: 6000, hargaBeli: 1500, hpp: 3000 },
  { kode: 'PIO-B12', nama: 'PopIce Coklat Besar', hargaJual: 7000, hargaBeli: 1500, hpp: 3000 },
  { kode: 'PIT-K13', nama: 'PopIce Taro Kecil', hargaJual: 6000, hargaBeli: 1500, hpp: 3000 },
  { kode: 'PIT-B13', nama: 'PopIce Taro Besar', hargaJual: 7000, hargaBeli: 1500, hpp: 3000 },
  { kode: 'PIK-K14', nama: 'Popice Kacang Hijau Kecil', hargaJual: 6000, hargaBeli: 1500, hpp: 3000 },
  { kode: 'PIK-B14', nama: 'Popice Kacang Hijau Besar', hargaJual: 7000, hargaBeli: 1500, hpp: 3000 },
  { kode: 'KPI-H', nama: 'Kopi Hitam', hargaJual: 5000, hargaBeli: 1500, hpp: 2500 },
  { kode: 'KPI-S', nama: 'Kopi Susu', hargaJual: 6000, hargaBeli: 2900, hpp: 3900 },
  { kode: 'KAH-P1', nama: 'Kapal Api Hitam Panas', hargaJual: 5000, hargaBeli: 1700, hpp: 3200 },
  { kode: 'SJ-P2', nama: 'Susu Jahe Panas', hargaJual: 5000, hargaBeli: 1500, hpp: 3000 },
  { kode: 'KJ-P3', nama: 'Kopi Jahe Panas', hargaJual: 5000, hargaBeli: 1500, hpp: 3000 },
  { kode: 'ABS-P4', nama: 'ABC Susu Panas', hargaJual: 5000, hargaBeli: 1700, hpp: 3200 },
  { kode: 'ABM-P5', nama: 'ABC Mocca Panas', hargaJual: 5000, hargaBeli: 1700, hpp: 3200 },
  { kode: 'TM-P6', nama: 'Tora Moka Panas', hargaJual: 5000, hargaBeli: 1700, hpp: 3200 },
  { kode: 'LH-P7', nama: 'Luwak Hitam Panas', hargaJual: 5000, hargaBeli: 1200, hpp: 2700 },
  { kode: 'LWC-P8', nama: 'Luwak White Coffee Panas', hargaJual: 5000, hargaBeli: 1500, hpp: 3000 },
  { kode: 'GDC-P9', nama: 'GoodDay Cappucino Panas', hargaJual: 5000, hargaBeli: 2200, hpp: 3700 },
  { kode: 'GDC-K1', nama: 'GoodDay Cappucino Kecil', hargaJual: 6000, hargaBeli: 2200, hpp: 3700 },
  { kode: 'GDC-B1', nama: 'GoodDay Cappucino Besar', hargaJual: 7000, hargaBeli: 2200, hpp: 3700 },
  { kode: 'GDF-P10', nama: 'GoodDay Freeze Panas', hargaJual: 5000, hargaBeli: 2500, hpp: 4000 },
  { kode: 'GDF-K2', nama: 'GoodDay Freeze Kecil', hargaJual: 6000, hargaBeli: 2500, hpp: 4000 },
  { kode: 'GDF-B2', nama: 'GoodDay Freeze Besar', hargaJual: 7000, hargaBeli: 2500, hpp: 4000 },
  { kode: 'DCW-P1', nama: 'Dancow Putih Panas', hargaJual: 6000, hargaBeli: 3500, hpp: 5000 },
  { kode: 'DCW-P2', nama: 'Dancow Coklat Panas', hargaJual: 6000, hargaBeli: 3500, hpp: 5000 },
  { kode: 'DCP-K1', nama: 'Dancow Putih Kecil', hargaJual: 7000, hargaBeli: 3500, hpp: 5000 },
  { kode: 'DCP-B1', nama: 'Dancow Putih Besar', hargaJual: 8000, hargaBeli: 3500, hpp: 5000 },
  { kode: 'DCC-K2', nama: 'Dancow Coklat Kecil', hargaJual: 7000, hargaBeli: 3500, hpp: 5000 },
  { kode: 'DCC-B2', nama: 'Dancow Coklat Besar', hargaJual: 8000, hargaBeli: 3500, hpp: 5000 },
  { kode: 'IMV-K1', nama: 'Indomilk Vanilla Kecil', hargaJual: 6000, hargaBeli: 1400, hpp: 2900 },
  { kode: 'IMV-B1', nama: 'Indomilk Vanilla Besar', hargaJual: 7000, hargaBeli: 1400, hpp: 2900 },
  { kode: 'IMV-P1', nama: 'Indomilk Vanilla Panas', hargaJual: 5000, hargaBeli: 1400, hpp: 2900 },
  { kode: 'IMV-P2', nama: 'Indomilk Coklat Panas', hargaJual: 5000, hargaBeli: 1400, hpp: 2900 },
  { kode: 'IMC-K2', nama: 'Indomilk Coklat Kecil', hargaJual: 6000, hargaBeli: 1400, hpp: 2900 },
  { kode: 'IMC-B2', nama: 'Indomilk Coklat Besar', hargaJual: 7000, hargaBeli: 1400, hpp: 2900 },
  { kode: 'JSH-B', nama: 'Joshua Besar', hargaJual: 13000, hargaBeli: 5500, hpp: 7000 },
  { kode: 'EXJ-K', nama: 'Extra Joss Kecil', hargaJual: 6000, hargaBeli: 1500, hpp: 3000 },
  { kode: 'EXJ-B', nama: 'Extra Joss Besar', hargaJual: 7000, hargaBeli: 1500, hpp: 3000 },
  { kode: 'KB-K1', nama: 'Kuku Bima Kecil', hargaJual: 6000, hargaBeli: 1200, hpp: 2700 },
  { kode: 'KB-B1', nama: 'Kuku Bima Besar', hargaJual: 7000, hargaBeli: 1200, hpp: 2700 },
  { kode: 'KBS-K2', nama: 'Kuku Bima Susu Kecil', hargaJual: 9000, hargaBeli: 2700, hpp: 4200 },
  { kode: 'KBS-B2', nama: 'Kuku Bima Susu Besar', hargaJual: 10000, hargaBeli: 2700, hpp: 4200 },
  { kode: 'HMV-K1', nama: 'Hemaviton Kecil', hargaJual: 6000, hargaBeli: 1200, hpp: 2700 },
  { kode: 'HMV-B1', nama: 'Hemaviton Besar', hargaJual: 7000, hargaBeli: 1200, hpp: 2700 },
  { kode: 'HMS-K2', nama: 'Hemaviton Susu Kecil', hargaJual: 9000, hargaBeli: 2700, hpp: 4200 },
  { kode: 'HMS-B2', nama: 'Hemaviton Susu Besar', hargaJual: 10000, hargaBeli: 2700, hpp: 4200 },
  { kode: 'SSD-K', nama: 'Susu Soda Kecil', hargaJual: 9000, hargaBeli: 4200, hpp: 5700 },
  { kode: 'SSD-B', nama: 'Susu Soda Besar', hargaJual: 10000, hargaBeli: 4200, hpp: 5700 },
  { kode: 'ENC-K1', nama: 'Energen Coklat Kecil', hargaJual: 6000, hargaBeli: 2000, hpp: 3500 },
  { kode: 'ENC-B1', nama: 'Energen Coklat Besar', hargaJual: 7000, hargaBeli: 2000, hpp: 3500 },
  { kode: 'ENC-P1', nama: 'Energen Coklat Panas', hargaJual: 5000, hargaBeli: 2000, hpp: 3500 },
  { kode: 'ENV-K2', nama: 'Energen Vanilla Kecil', hargaJual: 6000, hargaBeli: 2000, hpp: 3500 },
  { kode: 'ENV-B2', nama: 'Energen Vanilla Besar', hargaJual: 7000, hargaBeli: 2000, hpp: 3500 },
  { kode: 'ENV-P2', nama: 'Energen Vanilla Panas', hargaJual: 5000, hargaBeli: 2000, hpp: 3500 },
  { kode: 'ENK-K3', nama: 'Energen Kacanghijau Kecil', hargaJual: 6000, hargaBeli: 2000, hpp: 3500 },
  { kode: 'ENK-B3', nama: 'Energen Kacanghijau Besar', hargaJual: 7000, hargaBeli: 2000, hpp: 3500 },
  { kode: 'ENK-P3', nama: 'Energen Kacanghijau Panas', hargaJual: 5000, hargaBeli: 2000, hpp: 3500 },
  { kode: 'MLO-P', nama: 'Milo Coklat Panas', hargaJual: 5000, hargaBeli: 1900, hpp: 3400 },
  { kode: 'MLO-K', nama: 'Milo Coklat Kecil', hargaJual: 6000, hargaBeli: 1900, hpp: 3400 },
  { kode: 'MLO-B', nama: 'Milo Coklat Besar', hargaJual: 7000, hargaBeli: 1900, hpp: 3400 },
  { kode: 'CTS-P', nama: 'Chocolatos Panas', hargaJual: 5000, hargaBeli: 2000, hpp: 3500 },
  { kode: 'CTS-K', nama: 'Chocolatos Kecil', hargaJual: 6000, hargaBeli: 2000, hpp: 3500 },
  { kode: 'CTS-B', nama: 'Chocolatos Besar', hargaJual: 7000, hargaBeli: 2000, hpp: 3500 },
  { kode: 'FNT-M', nama: 'Fanta Merah', hargaJual: 6000, hargaBeli: 4000, hpp: 4500 },
  { kode: 'FNT-S', nama: 'Fanta Soda', hargaJual: 5000, hargaBeli: 3000, hpp: 3500 },
  { kode: 'SPR-T', nama: 'Sprite', hargaJual: 6000, hargaBeli: 4000, hpp: 4500 },
  { kode: 'COC-C', nama: 'Coca Cola', hargaJual: 6000, hargaBeli: 4000, hpp: 4500 },
  { kode: 'GOL-D', nama: 'Golda', hargaJual: 5000, hargaBeli: 3000, hpp: 3500 },
  { kode: 'MLK-S', nama: 'Milku Strawbery', hargaJual: 5000, hargaBeli: 3000, hpp: 3500 },
  { kode: 'PCK-H', nama: 'Pucuk', hargaJual: 5000, hargaBeli: 2500, hpp: 3000 },
  { kode: 'JMU', nama: 'Jamu', hargaJual: 7000, hargaBeli: 5000, hpp: 5500 },
  { kode: 'AQA-K', nama: 'Aqua Kecil', hargaJual: 4000, hargaBeli: 2000, hpp: 2500 },
  { kode: 'AQA-B', nama: 'Aqua Besar', hargaJual: 6000, hargaBeli: 4200, hpp: 4700 },
  { kode: 'GRG-S', nama: 'Sedap Goreng', hargaJual: 6000, hargaBeli: 3000, hpp: 4000 },
  { kode: 'KRE-S', nama: 'Sedap Kare', hargaJual: 6000, hargaBeli: 3000, hpp: 4000 },
  { kode: 'GSC-S', nama: 'Sedap Goreng Spicy Chicken', hargaJual: 6000, hargaBeli: 3500, hpp: 4500 },
  { kode: 'STO-S', nama: 'Sedap Soto', hargaJual: 6000, hargaBeli: 3000, hpp: 4000 },
  { kode: 'GRG-I', nama: 'Indomie Goreng', hargaJual: 6000, hargaBeli: 3000, hpp: 4000 },
  { kode: 'KAS-I', nama: 'Indomie Ayam Spesial', hargaJual: 6000, hargaBeli: 3000, hpp: 4000 },
  { kode: 'TLR', nama: 'Telur', hargaJual: 4000, hargaBeli: 2500, hpp: 2500 },
  { kode: 'CRG', nama: 'Cireng', hargaJual: 7000, hargaBeli: 3500, hpp: 5000 },
  { kode: 'KTG', nama: 'Kentang', hargaJual: 7000, hargaBeli: 3000, hpp: 3000 },
  { kode: 'SOS-K', nama: 'Sosis Kecil', hargaJual: 5000, hargaBeli: 2300, hpp: 3800 },
  { kode: 'SOS-B', nama: 'Sosis Besar', hargaJual: 8000, hargaBeli: 3500, hpp: 5000 },
  { kode: 'NGT', nama: 'Nugget', hargaJual: 7000, hargaBeli: 4000, hpp: 4000 },
  { kode: 'MIX-P', nama: 'Mix Platter', hargaJual: 15000, hargaBeli: 9000, hpp: 10500 },
  { kode: 'SRY-B', nama: 'Surya', hargaJual: 28000, hargaBeli: 25700, hpp: 25700 },
  { kode: 'SRY-E', nama: 'Surya Ecer', hargaJual: 3000, hargaBeli: 2200, hpp: 2200 },
  { kode: 'MLD', nama: 'A mild', hargaJual: 37000, hargaBeli: 35000, hpp: 35000 },
  { kode: 'JMS', nama: 'Jarum Super', hargaJual: 27000, hargaBeli: 23000, hpp: 23000 },
  { kode: 'MFB', nama: 'Marlboro Filter Black 12', hargaJual: 26000, hargaBeli: 23100, hpp: 23100 },
  { kode: 'AGA-K', nama: 'Aga Prima', hargaJual: 17000, hargaBeli: 14900, hpp: 14900 },
  { kode: 'AGA-P', nama: 'Aga Khusus', hargaJual: 17000, hargaBeli: 15500, hpp: 15500 },
  { kode: 'SAM-K', nama: 'Samsoe Kuning', hargaJual: 22000, hargaBeli: 19500, hpp: 19500 },
  { kode: 'SAM-R', nama: 'Samsoe Revil', hargaJual: 24000, hargaBeli: 21300, hpp: 21300 },
  { kode: 'GJB', nama: 'Gajah Baru', hargaJual: 20000, hargaBeli: 17000, hpp: 17000 },
  { kode: 'KTK-76', nama: '76 Kretek', hargaJual: 18000, hargaBeli: 15600, hpp: 15600 },
  { kode: 'JJN', nama: 'Jajan', hargaJual: 1000, hargaBeli: 800, hpp: 800 },
  { kode: 'RTI', nama: 'Roti', hargaJual: 3000, hargaBeli: 2200, hpp: 2200 },
  { kode: 'MMK', nama: 'Marboro merah kretek', hargaJual: 13000, hargaBeli: 11200, hpp: 11200 },
  { kode: 'ASB', nama: 'Abc susu btl', hargaJual: 5000, hargaBeli: 3500, hpp: 3500 },
  { kode: 'MLK-C', nama: 'Milku Coklat', hargaJual: 5000, hargaBeli: 3000, hpp: 3500 },
  { kode: 'ACH-I', nama: 'Indomie Aceh', hargaJual: 6000, hargaBeli: 3000, hpp: 4000 },
  { kode: 'RDG-I', nama: 'Indomie Rendang', hargaJual: 6000, hargaBeli: 3000, hpp: 4000 },
  { kode: 'TS-P10', nama: 'Tora Susu', hargaJual: 5000, hargaBeli: 1800, hpp: 3300 }
];

const CATEGORY_ORDER = ['Kopi', 'Non Kopi', 'Makanan', 'Snack', 'Rokok'];

// Klasifikasi kategori otomatis berdasarkan nama & kode SKU
const inferCategory = (kode, nama) => {
  const n = nama.toLowerCase();
  if (
    ['surya', 'mild', 'jarum', 'marlboro', 'marboro', 'aga ', 'samsoe', 'gajah', 'kretek'].some((k) =>
      n.includes(k)
    )
  ) {
    return 'Rokok';
  }
  if (['jajan', 'roti'].some((k) => n.includes(k))) {
    return 'Snack';
  }
  if (
    ['sedap', 'indomie', 'telur', 'cireng', 'kentang', 'sosis', 'nugget', 'mix platter'].some((k) =>
      n.includes(k)
    )
  ) {
    return 'Makanan';
  }
  if (
    ['kopi', 'kapal api', 'abc ', 'tora', 'luwak', 'goodday', 'golda'].some((k) => n.includes(k))
  ) {
    return 'Kopi';
  }
  return 'Non Kopi';
};

// Cek apakah produk adalah minuman seduh yang mendukung opsi Gula & Catatan
const isBrewedDrink = (kode, nama) => {
  const cat = inferCategory(kode, nama);
  if (cat !== 'Kopi' && cat !== 'Non Kopi') return false;
  const bottled = ['fanta', 'sprite', 'coca cola', 'golda', 'milku', 'pucuk', 'jamu', 'aqua', 'btl'];
  return !bottled.some((b) => nama.toLowerCase().includes(b));
};

const INITIAL_MASTER_SKUS = RAW_161_SKUS.map((item) => ({
  ...item,
  category: inferCategory(item.kode, item.nama),
  hasDrinkOptions: isBrewedDrink(item.kode, item.nama),
  active: true
}));

// ============================================================================
// 2. DATA HISTORIS ASLI APRIL - JUNI 2025 DARI DELTA CAFE.XLSX
// ============================================================================

const HISTORICAL_MONTHS = {
  '2025-04': {
    label: 'April 2025',
    omzet: 15549000,
    laba: 5351700,
    rokokOmzet: 4320000,
    rokokLaba: 518000,
    nonRokokOmzet: 11229000,
    nonRokokLaba: 4833700,
    cashTotal: 14120000,
    qrisTotal: 1429000,
    utangTotal: 0,
    expWarung: 485000,
    expBelanja: 9200000,
    expPribadi: 350000,
    topProducts: [
      { nama: 'Kopi Hitam', qty: 312, omzet: 1560000, laba: 1092000 },
      { nama: 'Surya', qty: 108, omzet: 3024000, laba: 248400 },
      { nama: 'Es Teh Besar', qty: 245, omzet: 1225000, laba: 735000 },
      { nama: 'Indomie Goreng', qty: 164, omzet: 984000, laba: 328000 },
      { nama: 'GoodDay Freeze Besar', qty: 140, omzet: 980000, laba: 420000 }
    ]
  },
  '2025-05': {
    label: 'Mei 2025',
    omzet: 13515000,
    laba: 4673600,
    rokokOmzet: 3890000,
    rokokLaba: 462000,
    nonRokokOmzet: 9625000,
    nonRokokLaba: 4211600,
    cashTotal: 12050000,
    qrisTotal: 1465000,
    utangTotal: 0,
    expWarung: 450000,
    expBelanja: 8100000,
    expPribadi: 300000,
    topProducts: [
      { nama: 'Kopi Hitam', qty: 280, omzet: 1400000, laba: 980000 },
      { nama: 'Surya', qty: 96, omzet: 2688000, laba: 220800 },
      { nama: 'Es Teh Besar', qty: 210, omzet: 1050000, laba: 630000 },
      { nama: 'Kopi Susu', qty: 152, omzet: 912000, laba: 319200 },
      { nama: 'Indomie Goreng', qty: 141, omzet: 846000, laba: 282000 }
    ]
  },
  '2025-06': {
    label: 'Juni 2025',
    omzet: 10013000,
    laba: 3320500,
    rokokOmzet: 2831000,
    rokokLaba: 342100,
    nonRokokOmzet: 7182000,
    nonRokokLaba: 2978400,
    cashTotal: 8890000,
    qrisTotal: 1123000,
    utangTotal: 0,
    expWarung: 410000,
    expBelanja: 6150000,
    expPribadi: 250000,
    topProducts: [
      { nama: 'Kopi Hitam', qty: 215, omzet: 1075000, laba: 752500 },
      { nama: 'Surya', qty: 72, omzet: 2016000, laba: 165600 },
      { nama: 'Es Teh Besar', qty: 176, omzet: 880000, laba: 528000 },
      { nama: 'GoodDay Freeze Besar', qty: 112, omzet: 784000, laba: 336000 },
      { nama: 'Cireng', qty: 94, omzet: 658000, laba: 188000 }
    ]
  }
};

// ============================================================================
// 3. DAFTAR UTANG TERBARU DARI PEMILIK (TOTAL Rp490.000)
// ============================================================================

const todayISO = () => new Date().toISOString().split('T')[0];

const INITIAL_OWNER_DEBTS = [
  { id: 'DBT-1', date: todayISO(), customerName: 'Kopet', description: 'Bon 1 (catatan lama)', amount: 300000, paidAmount: 0 },
  { id: 'DBT-2', date: todayISO(), customerName: 'Kopet', description: 'Bon 2 (tambahan)', amount: 17000, paidAmount: 0 },
  { id: 'DBT-3', date: todayISO(), customerName: 'Sahrul', description: 'Catatan utang', amount: 100000, paidAmount: 0 },
  { id: 'DBT-4', date: todayISO(), customerName: 'Ndandul', description: 'Catatan utang', amount: 39000, paidAmount: 0 },
  { id: 'DBT-5', date: todayISO(), customerName: 'Sambo', description: 'Catatan utang', amount: 22000, paidAmount: 0 },
  { id: 'DBT-6', date: todayISO(), customerName: 'Gomblo', description: 'Catatan utang', amount: 8000, paidAmount: 0 },
  { id: 'DBT-7', date: todayISO(), customerName: 'Panjol', description: 'Catatan utang', amount: 4000, paidAmount: 0 }
];

const INITIAL_ORDERS_TODAY = [
  {
    id: 'ORD-101',
    date: todayISO(),
    time: '09:20',
    items: [
      { kode: 'KPI-H', nama: 'Kopi Hitam', category: 'Kopi', qty: 2, unitPrice: 5000, hpp: 2500, size: '', temp: 'Panas', sugar: 'Normal', note: '' },
      { kode: 'CRG', nama: 'Cireng', category: 'Makanan', qty: 1, unitPrice: 7000, hpp: 5000, size: '', temp: '', sugar: '', note: '' }
    ],
    total: 17000,
    paymentMethod: 'Cash',
    paymentStatus: 'Lunas',
    orderStatus: 'Selesai',
    customerName: 'Meja 1'
  },
  {
    id: 'ORD-102',
    date: todayISO(),
    time: '10:45',
    items: [
      { kode: 'GRG-I', nama: 'Indomie Goreng', category: 'Makanan', qty: 1, unitPrice: 6000, hpp: 4000, size: '', temp: '', sugar: '', note: 'Cabai' },
      { kode: 'TLR', nama: 'Telur', category: 'Makanan', qty: 1, unitPrice: 4000, hpp: 2500, size: '', temp: '', sugar: '', note: 'Tambahan Indomie Goreng' }
    ],
    total: 10000,
    paymentMethod: '',
    paymentStatus: 'Belum dibayar',
    orderStatus: 'Proses',
    customerName: 'Mas Budi'
  }
];

const INITIAL_EXPENSES_TODAY = [
  { id: 'EXP-01', date: todayISO(), group: 'Warung', category: 'Cup', description: 'Cup 14oz & sedotan', amount: 20000 }
];

const INITIAL_WARUNG_CATEGORIES = ['Listrik', 'Gas', 'Wifi', 'Cup', 'Cup sealer', 'Sedotan', 'Lainnya'];

const formatRp = (num) => 'Rp' + Number(num || 0).toLocaleString('id-ID');
const normalizeName = (name) => (name || '').toLowerCase().replace(/\s+/g, '');

// ============================================================================
// 4. LOGIKA PENGGABUNGAN LENGKAP SEMUA 161 SKU UNTUK TAMPILAN KASIR RINGKAS
// ============================================================================

function buildGroupedMenu(skus) {
  const activeSkus = skus.filter((s) => s.active);
  const groupsMap = new Map();

  activeSkus.forEach((sku) => {
    let baseName = sku.nama;
    let variantInfo = { size: '', temp: '', withMilk: false, flavor: '' };

    // 1. Nutrisari (13 Rasa x Kecil/Besar = 26 SKU)
    if (sku.nama.toLowerCase().startsWith('nutrisari ')) {
      baseName = 'Nutrisari';
      const match = sku.nama.match(/^Nutrisari\s+(.*?)\s+(Kecil|Besar)$/i);
      if (match) {
        variantInfo = { flavor: match[1], size: match[2], temp: 'Dingin', withMilk: false };
      }
    }
    // 2. PopIce (14 Rasa x Kecil/Besar = 28 SKU)
    else if (sku.nama.toLowerCase().startsWith('popice ')) {
      baseName = 'PopIce';
      const match = sku.nama.match(/^PopIce\s+(.*?)\s+(Kecil|Besar)$/i);
      if (match) {
        variantInfo = { flavor: match[1], size: match[2], temp: 'Dingin', withMilk: false };
      }
    }
    // 3. Energen (3 Rasa x Panas/Kecil/Besar = 9 SKU)
    else if (sku.nama.toLowerCase().startsWith('energen ')) {
      baseName = 'Energen';
      const match = sku.nama.match(/^Energen\s+(.*?)\s+(Kecil|Besar|Panas)$/i);
      if (match) {
        const suffix = match[2].toLowerCase();
        variantInfo = {
          flavor: match[1],
          size: suffix === 'besar' ? 'Besar' : 'Kecil',
          temp: suffix === 'panas' ? 'Panas' : 'Dingin',
          withMilk: false
        };
      }
    }
    // 4. Dancow (2 Rasa x Panas/Kecil/Besar = 6 SKU)
    else if (sku.nama.toLowerCase().startsWith('dancow ')) {
      baseName = 'Dancow';
      const match = sku.nama.match(/^Dancow\s+(.*?)\s+(Kecil|Besar|Panas)$/i);
      if (match) {
        const suffix = match[2].toLowerCase();
        variantInfo = {
          flavor: match[1],
          size: suffix === 'besar' ? 'Besar' : 'Kecil',
          temp: suffix === 'panas' ? 'Panas' : 'Dingin',
          withMilk: false
        };
      }
    }
    // 5. Indomilk (2 Rasa x Panas/Kecil/Besar = 6 SKU)
    else if (sku.nama.toLowerCase().startsWith('indomilk ')) {
      baseName = 'Indomilk';
      const match = sku.nama.match(/^Indomilk\s+(.*?)\s+(Kecil|Besar|Panas)$/i);
      if (match) {
        const suffix = match[2].toLowerCase();
        variantInfo = {
          flavor: match[1],
          size: suffix === 'besar' ? 'Besar' : 'Kecil',
          temp: suffix === 'panas' ? 'Panas' : 'Dingin',
          withMilk: false
        };
      }
    }
    // 6. Teajus (3 Rasa x Kecil/Besar = 6 SKU)
    else if (sku.nama.toLowerCase().startsWith('teajus ')) {
      baseName = 'Teajus';
      const match = sku.nama.match(/^Teajus\s+(.*?)\s+(Kecil|Besar)$/i);
      if (match) {
        variantInfo = { flavor: match[1], size: match[2], temp: 'Dingin', withMilk: false };
      }
    }
    // 7. ABC Sachet (ABC Susu Panas & ABC Mocca Panas - bukan ABC botol)
    else if (['ABS-P4', 'ABM-P5'].includes(sku.kode)) {
      baseName = 'ABC';
      variantInfo = {
        flavor: sku.kode === 'ABS-P4' ? 'Susu' : 'Mocca',
        size: 'Kecil',
        temp: 'Panas',
        withMilk: false
      };
    }
    // 8. Luwak (Luwak Hitam & Luwak White Coffee)
    else if (['LH-P7', 'LWC-P8'].includes(sku.kode)) {
      baseName = 'Luwak';
      variantInfo = {
        flavor: sku.kode === 'LH-P7' ? 'Hitam' : 'White Coffee',
        size: 'Kecil',
        temp: 'Panas',
        withMilk: false
      };
    }
    // 9. Tora (Tora Moka & Tora Susu)
    else if (['TM-P6', 'TS-P10'].includes(sku.kode)) {
      baseName = 'Tora';
      variantInfo = {
        flavor: sku.kode === 'TM-P6' ? 'Moka' : 'Susu',
        size: 'Kecil',
        temp: 'Panas',
        withMilk: false
      };
    }
    // 10. Teh / Es Teh
    else if (['STH-P', 'STH-K', 'STH-B'].includes(sku.kode)) {
      baseName = 'Teh / Es Teh';
      if (sku.kode === 'STH-P') variantInfo = { size: 'Kecil', temp: 'Panas', withMilk: false, flavor: '' };
      if (sku.kode === 'STH-K') variantInfo = { size: 'Kecil', temp: 'Dingin', withMilk: false, flavor: '' };
      if (sku.kode === 'STH-B') variantInfo = { size: 'Besar', temp: 'Dingin', withMilk: false, flavor: '' };
    }
    // 11. Extra Joss / Joshua
    else if (['EXJ-K', 'EXJ-B', 'JSH-B'].includes(sku.kode)) {
      baseName = 'Extra Joss / Joshua';
      if (sku.kode === 'EXJ-K') variantInfo = { size: 'Kecil', temp: 'Dingin', withMilk: false, flavor: '' };
      if (sku.kode === 'EXJ-B') variantInfo = { size: 'Besar', temp: 'Dingin', withMilk: false, flavor: '' };
      if (sku.kode === 'JSH-B') variantInfo = { size: 'Besar', temp: 'Dingin', withMilk: true, flavor: '' };
    }
    // 12. Kuku Bima & Kuku Bima Susu
    else if (sku.nama.startsWith('Kuku Bima')) {
      baseName = 'Kuku Bima';
      const withMilk = sku.nama.includes('Susu');
      const size = sku.nama.includes('Besar') ? 'Besar' : 'Kecil';
      variantInfo = { size, temp: 'Dingin', withMilk, flavor: '' };
    }
    // 13. Hemaviton & Hemaviton Susu
    else if (sku.nama.startsWith('Hemaviton')) {
      baseName = 'Hemaviton';
      const withMilk = sku.nama.includes('Susu');
      const size = sku.nama.includes('Besar') ? 'Besar' : 'Kecil';
      variantInfo = { size, temp: 'Dingin', withMilk, flavor: '' };
    }
    // 14. Fanta (Fanta Merah & Fanta Soda)
    else if (['FNT-M', 'FNT-S'].includes(sku.kode)) {
      baseName = 'Fanta';
      variantInfo = {
        flavor: sku.kode === 'FNT-M' ? 'Merah' : 'Soda',
        size: '',
        temp: '',
        withMilk: false
      };
    }
    // 15. Milku (Milku Strawberry & Milku Coklat)
    else if (['MLK-S', 'MLK-C'].includes(sku.kode)) {
      baseName = 'Milku';
      variantInfo = {
        flavor: sku.kode === 'MLK-S' ? 'Strawberry' : 'Coklat',
        size: '',
        temp: '',
        withMilk: false
      };
    }
    // 16. Indomie (Goreng, Ayam Spesial, Aceh, Rendang)
    else if (sku.nama.toLowerCase().startsWith('indomie ')) {
      baseName = 'Indomie';
      const flavor = sku.nama.replace(/^Indomie\s+/i, '');
      variantInfo = { flavor, size: '', temp: '', withMilk: false };
    }
    // 17. Mie Sedap (Goreng, Kare, Goreng Spicy Chicken, Soto)
    else if (sku.nama.toLowerCase().startsWith('sedap ')) {
      baseName = 'Mie Sedap';
      const flavor = sku.nama.replace(/^Sedap\s+/i, '');
      variantInfo = { flavor, size: '', temp: '', withMilk: false };
    }
    // 18. Pengelompokan umum akhiran Kecil / Besar / Panas (Milo, Chocolatos, GoodDay, Susu Soda, dll.)
    else if (!sku.nama.startsWith('Aqua') && !sku.nama.startsWith('Sosis')) {
      const match = sku.nama.match(/^(.*?)\s+(Kecil|Besar|Panas)$/i);
      if (match) {
        baseName = match[1];
        const suffix = match[2].toLowerCase();
        if (suffix === 'panas') variantInfo = { size: 'Kecil', temp: 'Panas', withMilk: false, flavor: '' };
        else if (suffix === 'besar') variantInfo = { size: 'Besar', temp: 'Dingin', withMilk: false, flavor: '' };
        else variantInfo = { size: 'Kecil', temp: 'Dingin', withMilk: false, flavor: '' };
      }
    }

    const groupKey = `${sku.category}::${baseName.toLowerCase()}`;
    if (!groupsMap.has(groupKey)) {
      groupsMap.set(groupKey, {
        groupKey,
        baseName,
        category: sku.category,
        hasDrinkOptions: sku.hasDrinkOptions,
        variants: []
      });
    }
    groupsMap.get(groupKey).variants.push({
      sku,
      ...variantInfo
    });
  });

  return Array.from(groupsMap.values()).sort((a, b) => {
    const catDiff = CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category);
    if (catDiff !== 0) return catDiff;
    return a.baseName.localeCompare(b.baseName);
  });
}

// ============================================================================
// 5. KOMPONEN UTAMA APLIKASI DELTA CAFE
// ============================================================================

export default function App() {
  // Status Login Google (tersimpan persisten di localStorage)
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('dc2_loggedIn') === 'true');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [userEmail] = useState('deltacafeid575@gmail.com');

  // Data Aplikasi (tersimpan di localStorage)
  const [shopName, setShopName] = useState(() => localStorage.getItem('dc2_shopName') || 'Delta Cafe');
  const [skus, setSkus] = useState(() => {
    const saved = localStorage.getItem('dc2_skus');
    return saved ? JSON.parse(saved) : INITIAL_MASTER_SKUS;
  });
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('dc2_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS_TODAY;
  });
  const [manualDebts, setManualDebts] = useState(() => {
    const saved = localStorage.getItem('dc2_debts');
    return saved ? JSON.parse(saved) : INITIAL_OWNER_DEBTS;
  });
  const [debtPaymentsToday, setDebtPaymentsToday] = useState(() => {
    const saved = localStorage.getItem('dc2_debtPayments');
    return saved ? JSON.parse(saved) : [];
  });
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('dc2_expenses');
    return saved ? JSON.parse(saved) : INITIAL_EXPENSES_TODAY;
  });
  const [stockPurchases, setStockPurchases] = useState(() => {
    const saved = localStorage.getItem('dc2_stocks');
    return saved ? JSON.parse(saved) : [];
  });
  const [warungCategories, setWarungCategories] = useState(() => {
    const saved = localStorage.getItem('dc2_warungCats');
    return saved ? JSON.parse(saved) : INITIAL_WARUNG_CATEGORIES;
  });
  const [includeCupStrawInWarung, setIncludeCupStrawInWarung] = useState(true);
  const [keepScreenOn, setKeepScreenOn] = useState(() => localStorage.getItem('dc2_keepScreenOn') === 'true');
  const [lastExported, setLastExported] = useState(() => localStorage.getItem('dc2_lastExport') || 'Belum pernah');

  // Status Autosave & Koneksi
  const [isOffline, setIsOffline] = useState(false);
  const [syncStatus, setSyncStatus] = useState('saved');

  // Navigasi Utama: 'menu' | 'pesanan' | 'keuangan' | 'lainnya'
  const [activeTab, setActiveTab] = useState('menu');

  // Toast Notifikasi
  const [toast, setToast] = useState(null);
  const showToast = (msg, type = 'info') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  useEffect(() => {
    localStorage.setItem('dc2_loggedIn', String(isLoggedIn));
  }, [isLoggedIn]);

  // Screen Wake Lock API agar layar HP tidak cepat mati saat kasir buka
  useEffect(() => {
    localStorage.setItem('dc2_keepScreenOn', String(keepScreenOn));
    let wakeLock = null;
    const requestWakeLock = async () => {
      try {
        if (keepScreenOn && 'wakeLock' in navigator) {
          wakeLock = await navigator.wakeLock.request('screen');
        }
      } catch (err) {
        // Abaikan jika browser membatasi wakeLock
      }
    };
    requestWakeLock();
    return () => {
      if (wakeLock) wakeLock.release().catch(() => {});
    };
  }, [keepScreenOn]);

  useEffect(() => {
    localStorage.setItem('dc2_shopName', shopName);
    localStorage.setItem('dc2_skus', JSON.stringify(skus));
    localStorage.setItem('dc2_orders', JSON.stringify(orders));
    localStorage.setItem('dc2_debts', JSON.stringify(manualDebts));
    localStorage.setItem('dc2_debtPayments', JSON.stringify(debtPaymentsToday));
    localStorage.setItem('dc2_expenses', JSON.stringify(expenses));
    localStorage.setItem('dc2_stocks', JSON.stringify(stockPurchases));
    localStorage.setItem('dc2_warungCats', JSON.stringify(warungCategories));

    if (isOffline) {
      setSyncStatus('offline');
      return;
    }
    setSyncStatus('saving');
    const t = setTimeout(() => setSyncStatus('saved'), 700);
    return () => clearTimeout(t);
  }, [shopName, skus, orders, manualDebts, debtPaymentsToday, expenses, stockPurchases, warungCategories, isOffline]);

  // ==========================================================================
  // STATE KASIR & KERANJANG (TAB MENU)
  // ==========================================================================
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [showFilterSheet, setShowFilterSheet] = useState(false);

  // Bottom sheet opsi produk
  const [activeGroup, setActiveGroup] = useState(null);
  const [optFlavor, setOptFlavor] = useState('');
  const [optSize, setOptSize] = useState('Kecil');
  const [optTemp, setOptTemp] = useState('Dingin');
  const [optWithMilk, setOptWithMilk] = useState(false);
  const [optSugar, setOptSugar] = useState('Normal');
  const [optAddEgg, setOptAddEgg] = useState(false);
  const [optAddChili, setOptAddChili] = useState(false);
  const [optNote, setOptNote] = useState('');
  const [optQty, setOptQty] = useState(1);

  // Keranjang (Nama Pelanggan / Nomor Meja diisi saat pembuatan pesanan)
  const [cart, setCart] = useState([]);
  const [showCartSheet, setShowCartSheet] = useState(false);
  const [orderCustomerName, setOrderCustomerName] = useState('');
  const [editingCartPriceIdx, setEditingCartPriceIdx] = useState(null);
  const [tempPriceInput, setTempPriceInput] = useState('');

  // ==========================================================================
  // STATE TAB PESANAN (ALUR 3 TAHAP: PROSES -> BELUM DIBAYAR -> SELESAI)
  // ==========================================================================
  const [orderFilter, setOrderFilter] = useState('Proses');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);
  const [confirmCancelOrder, setConfirmCancelOrder] = useState(null);
  const [payOrderModal, setPayOrderModal] = useState(null);
  const [payOrderSelectedMethod, setPayOrderSelectedMethod] = useState('Cash');
  const [payOrderDebtName, setPayOrderDebtName] = useState('');

  // ==========================================================================
  // STATE TAB KEUANGAN & UTANG
  // ==========================================================================
  const [financePeriod, setFinancePeriod] = useState('Harian'); // 'Harian' | 'Bulanan' | '3 Bulan' | '4 Bulan' | 'Tahunan'
  const [periodOffset, setPeriodOffset] = useState(0); // 0 = saat ini, -1 = periode sebelumnya, dst.
  const [financeSubTab, setFinanceSubTab] = useState('Pemasukan'); // 'Pemasukan' | 'Pengeluaran' | 'Utang'
  const [incomeViewMode, setIncomeViewMode] = useState('transaksi'); // 'transaksi' | 'menu'

  // Form Pengeluaran
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [expDate, setExpDate] = useState(todayISO());
  const [expGroup, setExpGroup] = useState('Warung');
  const [expCategory, setExpCategory] = useState('Listrik');
  const [expDesc, setExpDesc] = useState('');
  const [expAmount, setExpAmount] = useState('');

  // Utang
  const [selectedDebtorKey, setSelectedDebtorKey] = useState(null);
  const [showAddDebtModal, setShowAddDebtModal] = useState(false);
  const [isDebtNameLocked, setIsDebtNameLocked] = useState(false);
  const [newDebtName, setNewDebtName] = useState('');
  const [newDebtDesc, setNewDebtDesc] = useState('');
  const [newDebtAmount, setNewDebtAmount] = useState('');
  const [editingBonModal, setEditingBonModal] = useState(null);
  const [confirmDeleteBon, setConfirmDeleteBon] = useState(null);
  const [payDebtModal, setPayDebtModal] = useState(null);
  const [payDebtAmount, setPayDebtAmount] = useState('');
  const [payDebtVia, setPayDebtVia] = useState('Cash');
  const [mergeModal, setMergeModal] = useState(false);
  const [mergeSource, setMergeSource] = useState('');
  const [mergeTarget, setMergeTarget] = useState('');

  // ==========================================================================
  // STATE TAB LAINNYA
  // ==========================================================================
  const [lainnyaView, setLainnyaView] = useState('home');
  const [menuSearch, setMenuSearch] = useState('');
  // Barang
  const [stkDate, setStkDate] = useState(todayISO());
  const [stkName, setStkName] = useState('');
  const [stkQty, setStkQty] = useState('');
  const [stkAmount, setStkAmount] = useState('');
  // Tambah Menu
  const [mnName, setMnName] = useState('');
  const [mnCategory, setMnCategory] = useState('Kopi');
  const [mnPrice, setMnPrice] = useState('');
  const [mnBuyPrice, setMnBuyPrice] = useState('');
  const [mnHpp, setMnHpp] = useState('');
  const [mnCode, setMnCode] = useState('');
  const [mnHasDrinkOpt, setMnHasDrinkOpt] = useState(true);
  // Edit Menu
  const [editMenuModal, setEditMenuModal] = useState(null);
  // Pengaturan
  const [newWarungCat, setNewWarungCat] = useState('');

  // ==========================================================================
  // MENU TERKELOMPOK UNTUK KASIR
  // ==========================================================================
  const groupedMenu = useMemo(() => buildGroupedMenu(skus), [skus]);

  const visibleMenuGroups = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return groupedMenu
      .filter((g) => (selectedCategory === 'Semua' ? true : g.category === selectedCategory))
      .filter(
        (g) =>
          g.baseName.toLowerCase().includes(q) ||
          g.variants.some((v) => v.sku.nama.toLowerCase().includes(q))
      );
  }, [groupedMenu, selectedCategory, searchQuery]);

  // Menentukan SKU spesifik dari pilihan opsi di bottom sheet
  const resolvedVariantSku = useMemo(() => {
    if (!activeGroup) return null;
    if (activeGroup.variants.length === 1) return activeGroup.variants[0].sku;

    const hasFlavors = activeGroup.variants.some((v) => v.flavor);
    if (hasFlavors) {
      const hasSizes = activeGroup.variants.some((v) => v.size);
      const hasTemps = activeGroup.variants.some((v) => v.temp);
      let match = activeGroup.variants.find((v) => {
        if (v.flavor !== optFlavor) return false;
        if (hasSizes && v.size && v.size !== optSize) return false;
        if (hasTemps && v.temp && v.temp !== optTemp) return false;
        return true;
      });
      if (!match && hasSizes) {
        match = activeGroup.variants.find((v) => v.flavor === optFlavor && v.size === optSize);
      }
      if (!match) {
        match = activeGroup.variants.find((v) => v.flavor === optFlavor);
      }
      return match ? match.sku : activeGroup.variants[0].sku;
    }

    const isEnergy = ['Kuku Bima', 'Hemaviton', 'Extra Joss / Joshua'].includes(activeGroup.baseName);

    let match = activeGroup.variants.find((v) => {
      if (isEnergy) {
        return v.withMilk === optWithMilk && v.size === optSize;
      }
      return v.size === optSize && v.temp === optTemp;
    });

    if (!match) {
      match = activeGroup.variants.find((v) => (isEnergy ? v.withMilk === optWithMilk : v.temp === optTemp));
    }
    if (!match) {
      match = activeGroup.variants.find((v) => v.size === optSize);
    }
    return match ? match.sku : activeGroup.variants[0].sku;
  }, [activeGroup, optFlavor, optSize, optTemp, optWithMilk]);

  const isMieProduct = (group) => {
    if (!group) return false;
    const n = group.baseName.toLowerCase();
    return n.includes('indomie') || n.includes('sedap');
  };

  const handleGroupTap = (group) => {
    const isMie = isMieProduct(group);
    if (group.hasDrinkOptions || group.variants.length > 1 || isMie) {
      setActiveGroup(group);
      const first = group.variants[0];
      setOptFlavor(first.flavor || '');
      setOptSize(first.size || 'Kecil');
      setOptTemp(first.temp || 'Dingin');
      setOptWithMilk(false);
      setOptSugar('Normal');
      setOptAddEgg(false);
      setOptAddChili(false);
      setOptNote('');
      setOptQty(1);
    } else {
      const sku = group.variants[0].sku;
      addItemToCart({
        kode: sku.kode,
        nama: sku.nama,
        category: sku.category,
        qty: 1,
        unitPrice: sku.hargaJual,
        hpp: sku.hpp,
        size: '',
        temp: '',
        sugar: '',
        note: ''
      });
      showToast(`${sku.nama} masuk keranjang`);
    }
  };

  const addItemToCart = (newItem) => {
    setCart((prev) => {
      const idx = prev.findIndex(
        (it) =>
          it.kode === newItem.kode &&
          it.unitPrice === newItem.unitPrice &&
          it.sugar === newItem.sugar &&
          it.note === newItem.note
      );
      if (idx > -1) {
        const copy = [...prev];
        copy[idx].qty += newItem.qty;
        return copy;
      }
      return [...prev, newItem];
    });
  };

  const handleConfirmOptionSheet = () => {
    if (!activeGroup || !resolvedVariantSku) return;
    const isMie = isMieProduct(activeGroup);

    const noteParts = [];
    if (isMie && optAddChili) noteParts.push('Cabai');
    if (optNote.trim()) noteParts.push(optNote.trim());

    addItemToCart({
      kode: resolvedVariantSku.kode,
      nama: resolvedVariantSku.nama,
      category: resolvedVariantSku.category,
      qty: optQty,
      unitPrice: resolvedVariantSku.hargaJual,
      hpp: resolvedVariantSku.hpp,
      size: activeGroup.hasDrinkOptions ? optSize : '',
      temp: activeGroup.hasDrinkOptions ? optTemp : '',
      sugar: activeGroup.hasDrinkOptions ? optSugar : '',
      note: noteParts.join(' · ')
    });

    // Aturan: Tambahan Telur dipisah sebagai item tersendiri berkode TLR
    if (isMie && optAddEgg) {
      const telurSku = skus.find((s) => s.kode === 'TLR') || {
        kode: 'TLR',
        nama: 'Telur',
        category: 'Makanan',
        hargaJual: 4000,
        hpp: 2500
      };
      addItemToCart({
        kode: telurSku.kode,
        nama: telurSku.nama,
        category: telurSku.category,
        qty: optQty,
        unitPrice: telurSku.hargaJual,
        hpp: telurSku.hpp,
        size: '',
        temp: '',
        sugar: '',
        note: `Tambahan ${resolvedVariantSku.nama}`
      });
    }

    showToast(
      isMie && optAddEgg
        ? `${resolvedVariantSku.nama} + Telur (terpisah) ditambahkan`
        : `${resolvedVariantSku.nama} (${optQty}x) ditambahkan`
    );
    setActiveGroup(null);
  };

  const cartTotal = useMemo(() => cart.reduce((s, it) => s + it.unitPrice * it.qty, 0), [cart]);
  const cartCount = useMemo(() => cart.reduce((s, it) => s + it.qty, 0), [cart]);

  // BUAT PESANAN: Masuk ke Tab Proses dulu, pembayaran setelah pesanan selesai disajikan
  const handleCreateOrder = () => {
    if (cart.length === 0) return;

    const cleanName = orderCustomerName.trim();
    const newOrder = {
      id: `ORD-${Math.floor(100 + Math.random() * 900)}`,
      date: todayISO(),
      time: new Date().toTimeString().slice(0, 5),
      items: [...cart],
      total: cartTotal,
      paymentMethod: '',
      paymentStatus: 'Belum dibayar',
      orderStatus: 'Proses',
      customerName: cleanName
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    setOrderCustomerName('');
    setShowCartSheet(false);
    showToast('Pesanan dibuat · Masuk ke tab Proses');
    setActiveTab('pesanan');
    setOrderFilter('Proses');
  };

  // ==========================================================================
  // TAHAP 1 -> TAHAP 2: SELESAIKAN PESANAN (PINDAH DARI PROSES KE BELUM DIBAYAR)
  // ==========================================================================
  const handleMarkOrderPrepared = (order) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === order.id
          ? {
              ...o,
              orderStatus: 'Selesai'
            }
          : o
      )
    );
    showToast('Pesanan selesai dibuat · Dipindahkan ke tab Belum dibayar');
    setSelectedOrder(null);
  };

  // ==========================================================================
  // TAHAP 2 -> TAHAP 3: PEMBAYARAN PESANAN (PINDAH DARI BELUM DIBAYAR KE SELESAI)
  // ==========================================================================
  const handleConfirmOrderPayment = () => {
    if (!payOrderModal) return;
    const method = payOrderSelectedMethod;
    const finalName = (payOrderDebtName || payOrderModal.customerName || '').trim();

    if (method === 'Utang' && !finalName) {
      showToast('Isi nama pelanggan untuk mencatat Utang', 'error');
      return;
    }

    const today = todayISO();

    if (method === 'Utang') {
      const targetKey = normalizeName(finalName);
      const existingTodayIdx = orders.findIndex(
        (o) =>
          o.id !== payOrderModal.id &&
          o.orderStatus !== 'Dibatalkan' &&
          o.date === today &&
          (o.paymentMethod === 'Utang' || o.originalMethod === 'Utang') &&
          normalizeName(o.customerName) === targetKey
      );

      if (existingTodayIdx > -1) {
        setOrders((prev) => {
          const copy = [...prev];
          const existing = { ...copy[existingTodayIdx] };
          const mergedItems = [...existing.items];

          payOrderModal.items.forEach((newIt) => {
            const idx = mergedItems.findIndex(
              (m) =>
                m.kode === newIt.kode &&
                m.unitPrice === newIt.unitPrice &&
                m.sugar === newIt.sugar &&
                m.note === newIt.note
            );
            if (idx > -1) {
              mergedItems[idx] = { ...mergedItems[idx], qty: mergedItems[idx].qty + newIt.qty };
            } else {
              mergedItems.push({ ...newIt });
            }
          });

          existing.items = mergedItems;
          existing.total = mergedItems.reduce((s, it) => s + it.unitPrice * it.qty, 0);
          existing.paymentStatus = 'Belum dibayar';
          existing.paymentMethod = 'Utang';
          existing.originalMethod = 'Utang';
          existing.orderStatus = 'Selesai';
          copy[existingTodayIdx] = existing;
          return copy.filter((o) => o.id !== payOrderModal.id);
        });

        showToast(`Dicatat & digabung ke bon hari ini milik ${finalName}`);
        setPayOrderModal(null);
        return;
      }

      setOrders((prev) =>
        prev.map((o) =>
          o.id === payOrderModal.id
            ? {
                ...o,
                customerName: finalName,
                paymentMethod: 'Utang',
                originalMethod: 'Utang',
                paymentStatus: 'Belum dibayar',
                orderStatus: 'Selesai'
              }
            : o
        )
      );
      showToast(`Dicatat sebagai Utang (${finalName}) · Masuk tab Selesai`);
      setPayOrderModal(null);
      return;
    }

    // Pembayaran Cash atau QRIS
    const wasAlreadyDebt = payOrderModal.paymentMethod === 'Utang' || payOrderModal.originalMethod === 'Utang';
    setOrders((prev) =>
      prev.map((o) =>
        o.id === payOrderModal.id
          ? {
              ...o,
              customerName: finalName || o.customerName,
              paymentMethod: method,
              originalMethod: wasAlreadyDebt ? 'Utang' : o.originalMethod,
              paymentStatus: 'Lunas',
              orderStatus: 'Selesai'
            }
          : o
      )
    );

    if (wasAlreadyDebt) {
      setDebtPaymentsToday((prev) => [...prev, { date: today, amount: payOrderModal.total, via: method }]);
    }

    showToast(`Lunas (${method}) · Pindah ke tab Selesai`);
    setPayOrderModal(null);
  };

  // ==========================================================================
  // AGREGASI UTANG PELANGGAN
  // ==========================================================================
  const debtorsList = useMemo(() => {
    const map = {};

    orders.forEach((ord) => {
      if (ord.orderStatus === 'Dibatalkan') return;
      if (ord.paymentMethod === 'Utang' || ord.originalMethod === 'Utang') {
        const raw = ord.customerName || 'Tanpa Nama';
        const key = normalizeName(raw);
        if (!map[key]) map[key] = { key, displayName: raw, entries: [], totalDebt: 0, totalPaid: 0, balance: 0 };
        const paid = ord.paymentStatus === 'Lunas' ? ord.total : ord.paidAmount || 0;
        map[key].entries.push({
          id: ord.id,
          source: 'order',
          date: ord.date,
          description: ord.items.map((i) => `${i.nama} (${i.qty}x)`).join(', '),
          amount: ord.total,
          paidAmount: paid,
          isPaid: ord.paymentStatus === 'Lunas'
        });
        map[key].totalDebt += ord.total;
        map[key].totalPaid += paid;
      }
    });

    manualDebts.forEach((md) => {
      const raw = md.customerName || 'Tanpa Nama';
      const key = normalizeName(raw);
      if (!map[key]) map[key] = { key, displayName: raw, entries: [], totalDebt: 0, totalPaid: 0, balance: 0 };
      const paid = md.paidAmount || 0;
      map[key].entries.push({
        id: md.id,
        source: 'manual',
        date: md.date,
        description: md.description || 'Catatan utang',
        amount: md.amount,
        paidAmount: paid,
        isPaid: paid >= md.amount
      });
      map[key].totalDebt += md.amount;
      map[key].totalPaid += paid;
    });

    return Object.values(map)
      .map((d) => ({ ...d, balance: Math.max(0, d.totalDebt - d.totalPaid) }))
      .sort((a, b) => b.balance - a.balance);
  }, [orders, manualDebts]);

  const totalUnpaidDebt = useMemo(() => debtorsList.reduce((s, d) => s + d.balance, 0), [debtorsList]);

  // ==========================================================================
  // PERHITUNGAN KEUANGAN & PERIODE HISTORIS (HARIAN, BULANAN, 3/4 BULAN, TAHUN)
  // ==========================================================================
  const financeReport = useMemo(() => {
    const today = todayISO();

    if (financePeriod === 'Bulanan' && periodOffset < 0) {
      const histKeys = ['2025-06', '2025-05', '2025-04'];
      const targetKey = histKeys[Math.min(Math.abs(periodOffset) - 1, histKeys.length - 1)];
      const h = HISTORICAL_MONTHS[targetKey];
      return {
        periodLabel: `${h.label} (Arsip Excel)`,
        isArchive: true,
        totalSales: h.omzet,
        netWarungProfit: h.laba - h.expWarung,
        grossProfit: h.laba,
        rokokSales: h.rokokOmzet,
        rokokProfit: h.rokokLaba,
        nonRokokSales: h.nonRokokOmzet,
        nonRokokProfit: h.nonRokokLaba,
        cashTotal: h.cashTotal,
        qrisTotal: h.qrisTotal,
        utangTotal: 0,
        paidDebtCashToday: 0,
        expBelanjaStok: h.expBelanja,
        expWarung: h.expWarung,
        expPribadi: h.expPribadi,
        missingHppCount: 0,
        validOrders: [],
        periodExpenses: [],
        topProducts: h.topProducts
      };
    }

    if (financePeriod === '3 Bulan' && periodOffset <= 0) {
      const m4 = HISTORICAL_MONTHS['2025-04'];
      const m5 = HISTORICAL_MONTHS['2025-05'];
      const m6 = HISTORICAL_MONTHS['2025-06'];
      const totalSales3 = m4.omzet + m5.omzet + m6.omzet;
      const grossProfit3 = m4.laba + m5.laba + m6.laba;
      const expWarung3 = m4.expWarung + m5.expWarung + m6.expWarung;
      return {
        periodLabel: 'Apr – Jun 2025 (3 Bulan Excel)',
        isArchive: true,
        totalSales: totalSales3,
        netWarungProfit: grossProfit3 - expWarung3,
        grossProfit: grossProfit3,
        rokokSales: m4.rokokOmzet + m5.rokokOmzet + m6.rokokOmzet,
        rokokProfit: m4.rokokLaba + m5.rokokLaba + m6.rokokLaba,
        nonRokokSales: m4.nonRokokOmzet + m5.nonRokokOmzet + m6.nonRokokOmzet,
        nonRokokProfit: m4.nonRokokLaba + m5.nonRokokLaba + m6.nonRokokLaba,
        cashTotal: m4.cashTotal + m5.cashTotal + m6.cashTotal,
        qrisTotal: m4.qrisTotal + m5.qrisTotal + m6.qrisTotal,
        utangTotal: 0,
        paidDebtCashToday: 0,
        expBelanjaStok: m4.expBelanja + m5.expBelanja + m6.expBelanja,
        expWarung: expWarung3,
        expPribadi: m4.expPribadi + m5.expPribadi + m6.expPribadi,
        missingHppCount: 0,
        validOrders: [],
        periodExpenses: [],
        topProducts: m4.topProducts
      };
    }

    if ((financePeriod === '4 Bulan' || financePeriod === 'Tahunan') && periodOffset < 0) {
      const m4 = HISTORICAL_MONTHS['2025-04'];
      const m5 = HISTORICAL_MONTHS['2025-05'];
      const m6 = HISTORICAL_MONTHS['2025-06'];
      const totalSales4 = m4.omzet + m5.omzet + m6.omzet;
      const grossProfit4 = m4.laba + m5.laba + m6.laba;
      const expWarung4 = m4.expWarung + m5.expWarung + m6.expWarung;
      return {
        periodLabel: 'Apr – Jun 2025 (3 Bulan Excel)',
        isArchive: true,
        totalSales: totalSales4,
        netWarungProfit: grossProfit4 - expWarung4,
        grossProfit: grossProfit4,
        rokokSales: m4.rokokOmzet + m5.rokokOmzet + m6.rokokOmzet,
        rokokProfit: m4.rokokLaba + m5.rokokLaba + m6.rokokLaba,
        nonRokokSales: m4.nonRokokOmzet + m5.nonRokokOmzet + m6.nonRokokOmzet,
        nonRokokProfit: m4.nonRokokLaba + m5.nonRokokLaba + m6.nonRokokLaba,
        cashTotal: m4.cashTotal + m5.cashTotal + m6.cashTotal,
        qrisTotal: m4.qrisTotal + m5.qrisTotal + m6.qrisTotal,
        utangTotal: 0,
        paidDebtCashToday: 0,
        expBelanjaStok: m4.expBelanja + m5.expBelanja + m6.expBelanja,
        expWarung: expWarung4,
        expPribadi: m4.expPribadi + m5.expPribadi + m6.expPribadi,
        missingHppCount: 0,
        validOrders: [],
        periodExpenses: [],
        topProducts: m4.topProducts
      };
    }

    const tDate = new Date();
    if (financePeriod === 'Harian') {
      tDate.setDate(tDate.getDate() + periodOffset);
    }
    const tISO = tDate.toISOString().split('T')[0];

    let pLabel = 'Hari Ini';
    if (financePeriod === 'Harian') {
      pLabel = periodOffset === 0 ? `Hari Ini (${tISO})` : tISO;
    } else if (financePeriod === 'Bulanan') {
      pLabel = 'Bulan Ini (Berjalan)';
    } else if (financePeriod === '3 Bulan') {
      pLabel = 'Periode 3 Bulan Terakhir';
    } else if (financePeriod === '4 Bulan') {
      pLabel = periodOffset < 0 ? 'Caturwulan 2025 (Apr–Jul 2025)' : 'Periode 4 Bulan Terakhir';
    } else {
      pLabel = periodOffset < 0 ? 'Tahun 2025 (Arsip Excel)' : 'Tahun Ini (2026)';
    }

    const filterByPeriod = (dStr) => {
      if (financePeriod === 'Harian') return dStr === tISO;
      if (financePeriod === 'Bulanan') return dStr.startsWith(today.slice(0, 7));
      if (financePeriod === 'Tahunan') return dStr.startsWith(today.slice(0, 4));
      return true;
    };

    const validOrders = orders.filter((o) => o.orderStatus !== 'Dibatalkan' && filterByPeriod(o.date));
    const periodExpenses = expenses.filter((e) => filterByPeriod(e.date));

    let totalSales = 0;
    let grossProfit = 0;
    let rokokSales = 0;
    let rokokProfit = 0;
    let nonRokokSales = 0;
    let nonRokokProfit = 0;
    let cashSales = 0;
    let qrisSales = 0;
    let newDebtToday = 0;
    let missingHppCount = 0;
    const menuSalesMap = {};

    validOrders.forEach((ord) => {
      totalSales += ord.total;
      if (ord.paymentMethod === 'Cash') cashSales += ord.total;
      else if (ord.paymentMethod === 'QRIS') qrisSales += ord.total;
      else if (ord.paymentMethod === 'Utang') newDebtToday += ord.total;

      ord.items.forEach((it) => {
        const lineOmzet = it.unitPrice * it.qty;
        const hasHpp = it.hpp !== null && it.hpp !== undefined && it.hpp !== '';
        if (!hasHpp) missingHppCount += 1;
        const hppVal = hasHpp ? Number(it.hpp) : 0;
        const lineLaba = (it.unitPrice - hppVal) * it.qty;

        grossProfit += lineLaba;
        if (it.category === 'Rokok') {
          rokokSales += lineOmzet;
          rokokProfit += lineLaba;
        } else {
          nonRokokSales += lineOmzet;
          nonRokokProfit += lineLaba;
        }

        if (!menuSalesMap[it.nama]) {
          menuSalesMap[it.nama] = { nama: it.nama, qty: 0, omzet: 0, laba: 0 };
        }
        menuSalesMap[it.nama].qty += it.qty;
        menuSalesMap[it.nama].omzet += lineOmzet;
        menuSalesMap[it.nama].laba += lineLaba;
      });
    });

    const paidDebtCashToday = debtPaymentsToday
      .filter((p) => p.date === tISO && p.via === 'Cash')
      .reduce((s, p) => s + p.amount, 0);

    const paidDebtQrisToday = debtPaymentsToday
      .filter((p) => p.date === tISO && p.via === 'QRIS')
      .reduce((s, p) => s + p.amount, 0);

    const expBelanjaStok = periodExpenses
      .filter((e) => e.group === 'Belanja stok')
      .reduce((s, e) => s + e.amount, 0);
    const expWarung = periodExpenses
      .filter((e) => e.group === 'Warung')
      .reduce((s, e) => s + e.amount, 0);
    const expPribadi = periodExpenses
      .filter((e) => e.group === 'Pribadi')
      .reduce((s, e) => s + e.amount, 0);

    const topProducts = Object.values(menuSalesMap).sort((a, b) => b.qty - a.qty);

    return {
      periodLabel: pLabel,
      isArchive: false,
      totalSales,
      netWarungProfit: grossProfit - expWarung,
      grossProfit,
      rokokSales,
      rokokProfit,
      nonRokokSales,
      nonRokokProfit,
      cashTotal: cashSales + (financePeriod === 'Harian' ? paidDebtCashToday : 0),
      qrisTotal: qrisSales + (financePeriod === 'Harian' ? paidDebtQrisToday : 0),
      utangTotal: newDebtToday,
      paidDebtCashToday,
      expBelanjaStok,
      expWarung,
      expPribadi,
      missingHppCount,
      validOrders,
      periodExpenses,
      topProducts
    };
  }, [orders, expenses, debtPaymentsToday, financePeriod, periodOffset]);

  // ==========================================================================
  // EKSPOR SPREADSHEET CSV (KOLOM PERSIS DELTA CAFE.XLSX)
  // ==========================================================================
  const handleExportSpreadsheet = () => {
    const headers = ['TANGGAL', 'KODE', 'NAMA PRODUK', 'QTY', 'HARGA JUAL', 'HPP', 'JUMLAH', 'LABA'];
    const rows = [headers.join(',')];

    orders
      .filter((o) => o.orderStatus !== 'Dibatalkan')
      .forEach((ord) => {
        ord.items.forEach((it) => {
          const jumlah = it.unitPrice * it.qty;
          const hppVal = it.hpp !== null && it.hpp !== undefined && it.hpp !== '' ? Number(it.hpp) : 0;
          const laba = (it.unitPrice - hppVal) * it.qty;
          rows.push(
            [ord.date, it.kode || '-', `"${it.nama}"`, it.qty, it.unitPrice, hppVal, jumlah, laba].join(',')
          );
        });
      });

    const csv = 'data:text/csv;charset=utf-8,' + encodeURIComponent(rows.join('\n'));
    const a = document.createElement('a');
    a.href = csv;
    a.download = `Delta_Cafe_Penjualan_${todayISO()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    const stamp = new Date().toLocaleString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    setLastExported(stamp);
    localStorage.setItem('dc2_lastExport', stamp);
    showToast('File spreadsheet berhasil diunduh');
  };

  // Helper filter daftar pesanan berdasarkan 3 status yang terpisah rapi
  const getFilteredOrdersByTab = (tabName) => {
    return orders.filter((o) => {
      if (o.orderStatus === 'Dibatalkan') return false;
      if (tabName === 'Proses') {
        return o.orderStatus === 'Proses';
      }
      if (tabName === 'Belum dibayar') {
        return o.orderStatus === 'Selesai' && o.paymentStatus === 'Belum dibayar' && o.paymentMethod !== 'Utang';
      }
      if (tabName === 'Selesai') {
        return o.orderStatus === 'Selesai' && (o.paymentStatus === 'Lunas' || o.paymentMethod === 'Utang');
      }
      return false;
    });
  };

  // ==========================================================================
  // RENDER LAYAR LOGIN GOOGLE (SESUAI 3 FRAME AWAL DI FIGMA)
  // ==========================================================================
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex justify-center font-['Poppins',sans-serif]">
        <style>{`
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
          .anim-fade { animation: fadeIn 180ms ease-out forwards; }
          .anim-sheet { animation: slideUp 220ms cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        `}</style>
        <div className="w-full max-w-[440px] min-h-screen bg-[#FDFBF7] flex flex-col justify-between p-6 shadow-2xl anim-fade">
          <div className="pt-16 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-[14px] bg-[#FC5454] flex items-center justify-center text-white font-bold text-3xl shadow-md mb-4">
              D
            </div>
            <h1 className="text-2xl font-bold text-gray-900">{shopName}</h1>
            <p className="text-xs text-gray-500 mt-1">Kasir & Manajemen Warung Kopi</p>
          </div>

          <div className="space-y-4">
            {loginError && (
              <div className="bg-red-50 border border-[#FC5454] rounded-[10px] p-3.5 text-center space-y-1.5 anim-fade">
                <p className="text-xs font-semibold text-[#FC5454]">Gagal terhubung ke akun Google</p>
                <p className="text-[11px] text-gray-600">
                  Periksa koneksi internet Anda lalu ketuk tombol di bawah untuk mencoba lagi.
                </p>
              </div>
            )}

            <button
              disabled={isLoggingIn}
              onClick={() => {
                setLoginError(false);
                setIsLoggingIn(true);
                setTimeout(() => {
                  setIsLoggingIn(false);
                  setIsLoggedIn(true);
                  showToast(`Masuk sebagai ${userEmail}`);
                }, 650);
              }}
              className="w-full min-h-[48px] bg-white border border-gray-200 hover:border-[#FC5454] active:scale-95 rounded-[10px] flex items-center justify-center gap-3 font-semibold text-sm text-gray-800 shadow-sm transition"
            >
              {isLoggingIn ? (
                <>
                  <RefreshCw className="w-5 h-5 text-[#FC5454] animate-spin" />
                  <span>Menghubungkan ke Google...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z" />
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24Z" />
                    <path fill="#FBBC05" d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14Z" />
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96Z" />
                  </svg>
                  <span>{loginError ? 'Coba lagi' : 'Masuk dengan Google'}</span>
                </>
              )}
            </button>

            <div className="pt-2 flex flex-col items-center gap-2">
              <p className="text-[11px] text-gray-500">Akun bisnis: {userEmail}</p>
              <button
                onClick={() => setLoginError((v) => !v)}
                className="text-[11px] text-gray-500 underline hover:text-gray-800"
              >
                {loginError ? 'Sembunyikan pesan error' : 'Simulasi gagal login (uji tampilan Figma)'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // RENDER UTAMA APLIKASI (LAYAR HP 440PX)
  // ==========================================================================
  return (
    <div className="min-h-screen bg-[#FDFBF7] flex justify-center font-['Poppins',sans-serif] text-gray-900 select-none">
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @keyframes toastDrop { from { opacity: 0; transform: translate(-50%, -12px); } to { opacity: 1; transform: translate(-50%, 0); } }
        .anim-fade { animation: fadeIn 180ms ease-out forwards; }
        .anim-sheet { animation: slideUp 220ms cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .anim-toast { animation: toastDrop 200ms ease-out forwards; }
      `}</style>

      <div className="w-full max-w-[440px] min-h-screen bg-[#FDFBF7] flex flex-col relative shadow-2xl overflow-x-hidden">
        
        {/* Toast Notifikasi */}
        {toast && (
          <div className="fixed top-14 left-1/2 z-50 w-[90%] max-w-[400px] anim-toast">
            <div
              className={`px-4 py-3 rounded-[10px] shadow-lg text-white text-xs font-medium flex items-center justify-between ${
                toast.type === 'error' ? 'bg-[#FC5454]' : 'bg-gray-900'
              }`}
            >
              <span>{toast.msg}</span>
              <button onClick={() => setToast(null)} className="ml-2 opacity-80">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* HEADER ATAS & INDIKATOR AUTOSAVE */}
        <header className="sticky top-0 z-30 bg-[#FDFBF7] px-4 py-3 flex items-center justify-between border-b border-gray-200">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[8px] bg-[#FC5454] text-white font-bold flex items-center justify-center text-base shadow-sm">
              D
            </div>
            <div>
              <h1 className="font-bold text-base leading-tight text-gray-900">{shopName}</h1>
              <p className="text-[11px] text-gray-500 leading-none mt-0.5">Kasir & Keuangan</p>
            </div>
          </div>

          <button
            onClick={() => {
              setIsOffline((v) => !v);
              showToast(!isOffline ? 'Mode Offline aktif (data tersimpan di HP)' : 'Online, data tersinkron ke Drive');
            }}
            className={`px-2.5 py-1.5 rounded-full text-[11px] font-medium flex items-center gap-1.5 active:scale-95 transition ${
              syncStatus === 'offline'
                ? 'bg-[#FC5454] text-white'
                : syncStatus === 'saving'
                ? 'bg-amber-100 text-amber-800'
                : 'bg-emerald-50 text-emerald-700'
            }`}
          >
            {syncStatus === 'offline' && (
              <>
                <CloudOff className="w-3.5 h-3.5" />
                <span>Belum tersimpan (offline)</span>
              </>
            )}
            {syncStatus === 'saving' && (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Menyimpan...</span>
              </>
            )}
            {syncStatus === 'saved' && (
              <>
                <Cloud className="w-3.5 h-3.5" />
                <span>Tersimpan</span>
              </>
            )}
          </button>
        </header>

        {/* AREA KONTEN UTAMA */}
        <main className="flex-1 pb-28">
          {/* ================================================================ */}
          {/* TAB 1: MENU KASIR (VARIAN TERGABUNG RINGKAS)                     */}
          {/* ================================================================ */}
          {activeTab === 'menu' && (
            <div className="p-4 space-y-4 anim-fade">
              {/* Pencarian Pil & Filter */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari kopi, es teh, mie, rokok..."
                    className="w-full min-h-[44px] pl-10 pr-8 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:border-[#FC5454]"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <button
                  onClick={() => setShowFilterSheet(true)}
                  className={`min-h-[44px] px-3.5 rounded-[10px] border text-xs font-semibold flex items-center gap-1.5 active:scale-95 transition ${
                    selectedCategory !== 'Semua'
                      ? 'bg-[#FC5454] text-white border-[#FC5454]'
                      : 'bg-white text-gray-800 border-gray-200'
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  <span>{selectedCategory === 'Semua' ? 'Filter' : selectedCategory}</span>
                </button>
              </div>

              {/* Kotak Menu 2 Kolom Polos Per Kategori */}
              {CATEGORY_ORDER.filter((cat) => selectedCategory === 'Semua' || selectedCategory === cat).map((cat) => {
                const groups = visibleMenuGroups.filter((g) => g.category === cat);
                if (groups.length === 0) return null;

                return (
                  <div key={cat} className="space-y-2">
                    <div className="flex items-center justify-between px-0.5">
                      <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500">{cat}</h2>
                      <span className="text-[11px] text-gray-400">{groups.length} menu</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2.5">
                      {groups.map((grp) => {
                        const prices = grp.variants.map((v) => v.sku.hargaJual);
                        const minPrice = Math.min(...prices);
                        const hasMultiple = grp.variants.length > 1 || grp.hasDrinkOptions;
                        const flavorCount = new Set(grp.variants.map((v) => v.flavor).filter(Boolean)).size;
                        const hasMissingHpp = grp.variants.some(
                          (v) => v.sku.hpp === null || v.sku.hpp === undefined || v.sku.hpp === ''
                        );

                        return (
                          <button
                            key={grp.groupKey}
                            onClick={() => handleGroupTap(grp)}
                            className="min-h-[76px] bg-[#D9D9D9]/30 hover:bg-[#D9D9D9]/50 active:scale-95 rounded-[10px] p-3 text-left flex flex-col justify-between transition"
                          >
                            <span className="font-semibold text-sm text-gray-900 leading-snug line-clamp-2">
                              {grp.baseName}
                            </span>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs font-medium text-gray-700">
                                {hasMultiple
                                  ? `${formatRp(minPrice)}+${flavorCount > 1 ? ` · ${flavorCount} rasa` : ''}`
                                  : formatRp(minPrice)}
                              </span>
                              {hasMissingHpp && (
                                <span className="w-2 h-2 rounded-full bg-[#FC5454]" title="HPP belum diisi" />
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {visibleMenuGroups.length === 0 && (
                <div className="text-center py-12 text-gray-400 text-sm">Menu tidak ditemukan.</div>
              )}
            </div>
          )}

          {/* ================================================================ */}
          {/* TAB 2: PESANAN (PROSES -> BELUM DIBAYAR -> SELESAI)              */}
          {/* ================================================================ */}
          {activeTab === 'pesanan' && (
            <div className="p-4 space-y-4 anim-fade">
              <div className="flex gap-2">
                {['Proses', 'Belum dibayar', 'Selesai'].map((status) => {
                  const count = getFilteredOrdersByTab(status).length;
                  const active = orderFilter === status;
                  return (
                    <button
                      key={status}
                      onClick={() => setOrderFilter(status)}
                      className={`min-h-[44px] flex-1 px-2 rounded-[10px] text-xs font-semibold active:scale-95 transition flex items-center justify-center gap-1.5 ${
                        active ? 'bg-[#FC5454] text-white shadow-sm' : 'bg-white text-gray-700 border border-gray-200'
                      }`}
                    >
                      <span>{status}</span>
                      <span
                        className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                          active ? 'bg-white/25 text-white' : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="space-y-3">
                {getFilteredOrdersByTab(orderFilter).map((ord) => (
                  <div
                    key={ord.id}
                    onClick={() => setSelectedOrder(ord)}
                    className="bg-white rounded-[10px] p-3.5 border border-gray-200 shadow-sm active:scale-[0.99] transition cursor-pointer space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-gray-900">
                          {ord.customerName ? ord.customerName : `Pesanan #${ord.id.replace('ORD-', '')}`}
                        </span>
                        <span className="text-[11px] text-gray-400">{ord.time}</span>
                      </div>
                      {ord.paymentMethod === 'Utang' ? (
                        <span className="px-2 py-0.5 rounded-md bg-[#FC5454] text-white text-[11px] font-semibold">
                          Utang
                        </span>
                      ) : ord.orderStatus === 'Proses' ? (
                        <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 text-[11px] font-semibold">
                          Sedang dibuat
                        </span>
                      ) : ord.paymentStatus === 'Belum dibayar' ? (
                        <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[11px] font-semibold">
                          Siap bayar
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[11px] font-semibold">
                          {ord.paymentMethod}
                        </span>
                      )}
                    </div>

                    <div className="space-y-1 border-t border-b border-gray-100 py-2">
                      {ord.items.map((it, idx) => (
                        <div key={idx} className="text-xs text-gray-700 flex justify-between gap-2">
                          <div>
                            <span className="font-semibold">{it.qty}x</span> {it.nama}
                            {it.sugar && it.sugar !== 'Normal' && (
                              <span className="text-gray-400 text-[11px]"> (Gula {it.sugar})</span>
                            )}
                            {it.note && <p className="text-[11px] text-amber-700 italic">{it.note}</p>}
                          </div>
                          <span className="text-gray-600 shrink-0">{formatRp(it.unitPrice * it.qty)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {ord.items.reduce((s, i) => s + i.qty, 0)} item
                      </span>
                      <div className="flex items-center gap-2">
                        {ord.orderStatus === 'Proses' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMarkOrderPrepared(ord);
                            }}
                            className="px-3 py-1.5 rounded-[8px] bg-emerald-600 text-white text-[11px] font-bold active:scale-95 transition shadow-xs"
                          >
                            Selesaikan Pesanan
                          </button>
                        )}
                        {ord.orderStatus === 'Selesai' && ord.paymentStatus === 'Belum dibayar' && ord.paymentMethod !== 'Utang' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setPayOrderModal(ord);
                              setPayOrderSelectedMethod('Cash');
                              setPayOrderDebtName(ord.customerName || '');
                            }}
                            className="px-3 py-1.5 rounded-[8px] bg-[#FC5454] text-white text-[11px] font-bold active:scale-95 transition shadow-xs"
                          >
                            Bayar Pesanan
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            ord.items.forEach((it) => addItemToCart({ ...it }));
                            if (ord.customerName) setOrderCustomerName(ord.customerName);
                            showToast('Item pesanan disalin ke keranjang');
                            setActiveTab('menu');
                            setShowCartSheet(true);
                          }}
                          className="px-2.5 py-1.5 rounded-[8px] bg-gray-100 hover:bg-gray-200 text-gray-900 text-[11px] font-semibold flex items-center gap-1 active:scale-95 transition"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>+ Lagi</span>
                        </button>
                        <span className="font-bold text-sm text-gray-900">{formatRp(ord.total)}</span>
                      </div>
                    </div>
                  </div>
                ))}

                {getFilteredOrdersByTab(orderFilter).length === 0 && (
                  <div className="bg-white rounded-[10px] p-8 text-center text-gray-400 text-xs border border-dashed border-gray-200">
                    Tidak ada pesanan di tab {orderFilter}.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* TAB 3: KEUANGAN (HARIAN, BULANAN, 3/4 BULAN, TAHUNAN & UTANG)    */}
          {/* ================================================================ */}
          {activeTab === 'keuangan' && (
            <div className="p-4 space-y-4 anim-fade">
              {/* Pilihan Periode Waktu */}
              <div className="flex gap-1.5 overflow-x-auto pb-1">
                {['Harian', 'Bulanan', '3 Bulan', '4 Bulan', 'Tahunan'].map((per) => (
                  <button
                    key={per}
                    onClick={() => {
                      setFinancePeriod(per);
                      setPeriodOffset(0);
                    }}
                    className={`min-h-[40px] px-3 rounded-[10px] text-xs font-semibold whitespace-nowrap active:scale-95 transition ${
                      financePeriod === per
                        ? 'bg-gray-900 text-white shadow-xs'
                        : 'bg-white text-gray-600 border border-gray-200'
                    }`}
                  >
                    {per}
                  </button>
                ))}
              </div>

              {/* Geser Periode (< / >) untuk melihat arsip April - Juni 2025 */}
              <div className="bg-white rounded-[10px] px-3 py-2 border border-gray-200 flex items-center justify-between">
                <button
                  onClick={() => setPeriodOffset((o) => o - 1)}
                  className="w-9 h-9 rounded-[8px] bg-[#FAFAFA] flex items-center justify-center active:scale-95"
                  title="Periode sebelumnya"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-bold text-gray-800">{financeReport.periodLabel}</span>
                <button
                  disabled={periodOffset >= 0}
                  onClick={() => setPeriodOffset((o) => Math.min(0, o + 1))}
                  className={`w-9 h-9 rounded-[8px] bg-[#FAFAFA] flex items-center justify-center active:scale-95 ${
                    periodOffset >= 0 ? 'opacity-30' : ''
                  }`}
                  title="Periode berikutnya"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Kartu Besar Merah: Utang Belum Dibayar */}
              <button
                onClick={() => setFinanceSubTab('Utang')}
                className="w-full bg-[#FC5454] text-white rounded-[10px] p-4 text-left shadow-md active:scale-[0.98] transition flex items-center justify-between"
              >
                <div>
                  <p className="text-xs font-medium text-white/90">Utang belum dibayar (Total)</p>
                  <p className="text-2xl font-bold mt-0.5">{formatRp(totalUnpaidDebt)}</p>
                  <p className="text-[11px] text-white/85 mt-1">
                    {debtorsList.filter((d) => d.balance > 0).length} pelanggan · Ketuk untuk kelola bon
                  </p>
                </div>
                <ChevronRight className="w-6 h-6 text-white/90" />
              </button>

              {/* Ringkasan Penjualan, Laba Bersih & Pemisahan Rokok vs Non-Rokok */}
              <div className="bg-white rounded-[10px] p-3.5 border border-gray-200 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#FAFAFA] p-2.5 rounded-[8px]">
                    <p className="text-[11px] text-gray-500">Total Penjualan</p>
                    <p className="text-base font-bold text-gray-900 mt-0.5">{formatRp(financeReport.totalSales)}</p>
                  </div>
                  <div className="bg-[#FAFAFA] p-2.5 rounded-[8px]">
                    <p className="text-[11px] text-gray-500">Laba Bersih Warung</p>
                    <p className="text-base font-bold text-emerald-700 mt-0.5">
                      {formatRp(financeReport.netWarungProfit)}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1 border-t border-gray-100 text-xs">
                  <div>
                    <p className="text-gray-500 font-medium">Non-Rokok</p>
                    <p className="font-semibold text-gray-900">Omzet: {formatRp(financeReport.nonRokokSales)}</p>
                    <p className="text-emerald-700 text-[11px]">Laba: {formatRp(financeReport.nonRokokProfit)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-medium">Rokok</p>
                    <p className="font-semibold text-gray-900">Omzet: {formatRp(financeReport.rokokSales)}</p>
                    <p className="text-emerald-700 text-[11px]">Laba: {formatRp(financeReport.rokokProfit)}</p>
                  </div>
                </div>

                {financeReport.missingHppCount > 0 && (
                  <div className="bg-amber-50 border border-amber-200 rounded-[8px] p-2 flex items-start gap-2 text-[11px] text-amber-800">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>Catatan: Laba belum lengkap karena ada menu terjual yang HPP-nya belum diisi.</span>
                  </div>
                )}

                <button
                  onClick={handleExportSpreadsheet}
                  className="w-full min-h-[44px] bg-gray-100 hover:bg-gray-200 active:scale-95 text-gray-900 font-semibold text-xs rounded-[10px] flex items-center justify-center gap-2 transition"
                >
                  <Download className="w-4 h-4" />
                  <span>Export Spreadsheet</span>
                </button>
                <p className="text-[10px] text-center text-gray-400">Terakhir diekspor: {lastExported}</p>
              </div>

              {/* Sub-tab Keuangan: Pemasukan | Pengeluaran | Utang */}
              <div className="flex gap-2">
                {['Pemasukan', 'Pengeluaran', 'Utang'].map((sub) => (
                  <button
                    key={sub}
                    onClick={() => {
                      setFinanceSubTab(sub);
                      setSelectedDebtorKey(null);
                    }}
                    className={`flex-1 min-h-[44px] rounded-[10px] text-xs font-semibold border active:scale-95 transition ${
                      financeSubTab === sub
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'bg-white text-gray-700 border-gray-200'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>

              {/* SUB-TAB PEMASUKAN & CEK LACI HARIAN */}
              {financeSubTab === 'Pemasukan' && (
                <div className="space-y-3">
                  <div className="bg-white rounded-[10px] p-3 border border-gray-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-gray-600 uppercase">
                        {financePeriod === 'Harian' ? 'Cek Laci Hari Ini' : 'Rincian Pembayaran'}
                      </span>
                      {financePeriod === 'Harian' && financeReport.paidDebtCashToday > 0 && (
                        <span className="text-[10px] text-emerald-700 font-medium">
                          +Bayar utang {formatRp(financeReport.paidDebtCashToday)}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="bg-[#FAFAFA] p-2 rounded-[8px]">
                        <p className="text-gray-400 text-[11px]">Cash Laci</p>
                        <p className="font-bold text-gray-900 mt-0.5">{formatRp(financeReport.cashTotal)}</p>
                      </div>
                      <div className="bg-[#FAFAFA] p-2 rounded-[8px]">
                        <p className="text-gray-400 text-[11px]">QRIS</p>
                        <p className="font-bold text-gray-900 mt-0.5">{formatRp(financeReport.qrisTotal)}</p>
                      </div>
                      <div className="bg-[#FAFAFA] p-2 rounded-[8px]">
                        <p className="text-gray-400 text-[11px]">
                          {financePeriod === 'Harian' ? 'Utang Baru' : 'Utang'}
                        </p>
                        <p className="font-bold text-[#FC5454] mt-0.5">{formatRp(financeReport.utangTotal)}</p>
                      </div>
                    </div>
                  </div>

                  {!financeReport.isArchive && (
                    <div className="flex bg-gray-100 p-1 rounded-[10px] text-xs">
                      <button
                        onClick={() => setIncomeViewMode('transaksi')}
                        className={`flex-1 min-h-[36px] rounded-[8px] font-semibold ${
                          incomeViewMode === 'transaksi' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500'
                        }`}
                      >
                        Per Transaksi
                      </button>
                      <button
                        onClick={() => setIncomeViewMode('menu')}
                        className={`flex-1 min-h-[36px] rounded-[8px] font-semibold ${
                          incomeViewMode === 'menu' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500'
                        }`}
                      >
                        Per Menu Terjual
                      </button>
                    </div>
                  )}

                  {financeReport.isArchive || incomeViewMode === 'menu' ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-gray-600">
                        <TrendingUp className="w-4 h-4 text-[#FC5454]" />
                        <span>Produk Terlaris ({financeReport.periodLabel})</span>
                      </div>
                      {financeReport.topProducts.map((tp, idx) => (
                        <div
                          key={idx}
                          className="bg-white rounded-[10px] p-3 border border-gray-200 flex items-center justify-between"
                        >
                          <div>
                            <p className="text-xs font-bold text-gray-900">
                              {idx + 1}. {tp.nama}
                            </p>
                            <p className="text-[11px] text-gray-500 mt-0.5">
                              Terjual {tp.qty}x · Laba {formatRp(tp.laba)}
                            </p>
                          </div>
                          <span className="font-bold text-xs text-gray-900">{formatRp(tp.omzet)}</span>
                        </div>
                      ))}
                      {financeReport.topProducts.length === 0 && (
                        <p className="text-center text-xs text-gray-400 py-6">Belum ada data penjualan.</p>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {financeReport.validOrders.map((ord) => (
                        <div
                          key={ord.id}
                          className="bg-white rounded-[10px] p-3 border border-gray-200 flex justify-between items-center"
                        >
                          <div>
                            <p className="text-xs font-semibold text-gray-900">
                              {ord.items.map((i) => `${i.nama} (${i.qty}x)`).join(', ')}
                            </p>
                            <p className="text-[11px] text-gray-400 mt-0.5">
                              {ord.date} · {ord.time} · {ord.paymentMethod || 'Belum dibayar'}
                              {ord.customerName ? ` (${ord.customerName})` : ''}
                            </p>
                          </div>
                          <span className="font-bold text-xs text-gray-900 shrink-0 ml-2">{formatRp(ord.total)}</span>
                        </div>
                      ))}
                      {financeReport.validOrders.length === 0 && (
                        <p className="text-center text-xs text-gray-400 py-6">Belum ada transaksi pada periode ini.</p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* SUB-TAB PENGELUARAN */}
              {financeSubTab === 'Pengeluaran' && (
                <div className="space-y-3">
                  <div className="bg-white rounded-[10px] p-3 border border-gray-200 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Belanja stok (dari menu Barang):</span>
                      <span className="font-bold text-gray-900">{formatRp(financeReport.expBelanjaStok)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Warung (mengurangi laba):</span>
                      <span className="font-bold text-[#FC5454]">{formatRp(financeReport.expWarung)}</span>
                    </div>
                    <div className="flex justify-between pt-1.5 border-t border-gray-100">
                      <span className="text-gray-500">Pribadi (tidak mengurangi laba):</span>
                      <span className="font-semibold text-gray-700">{formatRp(financeReport.expPribadi)}</span>
                    </div>
                  </div>

                  {!financeReport.isArchive && (
                    <button
                      onClick={() => {
                        setExpDate(todayISO());
                        setExpGroup('Warung');
                        setExpCategory(warungCategories[0] || 'Listrik');
                        setExpDesc('');
                        setExpAmount('');
                        setShowAddExpense(true);
                      }}
                      className="w-full min-h-[44px] bg-[#FC5454] text-white font-semibold text-xs rounded-[10px] flex items-center justify-center gap-2 active:scale-95 transition shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Catat pengeluaran</span>
                    </button>
                  )}

                  <div className="space-y-2">
                    {financeReport.periodExpenses.map((exp) => (
                      <div
                        key={exp.id}
                        className="bg-white rounded-[10px] p-3 border border-gray-200 flex justify-between items-center"
                      >
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                                exp.group === 'Pribadi'
                                  ? 'bg-gray-100 text-gray-600'
                                  : exp.group === 'Belanja stok'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {exp.group === 'Warung' ? exp.category : exp.group}
                            </span>
                            <span className="text-[11px] text-gray-400">{exp.date}</span>
                          </div>
                          <p className="text-xs font-medium text-gray-800 mt-1">{exp.description || exp.category}</p>
                        </div>
                        <span className="font-bold text-xs text-gray-900">{formatRp(exp.amount)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SUB-TAB UTANG PELANGGAN */}
              {financeSubTab === 'Utang' && (
                <div className="space-y-3">
                  {!selectedDebtorKey ? (
                    <>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setIsDebtNameLocked(false);
                            setNewDebtName('');
                            setNewDebtDesc('');
                            setNewDebtAmount('');
                            setShowAddDebtModal(true);
                          }}
                          className="flex-1 min-h-[44px] bg-[#FC5454] text-white font-semibold text-xs rounded-[10px] flex items-center justify-center gap-1.5 active:scale-95 transition"
                        >
                          <UserPlus className="w-4 h-4" />
                          <span>+ Utang baru</span>
                        </button>
                        {debtorsList.length >= 2 && (
                          <button
                            onClick={() => {
                              setMergeSource(debtorsList[0]?.key || '');
                              setMergeTarget(debtorsList[1]?.key || '');
                              setMergeModal(true);
                            }}
                            className="min-h-[44px] px-3.5 bg-white border border-gray-300 text-gray-800 font-semibold text-xs rounded-[10px] flex items-center justify-center gap-1.5 active:scale-95 transition"
                          >
                            <Merge className="w-4 h-4" />
                            <span>Gabung</span>
                          </button>
                        )}
                      </div>

                      <div className="space-y-2">
                        {debtorsList.map((debtor) => (
                          <button
                            key={debtor.key}
                            onClick={() => setSelectedDebtorKey(debtor.key)}
                            className="w-full bg-white rounded-[10px] p-3.5 border border-gray-200 flex items-center justify-between text-left active:scale-[0.99] transition"
                          >
                            <div>
                              <p className="font-bold text-sm text-gray-900">{debtor.displayName}</p>
                              <p className="text-[11px] text-gray-500 mt-0.5">{debtor.entries.length} catatan bon</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span
                                className={`font-bold text-sm ${
                                  debtor.balance > 0 ? 'text-[#FC5454]' : 'text-emerald-600'
                                }`}
                              >
                                {debtor.balance > 0 ? formatRp(debtor.balance) : 'Lunas'}
                              </span>
                              <ChevronRight className="w-4 h-4 text-gray-400" />
                            </div>
                          </button>
                        ))}
                      </div>
                    </>
                  ) : (
                    (() => {
                      const debtor = debtorsList.find((d) => d.key === selectedDebtorKey);
                      if (!debtor) {
                        setSelectedDebtorKey(null);
                        return null;
                      }
                      return (
                        <div className="space-y-3">
                          <button
                            onClick={() => setSelectedDebtorKey(null)}
                            className="min-h-[40px] text-xs font-semibold text-gray-700 flex items-center gap-1"
                          >
                            <ChevronLeft className="w-4 h-4" />
                            <span>Kembali ke daftar utang</span>
                          </button>

                          <div className="bg-white rounded-[10px] p-4 border border-gray-200 space-y-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-bold text-base text-gray-900">{debtor.displayName}</h3>
                                <p className="text-xs text-gray-500">Sisa saldo utang</p>
                              </div>
                              <div className="text-right">
                                <p className="text-lg font-bold text-[#FC5454]">{formatRp(debtor.balance)}</p>
                                <button
                                  onClick={() => {
                                    const lines = [
                                      `*Tagihan Utang - ${shopName}*`,
                                      `Nama: ${debtor.displayName}`,
                                      ...debtor.entries
                                        .filter((e) => !e.isPaid)
                                        .map(
                                          (e) =>
                                            `- ${e.date}: ${e.description} (${formatRp(
                                              e.amount - e.paidAmount
                                            )})`
                                        ),
                                      `*Total Sisa: ${formatRp(debtor.balance)}*`
                                    ].join('\n');
                                    navigator.clipboard?.writeText(lines);
                                    showToast('Rincian utang disalin untuk WhatsApp');
                                  }}
                                  className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-gray-600 hover:text-gray-900 underline"
                                >
                                  <Copy className="w-3 h-3" />
                                  <span>Salin Rincian WA</span>
                                </button>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              {debtor.balance > 0 && (
                                <button
                                  onClick={() => {
                                    setPayDebtModal({
                                      debtorKey: debtor.key,
                                      displayName: debtor.displayName,
                                      balance: debtor.balance
                                    });
                                    setPayDebtAmount(String(debtor.balance));
                                    setPayDebtVia('Cash');
                                  }}
                                  className="flex-1 min-h-[44px] bg-[#FC5454] text-white font-semibold text-xs rounded-[10px] active:scale-95 transition"
                                >
                                  Bayar Utang
                                </button>
                              )}
                              <button
                                onClick={() => {
                                  setIsDebtNameLocked(true);
                                  setNewDebtName(debtor.displayName);
                                  setNewDebtDesc('');
                                  setNewDebtAmount('');
                                  setShowAddDebtModal(true);
                                }}
                                className="flex-1 min-h-[44px] bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold text-xs rounded-[10px] active:scale-95 transition"
                              >
                                + Bon baru
                              </button>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <p className="text-xs font-semibold text-gray-600">Rincian Bon</p>
                            {debtor.entries.map((entry) => (
                              <div
                                key={entry.id}
                                className="bg-white rounded-[10px] p-3 border border-gray-200 flex items-center justify-between gap-2"
                              >
                                <div className="flex-1">
                                  <p className="text-xs font-medium text-gray-900">{entry.description}</p>
                                  <p className="text-[11px] text-gray-400 mt-0.5">
                                    {entry.date} ·{' '}
                                    {entry.isPaid ? 'Lunas' : `Sisa ${formatRp(entry.amount - entry.paidAmount)}`}
                                  </p>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <span className="font-bold text-xs text-gray-900 mr-1">
                                    {formatRp(entry.amount)}
                                  </span>
                                  {entry.source === 'manual' && (
                                    <>
                                      <button
                                        onClick={() =>
                                          setEditingBonModal({
                                            id: entry.id,
                                            description: entry.description,
                                            amount: entry.amount
                                          })
                                        }
                                        className="p-2 text-gray-400 hover:text-gray-800"
                                        title="Ubah bon"
                                      >
                                        <Edit3 className="w-4 h-4" />
                                      </button>
                                      <button
                                        onClick={() => setConfirmDeleteBon(entry)}
                                        className="p-2 text-gray-400 hover:text-[#FC5454]"
                                        title="Hapus bon"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })()
                  )}
                </div>
              )}
            </div>
          )}

          {/* ================================================================ */}
          {/* TAB 4: LAINNYA (BARANG, DAFTAR MENU, TAMBAH MENU, PENGATURAN)    */}
          {/* ================================================================ */}
          {activeTab === 'lainnya' && (
            <div className="p-4 space-y-4 anim-fade">
              {lainnyaView === 'home' && (
                <div className="space-y-2.5">
                  <button
                    onClick={() => setLainnyaView('barang')}
                    className="w-full min-h-[56px] bg-white rounded-[10px] px-4 border border-gray-200 flex items-center justify-between active:scale-[0.99] transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-[8px] bg-gray-100 flex items-center justify-center text-gray-900">
                        <Package className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-sm text-gray-900">Barang (Belanja Stok)</p>
                        <p className="text-[11px] text-gray-500">Otomatis tercatat ke pengeluaran Belanja stok</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>

                  <button
                    onClick={() => setLainnyaView('daftarMenu')}
                    className="w-full min-h-[56px] bg-white rounded-[10px] px-4 border border-gray-200 flex items-center justify-between active:scale-[0.99] transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-[8px] bg-gray-100 flex items-center justify-center text-gray-900">
                        <UtensilsCrossed className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-sm text-gray-900">Daftar Menu ({skus.length} SKU)</p>
                        <p className="text-[11px] text-gray-500">Ubah harga jual, HPP manual, atau nonaktifkan</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>

                  <button
                    onClick={() => {
                      setMnName('');
                      setMnCategory('Kopi');
                      setMnPrice('');
                      setMnBuyPrice('');
                      setMnHpp('');
                      setMnCode('');
                      setMnHasDrinkOpt(true);
                      setLainnyaView('tambahMenu');
                    }}
                    className="w-full min-h-[56px] bg-white rounded-[10px] px-4 border border-gray-200 flex items-center justify-between active:scale-[0.99] transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-[8px] bg-gray-100 flex items-center justify-center text-gray-900">
                        <Plus className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-sm text-gray-900">Tambah Menu</p>
                        <p className="text-[11px] text-gray-500">Tambah produk baru ke kasir & spreadsheet</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>

                  <button
                    onClick={() => setLainnyaView('pengaturan')}
                    className="w-full min-h-[56px] bg-white rounded-[10px] px-4 border border-gray-200 flex items-center justify-between active:scale-[0.99] transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-[8px] bg-gray-100 flex items-center justify-center text-gray-900">
                        <Settings className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-sm text-gray-900">Pengaturan</p>
                        <p className="text-[11px] text-gray-500">Nama warung, kategori, akun Google & Keluar</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              )}

              {/* SUB-HALAMAN BARANG */}
              {lainnyaView === 'barang' && (
                <div className="space-y-4">
                  <button
                    onClick={() => setLainnyaView('home')}
                    className="min-h-[40px] text-xs font-semibold text-gray-700 flex items-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Kembali</span>
                  </button>

                  <div className="bg-white rounded-[10px] p-4 border border-gray-200 space-y-3 text-xs">
                    <h2 className="font-bold text-sm text-gray-900">Catat Belanja Stok</h2>
                    <div>
                      <label className="block font-medium text-gray-700 mb-1">Tanggal</label>
                      <input
                        type="date"
                        value={stkDate}
                        onChange={(e) => setStkDate(e.target.value)}
                        className="w-full min-h-[44px] px-3 rounded-[10px] border border-gray-200"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-gray-700 mb-1">Nama Barang</label>
                      <input
                        type="text"
                        value={stkName}
                        onChange={(e) => setStkName(e.target.value)}
                        placeholder="Mis. Kopi Bubuk, Gula Pasir, Gas"
                        className="w-full min-h-[44px] px-3 rounded-[10px] border border-gray-200"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block font-medium text-gray-700 mb-1">Jumlah</label>
                        <input
                          type="text"
                          value={stkQty}
                          onChange={(e) => setStkQty(e.target.value)}
                          placeholder="Mis. 2 bks"
                          className="w-full min-h-[44px] px-3 rounded-[10px] border border-gray-200"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-gray-700 mb-1">Harga Total (Rp)</label>
                        <input
                          type="number"
                          value={stkAmount}
                          onChange={(e) => setStkAmount(e.target.value)}
                          placeholder="50000"
                          className="w-full min-h-[44px] px-3 rounded-[10px] border border-gray-200"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        if (!stkName.trim() || !stkAmount) {
                          showToast('Nama barang dan harga wajib diisi', 'error');
                          return;
                        }
                        const val = Number(stkAmount);
                        const expId = `EXP-${Date.now()}`;
                        setExpenses((prev) => [
                          {
                            id: expId,
                            date: stkDate,
                            group: 'Belanja stok',
                            category: 'Belanja stok',
                            description: `${stkName.trim()}${stkQty ? ` (${stkQty})` : ''}`,
                            amount: val
                          },
                          ...prev
                        ]);
                        setStockPurchases((prev) => [
                          {
                            id: `STK-${Date.now()}`,
                            date: stkDate,
                            itemName: stkName.trim(),
                            qty: stkQty.trim() || '1',
                            amount: val
                          },
                          ...prev
                        ]);
                        setStkName('');
                        setStkQty('');
                        setStkAmount('');
                        showToast('Belanja stok disimpan ke Pengeluaran');
                      }}
                      className="w-full min-h-[46px] bg-[#FC5454] text-white font-semibold rounded-[10px] active:scale-95 transition"
                    >
                      Simpan Belanja Stok
                    </button>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xs font-bold text-gray-600">Riwayat Belanja Stok</h3>
                    {stockPurchases.map((st) => (
                      <div
                        key={st.id}
                        className="bg-white rounded-[10px] p-3 border border-gray-200 flex justify-between items-center"
                      >
                        <div>
                          <p className="text-xs font-semibold text-gray-900">{st.itemName}</p>
                          <p className="text-[11px] text-gray-400">
                            {st.date} · {st.qty}
                          </p>
                        </div>
                        <span className="font-bold text-xs text-gray-900">{formatRp(st.amount)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SUB-HALAMAN DAFTAR MENU */}
              {lainnyaView === 'daftarMenu' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setLainnyaView('home')}
                      className="min-h-[40px] text-xs font-semibold text-gray-700 flex items-center gap-1"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Kembali</span>
                    </button>
                    <button
                      onClick={() => setLainnyaView('tambahMenu')}
                      className="min-h-[40px] px-3 bg-[#FC5454] text-white text-xs font-semibold rounded-[10px] flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Tambah Menu</span>
                    </button>
                  </div>

                  <div className="relative">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={menuSearch}
                      onChange={(e) => setMenuSearch(e.target.value)}
                      placeholder="Cari dari 161 SKU produk..."
                      className="w-full min-h-[44px] pl-10 pr-4 bg-white border border-gray-200 rounded-full text-xs"
                    />
                  </div>

                  <div className="space-y-2">
                    {skus
                      .filter(
                        (s) =>
                          s.nama.toLowerCase().includes(menuSearch.toLowerCase()) ||
                          s.kode.toLowerCase().includes(menuSearch.toLowerCase())
                      )
                      .map((item) => (
                        <div
                          key={item.kode}
                          onClick={() => setEditMenuModal({ ...item, hppInput: item.hpp ?? '' })}
                          className={`bg-white rounded-[10px] p-3 border border-gray-200 flex items-center justify-between cursor-pointer active:bg-gray-50 ${
                            !item.active ? 'opacity-50' : ''
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-semibold text-xs text-gray-900">{item.nama}</span>
                              {!item.active && (
                                <span className="px-1.5 py-0.5 bg-gray-200 text-gray-600 rounded text-[10px]">
                                  Nonaktif
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mt-0.5 text-[11px] text-gray-500">
                              <span className="font-mono">{item.kode}</span>
                              <span>·</span>
                              <span>{item.category}</span>
                              <span>·</span>
                              {item.hpp === null || item.hpp === undefined || item.hpp === '' ? (
                                <span className="text-[#FC5454] font-semibold">HPP belum diisi</span>
                              ) : (
                                <span>HPP {formatRp(item.hpp)}</span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-gray-900">{formatRp(item.hargaJual)}</span>
                            <Edit3 className="w-4 h-4 text-gray-400" />
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* SUB-HALAMAN TAMBAH MENU */}
              {lainnyaView === 'tambahMenu' && (
                <div className="space-y-4">
                  <button
                    onClick={() => setLainnyaView('home')}
                    className="min-h-[40px] text-xs font-semibold text-gray-700 flex items-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Kembali</span>
                  </button>

                  <div className="bg-white rounded-[10px] p-4 border border-gray-200 space-y-3 text-xs">
                    <h2 className="font-bold text-sm text-gray-900">Tambah Menu Baru</h2>

                    <div>
                      <label className="block font-medium text-gray-700 mb-1">Nama Produk *</label>
                      <input
                        type="text"
                        value={mnName}
                        onChange={(e) => setMnName(e.target.value)}
                        placeholder="Mis. Kopi Tubruk"
                        className="w-full min-h-[44px] px-3 rounded-[10px] border border-gray-200"
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-gray-700 mb-1">Kategori *</label>
                      <div className="grid grid-cols-3 gap-1.5">
                        {CATEGORY_ORDER.map((cat) => (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => {
                              setMnCategory(cat);
                              setMnHasDrinkOpt(cat === 'Kopi' || cat === 'Non Kopi');
                            }}
                            className={`min-h-[40px] rounded-[8px] font-medium border ${
                              mnCategory === cat
                                ? 'bg-gray-900 text-white border-gray-900'
                                : 'bg-white border-gray-200 text-gray-600'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block font-medium text-gray-700 mb-1">Harga Jual (Rp) *</label>
                        <input
                          type="number"
                          value={mnPrice}
                          onChange={(e) => setMnPrice(e.target.value)}
                          placeholder="5000"
                          className="w-full min-h-[44px] px-3 rounded-[10px] border border-gray-200"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-gray-700 mb-1">Harga Beli (Opsional)</label>
                        <input
                          type="number"
                          value={mnBuyPrice}
                          onChange={(e) => setMnBuyPrice(e.target.value)}
                          placeholder="1500"
                          className="w-full min-h-[44px] px-3 rounded-[10px] border border-gray-200"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-medium text-gray-700 mb-1">
                        HPP / Modal (Ketik Manual Bebas)
                      </label>
                      <input
                        type="number"
                        value={mnHpp}
                        onChange={(e) => setMnHpp(e.target.value)}
                        placeholder="Ketik manual atau pakai pintasan di bawah"
                        className="w-full min-h-[44px] px-3 rounded-[10px] border border-gray-200"
                      />
                      {mnBuyPrice !== '' && (
                        <div className="flex items-center gap-1.5 mt-1.5">
                          <span className="text-[10px] text-gray-400">Pintasan:</span>
                          {[0, 500, 1000, 1500].map((add) => (
                            <button
                              key={add}
                              type="button"
                              onClick={() => setMnHpp(String(Number(mnBuyPrice) + add))}
                              className="px-2 py-1 rounded bg-[#FAFAFA] border border-gray-200 text-[10px] font-semibold text-gray-700"
                            >
                              +{add.toLocaleString('id-ID')}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block font-medium text-gray-700 mb-1">Kode SKU (Otomatis jika kosong)</label>
                      <input
                        type="text"
                        value={mnCode}
                        onChange={(e) => setMnCode(e.target.value)}
                        placeholder="Mis. KPI-TB"
                        className="w-full min-h-[44px] px-3 rounded-[10px] border border-gray-200"
                      />
                    </div>

                    <div className="flex items-center justify-between py-2 border-t border-gray-100">
                      <div>
                        <p className="font-semibold text-gray-800">Aktifkan Opsi Minuman</p>
                        <p className="text-[11px] text-gray-400">Ukuran, Suhu, Gula & Catatan</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setMnHasDrinkOpt((v) => !v)}
                        className={`w-12 h-7 rounded-full transition p-1 ${
                          mnHasDrinkOpt ? 'bg-[#FC5454]' : 'bg-gray-300'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full bg-white transition-transform ${
                            mnHasDrinkOpt ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        if (!mnName.trim() || !mnPrice) {
                          showToast('Nama produk dan harga jual wajib diisi', 'error');
                          return;
                        }
                        const autoCode =
                          mnCode.trim() ||
                          `${mnCategory.slice(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 899)}`;
                        setSkus((prev) => [
                          ...prev,
                          {
                            kode: autoCode,
                            nama: mnName.trim(),
                            category: mnCategory,
                            hargaJual: Number(mnPrice),
                            hargaBeli: mnBuyPrice === '' ? 0 : Number(mnBuyPrice),
                            hpp: mnHpp === '' ? null : Number(mnHpp),
                            hasDrinkOptions: mnHasDrinkOpt,
                            active: true
                          }
                        ]);
                        showToast('Menu baru berhasil disimpan');
                        setLainnyaView('daftarMenu');
                      }}
                      className="w-full min-h-[46px] bg-[#FC5454] text-white font-bold rounded-[10px] active:scale-95 transition"
                    >
                      Simpan Menu
                    </button>
                  </div>
                </div>
              )}

              {/* SUB-HALAMAN PENGATURAN */}
              {lainnyaView === 'pengaturan' && (
                <div className="space-y-4">
                  <button
                    onClick={() => setLainnyaView('home')}
                    className="min-h-[40px] text-xs font-semibold text-gray-700 flex items-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Kembali</span>
                  </button>

                  <div className="bg-white rounded-[10px] p-4 border border-gray-200 space-y-2 text-xs">
                    <label className="font-bold text-gray-800 block">Nama Warung</label>
                    <input
                      type="text"
                      value={shopName}
                      onChange={(e) => setShopName(e.target.value)}
                      className="w-full min-h-[44px] px-3 rounded-[10px] border border-gray-200 font-medium"
                    />
                  </div>

                  <div className="bg-white rounded-[10px] p-4 border border-gray-200 space-y-2.5 text-xs">
                    <p className="font-bold text-gray-800">Kategori Pengeluaran Warung</p>
                    <div className="flex flex-wrap gap-1.5">
                      {warungCategories.map((cat) => (
                        <span
                          key={cat}
                          className="px-2.5 py-1 bg-gray-100 rounded-full text-gray-800 font-medium flex items-center gap-1.5"
                        >
                          <span>{cat}</span>
                          <button
                            onClick={() => setWarungCategories((prev) => prev.filter((c) => c !== cat))}
                            className="text-gray-400 hover:text-[#FC5454]"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2 pt-1">
                      <input
                        type="text"
                        value={newWarungCat}
                        onChange={(e) => setNewWarungCat(e.target.value)}
                        placeholder="Tambah kategori baru..."
                        className="flex-1 min-h-[40px] px-3 rounded-[10px] border border-gray-200"
                      />
                      <button
                        onClick={() => {
                          if (!newWarungCat.trim()) return;
                          if (!warungCategories.includes(newWarungCat.trim())) {
                            setWarungCategories((prev) => [...prev, newWarungCat.trim()]);
                          }
                          setNewWarungCat('');
                        }}
                        className="min-h-[40px] px-3 bg-gray-900 text-white rounded-[10px] font-semibold"
                      >
                        Tambah
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <div>
                        <p className="font-semibold text-gray-800">Catat Cup & Sedotan Terpisah</p>
                        <p className="text-[10px] text-gray-400">Matikan jika sudah dihitung di HPP minuman</p>
                      </div>
                      <button
                        onClick={() => setIncludeCupStrawInWarung((v) => !v)}
                        className={`w-12 h-7 rounded-full transition p-1 ${
                          includeCupStrawInWarung ? 'bg-[#FC5454]' : 'bg-gray-300'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full bg-white transition-transform ${
                            includeCupStrawInWarung ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="font-semibold text-gray-800">Layar HP Tetap Menyala</p>
                          <p className="text-[10px] text-gray-400">Cegah layar mati otomatis saat jaga kasir</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setKeepScreenOn((v) => !v);
                          showToast(!keepScreenOn ? 'Layar tetap menyala aktif' : 'Mode layar normal');
                        }}
                        className={`w-12 h-7 rounded-full transition p-1 ${
                          keepScreenOn ? 'bg-[#FC5454]' : 'bg-gray-300'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full bg-white transition-transform ${
                            keepScreenOn ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Cadangan Penuh (Backup / Restore JSON) */}
                  <div className="bg-white rounded-[10px] p-4 border border-gray-200 space-y-2.5 text-xs">
                    <p className="font-bold text-gray-800">Cadangan Penuh Data Warung</p>
                    <p className="text-[11px] text-gray-500">
                      Simpan seluruh menu, pengaturan, riwayat pesanan, dan daftar utang ke satu file cadangan.
                    </p>
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={() => {
                          const payload = {
                            version: 2,
                            exportedAt: new Date().toISOString(),
                            shopName,
                            skus,
                            orders,
                            manualDebts,
                            debtPaymentsToday,
                            expenses,
                            stockPurchases,
                            warungCategories
                          };
                          const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = `Cadangan_Delta_Cafe_${todayISO()}.json`;
                          document.body.appendChild(a);
                          a.click();
                          document.body.removeChild(a);
                          URL.revokeObjectURL(url);
                          showToast('File cadangan penuh berhasil diunduh');
                        }}
                        className="min-h-[44px] bg-[#FAFAFA] border border-gray-300 text-gray-800 font-semibold rounded-[10px] flex items-center justify-center gap-1.5 active:scale-95 transition"
                      >
                        <Download className="w-4 h-4" />
                        <span>Simpan Cadangan</span>
                      </button>

                      <label className="min-h-[44px] bg-[#FAFAFA] border border-gray-300 text-gray-800 font-semibold rounded-[10px] flex items-center justify-center gap-1.5 active:scale-95 transition cursor-pointer">
                        <Upload className="w-4 h-4" />
                        <span>Pulihkan Data</span>
                        <input
                          type="file"
                          accept=".json"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            const reader = new FileReader();
                            reader.onload = (ev) => {
                              try {
                                const parsed = JSON.parse(ev.target.result);
                                if (parsed.skus) setSkus(parsed.skus);
                                if (parsed.orders) setOrders(parsed.orders);
                                if (parsed.manualDebts) setManualDebts(parsed.manualDebts);
                                if (parsed.expenses) setExpenses(parsed.expenses);
                                if (parsed.stockPurchases) setStockPurchases(parsed.stockPurchases);
                                if (parsed.warungCategories) setWarungCategories(parsed.warungCategories);
                                if (parsed.shopName) setShopName(parsed.shopName);
                                showToast('Seluruh data warung berhasil dipulihkan');
                              } catch {
                                showToast('File cadangan tidak valid', 'error');
                              }
                            };
                            reader.readAsText(file);
                            e.target.value = '';
                          }}
                        />
                      </label>
                    </div>
                  </div>

                  <div className="bg-white rounded-[10px] p-4 border border-gray-200 space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-gray-800">Akun Google & Backup Drive</p>
                        <p className="text-gray-500 mt-0.5">{userEmail}</p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-[11px] font-semibold ${
                          isOffline ? 'bg-red-100 text-[#FC5454]' : 'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        {isOffline ? 'Offline' : 'Terhubung'}
                      </span>
                    </div>

                    <button
                      onClick={handleExportSpreadsheet}
                      className="w-full min-h-[44px] bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-[10px] flex items-center justify-center gap-2 active:scale-95 transition"
                    >
                      <Download className="w-4 h-4" />
                      <span>Export Data Spreadsheet</span>
                    </button>

                    <button
                      onClick={() => setIsLoggedIn(false)}
                      className="w-full min-h-[44px] border border-[#FC5454] text-[#FC5454] font-semibold rounded-[10px] flex items-center justify-center gap-2 active:scale-95 transition"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Keluar</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>

        {/* FLOATING BAR KERANJANG */}
        {activeTab === 'menu' && cartCount > 0 && (
          <div className="fixed bottom-[76px] left-1/2 -translate-x-1/2 w-full max-w-[440px] px-4 z-30 anim-sheet">
            <button
              onClick={() => setShowCartSheet(true)}
              className="w-full min-h-[52px] bg-[#FC5454] text-white rounded-[10px] px-4 shadow-lg flex items-center justify-between active:scale-95 transition"
            >
              <div className="flex items-center gap-2.5">
                <div className="bg-white/20 px-2.5 py-1 rounded-md text-xs font-bold">{cartCount} item</div>
                <span className="text-xs font-medium">Lihat Keranjang</span>
              </div>
              <span className="font-bold text-sm">{formatRp(cartTotal)}</span>
            </button>
          </div>
        )}

        {/* NAVIGASI BAWAH (4 TAB) */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[440px] bg-[#FDFBF7] border-t border-gray-200 px-2 py-1.5 flex justify-around items-center z-30">
          {[
            { id: 'menu', label: 'Menu', icon: ShoppingBag },
            { id: 'pesanan', label: 'Pesanan', icon: ClipboardList },
            { id: 'keuangan', label: 'Keuangan', icon: Wallet },
            { id: 'lainnya', label: 'Lainnya', icon: MoreHorizontal }
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            const badgeCount =
              tab.id === 'pesanan'
                ? getFilteredOrdersByTab('Proses').length + getFilteredOrdersByTab('Belum dibayar').length
                : 0;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (tab.id === 'lainnya') setLainnyaView('home');
                }}
                className={`min-h-[48px] flex-1 flex flex-col items-center justify-center rounded-[10px] relative active:scale-95 transition ${
                  active ? 'text-[#FC5454] font-bold' : 'text-gray-500 font-medium'
                }`}
              >
                <div className="relative">
                  <Icon className={`w-5 h-5 mb-0.5 ${active ? 'stroke-[2.5]' : ''}`} />
                  {badgeCount > 0 && (
                    <span className="absolute -top-1 -right-2 min-w-[14px] h-[14px] px-1 bg-[#FC5454] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                      {badgeCount}
                    </span>
                  )}
                </div>
                <span className="text-[11px]">{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* ================================================================== */}
        {/* BOTTOM SHEET: FILTER KATEGORI MENU                                 */}
        {/* ================================================================== */}
        {showFilterSheet && (
          <div className="fixed inset-0 z-40 bg-black/40 flex items-end justify-center anim-fade">
            <div className="w-full max-w-[440px] bg-white rounded-t-[16px] p-5 space-y-4 anim-sheet">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base">Filter Kategori</h3>
                <button onClick={() => setShowFilterSheet(false)} className="p-2 text-gray-400">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {['Semua', ...CATEGORY_ORDER].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setShowFilterSheet(false);
                    }}
                    className={`min-h-[46px] rounded-[10px] text-xs font-semibold border active:scale-95 transition ${
                      selectedCategory === cat
                        ? 'bg-[#FC5454] text-white border-[#FC5454]'
                        : 'bg-[#FAFAFA] text-gray-800 border-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* BOTTOM SHEET: OPSI PRODUK (OTOMATIS KE SKU ASLI EXCEL)             */}
        {/* ================================================================== */}
        {activeGroup && resolvedVariantSku && (
          <div className="fixed inset-0 z-40 bg-black/40 flex items-end justify-center anim-fade">
            <div className="w-full max-w-[440px] bg-white rounded-t-[16px] p-5 space-y-4 max-h-[90vh] overflow-y-auto anim-sheet">
              <div className="flex items-start justify-between border-b border-gray-100 pb-3">
                <div>
                  <h3 className="font-bold text-base text-gray-900">{resolvedVariantSku.nama}</h3>
                  <p className="text-xs text-gray-500">
                    Kode: <span className="font-mono font-semibold">{resolvedVariantSku.kode}</span> ·{' '}
                    {formatRp(resolvedVariantSku.hargaJual)}
                  </p>
                </div>
                <button onClick={() => setActiveGroup(null)} className="p-2 text-gray-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Pilihan Rasa / Varian (Nutrisari, PopIce, Energen, Dancow, Indomilk, Teajus, ABC, Luwak, Tora, Fanta, Milku, Indomie, Mie Sedap) */}
              {activeGroup.variants.some((v) => v.flavor) && (
                <div className="space-y-1.5">
                  <p className="text-xs font-semibold text-gray-700">Pilih Varian / Rasa</p>
                  <div className="grid grid-cols-2 gap-1.5 max-h-[168px] overflow-y-auto pr-1">
                    {Array.from(new Set(activeGroup.variants.map((v) => v.flavor).filter(Boolean))).map((flv) => (
                      <button
                        key={flv}
                        onClick={() => setOptFlavor(flv)}
                        className={`min-h-[40px] px-2.5 rounded-[8px] border text-xs font-medium text-left truncate active:scale-95 transition ${
                          optFlavor === flv
                            ? 'bg-gray-900 border-gray-900 text-white font-semibold'
                            : 'bg-white border-gray-200 text-gray-700'
                        }`}
                      >
                        {flv}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Pilihan Ukuran (jika ada varian Kecil / Besar) */}
              {activeGroup.variants.some((v) => v.size) && (
                <div className="space-y-1.5">
                  <p className="text-xs font-semibold text-gray-700">Ukuran</p>
                  <div className="grid grid-cols-2 gap-2">
                    {['Kecil', 'Besar'].map((sz) => {
                      const available = activeGroup.variants.some((v) => v.size === sz);
                      if (!available) return null;
                      return (
                        <button
                          key={sz}
                          onClick={() => {
                            setOptSize(sz);
                            if (sz === 'Besar') setOptTemp('Dingin');
                          }}
                          className={`min-h-[44px] px-3 rounded-[10px] border text-xs font-semibold active:scale-95 transition ${
                            optSize === sz
                              ? 'bg-gray-900 border-gray-900 text-white'
                              : 'bg-white border-gray-200 text-gray-600'
                          }`}
                        >
                          {sz}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Pilihan Suhu (jika ada varian Panas & Dingin) */}
              {activeGroup.variants.some((v) => v.temp === 'Panas') &&
                activeGroup.variants.some((v) => v.temp === 'Dingin') && (
                  <div className="space-y-1.5">
                    <p className="text-xs font-semibold text-gray-700">Suhu</p>
                    <div className="grid grid-cols-2 gap-2">
                      {['Dingin', 'Panas'].map((tp) => (
                        <button
                          key={tp}
                          onClick={() => {
                            setOptTemp(tp);
                            if (tp === 'Panas') setOptSize('Kecil');
                          }}
                          className={`min-h-[44px] rounded-[10px] border text-xs font-semibold active:scale-95 transition ${
                            optTemp === tp
                              ? 'bg-gray-900 border-gray-900 text-white'
                              : 'bg-white border-gray-200 text-gray-600'
                          }`}
                        >
                          {tp}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

              {/* Opsi Pakai Susu khusus Kuku Bima, Hemaviton, Extra Joss */}
              {['Kuku Bima', 'Hemaviton', 'Extra Joss / Joshua'].includes(activeGroup.baseName) && (
                <div className="space-y-1.5">
                  <p className="text-xs font-semibold text-gray-700">Tambahan Susu</p>
                  <button
                    onClick={() => {
                      const nextMilk = !optWithMilk;
                      setOptWithMilk(nextMilk);
                      if (nextMilk && activeGroup.baseName === 'Extra Joss / Joshua') setOptSize('Besar');
                    }}
                    className={`w-full min-h-[44px] px-3.5 rounded-[10px] border text-xs font-semibold flex items-center justify-between active:scale-95 transition ${
                      optWithMilk
                        ? 'bg-gray-900 border-gray-900 text-white'
                        : 'bg-white border-gray-200 text-gray-700'
                    }`}
                  >
                    <span>Pakai Susu</span>
                    <span>{optWithMilk ? 'Aktif' : '+Rp3.000'}</span>
                  </button>
                </div>
              )}

              {/* Opsi Gula (untuk semua minuman seduh) */}
              {activeGroup.hasDrinkOptions && (
                <div className="space-y-1.5">
                  <p className="text-xs font-semibold text-gray-700">Gula</p>
                  <div className="grid grid-cols-3 gap-2">
                    {['Normal', 'Banyak', 'Tanpa'].map((sg) => (
                      <button
                        key={sg}
                        onClick={() => setOptSugar(sg)}
                        className={`min-h-[44px] rounded-[10px] border text-xs font-semibold active:scale-95 transition ${
                          optSugar === sg
                            ? 'bg-gray-900 border-gray-900 text-white'
                            : 'bg-white border-gray-200 text-gray-600'
                        }`}
                      >
                        {sg}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Opsi Tambahan Mie (Telur terpisah SKU TLR + Cabai) */}
              {isMieProduct(activeGroup) && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-gray-700">Tambahan Mie</p>
                  <button
                    onClick={() => setOptAddEgg((v) => !v)}
                    className={`w-full min-h-[44px] px-3.5 rounded-[10px] border text-xs font-medium flex items-center justify-between active:scale-95 transition ${
                      optAddEgg
                        ? 'bg-gray-900 border-gray-900 text-white font-semibold'
                        : 'bg-white border-gray-200 text-gray-700'
                    }`}
                  >
                    <span>Telur (terpisah kode TLR di ekspor)</span>
                    <span>+Rp4.000</span>
                  </button>
                  <button
                    onClick={() => setOptAddChili((v) => !v)}
                    className={`w-full min-h-[44px] px-3.5 rounded-[10px] border text-xs font-medium flex items-center justify-between active:scale-95 transition ${
                      optAddChili
                        ? 'bg-gray-900 border-gray-900 text-white font-semibold'
                        : 'bg-white border-gray-200 text-gray-700'
                    }`}
                  >
                    <span>Cabai</span>
                    <span>Gratis</span>
                  </button>
                </div>
              )}

              {/* Catatan */}
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Catatan</label>
                <input
                  type="text"
                  value={optNote}
                  onChange={(e) => setOptNote(e.target.value)}
                  placeholder="Contoh: es sedikit, jangan terlalu pedas..."
                  className="w-full min-h-[44px] px-3 rounded-[10px] border border-gray-200 text-xs"
                />
              </div>

              {/* Jumlah & Tombol Tambah */}
              <div className="flex items-center gap-3 pt-2">
                <div className="flex items-center border border-gray-200 rounded-[10px] bg-[#FAFAFA]">
                  <button
                    onClick={() => setOptQty((q) => Math.max(1, q - 1))}
                    className="w-11 h-11 flex items-center justify-center text-gray-700 active:scale-90"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-bold text-sm">{optQty}</span>
                  <button
                    onClick={() => setOptQty((q) => q + 1)}
                    className="w-11 h-11 flex items-center justify-center text-gray-700 active:scale-90"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleConfirmOptionSheet}
                  className="flex-1 min-h-[46px] bg-[#FC5454] text-white font-bold text-xs rounded-[10px] shadow-md active:scale-95 transition"
                >
                  Tambah ·{' '}
                  {formatRp(
                    (resolvedVariantSku.hargaJual + (isMieProduct(activeGroup) && optAddEgg ? 4000 : 0)) * optQty
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* BOTTOM SHEET: KERANJANG (PENAMAAN PESANAN -> BUAT PESANAN)         */}
        {/* ================================================================== */}
        {showCartSheet && (
          <div className="fixed inset-0 z-40 bg-black/40 flex items-end justify-center anim-fade">
            <div className="w-full max-w-[440px] bg-white rounded-t-[16px] p-5 space-y-4 max-h-[90vh] overflow-y-auto anim-sheet">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="font-bold text-base text-gray-900">Keranjang Pesanan</h3>
                <button onClick={() => setShowCartSheet(false)} className="p-2 text-gray-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Input Nama Pelanggan / Nomor Meja sebelum Buat Pesanan */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-800 block">
                  Nama Pelanggan / Nomor Meja
                </label>
                <input
                  type="text"
                  value={orderCustomerName}
                  onChange={(e) => setOrderCustomerName(e.target.value)}
                  placeholder="Contoh: Meja 2, Mas Budi, atau kosongkan..."
                  className="w-full min-h-[44px] px-3 rounded-[10px] border border-gray-200 focus:border-[#FC5454] focus:outline-none text-xs"
                />
              </div>

              <div className="space-y-2.5 max-h-[38vh] overflow-y-auto pr-1">
                {cart.map((item, idx) => (
                  <div key={idx} className="bg-[#FAFAFA] p-2.5 rounded-[10px] space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex-1">
                        <p className="font-semibold text-xs text-gray-900">{item.nama}</p>
                        {item.sugar && item.sugar !== 'Normal' && (
                          <p className="text-[11px] text-gray-500">Gula {item.sugar}</p>
                        )}
                        {item.note && <p className="text-[10px] text-amber-700 italic">{item.note}</p>}
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-bold text-gray-800">
                            {formatRp(item.unitPrice * item.qty)}
                          </span>
                          <button
                            onClick={() => {
                              setEditingCartPriceIdx(editingCartPriceIdx === idx ? null : idx);
                              setTempPriceInput(String(item.unitPrice));
                            }}
                            className="text-[10px] text-[#FC5454] font-semibold underline"
                          >
                            Ubah harga
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setCart((prev) => {
                              const copy = [...prev];
                              if (copy[idx].qty > 1) copy[idx].qty -= 1;
                              else copy.splice(idx, 1);
                              return copy;
                            });
                          }}
                          className="w-9 h-9 rounded-[8px] bg-white border border-gray-200 flex items-center justify-center active:scale-90"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold">{item.qty}</span>
                        <button
                          onClick={() => {
                            setCart((prev) => {
                              const copy = [...prev];
                              copy[idx].qty += 1;
                              return copy;
                            });
                          }}
                          className="w-9 h-9 rounded-[8px] bg-white border border-gray-200 flex items-center justify-center active:scale-90"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Input Ubah Harga Satuan Sementara di Keranjang */}
                    {editingCartPriceIdx === idx && (
                      <div className="flex items-center gap-2 pt-1 border-t border-gray-200">
                        <input
                          type="number"
                          value={tempPriceInput}
                          onChange={(e) => setTempPriceInput(e.target.value)}
                          placeholder="Harga satuan khusus..."
                          className="flex-1 min-h-[38px] px-2.5 bg-white border border-gray-300 rounded-[8px] text-xs"
                        />
                        <button
                          onClick={() => {
                            if (tempPriceInput !== '') {
                              setCart((prev) => {
                                const copy = [...prev];
                                copy[idx].unitPrice = Number(tempPriceInput);
                                return copy;
                              });
                              showToast('Harga item diperbarui untuk transaksi ini');
                            }
                            setEditingCartPriceIdx(null);
                          }}
                          className="min-h-[38px] px-3 bg-gray-900 text-white rounded-[8px] text-xs font-semibold"
                        >
                          Terapkan
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-gray-100 space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-xs text-gray-500 block">Total Pesanan</span>
                    <span className="text-[10px] text-gray-400">Pembayaran dilakukan setelah pesanan selesai</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900">{formatRp(cartTotal)}</span>
                </div>
                <button
                  onClick={handleCreateOrder}
                  className="w-full min-h-[48px] bg-[#FC5454] text-white font-bold text-sm rounded-[10px] shadow-md active:scale-95 transition"
                >
                  Buat Pesanan
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* BOTTOM SHEET: AKSI PESANAN (TERPISAH ANTARA PROSES & BELUM BAYAR)  */}
        {/* ================================================================== */}
        {selectedOrder && (
          <div className="fixed inset-0 z-40 bg-black/40 flex items-end justify-center anim-fade">
            <div className="w-full max-w-[440px] bg-white rounded-t-[16px] p-5 space-y-3 anim-sheet">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
                <div>
                  <h3 className="font-bold text-base">
                    {selectedOrder.customerName || `Pesanan #${selectedOrder.id.replace('ORD-', '')}`}
                  </h3>
                  <p className="text-xs text-gray-500">
                    Total {formatRp(selectedOrder.total)} ·{' '}
                    {selectedOrder.orderStatus === 'Proses'
                      ? 'Sedang diproses'
                      : selectedOrder.paymentMethod || 'Belum dibayar'}
                  </p>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="p-2 text-gray-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* TAHAP 1 (Di tab Proses): Selesaikan Pesanan -> Pindah ke Belum dibayar */}
              {selectedOrder.orderStatus === 'Proses' && (
                <button
                  onClick={() => handleMarkOrderPrepared(selectedOrder)}
                  className="w-full min-h-[46px] bg-emerald-600 text-white font-bold text-xs rounded-[10px] flex items-center justify-center gap-2 active:scale-95 transition"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Selesaikan Pesanan (Pindah ke Belum dibayar)</span>
                </button>
              )}

              {/* TAHAP 2 (Di tab Belum dibayar): Bayar Pesanan -> Pindah ke Selesai */}
              {selectedOrder.orderStatus === 'Selesai' &&
                selectedOrder.paymentStatus === 'Belum dibayar' &&
                selectedOrder.paymentMethod !== 'Utang' && (
                  <button
                    onClick={() => {
                      setPayOrderModal(selectedOrder);
                      setPayOrderSelectedMethod('Cash');
                      setPayOrderDebtName(selectedOrder.customerName || '');
                      setSelectedOrder(null);
                    }}
                    className="w-full min-h-[46px] bg-[#FC5454] text-white font-bold text-xs rounded-[10px] active:scale-95 transition"
                  >
                    Bayar Pesanan
                  </button>
                )}

              <button
                onClick={() => {
                  setEditingOrder(JSON.parse(JSON.stringify(selectedOrder)));
                  setSelectedOrder(null);
                }}
                className="w-full min-h-[46px] bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold text-xs rounded-[10px] active:scale-95 transition"
              >
                Ubah Pesanan
              </button>

              <button
                onClick={() => {
                  setConfirmCancelOrder(selectedOrder);
                  setSelectedOrder(null);
                }}
                className="w-full min-h-[46px] border border-[#FC5454] text-[#FC5454] font-semibold text-xs rounded-[10px] active:scale-95 transition"
              >
                Batalkan Pesanan
              </button>
            </div>
          </div>
        )}

        {/* MODAL PEMBAYARAN PESANAN (CASH, QRIS, ATAU UTANG) */}
        {payOrderModal && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-end justify-center anim-fade">
            <div className="w-full max-w-[440px] bg-white rounded-t-[16px] p-5 space-y-4 anim-sheet">
              <div className="flex justify-between items-center border-b border-gray-100 pb-2.5">
                <div>
                  <h3 className="font-bold text-base">
                    Pembayaran {payOrderModal.customerName ? `· ${payOrderModal.customerName}` : ''}
                  </h3>
                  <p className="text-xs text-gray-500">
                    Total tagihan: <span className="font-bold text-gray-900">{formatRp(payOrderModal.total)}</span>
                  </p>
                </div>
                <button onClick={() => setPayOrderModal(null)} className="p-2 text-gray-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 block">Pilih Metode Pembayaran</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Cash', 'QRIS', 'Utang'].map((m) => (
                    <button
                      key={m}
                      onClick={() => setPayOrderSelectedMethod(m)}
                      className={`min-h-[46px] rounded-[10px] font-bold text-xs border active:scale-95 transition ${
                        payOrderSelectedMethod === m
                          ? m === 'Utang'
                            ? 'bg-[#FC5454] text-white border-[#FC5454]'
                            : 'bg-gray-900 text-white border-gray-900'
                          : 'bg-white text-gray-700 border-gray-200'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {payOrderSelectedMethod === 'Utang' && (
                <div className="space-y-1 anim-fade">
                  <label className="text-xs font-semibold text-[#FC5454] block">
                    Nama Pelanggan (Wajib untuk Utang) *
                  </label>
                  <input
                    type="text"
                    value={payOrderDebtName}
                    onChange={(e) => setPayOrderDebtName(e.target.value)}
                    placeholder="Ketik nama pelanggan..."
                    className="w-full min-h-[44px] px-3 rounded-[10px] border-2 border-[#FC5454]/50 focus:border-[#FC5454] focus:outline-none text-xs"
                  />
                </div>
              )}

              <button
                onClick={handleConfirmOrderPayment}
                className="w-full min-h-[48px] bg-[#FC5454] text-white font-bold text-xs rounded-[10px] shadow-md active:scale-95 transition"
              >
                Simpan Pembayaran ({payOrderSelectedMethod})
              </button>
            </div>
          </div>
        )}

        {/* MODAL UBAH PESANAN */}
        {editingOrder && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-end justify-center anim-fade">
            <div className="w-full max-w-[440px] bg-white rounded-t-[16px] p-5 space-y-4 anim-sheet">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-base">Ubah Pesanan</h3>
                <button onClick={() => setEditingOrder(null)} className="p-2 text-gray-400">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Nama Pelanggan / Meja</label>
                <input
                  type="text"
                  value={editingOrder.customerName || ''}
                  onChange={(e) => setEditingOrder({ ...editingOrder, customerName: e.target.value })}
                  placeholder="Nama pelanggan..."
                  className="w-full min-h-[42px] px-3 rounded-[10px] border border-gray-200 text-xs"
                />
              </div>
              <div className="space-y-2 max-h-[40vh] overflow-y-auto">
                {editingOrder.items.map((it, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-[#FAFAFA] p-2.5 rounded-[10px]">
                    <div>
                      <p className="text-xs font-semibold">{it.nama}</p>
                      <p className="text-[11px] text-gray-500">{formatRp(it.unitPrice)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          const updated = [...editingOrder.items];
                          if (updated[idx].qty > 1) updated[idx].qty -= 1;
                          else updated.splice(idx, 1);
                          setEditingOrder({
                            ...editingOrder,
                            items: updated,
                            total: updated.reduce((s, x) => s + x.unitPrice * x.qty, 0)
                          });
                        }}
                        className="w-9 h-9 bg-white border rounded-[8px] flex items-center justify-center"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold w-5 text-center">{it.qty}</span>
                      <button
                        onClick={() => {
                          const updated = [...editingOrder.items];
                          updated[idx].qty += 1;
                          setEditingOrder({
                            ...editingOrder,
                            items: updated,
                            total: updated.reduce((s, x) => s + x.unitPrice * x.qty, 0)
                          });
                        }}
                        className="w-9 h-9 bg-white border rounded-[8px] flex items-center justify-center"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => {
                  if (editingOrder.items.length === 0) {
                    showToast('Pesanan tidak boleh kosong', 'error');
                    return;
                  }
                  setOrders((prev) => prev.map((o) => (o.id === editingOrder.id ? editingOrder : o)));
                  showToast('Perubahan pesanan disimpan');
                  setEditingOrder(null);
                }}
                className="w-full min-h-[46px] bg-[#FC5454] text-white font-bold text-xs rounded-[10px]"
              >
                Simpan Perubahan ({formatRp(editingOrder.total)})
              </button>
            </div>
          </div>
        )}

        {/* DIALOG KONFIRMASI BATALKAN PESANAN */}
        {confirmCancelOrder && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4 anim-fade">
            <div className="w-full max-w-[360px] bg-white rounded-[12px] p-5 space-y-4">
              <h3 className="font-bold text-base text-gray-900">Batalkan pesanan?</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Pesanan yang dibatalkan tidak akan dihitung ke dalam laporan Keuangan dan Utang.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setConfirmCancelOrder(null)}
                  className="flex-1 min-h-[44px] bg-gray-100 text-gray-800 font-semibold text-xs rounded-[10px]"
                >
                  Kembali
                </button>
                <button
                  onClick={() => {
                    setOrders((prev) =>
                      prev.map((o) => (o.id === confirmCancelOrder.id ? { ...o, orderStatus: 'Dibatalkan' } : o))
                    );
                    showToast('Pesanan dibatalkan');
                    setConfirmCancelOrder(null);
                  }}
                  className="flex-1 min-h-[44px] bg-[#FC5454] text-white font-semibold text-xs rounded-[10px]"
                >
                  Ya, batalkan
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* BOTTOM SHEET: CATAT PENGELUARAN                                    */}
        {/* ================================================================== */}
        {showAddExpense && (
          <div className="fixed inset-0 z-40 bg-black/40 flex items-end justify-center anim-fade">
            <div className="w-full max-w-[440px] bg-white rounded-t-[16px] p-5 space-y-3 text-xs anim-sheet">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-base">Catat Pengeluaran</h3>
                <button onClick={() => setShowAddExpense(false)} className="p-2 text-gray-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <label className="block font-semibold mb-1">Kelompok Pengeluaran</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Warung', 'Pribadi'].map((grp) => (
                    <button
                      key={grp}
                      onClick={() => {
                        setExpGroup(grp);
                        setExpCategory(grp === 'Pribadi' ? 'Pribadi' : warungCategories[0] || 'Listrik');
                      }}
                      className={`min-h-[44px] rounded-[10px] font-semibold border ${
                        expGroup === grp
                          ? 'bg-gray-900 border-gray-900 text-white'
                          : 'bg-white border-gray-200 text-gray-600'
                      }`}
                    >
                      {grp}
                    </button>
                  ))}
                </div>
              </div>

              {expGroup === 'Warung' && (
                <div>
                  <label className="block font-semibold mb-1">Kategori Warung</label>
                  <div className="flex flex-wrap gap-1.5">
                    {warungCategories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setExpCategory(cat)}
                        className={`min-h-[38px] px-3 rounded-[8px] font-medium border ${
                          expCategory === cat
                            ? 'bg-gray-900 text-white border-gray-900'
                            : 'bg-white text-gray-700 border-gray-200'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block font-semibold mb-1">Tanggal</label>
                <input
                  type="date"
                  value={expDate}
                  onChange={(e) => setExpDate(e.target.value)}
                  className="w-full min-h-[44px] px-3 rounded-[10px] border border-gray-200"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Keterangan</label>
                <input
                  type="text"
                  value={expDesc}
                  onChange={(e) => setExpDesc(e.target.value)}
                  placeholder="Mis. Token listrik, Gas 3kg, Cup..."
                  className="w-full min-h-[44px] px-3 rounded-[10px] border border-gray-200"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Jumlah (Rp) *</label>
                <input
                  type="number"
                  value={expAmount}
                  onChange={(e) => setExpAmount(e.target.value)}
                  placeholder="25000"
                  className="w-full min-h-[44px] px-3 rounded-[10px] border border-gray-200"
                />
              </div>

              <button
                onClick={() => {
                  if (!expAmount) {
                    showToast('Jumlah pengeluaran wajib diisi', 'error');
                    return;
                  }
                  setExpenses((prev) => [
                    {
                      id: `EXP-${Date.now()}`,
                      date: expDate,
                      group: expGroup,
                      category: expGroup === 'Pribadi' ? 'Pribadi' : expCategory,
                      description: expDesc.trim() || expCategory,
                      amount: Number(expAmount)
                    },
                    ...prev
                  ]);
                  showToast('Pengeluaran berhasil dicatat');
                  setShowAddExpense(false);
                }}
                className="w-full min-h-[46px] bg-[#FC5454] text-white font-bold rounded-[10px]"
              >
                Simpan Pengeluaran
              </button>
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* MODAL UTANG (TAMBAH BON, UBAH BON, HAPUS KONFIRMASI, BAYAR, GABUNG)*/}
        {/* ================================================================== */}
        {showAddDebtModal && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-end justify-center anim-fade">
            <div className="w-full max-w-[440px] bg-white rounded-t-[16px] p-5 space-y-3 text-xs anim-sheet">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-base">
                  {isDebtNameLocked ? `Tambah Bon · ${newDebtName}` : 'Catat Utang / Bon Baru'}
                </h3>
                <button onClick={() => setShowAddDebtModal(false)} className="p-2 text-gray-400">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div>
                <label className="block font-semibold mb-1">Nama Pelanggan *</label>
                <input
                  type="text"
                  disabled={isDebtNameLocked}
                  value={newDebtName}
                  onChange={(e) => setNewDebtName(e.target.value)}
                  placeholder="Ketik nama pelanggan..."
                  className={`w-full min-h-[44px] px-3 rounded-[10px] border border-gray-200 ${
                    isDebtNameLocked ? 'bg-gray-100 font-bold text-gray-700' : ''
                  }`}
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Keterangan (Opsional)</label>
                <input
                  type="text"
                  value={newDebtDesc}
                  onChange={(e) => setNewDebtDesc(e.target.value)}
                  placeholder="Mis. Bon tambahan"
                  className="w-full min-h-[44px] px-3 rounded-[10px] border border-gray-200"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Jumlah Utang (Rp) *</label>
                <input
                  type="number"
                  value={newDebtAmount}
                  onChange={(e) => setNewDebtAmount(e.target.value)}
                  placeholder="15000"
                  className="w-full min-h-[44px] px-3 rounded-[10px] border border-gray-200"
                />
              </div>
              <button
                onClick={() => {
                  if (!newDebtName.trim() || !newDebtAmount) {
                    showToast('Nama dan jumlah utang wajib diisi', 'error');
                    return;
                  }
                  const today = todayISO();
                  const cleanName = newDebtName.trim();
                  const addVal = Number(newDebtAmount);
                  const addDesc = newDebtDesc.trim() || 'Catatan utang';
                  const targetKey = normalizeName(cleanName);

                  const existingTodayIdx = manualDebts.findIndex(
                    (m) => m.date === today && normalizeName(m.customerName) === targetKey
                  );

                  if (existingTodayIdx > -1) {
                    setManualDebts((prev) => {
                      const copy = [...prev];
                      const existing = { ...copy[existingTodayIdx] };
                      existing.amount += addVal;
                      existing.description = `${existing.description} + ${addDesc} (${formatRp(addVal)})`;
                      copy[existingTodayIdx] = existing;
                      return copy;
                    });
                    showToast(`Digabungkan ke bon hari ini milik ${cleanName}`);
                  } else {
                    setManualDebts((prev) => [
                      {
                        id: `DBT-${Date.now()}`,
                        date: today,
                        customerName: cleanName,
                        description: addDesc,
                        amount: addVal,
                        paidAmount: 0
                      },
                      ...prev
                    ]);
                    showToast('Catatan utang berhasil disimpan');
                  }
                  setShowAddDebtModal(false);
                }}
                className="w-full min-h-[46px] bg-[#FC5454] text-white font-bold rounded-[10px]"
              >
                Simpan Utang
              </button>
            </div>
          </div>
        )}

        {/* MODAL UBAH BON */}
        {editingBonModal && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4 anim-fade">
            <div className="w-full max-w-[360px] bg-white rounded-[12px] p-5 space-y-3 text-xs">
              <h3 className="font-bold text-base">Ubah Catatan Bon</h3>
              <div>
                <label className="block font-semibold mb-1">Keterangan</label>
                <input
                  type="text"
                  value={editingBonModal.description}
                  onChange={(e) => setEditingBonModal({ ...editingBonModal, description: e.target.value })}
                  className="w-full min-h-[44px] px-3 rounded-[10px] border border-gray-200"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Jumlah (Rp)</label>
                <input
                  type="number"
                  value={editingBonModal.amount}
                  onChange={(e) => setEditingBonModal({ ...editingBonModal, amount: Number(e.target.value) })}
                  className="w-full min-h-[44px] px-3 rounded-[10px] border border-gray-200"
                />
              </div>
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => setEditingBonModal(null)}
                  className="flex-1 min-h-[44px] bg-gray-100 rounded-[10px] font-semibold"
                >
                  Batal
                </button>
                <button
                  onClick={() => {
                    setManualDebts((prev) =>
                      prev.map((m) =>
                        m.id === editingBonModal.id
                          ? { ...m, description: editingBonModal.description, amount: editingBonModal.amount }
                          : m
                      )
                    );
                    showToast('Bon diperbarui');
                    setEditingBonModal(null);
                  }}
                  className="flex-1 min-h-[44px] bg-[#FC5454] text-white rounded-[10px] font-semibold"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        )}

        {/* DIALOG KONFIRMASI HAPUS BON */}
        {confirmDeleteBon && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4 anim-fade">
            <div className="w-full max-w-[350px] bg-white rounded-[12px] p-5 space-y-4">
              <h3 className="font-bold text-base">Hapus catatan bon?</h3>
              <p className="text-xs text-gray-600">
                Bon "{confirmDeleteBon.description}" sebesar {formatRp(confirmDeleteBon.amount)} akan dihapus permanen.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setConfirmDeleteBon(null)}
                  className="flex-1 min-h-[44px] bg-gray-100 rounded-[10px] text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  onClick={() => {
                    setManualDebts((prev) => prev.filter((m) => m.id !== confirmDeleteBon.id));
                    showToast('Catatan bon dihapus');
                    setConfirmDeleteBon(null);
                  }}
                  className="flex-1 min-h-[44px] bg-[#FC5454] text-white rounded-[10px] text-xs font-semibold"
                >
                  Ya, hapus
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL BAYAR UTANG PELANGGAN */}
        {payDebtModal && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-end justify-center anim-fade">
            <div className="w-full max-w-[440px] bg-white rounded-t-[16px] p-5 space-y-3 text-xs anim-sheet">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-base">Bayar Utang · {payDebtModal.displayName}</h3>
                <button onClick={() => setPayDebtModal(null)} className="p-2 text-gray-400">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-gray-600">
                Total sisa utang: <span className="font-bold text-[#FC5454]">{formatRp(payDebtModal.balance)}</span>
              </p>
              <div>
                <label className="block font-semibold mb-1">Nominal Bayar (bisa sebagian / lunas)</label>
                <input
                  type="number"
                  value={payDebtAmount}
                  onChange={(e) => setPayDebtAmount(e.target.value)}
                  className="w-full min-h-[44px] px-3 rounded-[10px] border border-gray-200 font-bold text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                {['Cash', 'QRIS'].map((v) => (
                  <button
                    key={v}
                    onClick={() => setPayDebtVia(v)}
                    className={`min-h-[44px] rounded-[10px] font-semibold border ${
                      payDebtVia === v ? 'bg-gray-900 border-gray-900 text-white' : 'bg-white border-gray-200'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
              <button
                onClick={() => {
                  const nominal = Number(payDebtAmount);
                  let remainingToApply = nominal;
                  if (remainingToApply <= 0) {
                    showToast('Masukkan nominal pembayaran yang valid', 'error');
                    return;
                  }
                  const targetKey = payDebtModal.debtorKey;

                  setOrders((prev) =>
                    prev.map((ord) => {
                      if (
                        remainingToApply > 0 &&
                        ord.orderStatus !== 'Dibatalkan' &&
                        (ord.paymentMethod === 'Utang' || ord.originalMethod === 'Utang') &&
                        ord.paymentStatus !== 'Lunas' &&
                        normalizeName(ord.customerName) === targetKey
                      ) {
                        const currentPaid = ord.paidAmount || 0;
                        const unpaid = ord.total - currentPaid;
                        const apply = Math.min(unpaid, remainingToApply);
                        remainingToApply -= apply;
                        const newPaid = currentPaid + apply;
                        const isNowLunas = newPaid >= ord.total;
                        return {
                          ...ord,
                          paidAmount: newPaid,
                          paymentStatus: isNowLunas ? 'Lunas' : 'Belum dibayar',
                          paymentMethod: isNowLunas ? payDebtVia : 'Utang',
                          originalMethod: 'Utang'
                        };
                      }
                      return ord;
                    })
                  );

                  setManualDebts((prev) =>
                    prev.map((md) => {
                      if (remainingToApply > 0 && normalizeName(md.customerName) === targetKey) {
                        const currentPaid = md.paidAmount || 0;
                        const unpaid = md.amount - currentPaid;
                        if (unpaid > 0) {
                          const apply = Math.min(unpaid, remainingToApply);
                          remainingToApply -= apply;
                          return { ...md, paidAmount: currentPaid + apply };
                        }
                      }
                      return md;
                    })
                  );

                  setDebtPaymentsToday((prev) => [...prev, { date: todayISO(), amount: nominal, via: payDebtVia }]);

                  showToast(`Pembayaran utang ${formatRp(nominal)} (${payDebtVia}) dicatat`);
                  setPayDebtModal(null);
                }}
                className="w-full min-h-[46px] bg-[#FC5454] text-white font-bold rounded-[10px]"
              >
                Simpan Pembayaran
              </button>
            </div>
          </div>
        )}

        {/* MODAL GABUNG NAMA UTANG */}
        {mergeModal && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4 anim-fade">
            <div className="w-full max-w-[380px] bg-white rounded-[12px] p-5 space-y-3 text-xs">
              <h3 className="font-bold text-base">Gabung Nama Utang</h3>
              <p className="text-gray-500">Satukan dua catatan nama pelanggan yang ejaannya mirip.</p>
              <div>
                <label className="block font-semibold mb-1">Dari nama (digabung):</label>
                <select
                  value={mergeSource}
                  onChange={(e) => setMergeSource(e.target.value)}
                  className="w-full min-h-[44px] px-3 rounded-[10px] border border-gray-200"
                >
                  {debtorsList.map((d) => (
                    <option key={d.key} value={d.key}>
                      {d.displayName} ({formatRp(d.balance)})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1">Ke nama utama:</label>
                <select
                  value={mergeTarget}
                  onChange={(e) => setMergeTarget(e.target.value)}
                  className="w-full min-h-[44px] px-3 rounded-[10px] border border-gray-200"
                >
                  {debtorsList.map((d) => (
                    <option key={d.key} value={d.key}>
                      {d.displayName} ({formatRp(d.balance)})
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setMergeModal(false)}
                  className="flex-1 min-h-[44px] bg-gray-100 rounded-[10px] font-semibold"
                >
                  Batal
                </button>
                <button
                  onClick={() => {
                    if (!mergeSource || !mergeTarget || mergeSource === mergeTarget) {
                      showToast('Pilih dua nama pelanggan yang berbeda', 'error');
                      return;
                    }
                    const targetObj = debtorsList.find((d) => d.key === mergeTarget);
                    const targetName = targetObj ? targetObj.displayName : mergeTarget;

                    setOrders((prev) =>
                      prev.map((o) =>
                        normalizeName(o.customerName) === mergeSource ? { ...o, customerName: targetName } : o
                      )
                    );
                    setManualDebts((prev) =>
                      prev.map((m) =>
                        normalizeName(m.customerName) === mergeSource ? { ...m, customerName: targetName } : m
                      )
                    );
                    showToast(`Berhasil digabung ke ${targetName}`);
                    setMergeModal(false);
                  }}
                  className="flex-1 min-h-[44px] bg-[#FC5454] text-white rounded-[10px] font-semibold"
                >
                  Gabungkan
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL EDIT MENU PERMANEN (HARGA JUAL & HPP MANUAL) */}
        {editMenuModal && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-end justify-center anim-fade">
            <div className="w-full max-w-[440px] bg-white rounded-t-[16px] p-5 space-y-3 text-xs anim-sheet">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-base">Ubah Menu · {editMenuModal.nama}</h3>
                <button onClick={() => setEditMenuModal(null)} className="p-2 text-gray-400">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">Harga Jual (Rp)</label>
                  <input
                    type="number"
                    value={editMenuModal.hargaJual}
                    onChange={(e) => setEditMenuModal({ ...editMenuModal, hargaJual: Number(e.target.value) })}
                    className="w-full min-h-[44px] px-3 rounded-[10px] border border-gray-200 font-bold"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">HPP / Modal (Manual)</label>
                  <input
                    type="number"
                    value={editMenuModal.hppInput}
                    onChange={(e) => setEditMenuModal({ ...editMenuModal, hppInput: e.target.value })}
                    placeholder="Ketik manual..."
                    className="w-full min-h-[44px] px-3 rounded-[10px] border border-gray-200"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">Kode SKU</label>
                <input
                  type="text"
                  value={editMenuModal.kode}
                  onChange={(e) => setEditMenuModal({ ...editMenuModal, kode: e.target.value })}
                  className="w-full min-h-[44px] px-3 rounded-[10px] border border-gray-200 font-mono"
                />
              </div>

              <button
                onClick={() => {
                  setSkus((prev) =>
                    prev.map((s) =>
                      s.kode === editMenuModal.kode
                        ? {
                            ...s,
                            hargaJual: editMenuModal.hargaJual,
                            hpp: editMenuModal.hppInput === '' ? null : Number(editMenuModal.hppInput)
                          }
                        : s
                    )
                  );
                  showToast('Harga & HPP menu diperbarui');
                  setEditMenuModal(null);
                }}
                className="w-full min-h-[46px] bg-[#FC5454] text-white font-bold rounded-[10px]"
              >
                Simpan Perubahan
              </button>

              <button
                onClick={() => {
                  setSkus((prev) =>
                    prev.map((s) => (s.kode === editMenuModal.kode ? { ...s, active: !s.active } : s))
                  );
                  showToast(editMenuModal.active ? 'Menu dinonaktifkan' : 'Menu diaktifkan kembali');
                  setEditMenuModal(null);
                }}
                className="w-full min-h-[44px] bg-gray-100 text-gray-700 font-semibold rounded-[10px]"
              >
                {editMenuModal.active ? 'Nonaktifkan dari Menu' : 'Aktifkan Kembali'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}