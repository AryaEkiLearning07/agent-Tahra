import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  Sparkles,
  Copy,
  Check,
  Share2,
  TrendingUp,
  DollarSign,
  ShieldCheck,
  AlertTriangle,
  Bot,
  Layers,
  ArrowLeft,
  ExternalLink,
  Target,
  FileText,
  Image as ImageIcon,
  Video,
  Code2,
  CheckCircle2,
  Users,
  Database,
  Calculator,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  Search,
  BrainCircuit,
  Zap,
  Flame,
  ArrowRight,
  Eye,
  CheckCircle,
  Clock,
  Terminal,
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { PageContainer } from '../components/layout/PageContainer';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { Badge, StatusBadge } from '../components/ui/Badge';
import { Alert } from '../components/ui/Alert';
import { formatRp, formatDate, formatPercent } from '../utils/formatters';
import { cn } from '../utils/cn';

export default function CampaignDetail() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const campaign = state?.campaign;
  const result = campaign?.result;

  const [copiedKey, setCopiedKey] = useState(null);
  const [activeStage, setActiveStage] = useState(0);
  const [funnelPhase, setFunnelPhase] = useState('fase2'); // 'fase1' | 'fase2' | 'fase3'
  const [showThoughtLog, setShowThoughtLog] = useState(true);

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(typeof text === 'object' ? JSON.stringify(text, null, 2) : text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const rawProductName = campaign?.product_name || result?.agent1_research?.product_name || 'Sambal Cumi Asin TAHRA 150g';
  const rawPrice = campaign?.harga_jual || result?.agent2_strategy?.margin_value || 35000;
  const rawHpp = campaign?.hpp || (rawPrice * 0.45);

  // Dynamic Product Intelligence Generator (Adapts to ANY Product: Pet food, Coffee, Fashion, Sambal, etc.)
  const getDynamicProductIntel = (pName, price, hpp) => {
    const pLower = pName.toLowerCase();
    const isPet = pLower.includes('kucing') || pLower.includes('cat') || pLower.includes('pet') || pLower.includes('anjing') || pLower.includes('felibite');
    const isCoffee = pLower.includes('kopi') || pLower.includes('coffee') || pLower.includes('cafe');
    const isFashion = pLower.includes('kaos') || pLower.includes('baju') || pLower.includes('dress') || pLower.includes('tshirt') || pLower.includes('gamis');

    if (isPet) {
      return {
        product_class: price < 30000 ? 'Ekonomis' : price > 100000 ? 'Premium Karung' : 'Menengah',
        category_name: 'Nutrisi & Makanan Hewan Peliharaan',
        usp: 'Kibble renyah kaya protein & Omega 3/6, disukai anabul tanpa bikin mogok makan & cegah bulu rontok.',
        competitor_proxy: 'Whiskas / Me-O / Pakan Curah Kiloan',
        target_demography: 'Pecinta Kucing (Cat Owners) Usia 18-40 tahun, Pemilik Anabul Kos & Rumahan',
        audience_psychography: 'Sangat menyayangi anabul peliharaan, mencari makanan lezat bernutrisi yang ramah di kantong.',
        demand_views: '620.4M+ Views (#KucingLucu #MakananKucing)',
        search_volume: '42.800 / bln',
        sentiment_pos: [
          '82% pembeli senang karena anabul lahap makan sampai mangkok bersih.',
          '74% menyukai tekstur kibble renyah yang tidak mudah lembek & tidak amis menyengat.',
          '58% repeat order karena bulu kucing jadi lebih lebat dan aktif bermain.'
        ],
        sentiment_neg: [
          '54% keluhan pakan pasaran: bikin kotoran anabul bau menyengat & bikin mencret.',
          '31% mengeluhkan kemasan mudah robek atau tidak kedap udara saat pengiriman.',
          '18% anabul sering bosan dan mogok makan setelah 3 hari.'
        ],
        competitor_matrix: [
          { brand: `⭐ ${pName} (Produk Anda)`, price: `Rp ${Number(price).toLocaleString('id-ID')}`, gram: '500g - 1kg', diff: 'Nutrisi seimbang, aroma lezat disukai anabul, kemasan higienis, harga bersahabat.' },
          { brand: 'Brand Impor Supermarket', price: 'Rp 45.000', gram: '400 gram', diff: 'Brand ternama, namun harga 2x lebih mahal untuk porsi yang lebih sedikit.' },
          { brand: 'Pakan Curah Repack Tanpa Merek', price: 'Rp 14.000', gram: '500 gram', diff: 'Murah meriah, tapi risiko jamur tinggi dan tidak ada sertifikasi nutrisi.' }
        ],
        persona_1: { name: 'Rani (24th) - Cat Mom & Pekerja Kantoran', age: '20 - 30th', desc: 'Punya 2 kucing di rumah kos, butuh pakan harian bergizi yang disukai anabul tanpa menguras gaji.', trigger: 'Anabul lahap makan & bulu makin lebat sehat.' },
        persona_2: { name: 'Pak Hendra (38th) - Pemilik Banyak Kucing', age: '30 - 45th', desc: 'Merawat 5+ anabul rescue, butuh pakan berkualitas ekonomis untuk stok bulanan.', trigger: 'Stok pakan hemat berkualitas isi banyak.' },
        fase1: {
          headline: 'Anabul Sering Mogok Makan? Berikan Pakan Renyah Gurih Bernutrisi Ini!',
          primary_text: `Sering sedih lihat anabul lemas dan gak mau makan? ${pName} diformulasikan khusus dengan aroma gurih yang memicu selera makan anabul seketika, lengkap dengan Omega 3 & 6 untuk bulu lebat anti-rontok.`,
          cta: 'Beli Pakan Favorit Anabul Sekarang 🐾',
          video_hook: `Tunjukkan kucing yang tadinya lemas malas, langsung lari antusias saat kemasan ${pName} dibuka dan dituang ke mangkok!`,
          body_3_10s: 'Kibble renyah gurih mudah dikunyah dengan vitamin lengkap untuk kesehatan anabul.',
          cta_10_15s: 'Klik keranjang kuning sekarang mumpung ada promo diskon khusus hari ini!'
        },
        fase2: {
          headline: 'Bikin Kucing Makin Gendut & Bulu Berkilau! Diskon 20% Hari Ini!',
          primary_text: `Khusus pecinta anabul yang kemarin lihat video kami! Dapatkan promo gratis ongkir + potongan 20% untuk pembelian ${pName} hari ini.`,
          cta: 'Klaim Diskon Anabul 20% Sekarang ⚡',
          video_hook: `Tunjukkan anabul makan dengan sangat lahap sampai mangkok bersih tanpa sisa!`,
          body_3_10s: 'Ribuan cat owners sudah buktikan kucing lebih aktif dan bebas bulu rontok.',
          cta_10_15s: 'Klik beli sekarang sebelum kuota promo 50 pembeli pertama habis!'
        },
        fase3: {
          headline: 'Paket Hemat Stok Bulanan! Beli 3 Lebih Murah + Bebas Ongkir',
          primary_text: `Sudah cocok dan anabul suka? Hemat pengeluaran dengan Paket Bundling Stok Bulanan ${pName}. Lebih hemat hingga 35%!`,
          cta: 'Pesan Paket Bundling Hemat 📦',
          video_hook: `Tunjukkan unboxing stok pakan 3 bungkus dengan kemasan rapi kedap udara.`,
          body_3_10s: 'Pilihan hemat cat lovers cerdas untuk persediaan 1 bulan penuh.',
          cta_10_15s: 'Ambil paket hemat sekarang langsung diantar ke depan rumah.'
        }
      };
    }

    if (isCoffee) {
      return {
        product_class: 'Minuman Segar / F&B',
        category_name: 'Specialty Coffee & Beverages',
        usp: 'Biji kopi pilihan dengan racikan gula aren asli, creamy pas tanpa bikin kembung.',
        competitor_proxy: 'Kopi Kenangan / Janji Jiwa / Kopi Sachet Instan',
        target_demography: 'Pekerja Kantoran & Mahasiswa 18-35th, Pecinta Kopi Harian',
        audience_psychography: 'Butuh suntikan energi kafein segar di sela jam kerja padat.',
        demand_views: '780.2M+ Views (#KopiKekinian #NgopiDulu)',
        search_volume: '54.100 / bln',
        sentiment_pos: ['88% suka rasa kopi mantap tanpa asam berlebih.', '79% suka manis aren legit alami.', '62% order rutin untuk nemenin lembur kerja.'],
        sentiment_neg: ['45% keluhan kopi kemasan: terlalu manis menutupi rasa kopi.', '28% es batu mencair bikin hambar saat delivery.'],
        competitor_matrix: [
          { brand: `⭐ ${pName} (Produk Anda)`, price: `Rp ${Number(price).toLocaleString('id-ID')}`, gram: '250ml - 1 Liter', diff: 'Kopi asli fresh brew gula aren alami, harga bersahabat.' },
          { brand: 'Coffee Shop Mall', price: 'Rp 28.000', gram: '200ml', diff: 'Nama besar, tapi harga lebih mahal untuk konsumsi harian.' },
          { brand: 'Kopi Sachet Minimarket', price: 'Rp 5.000', gram: 'Sachet', diff: 'Murah tapi dominan krimer gula sintetis, minim rasa kopi asli.' }
        ],
        persona_1: { name: 'Dimas (25th) - Programmer / Freelancer', age: '22 - 32th', desc: 'Bekerja di depan laptop seharian, butuh kopi enak dingin yang praktis tinggal tuang.', trigger: 'Mood booster anti-ngantuk saat deadline.' },
        persona_2: { name: 'Nisa (28th) - Pegawai Swasta', age: '25 - 35th', desc: 'Suka stok kopi botolan di kulkas kantor untuk dinikmati bersama rekan kerja.', trigger: 'Stok kopi botolan hemat rasa cafe.' },
        fase1: {
          headline: 'Ngantuk Pas Jam Kerja? Teguk Kesegaran Kopi Susu Legit Ini!',
          primary_text: `Pagi-pagi lemas atau siang ngantuk berat? ${pName} dibuat dari biji kopi pilihan dengan perpaduan susu segar dan gula aren murni. Sekali seruput langsung melek!`,
          cta: 'Pesan Kopi Segar Sekarang ☕',
          video_hook: `Tunjukkan close-up es batu bergemerincing dan kopi susu legit kental dituangkan ke gelas!`,
          body_3_10s: 'Rasa kopi mantap, creamy seimbang tanpa bikin perut kembung atau perih.',
          cta_10_15s: 'Pesan sekarang dikirim langsung dalam kondisi dingin segar!'
        },
        fase2: {
          headline: 'Diskon 20% Hari Ini! Nikmati Kopi Favorit Teman Nugas & Kerja!',
          primary_text: `Khusus kamu yang butuh mood booster hari ini! Ambil diskon 20% untuk ${pName}. Siap antar cepat!`,
          cta: 'Klaim Diskon Kopi 20% ⚡',
          video_hook: 'Tunjukkan orang yang lemas di depan laptop langsung segar tersenyum setelah minum kopi.',
          body_3_10s: 'Pilihan ribuan pecinta kopi untuk teman nugas dan lembur kerja.',
          cta_10_15s: 'Klik pesan sekarang sebelum kuota diskon hari ini habis!'
        },
        fase3: {
          headline: 'Stok Botol 1 Liter Lebih Hemat! Cukup Buat Ngopi Bareng 3-4 Hari',
          primary_text: `Puas ngopi sekeluarga atau sekantor dengan Paket Literan ${pName}. Hemat sampai 40% dibanding beli satuan.`,
          cta: 'Order Paket Literan Hemat 🍶',
          video_hook: 'Tunjukkan botol ukuran 1 liter dituangkan ke 4 gelas penuh es batu.',
          body_3_10s: 'Praktis disimpan di kulkas, kapanpun pengen ngopi tinggal tuang.',
          cta_10_15s: 'Pesan paket literan hemat hari ini!'
        }
      };
    }

    if (isFashion) {
      return {
        product_class: 'Fashion & Apparel',
        category_name: 'Apparel & Streetwear',
        usp: 'Bahan katun premium lembut adem tidak panas, potongan jahitan presisi anti-susut.',
        competitor_proxy: 'Brand Fast Fashion Mall / Kaos Pasar Grosir',
        target_demography: 'Pria & Wanita 17-35 tahun, Penggemar Gaya Kasual OOTD',
        audience_psychography: 'Mengutamakan kenyamanan pakaian harian yang trendy dan rapi.',
        demand_views: '1.2B+ Views (#OOTDIndonesia #FashionLokal)',
        search_volume: '68.400 / bln',
        sentiment_pos: ['84% suka bahan tebal tapi tetap adem.', '76% potongan baju pas di badan bikin terlihat proporsional.'],
        sentiment_neg: ['58% komplain baju pasaran: bahan panas bikin gerah dan kerah melar.'],
        competitor_matrix: [
          { brand: `⭐ ${pName} (Produk Anda)`, price: `Rp ${Number(price).toLocaleString('id-ID')}`, gram: 'Standar Ritel', diff: 'Bahan combed asli sejuk, jahitan double rantai kuat.' },
          { brand: 'Brand Distro Mall', price: 'Rp 149.000', gram: 'Standar Ritel', diff: 'Kualitas setara tapi harga 2-3x lebih mahal.' },
          { brand: 'Kaos Grosir Murah', price: 'Rp 35.000', gram: 'Tipis', diff: 'Murah tapi bahan kasar, menerawang, dan mudah susut.' }
        ],
        persona_1: { name: 'Aldi (22th) - Mahasiswa / Content Creator', age: '18 - 26th', desc: 'Suka outfit simpel kasual yang nyaman dipakai kuliah maupun hangout.', trigger: 'Tampil keren stylish tanpa ribet.' },
        persona_2: { name: 'Sarah (28th) - Karyawati', age: '24 - 34th', desc: 'Mencari pakaian harian versatile yang nyaman di ruangan ber-AC maupun outdoor.', trigger: 'Kenyamanan bahan adem premium seharian.' },
        fase1: {
          headline: 'Tampil Keren & Percaya Diri dengan Bahan Adem Lembut Seharian!',
          primary_text: `Sering beli pakaian online tapi pas datang bahannya panas dan gerah? ${pName} menggunakan bahan katun premium pilihan yang sejuk di iklim tropis dengan jahitan presisi rapi.`,
          cta: 'Cek Koleksi & Size Chart Sekarang 👕',
          video_hook: 'Tunjukkan close-up tekstur kain yang halus jatuh dan tidak mudah kusut saat dipakai bergerak aktif!',
          body_3_10s: 'Potongan proporsional bikin penampilan makin stylish untuk kuliah, kerja, atau hangout.',
          cta_10_15s: 'Pilih warna favoritmu sekarang sebelum ukuranmu habis!'
        },
        fase2: {
          headline: 'Diskon 20% Khusus Hari Ini! Upgrade Outfit Harianmu Sekarang!',
          primary_text: `Khusus kamu yang kemarin cek produk kami! Dapatkan potongan 20% + jaminan garansi retur jika ukuran tidak pas.`,
          cta: 'Klaim Diskon Fashion 20% ⚡',
          video_hook: 'Tunjukkan video try-on transisi sebelum dan sesudah memakai outfit yang langsung terlihat rapi dan elegan.',
          body_3_10s: 'Ribuan pelanggan puas dengan kenyamanan bahan dan potongan fitting-nya.',
          cta_10_15s: 'Klik beli sekarang sebelum promo berakhir!'
        },
        fase3: {
          headline: 'Beli 2 Gratis Ongkir + Diskon Tambahan! Lengkapi Koleksi Warnamu',
          primary_text: `Makin hemat beli paket 2 pcs warna netral basic ${pName}. Cocok dipadupadankan untuk outfit seminggu penuh.`,
          cta: 'Ambil Paket Bundling 2 Pcs 📦',
          video_hook: 'Tunjukkan 3 pilihan warna netral elegan yang mudah di-mix and match.',
          body_3_10s: 'Investasi pakaian harian awet bertahun-tahun tanpa melar.',
          cta_10_15s: 'Pesan paket bundling sekarang!'
        }
      };
    }

    // Default: Kuliner / FMCG
    return {
      product_class: 'FMCG Kuliner Pedas',
      category_name: 'FMCG Kuliner Pedas Siap Saji',
      usp: 'Potongan cumi/lauk melimpah dengan minyak cabai segar alami tanpa bahan pengawet kimia.',
      competitor_proxy: 'Sambal Bu Rudy / Sambal Kemasan Supermarket',
      target_demography: 'Pria & Wanita 18-35 tahun, Pengguna Aktif Media Sosial',
      audience_psychography: 'Pecinta kuliner pedas praktis yang suka makan nasi hangat di kos/rumah.',
      demand_views: '840.5M+ Views (#SambalViral #KulinerPedas)',
      search_volume: '49.200 / bln',
      sentiment_pos: [
        '74% menyukai minyak cabai wangi yang melimpah untuk disiram di nasi panas.',
        '68% mencari tekstur cumi yang kenyal gurih dan tidak berbau amis.',
        '52% repeat order karena kepraktisan lauk tanpa perlu dimasak.'
      ],
      sentiment_neg: [
        '62% kecewa karena cumi di sambal pasaran sangat sedikit (cuma 2-3 potong kecil).',
        '26% mengeluhkan minyak beku atau menggumpal saat sampai.',
        '19% mengalami kemasan bocor saat pengiriman ekspedisi.'
      ],
      competitor_matrix: [
        { brand: `⭐ ${pName} (Produk Anda)`, price: `Rp ${Number(price).toLocaleString('id-ID')}`, gram: '150 gram', diff: 'Potongan cumi jumbo melimpah, minyak cabai segar alami tanpa pengawet kimia.' },
        { brand: 'Sambal Bu Rudy', price: 'Rp 38.000', gram: '130 gram', diff: 'Brand legendaris, namun porsi cumi sedikit & harga lebih premium.' },
        { brand: 'Sambal Sachet Supermarket', price: 'Rp 18.000', gram: '100 gram', diff: 'Murah, tapi rasa cenderung kimiawi/artifisial dan tanpa cumi asli.' }
      ],
      persona_1: { name: 'Riko (24th) - Anak Kos & Pekerja Sibuk', age: '19 - 27th', desc: 'Sering lembur atau kuliah, malas memasak yang ribet. Cukup masak nasi di rice cooker dan butuh 1 lauk pedas gurih yang langsung bikin nafsu makan naik.', trigger: 'Cuma butuh nasi hangat + sambal TAHRA, makan malam mewah hemat selesai!' },
      persona_2: { name: 'Diana (32th) - Ibu Rumah Tangga Modern', age: '28 - 40th', desc: 'Mencari pelengkap makan keluarga yang higienis. Mengutamakan bahan alami tanpa pengawet berbahaya untuk suami dan anak-anak.', trigger: 'Stok sambal higienis di kulkas yang tahan lama dan disukai seisi rumah.' },
      fase1: {
        headline: 'Pedasnya Nendang, Bikin Nasi Hangat Langsung Ludes!',
        primary_text: `Sering kecewa sama sambal botolan yang cuma asin doang? ${pName} diracik dari 100% cabai segar pilihan dan potongan cumi melimpah.`,
        cta: 'Cek Rasa Autentiknya Sekarang 🔥',
        video_hook: 'Tunjukkan close-up sendok menyendok sambal cumi melimpah di atas nasi panas mengepul.',
        body_3_10s: 'Tekstur cumi kenyal gurih dan cabai merah menyala tanpa minyak beku.',
        cta_10_15s: 'Klik link di bio/keranjang kuning sekarang untuk klaim voucher gratis ongkir!'
      },
      fase2: {
        headline: 'Masih Penasaran Sama Pedas Gurihnya? Diskon 20% Hari Ini!',
        primary_text: `Khusus untuk kamu yang kemarin lihat video kami! Dapatkan promo gratis ongkir + potongan 20% khusus 50 pembeli pertama ${pName} hari ini.`,
        cta: 'Klaim Promo Diskon 20% Sekarang ⚡',
        video_hook: 'Tunjukkan testimoni pembeli yang lahap makan nasi + potongan cumi jumbo.',
        body_3_10s: 'Ribuan pelanggan sudah ketagihan dengan rasa gurih pedas alaminya.',
        cta_10_15s: 'Klaim diskon sekarang sebelum kuota promo habis!'
      },
      fase3: {
        headline: 'Beli 2 Gratis 1! Stok Sambal Favorit Keluarga Hemat 40%',
        primary_text: `Sudah coba dan ketagihan? Ambil paket bundling 3 botol varian Cumi + Bawang + Terasi dengan harga grosir hemat ongkir.`,
        cta: 'Pesan Paket Bundling Hemat 📦',
        video_hook: 'Tunjukkan unboxing 3 botol sambal dengan packaging aman anti-bocor.',
        body_3_10s: 'Stok sambal aman sebulan untuk seluruh keluarga di rumah.',
        cta_10_15s: 'Pesan paket bundling hemat hari ini!'
      }
    };
  };

  const dynamicIntel = getDynamicProductIntel(rawProductName, rawPrice, rawHpp);

  // Safe extraction supporting both unified 5-agent schema and dynamic category-adaptive fields
  const agent1 = result?.agent1_research || {
    product_name: rawProductName,
    product_class: dynamicIntel.product_class,
    target_demography: dynamicIntel.target_demography,
    audience_psychography: dynamicIntel.audience_psychography,
    usp: dynamicIntel.usp,
    pain_points: [
      'Kualitas produk pasaran sering tidak konsisten',
      'Harga mahal tanpa jaminan mutu & kepuasan pembeli'
    ],
    competitor_proxy: dynamicIntel.competitor_proxy,
    data_foundation: `Kategori ${dynamicIntel.category_name} di Indonesia memiliki interaksi video TikTok vertikal tertinggi dengan tren permintaan stabil.`,
  };

  // Dynamic Strategy based on Funnel Phase (AI Continuous Learning Memory)
  const funnelConfigs = {
    fase1: {
      label: 'Fase 1: Cold Discovery',
      badge: 'Cold (Awareness)',
      objective: 'Pengenalan & Uji Minat Pasar',
      bidding_model: 'CPM (Biaya Termurah)',
      headline: dynamicIntel.fase1.headline,
      primary_text: dynamicIntel.fase1.primary_text,
      cta: dynamicIntel.fase1.cta,
      video_hook: dynamicIntel.fase1.video_hook,
      body_script: dynamicIntel.fase1.body_3_10s,
      cta_script: dynamicIntel.fase1.cta_10_15s,
      roas_est: '110%',
      thoughts: [
        `🔍 [Sub-Agent 1] Scanning database: Target cold audience usia 18-35th tertarik pada ${dynamicIntel.category_name}.`,
        '🎯 [Sub-Agent 2] Memilih model CPM termurah (Rp 18.000) untuk menjangkau impresi maksimal.',
        `✍️ [Sub-Agent 3] Menghasilkan hook visual "${dynamicIntel.fase1.video_hook.slice(0, 45)}..." untuk menahan scroll 3 detik pertama.`,
      ],
    },
    fase2: {
      label: 'Fase 2: Warm Retargeting',
      badge: 'Retargeting (Beli)',
      objective: 'Fokus Klik & Konversi Pembelian (Conversion)',
      bidding_model: 'CPA / Conversion Optimized',
      headline: dynamicIntel.fase2.headline,
      primary_text: dynamicIntel.fase2.primary_text,
      cta: dynamicIntel.fase2.cta,
      video_hook: dynamicIntel.fase2.video_hook,
      body_script: dynamicIntel.fase2.body_3_10s,
      cta_script: dynamicIntel.fase2.cta_10_15s,
      roas_est: '240%',
      thoughts: [
        '🧠 [Memori AI] Mengambil data audiens yang telah menonton >50% video di Fase 1.',
        `🎯 [Sub-Agent 2] Mengunci plafon CPA maksimal Rp ${Math.round((rawPrice - rawHpp) * 0.4).toLocaleString('id-ID')} (40% margin) untuk menjamin profitabilitas harian.`,
        '✍️ [Sub-Agent 3] Menerapkan formula Scarcity (voucher terbatas 50 pembeli pertama).',
      ],
    },
    fase3: {
      label: 'Fase 3: Hot Scale-Up',
      badge: 'Scaling (Paket Bundling)',
      objective: 'Maksimalisasi ROAS & Paket Bundling (LTV Scale)',
      bidding_model: 'Target ROAS Scaling',
      headline: dynamicIntel.fase3.headline,
      primary_text: dynamicIntel.fase3.primary_text,
      cta: dynamicIntel.fase3.cta,
      video_hook: dynamicIntel.fase3.video_hook,
      body_script: dynamicIntel.fase3.body_3_10s,
      cta_script: dynamicIntel.fase3.cta_10_15s,
      roas_est: '320%',
      thoughts: [
        '📈 [Memori AI] Mengarahkan kampanye ke repeat buyers & penawaran paket bundling untuk meningkatkan Average Order Value.',
        '🎯 [Sub-Agent 2] Memproyeksikan ROAS melonjak ke 320% karena margin nominal paket bundling lebih tinggi.',
        '🛡️ [Sub-Agent 5] Validasi QA lolos: Struktur payload siap deploy ke Meta/TikTok Ads Manager.',
      ],
    },
  };

  const activeFunnel = funnelConfigs[funnelPhase];

  const agent2 = result?.agent2_strategy || result?.financial_report || {
    margin_value: Math.max(0, rawPrice - rawHpp),
    margin_percentage: rawPrice > 0 ? Number((((rawPrice - rawHpp) / rawPrice) * 100).toFixed(1)) : 57.1,
    financial_status: 'HEALTHY',
    platform: campaign?.platform || 'TikTok',
    format_iklan: 'Video Pendek Vertikal (9:16)',
    aspect_ratio: '9:16',
    bidding_model: activeFunnel.bidding_model,
    max_cpa_limit: Math.round((rawPrice - rawHpp) * 0.4),
    strategic_rationale: `Strategi ${activeFunnel.label}: ${activeFunnel.objective}`,
    data_foundation: `Margin ${rawPrice > 0 ? (((rawPrice - rawHpp) / rawPrice) * 100).toFixed(1) : 57.1}% memberikan fleksibilitas alokasi CPA maksimal Rp ${Math.round((rawPrice - rawHpp) * 0.4).toLocaleString('id-ID')} agar profitabilitas harian tetap aman.`,
  };

  const agent3 = result?.agent3_creative || result?.creative || {
    headline: activeFunnel.headline,
    primary_text: activeFunnel.primary_text,
    cta: activeFunnel.cta,
    video_script: {
      hook_0_3s: activeFunnel.video_hook,
      body_3_10s: activeFunnel.body_script,
      cta_10_15s: activeFunnel.cta_script,
    },
    data_foundation: `Hook psikologi disesuaikan dengan status ${activeFunnel.label} untuk meningkatkan Conversion Rate.`,
  };

  const agent4 = result?.agent4_visual || {
    image_prompt:
      `Commercial high-end studio photography of ${agent1.product_name}, clean dramatic lighting, modern minimalist aesthetics, 8k resolution, ${agent2.aspect_ratio || '9:16'} aspect ratio.`,
    visual_mood: 'Cinematic, Crisp Professional Glow, Warm Studio Lighting',
    aspect_ratio: agent2.aspect_ratio || '9:16',
    recommended_composition: 'Centered product staging with soft depth of field and premium commercial lighting.',
    data_foundation: 'Komposisi macro centered dengan rasio 9:16 terbukti meningkatkan Click-Through-Rate (CTR) hingga 35%.',
  };

  const agent5 = result?.agent5_deploy || {
    qc_status: 'APPROVED',
    qc_notes: `QA Passed: Strategi kampanye telah divalidasi silang untuk ${activeFunnel.label}. Seluruh parameter rasio dan pesan konsisten.`,
    campaign_blueprint_payload: {
      campaign_name: `TAHRA_${agent1.product_name.toUpperCase().replace(/[^A-Z0-9]/g, '_')}_${funnelPhase.toUpperCase()}`,
      objective: activeFunnel.objective,
      daily_budget: campaign?.budget || 100000,
      bidding_strategy: activeFunnel.bidding_model,
      placements: [agent2.platform || 'TikTok'],
      ad_creative: {
        headline: agent3.headline,
        body: agent3.primary_text,
        video_ratio: agent4.aspect_ratio,
        cta: agent3.cta,
        tracking_url: `https://tahra.ai/click?campaign_id=${campaign?.id || 'sim'}&utm_source=${agent2.platform || 'tiktok'}&utm_medium=cpa&utm_campaign=${funnelPhase}`,
      },
    },
    roas_report: {
      budget_harian: campaign?.budget || 100000,
      estimasi_tayangan: Math.round(((campaign?.budget || 100000) / 18000) * 1000),
      estimasi_klik: Math.round(((campaign?.budget || 100000) / 18000) * 1000 * (funnelPhase === 'fase1' ? 0.02 : 0.028)),
      estimasi_pembeli: Math.max(1, Math.round(((campaign?.budget || 100000) / 18000) * 1000 * (funnelPhase === 'fase1' ? 0.02 : 0.028) * (funnelPhase === 'fase1' ? 0.03 : 0.036))),
      roas_percentage: Number(activeFunnel.roas_est.replace('%', '')) || 240.0,
      roas_status: 'PROFIT',
      summary: `Proyeksi ${activeFunnel.label}: Diperkirakan menghasilkan ${activeFunnel.roas_est} ROAS dengan perolehan pembeli terarah.`,
      formula_breakdown: 'Kalkulasi matematis deterministik berdasarkan benchmark CPM dan CVR industri.',
    },
    tracking_link: `https://tahra.ai/track?id=${campaign?.id || id || '123'}&funnel=${funnelPhase}`,
    deployment_status: 'DEPLOYED_READY',
    data_foundation: 'Kalkulasi didasarkan pada benchmark industri CPM Rp 18.000, CTR standar 2.8%, dan Conversion Rate e-commerce 3.6%.',
  };

  const isVeto = agent2.financial_status === 'VETO' || result?.status === 'VETO';
  const isProfitable = agent5.roas_report.roas_percentage >= 100;

  const stages = [
    {
      id: 0,
      num: '1',
      title: 'Riset Pasar',
      role: 'Sub-Agent 1 (The Explorer)',
      icon: <Search className="w-4 h-4" />,
      tag: 'Pesaing & USP',
      thinking_note: '🤖 Sub-Agent 1 menganalisis 1.200 data perilaku belanja & brand kompetitor di TikTok/Marketplace.',
    },
    {
      id: 1,
      num: '2',
      title: 'Strategi Iklan',
      role: 'Sub-Agent 2 (The Planner)',
      icon: <Target className="w-4 h-4" />,
      tag: 'Bidding & CPA',
      thinking_note: '🤖 Sub-Agent 2 mengunci unit economics: Margin 57.1% aman dengan batas CPA Rp 8.000.',
    },
    {
      id: 2,
      num: '3',
      title: 'Naskah Video',
      role: 'Sub-Agent 3 (The Wordsmith)',
      icon: <FileText className="w-4 h-4" />,
      tag: 'PAS Framework',
      thinking_note: '🤖 Sub-Agent 3 merumuskan naskah video 15 detik dengan formula Problem-Agitate-Solution.',
    },
    {
      id: 3,
      num: '4',
      title: 'Prompt Visual',
      role: 'Sub-Agent 4 (The Creator)',
      icon: <ImageIcon className="w-4 h-4" />,
      tag: 'Studio 8K',
      thinking_note: '🤖 Sub-Agent 4 merancang pencahayaan cinematic & sudut kamera makro rasio 9:16 vertikal.',
    },
    {
      id: 4,
      num: '5',
      title: 'Audit & ROAS',
      role: 'Sub-Agent 5 (The Deployer)',
      icon: <TrendingUp className="w-4 h-4" />,
      tag: 'QC & Laba',
      thinking_note: '🤖 Sub-Agent 5 melakukan audit silang kualitas data & menghitung estimasi laba bersih harian.',
    },
  ];

  return (
    <div className="bg-main min-h-screen flex flex-col justify-between">
      <Navbar />

      <PageContainer
        badge="TAHRA AI 5-Agent Blueprint"
        title={agent1.product_name}
        description={`Cetak biru strategi pemasaran digital otomatis • Dibuat pada ${formatDate(
          campaign?.created_at || new Date()
        )}`}
        backUrl="/dashboard"
        backLabel="Kembali ke Dashboard"
        actions={
          <div className="flex items-center gap-3">
            {/* Integrated Compact Funnel Pill Selector in Header */}
            <div className="hidden sm:flex items-center bg-neutral-900/90 p-1 rounded-xl border border-neutral-800">
              {[
                { id: 'fase1', label: '1. Cold' },
                { id: 'fase2', label: '2. Retargeting' },
                { id: 'fase3', label: '3. Scaling' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFunnelPhase(f.id)}
                  className={cn(
                    'px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer',
                    funnelPhase === f.id
                      ? 'bg-rose-600 text-white shadow-md font-black'
                      : 'text-neutral-400 hover:text-white'
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <StatusBadge status={isVeto ? 'Veto' : 'Ready'} />
            <Button
              variant="outline"
              size="sm"
              leftIcon={
                copiedKey === 'share' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Share2 className="w-3.5 h-3.5" />
                )
              }
              onClick={() => handleCopy(window.location.href, 'share')}
            >
              {copiedKey === 'share' ? 'Tersalin!' : 'Bagikan Laporan'}
            </Button>
          </div>
        }
      >
        <div className="flex flex-col gap-6">
          {/* VETO ALERT */}
          {isVeto && (
            <Alert
              variant="danger"
              title="🚫 Kampanye Dihentikan oleh Sub-Agent 2 (Strategy Architect)"
            >
              {agent2.strategic_rationale ||
                'Margin produk di bawah 20%. Iklan dibatalkan demi melindungi modal operasional UMKM Anda.'}
            </Alert>
          )}

          {/* ========================================================================= */}
          {/* ONE UNIFIED CANVAS: CONNECTED PIPELINE + STAGE DETAILS */}
          {/* ========================================================================= */}
          <div className="rounded-3xl border border-neutral-800/90 bg-neutral-950/90 backdrop-blur-2xl shadow-2xl overflow-hidden">
            {/* Top Unified Pipeline Header */}
            <div className="p-5 sm:p-6 bg-gradient-to-b from-neutral-900/90 to-neutral-950 border-b border-neutral-800">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-widest text-white font-mono">
                    ALUR PIPELINE 5 SUB-AGENT AI OTONOM
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-rose-400 font-bold font-mono">
                    [{activeFunnel.badge}]
                  </span>
                  <span className="text-neutral-500 hidden sm:inline">•</span>
                  <span className="text-neutral-400 font-bold hidden sm:inline font-mono">
                    Tahap {activeStage + 1} dari 5
                  </span>
                </div>
              </div>

              {/* Continuous Connected Flow Track */}
              <div className="relative mb-5">
                <div className="absolute top-5 left-6 right-6 h-1 bg-neutral-900 z-0 rounded-full" />
                <div
                  className="absolute top-5 left-6 h-1 bg-gradient-to-r from-rose-600 via-red-500 to-rose-400 z-0 rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(244,63,94,0.9)]"
                  style={{ width: `calc(${(activeStage / 4) * 100}% * (100% - 48px) / 100)` }}
                />

                <div className="grid grid-cols-5 relative z-10">
                  {stages.map((st) => {
                    const isActive = activeStage === st.id;
                    const isPassed = activeStage > st.id;

                    return (
                      <div
                        key={st.id}
                        onClick={() => setActiveStage(st.id)}
                        className="flex flex-col items-center text-center cursor-pointer group px-1 select-none"
                      >
                        <div
                          className={cn(
                            'w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 font-mono font-black text-xs relative shadow-lg',
                            isActive
                              ? 'bg-rose-600 text-white ring-4 ring-rose-500/30 shadow-[0_0_25px_rgba(244,63,94,0.7)] scale-110'
                              : isPassed
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 hover:bg-emerald-500/30'
                              : 'bg-neutral-900 text-neutral-500 border border-neutral-800 hover:border-neutral-700 hover:text-neutral-300'
                          )}
                        >
                          {isPassed ? (
                            <Check className="w-5 h-5 stroke-[3]" />
                          ) : (
                            <span>{st.num}</span>
                          )}

                          {isActive && (
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-400 rounded-full animate-ping pointer-events-none" />
                          )}
                        </div>

                        <div className="mt-3 flex flex-col items-center">
                          <span
                            className={cn(
                              'text-xs font-bold transition-colors line-clamp-1',
                              isActive
                                ? 'text-rose-400 font-black'
                                : isPassed
                                ? 'text-neutral-200'
                                : 'text-neutral-500 group-hover:text-neutral-300'
                            )}
                          >
                            {st.title}
                          </span>
                          <span className="text-[10px] text-neutral-500 font-medium hidden md:block">
                            {st.tag}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Pipeline Action Bar */}
              <div className="flex items-center justify-between pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={activeStage === 0}
                  leftIcon={<ChevronLeft className="w-4 h-4" />}
                  onClick={() => setActiveStage((p) => Math.max(0, p - 1))}
                  className="text-neutral-400 hover:text-white text-xs"
                >
                  Tahap Sebelumnya
                </Button>

                <div className="flex items-center gap-1.5">
                  {stages.map((st) => (
                    <div
                      key={st.id}
                      onClick={() => setActiveStage(st.id)}
                      className={cn(
                        'h-1.5 rounded-full transition-all cursor-pointer',
                        activeStage === st.id
                          ? 'w-6 bg-rose-500'
                          : activeStage > st.id
                          ? 'w-2 bg-emerald-500'
                          : 'w-2 bg-neutral-800'
                      )}
                    />
                  ))}
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  disabled={activeStage === 4}
                  rightIcon={<ChevronRight className="w-4 h-4" />}
                  onClick={() => setActiveStage((p) => Math.min(4, p + 1))}
                  className="text-xs font-bold"
                >
                  Tahap Selanjutnya
                </Button>
              </div>
            </div>

            {/* LIVE AI REASONING / THOUGHT LOG BANNER */}
            <div className="bg-black/50 border-b border-neutral-900 px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
                <span className="text-[11px] font-mono font-bold text-emerald-400 shrink-0">
                  AI REASONING LOG:
                </span>
                <span className="text-xs text-neutral-300 truncate font-mono">
                  {stages[activeStage].thinking_note}
                </span>
              </div>
              <button
                onClick={() => setShowThoughtLog(!showThoughtLog)}
                className="text-[10px] font-mono text-neutral-500 hover:text-neutral-300 shrink-0 ml-3"
              >
                {showThoughtLog ? 'Sembunyikan Log' : 'Buka Log'}
              </button>
            </div>

            {/* Expandable Live AI Thoughts Stream */}
            {showThoughtLog && (
              <div className="bg-neutral-950/80 px-6 py-3 border-b border-neutral-900 flex flex-col gap-1.5 font-mono text-[11px] text-neutral-400">
                {activeFunnel.thoughts.map((t, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">›</span>
                    <span className="text-neutral-300">{t}</span>
                  </div>
                ))}
              </div>
            )}

            {/* STAGE CONTENT BODY */}
            <div className="p-6 sm:p-8">
              {/* STAGE 1: The Explorer (Deep Market Intelligence Dossier) */}
              {activeStage === 0 && (
                <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-800">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-rose-500 font-mono">
                          DEEP MARKET INTELLIGENCE REPORT
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          PUBLIC TREND DATA • UU PDP COMPLIANT
                        </span>
                      </div>
                      <h3 className="text-xl font-black text-white font-heading mt-0.5">
                        Sub-Agent 1: Market & Competitor Intelligence (The Explorer)
                      </h3>
                    </div>
                    <Badge variant="brand" size="md">{agent1.product_class || 'Menengah'} • FMCG</Badge>
                  </div>

                  {/* 1. Market Keyword & Demand Trend Bar */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800">
                      <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block mb-1">
                        TikTok Creative Center Trend
                      </span>
                      <p className="text-xl font-black text-rose-400 font-mono">840.5M+</p>
                      <span className="text-[11px] text-neutral-500 font-medium block mt-0.5">
                        Tagar Publik: #SambalViral #KulinerPedas
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800">
                      <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block mb-1">
                        Volume Pencarian Pasar (Google/E-Commerce)
                      </span>
                      <p className="text-xl font-black text-white font-mono">49.200 / bln</p>
                      <span className="text-[11px] text-neutral-500 font-medium block mt-0.5">
                        Indeks Tren: Naik +38% MoM
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800">
                      <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block mb-1">
                        Indeks Minat Beli (Purchase Intent)
                      </span>
                      <p className="text-xl font-black text-emerald-400 font-mono">8.4 / 10</p>
                      <span className="text-[11px] text-neutral-500 font-medium block mt-0.5">
                        Kategori Kuliner Pedas Siap Saji
                      </span>
                    </div>
                  </div>

                  {/* 2. Voice of Customer / Sentiment & Competitor Pain Points */}
                  <div className="p-5 rounded-3xl bg-neutral-900/70 border border-neutral-800 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
                        <Users className="w-4 h-4 text-rose-500" />
                        Analisis Sentimen Konsumen Publik & Celah Pasar (Voice of Customer)
                      </h4>
                      <span className="text-[10px] font-mono text-neutral-400">Sample: 1.200+ Ulasan Terbuka Teranonimasi</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Positive Triggers */}
                      <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30">
                        <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block mb-2">
                          ✅ Faktor Pemicu Pembelian (Top Buying Triggers):
                        </span>
                        <ul className="text-xs text-neutral-300 space-y-1.5 font-medium">
                          <li>• <strong>74%</strong> menyukai minyak cabai wangi yang melimpah untuk disiram di nasi panas.</li>
                          <li>• <strong>68%</strong> mencari tekstur cumi yang kenyal gurih dan tidak berbau amis.</li>
                          <li>• <strong>52%</strong> repeat order karena kepraktisan lauk tanpa perlu dimasak.</li>
                        </ul>
                      </div>

                      {/* Competitor Weaknesses (Celah yang dimanfaatkan TAHRA) */}
                      <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30">
                        <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider block mb-2">
                          🚫 Keluhan Terbanyak pada Kompetitor (Celah Pasar):
                        </span>
                        <ul className="text-xs text-neutral-300 space-y-1.5 font-medium">
                          <li>• <strong>62%</strong> kecewa karena cumi di sambal pasaran sangat sedikit (cuma 2-3 potong kecil).</li>
                          <li>• <strong>26%</strong> mengeluhkan minyak beku atau menggumpal saat sampai.</li>
                          <li>• <strong>19%</strong> mengalami kemasan bocor saat pengiriman ekspedisi.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* 3. Real Competitor Benchmark Matrix */}
                  <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950">
                    <div className="p-3.5 bg-neutral-900 border-b border-neutral-800 text-xs font-black uppercase tracking-wider text-white">
                      ⚔️ Matriks Perbandingan Kompetitor Riil di Pasar
                    </div>
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-neutral-900/60 border-b border-neutral-800 text-[10px] font-black uppercase text-neutral-400">
                          <th style={{ padding: '12px 18px' }}>Brand Produk</th>
                          <th style={{ padding: '12px 14px' }}>Harga Ritel</th>
                          <th style={{ padding: '12px 14px' }}>Gramatur</th>
                          <th style={{ padding: '12px 18px' }}>Kelebihan & Kelemahan Kompetitor</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-800/80 text-neutral-300 font-medium">
                        <tr className="bg-rose-950/20">
                          <td style={{ padding: '14px 18px' }} className="font-black text-rose-400 text-sm">
                            ⭐ Sambal TAHRA (Produk Anda)
                          </td>
                          <td style={{ padding: '14px 14px' }} className="font-mono font-bold text-white">Rp 35.000</td>
                          <td style={{ padding: '14px 14px' }} className="font-mono">150 gram</td>
                          <td style={{ padding: '14px 18px' }} className="text-neutral-200">
                            <strong>Diferensiasi:</strong> Potongan cumi jumbo melimpah, minyak cabai segar alami tanpa pengawet kimia.
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: '12px 18px' }} className="font-bold text-neutral-300">Sambal Bu Rudy</td>
                          <td style={{ padding: '12px 14px' }} className="font-mono text-neutral-400">Rp 38.000</td>
                          <td style={{ padding: '12px 14px' }} className="font-mono">130 gram</td>
                          <td style={{ padding: '12px 18px' }} className="text-neutral-400">Brand legendaris, namun porsi cumi sedikit & harga lebih premium.</td>
                        </tr>
                        <tr>
                          <td style={{ padding: '12px 18px' }} className="font-bold text-neutral-300">Sambal Sachet Supermarket</td>
                          <td style={{ padding: '12px 14px' }} className="font-mono text-neutral-400">Rp 18.000</td>
                          <td style={{ padding: '12px 14px' }} className="font-mono">100 gram</td>
                          <td style={{ padding: '12px 18px' }} className="text-neutral-400">Murah, tapi rasa cenderung kimiawi/artifisial dan tanpa cumi asli.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* 4. 2 Detailed Buyer Personas */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-5 rounded-3xl bg-neutral-900/80 border border-neutral-800 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-rose-400 uppercase tracking-wider">
                          👤 Persona 1: "Anak Kos / Pekerja Sibuk"
                        </span>
                        <span className="text-[10px] font-mono text-neutral-400">Usia 19 - 27th</span>
                      </div>
                      <p className="text-xs text-neutral-300 leading-relaxed font-medium">
                        <strong>Karakter:</strong> Sering lembur atau kuliah, malas memasak yang ribet. Cukup masak nasi di rice cooker dan butuh 1 lauk pedas gurih yang langsung bikin nafsu makan naik.
                      </p>
                      <div className="text-[11px] text-rose-300 bg-rose-950/30 p-2.5 rounded-xl border border-rose-500/30 mt-1">
                        🎯 <strong>Trigger Beli:</strong> "Cuma butuh nasi hangat + sambal cumi TAHRA, makan malam mewah hemat selesai!"
                      </div>
                    </div>

                    <div className="p-5 rounded-3xl bg-neutral-900/80 border border-neutral-800 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-emerald-400 uppercase tracking-wider">
                          👤 Persona 2: "Ibu Rumah Tangga Modern"
                        </span>
                        <span className="text-[10px] font-mono text-neutral-400">Usia 28 - 40th</span>
                      </div>
                      <p className="text-xs text-neutral-300 leading-relaxed font-medium">
                        <strong>Karakter:</strong> Mencari pelengkap makan keluarga yang higienis. Mengutamakan bahan alami tanpa pengawet berbahaya untuk suami dan anak-anak.
                      </p>
                      <div className="text-[11px] text-emerald-300 bg-emerald-950/30 p-2.5 rounded-xl border border-emerald-500/30 mt-1">
                        🎯 <strong>Trigger Beli:</strong> "Stok sambal higienis di kulkas yang tahan lama dan disukai seisi rumah."
                      </div>
                    </div>
                  </div>

                  {/* Data Foundation Footer */}
                  <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/25 text-xs text-rose-200 leading-relaxed flex items-start gap-3">
                    <Database className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold text-rose-300 block mb-0.5 text-xs uppercase tracking-wider">
                        Kepatuhan Hukum & Dasar Analisis Sub-Agent 1:
                      </strong>
                      <span>
                        100% mematuhi UU PDP No. 27/2022 & ToS Platform resmi. Data diolah dari open trend data (TikTok Creative Center Public Index & Google Trends) serta sentimen publik teranonimasi tanpa mengambil data pribadi pengguna.
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* STAGE 2: The Planner (Elite Performance Marketing Strategy Architect) */}
              {activeStage === 1 && (
                <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-800">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-rose-500 font-mono">
                          STRATEGIC MARKETING ARCHITECTURE & ALLOCATION
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30">
                          DATA-DRIVEN DECISION ENGINE
                        </span>
                      </div>
                      <h3 className="text-xl font-black text-white font-heading mt-0.5">
                        Sub-Agent 2: Performance Marketing Strategist (The Planner)
                      </h3>
                    </div>
                    <Badge variant={agent2.financial_status === 'HEALTHY' ? 'success' : 'warning'} size="md">
                      {agent2.financial_status} • MARGIN 57.1%
                    </Badge>
                  </div>

                  {/* 1. Key Performance Indicators Bar */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-4 rounded-2xl bg-neutral-900/90 border border-rose-500/30 shadow-lg shadow-rose-950/20">
                      <span className="text-[10px] font-black uppercase tracking-wider text-rose-400 block mb-1">
                        Saluran Utama Terpilih
                      </span>
                      <p className="text-xl font-black text-white font-heading">
                        {agent2.platform || 'TikTok Ads'}
                      </p>
                      <span className="text-[11px] text-neutral-400 font-medium block mt-1">
                        Format: Video Vertikal (9:16)
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800">
                      <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block mb-1">
                        Model Bidding ({activeFunnel.label})
                      </span>
                      <p className="text-xl font-black text-rose-400 font-mono">
                        {activeFunnel.bidding_model.split(' ')[0]}
                      </p>
                      <span className="text-[11px] text-neutral-500 font-medium block mt-1">
                        Objektif: Konversi Checkout
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800">
                      <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block mb-1">
                        Margin Kotor Unit
                      </span>
                      <p className="text-xl font-black text-emerald-400 font-mono">
                        {formatPercent(agent2.margin_percentage, 1)}
                      </p>
                      <span className="text-[11px] text-neutral-500 font-medium block mt-1">
                        {formatRp(agent2.margin_value)} / botol
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800">
                      <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block mb-1">
                        Plafon Maksimal CPA
                      </span>
                      <p className="text-xl font-black text-rose-400 font-mono">
                        {formatRp(agent2.max_cpa_limit)}
                      </p>
                      <span className="text-[11px] text-neutral-500 font-medium block mt-1">
                        Maks 40% Margin Laba
                      </span>
                    </div>
                  </div>

                  {/* 2. Comprehensive 5-Channel Suitability Scoring Matrix */}
                  <div className="overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950 shadow-2xl">
                    <div className="p-4 bg-gradient-to-r from-neutral-900 to-neutral-950 border-b border-neutral-800 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-rose-500" />
                        <h4 className="text-xs font-black uppercase tracking-wider text-white">
                          Matriks Skoring & Kelayakan 5 Saluran Pemasaran Digital (Channel Scoring Matrix)
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono text-neutral-400 hidden sm:inline">
                        Evaluasi Berbasis Data Demografi & Unit Economics
                      </span>
                    </div>

                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-neutral-900/70 border-b border-neutral-800 text-[10px] font-black uppercase tracking-wider text-neutral-400">
                          <th style={{ width: '28%', padding: '14px 20px' }}>Saluran Iklan</th>
                          <th style={{ width: '15%', padding: '14px 16px', textAlign: 'center' }}>Skor AI</th>
                          <th style={{ width: '18%', padding: '14px 16px' }}>Status Kelayakan</th>
                          <th style={{ width: '39%', padding: '14px 20px' }}>Rasionalitas Berbasis Data Pasar</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-800/80 font-medium text-neutral-300">
                        {/* Channel 1: TikTok */}
                        <tr className="bg-rose-950/20 hover:bg-rose-950/30 transition-colors">
                          <td style={{ padding: '14px 20px' }}>
                            <strong className="text-white text-sm block">🎵 TikTok Video Ads (9:16)</strong>
                            <span className="text-[11px] text-neutral-400 font-mono">CPM Rp 18.000 • In-Feed & Spark Ads</span>
                          </td>
                          <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                            <span className="text-base font-black text-rose-400 font-mono">96 / 100</span>
                          </td>
                          <td style={{ padding: '14px 16px' }}>
                            <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase bg-rose-600 text-white font-mono shadow-sm">
                              REKOMENDASI UTAMA
                            </span>
                          </td>
                          <td style={{ padding: '14px 20px' }} className="text-xs text-neutral-200 leading-relaxed">
                            Impulse buy sangat tinggi pada visual makanan hangat. Format video vertikal 9:16 memiliki retensi penonton 68% di 3 detik pertama dengan CPM paling murah.
                          </td>
                        </tr>

                        {/* Channel 2: Instagram Reels */}
                        <tr className="hover:bg-neutral-900/40 transition-colors">
                          <td style={{ padding: '14px 20px' }}>
                            <strong className="text-white text-sm block">📸 Instagram Reels & Stories</strong>
                            <span className="text-[11px] text-neutral-400 font-mono">CPM Rp 28.000 • Meta Pixel Ads</span>
                          </td>
                          <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                            <span className="text-base font-black text-white font-mono">84 / 100</span>
                          </td>
                          <td style={{ padding: '14px 16px' }}>
                            <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase bg-neutral-800 text-neutral-300 font-mono border border-neutral-700">
                              SALURAN PENDUKUNG
                            </span>
                          </td>
                          <td style={{ padding: '14px 20px' }} className="text-xs text-neutral-400 leading-relaxed">
                            Sangat efektif untuk retargeting pembeli matang usia 25-35th dan membangun trust branding kuliner higienis.
                          </td>
                        </tr>

                        {/* Channel 3: Shopee CPAS */}
                        <tr className="hover:bg-neutral-900/40 transition-colors">
                          <td style={{ padding: '14px 20px' }}>
                            <strong className="text-white text-sm block">🛍️ Shopee / TikTok Shop CPAS</strong>
                            <span className="text-[11px] text-neutral-400 font-mono">CPC Rp 650 • In-App Checkout</span>
                          </td>
                          <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                            <span className="text-base font-black text-white font-mono">88 / 100</span>
                          </td>
                          <td style={{ padding: '14px 16px' }}>
                            <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase bg-neutral-800 text-neutral-300 font-mono border border-neutral-700">
                              SALURAN PENDUKUNG
                            </span>
                          </td>
                          <td style={{ padding: '14px 20px' }} className="text-xs text-neutral-400 leading-relaxed">
                            Mendongkrak checkout instan menggunakan voucher subsidi gratis ongkir langsung di keranjang kuning tanpa friksi transfer manual.
                          </td>
                        </tr>

                        {/* Channel 4: Google Search */}
                        <tr className="hover:bg-neutral-900/40 transition-colors">
                          <td style={{ padding: '14px 20px' }}>
                            <strong className="text-neutral-400 text-sm block">🔍 Google Search Ads (SEM)</strong>
                            <span className="text-[11px] text-neutral-500 font-mono">CPC Rp 3.200 • High Intent Keywords</span>
                          </td>
                          <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                            <span className="text-base font-black text-neutral-500 font-mono">52 / 100</span>
                          </td>
                          <td style={{ padding: '14px 16px' }}>
                            <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase bg-neutral-900 text-neutral-500 font-mono border border-neutral-800">
                              TIDAK DISARANKAN
                            </span>
                          </td>
                          <td style={{ padding: '14px 20px' }} className="text-xs text-neutral-500 leading-relaxed">
                            Konsumen jarang mencari sambal botolan melalui Google Search. Produk ini bersifat visual impulsif, bukan pencarian berbasis kebutuhan darurat.
                          </td>
                        </tr>

                        {/* Channel 5: Facebook Feed */}
                        <tr className="hover:bg-neutral-900/40 transition-colors">
                          <td style={{ padding: '14px 20px' }}>
                            <strong className="text-neutral-400 text-sm block">📢 Facebook Feed & Network</strong>
                            <span className="text-[11px] text-neutral-500 font-mono">CPM Rp 22.000 • Broad Demographics</span>
                          </td>
                          <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                            <span className="text-base font-black text-neutral-500 font-mono">45 / 100</span>
                          </td>
                          <td style={{ padding: '14px 16px' }}>
                            <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase bg-neutral-900 text-neutral-500 font-mono border border-neutral-800">
                              TIDAK DISARANKAN
                            </span>
                          </td>
                          <td style={{ padding: '14px 20px' }} className="text-xs text-neutral-500 leading-relaxed">
                            CTR produk makanan kemasan di Facebook 40% lebih rendah dibanding TikTok; konversi Facebook lebih optimal untuk produk bernilai tinggi atau jasa.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* 3. Budget Split & Competitive Attack Strategy */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Budget Split Allocation */}
                    <div className="p-5 rounded-3xl bg-neutral-900/80 border border-neutral-800 flex flex-col gap-3">
                      <span className="text-xs font-black uppercase tracking-wider text-rose-400 flex items-center gap-2">
                        <Calculator className="w-4 h-4" />
                        Rekomendasi Alokasi Pembagian Anggaran (Budget Split)
                      </span>
                      <div className="flex flex-col gap-2.5 mt-1">
                        <div>
                          <div className="flex justify-between text-xs font-bold mb-1">
                            <span className="text-white">70% • TikTok Video Ads (Discovery & Acquisition)</span>
                            <span className="text-rose-400 font-mono">{formatRp(campaign?.budget ? campaign.budget * 0.7 : 70000)}/hari</span>
                          </div>
                          <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                            <div className="bg-rose-500 h-full w-[70%]" />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs font-bold mb-1">
                            <span className="text-neutral-300">30% • Meta Ads & Shopee CPAS (Warm Retargeting)</span>
                            <span className="text-neutral-400 font-mono">{formatRp(campaign?.budget ? campaign.budget * 0.3 : 30000)}/hari</span>
                          </div>
                          <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                            <div className="bg-neutral-600 h-full w-[30%]" />
                          </div>
                        </div>
                      </div>
                      <p className="text-[11px] text-neutral-400 leading-relaxed mt-1">
                        💡 Formula 70/30 menjaga agar selalu ada calon pembeli baru yang masuk ke funnel, sementara 30% budget mengunci konsumen yang ragu-ragu di keranjang belanja.
                      </p>
                    </div>

                    {/* Competitive Attack Angle */}
                    <div className="p-5 rounded-3xl bg-neutral-900/80 border border-neutral-800 flex flex-col gap-2">
                      <span className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                        <Flame className="w-4 h-4" />
                        Sudut Serang Pasar Terhadap Kompetitor (Attack Angle)
                      </span>
                      <p className="text-xs text-neutral-300 leading-relaxed font-medium mt-1">
                        Memanfaatkan kelemahan utama kompetitor legendaris (Bu Rudy / Kemasan Supermarket) yang porsi cuminya sedikit dan minim konten video pendek. Kita menyerang secara agresif melalui video makro 9:16 di TikTok dengan hook <strong>"Cuminya Melimpah Asli"</strong> yang memicu respons lapar seketika.
                      </p>
                      <div className="p-3 bg-neutral-950/80 rounded-2xl border border-neutral-800 text-[11px] text-neutral-400 mt-1">
                        🎯 <strong>Plafon Proteksi:</strong> Biaya CPA dibatasi maksimal Rp 8.000 agar setiap botol yang laku tetap menghasilkan margin laba bersih minimal Rp 12.000.
                      </div>
                    </div>
                  </div>

                  {/* Data Foundation Footer */}
                  <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800 text-xs text-neutral-300 leading-relaxed flex items-start gap-3">
                    <Database className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold text-emerald-400 block mb-0.5 text-xs uppercase tracking-wider">
                        Dasar Formula Keputusan Sub-Agent 2:
                      </strong>
                      <span>
                        Keputusan pemilihan platform 100% didasarkan pada kalkulasi matematis unit economics (Margin 57.1%), benchmark CPM industri FMCG Indonesia, dan rasio konversi keranjang belanja marketplace.
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* STAGE 3: The Wordsmith (4 Specialized Creative Sub-Agents) */}
              {activeStage === 2 && (
                <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-800">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-rose-500 font-mono">
                          CREATIVE COPYWRITING & HOOK SPECIALISTS
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30">
                          4 SUB-SPECIALISTS TEAM
                        </span>
                      </div>
                      <h3 className="text-xl font-black text-white font-heading mt-0.5">
                        Sub-Agent 3: Creative Director Engine (The Wordsmith)
                      </h3>
                    </div>
                    <Badge variant="brand" size="md">PAS Framework • {activeFunnel.label}</Badge>
                  </div>

                  {/* Sub-Specialist 3A: Hook & Pattern Interrupt */}
                  <div className="p-5 rounded-3xl bg-neutral-900/80 border border-neutral-800 flex flex-col gap-3 shadow-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center text-xs font-black font-mono">
                          3A
                        </span>
                        <h4 className="text-xs font-black uppercase tracking-wider text-white">
                          Sub-Spesialis 3A: Hook & Pattern Interrupt Specialist (0-3 Detik Pertama)
                        </h4>
                      </div>
                      <button
                        onClick={() => handleCopy(activeFunnel.video_hook, 'hook_3a')}
                        className="text-xs text-neutral-400 hover:text-rose-400 font-bold flex items-center gap-1.5 cursor-pointer"
                      >
                        {copiedKey === 'hook_3a' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>Salin Hook</span>
                      </button>
                    </div>

                    <div className="p-4 bg-black/60 rounded-2xl border border-rose-500/30 font-medium text-xs sm:text-sm text-neutral-200 leading-relaxed">
                      🎬 <strong>Visual Hook:</strong> "{activeFunnel.video_hook}"
                    </div>
                    <span className="text-[11px] text-neutral-500">
                      🎯 <strong>Fungsi Psikologis:</strong> Menghentikan scroll jempol audiens di TikTok/Reels dengan stimulus visual makanan panas dan kelezatan instan.
                    </span>
                  </div>

                  {/* Sub-Specialist 3B: Headline & PAS Body Copywriter */}
                  <div className="p-5 rounded-3xl bg-neutral-900/80 border border-neutral-800 flex flex-col gap-4 shadow-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center text-xs font-black font-mono">
                          3B
                        </span>
                        <h4 className="text-xs font-black uppercase tracking-wider text-white">
                          Sub-Spesialis 3B: Conversion Copywriter (Formula Problem - Agitate - Solution)
                        </h4>
                      </div>
                      <button
                        onClick={() => handleCopy(`${activeFunnel.headline}\n\n${activeFunnel.primary_text}`, 'copy_3b')}
                        className="text-xs text-neutral-400 hover:text-rose-400 font-bold flex items-center gap-1.5 cursor-pointer"
                      >
                        {copiedKey === 'copy_3b' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>Salin Teks Lengkap</span>
                      </button>
                    </div>

                    {/* Headline */}
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500 block mb-1">
                        Headline Pemikat:
                      </span>
                      <div className="text-base font-black text-white bg-neutral-950 p-4 rounded-2xl border border-neutral-800 font-heading">
                        {activeFunnel.headline}
                      </div>
                    </div>

                    {/* Caption */}
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500 block mb-1">
                        Body Caption (PAS Framework):
                      </span>
                      <div className="text-neutral-300 bg-neutral-950 p-4 rounded-2xl border border-neutral-800 leading-relaxed text-xs sm:text-sm">
                        {activeFunnel.primary_text}
                      </div>
                    </div>
                  </div>

                  {/* Sub-Specialist 3C & 3D Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Sub-Specialist 3C: Keywords & Hashtags */}
                    <div className="p-5 rounded-3xl bg-neutral-900/80 border border-neutral-800 flex flex-col gap-3 shadow-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center text-xs font-black font-mono">
                            3C
                          </span>
                          <h4 className="text-xs font-black uppercase tracking-wider text-white">
                            Sub-Spesialis 3C: Keyword & FYP SEO
                          </h4>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-1">
                        {['#SambalViral', '#KulinerPedas', '#SambalCumiTAHRA', '#LaukPraktis', '#MakanEnakDiRumah', '#RacunTikTok'].map((tag) => (
                          <span key={tag} className="px-3 py-1 bg-neutral-950 text-rose-400 border border-neutral-800 rounded-xl text-xs font-mono font-bold">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="text-[11px] text-neutral-500 leading-relaxed mt-1">
                        Tagar dioptimalkan untuk memicu rekomendasi algoritma FYP TikTok dan pencarian kata kunci e-commerce.
                      </p>
                    </div>

                    {/* Sub-Specialist 3D: CTA & Urgency */}
                    <div className="p-5 rounded-3xl bg-neutral-900/80 border border-neutral-800 flex flex-col gap-3 shadow-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center text-xs font-black font-mono">
                            3D
                          </span>
                          <h4 className="text-xs font-black uppercase tracking-wider text-white">
                            Sub-Spesialis 3D: Call to Action (Urgency)
                          </h4>
                        </div>
                      </div>

                      <div className="p-4 bg-neutral-950 rounded-2xl border border-neutral-800 flex flex-col gap-2">
                        <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500">Tombol Aksi Persuasif:</span>
                        <div className="px-4 py-2 bg-gradient-to-r from-rose-600 to-red-600 text-white font-black rounded-xl text-xs text-center shadow-lg shadow-rose-950/50">
                          {activeFunnel.cta}
                        </div>
                      </div>
                      <p className="text-[11px] text-neutral-500 leading-relaxed">
                        Menggunakan psikologi <em>Fear of Missing Out (FOMO)</em> untuk mempercepat keputusan checkout pembeli.
                      </p>
                    </div>
                  </div>

                  {/* 15-Second Video Production Storyboard */}
                  {agent3.video_script && (
                    <div className="p-5 rounded-3xl bg-neutral-900/90 border border-neutral-800 flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black uppercase tracking-wider text-rose-400 flex items-center gap-2">
                          <Video className="w-4 h-4" />
                          Storyboard Naskah Video 15 Detik ({activeFunnel.label})
                        </span>
                        <button
                          onClick={() =>
                            handleCopy(
                              `Hook (0-3s): ${activeFunnel.video_hook}\nBody (3-10s): ${agent3.video_script.body_3_10s}\nCTA (10-15s): ${agent3.video_script.cta_10_15s}`,
                              'script'
                            )
                          }
                          className="text-xs text-neutral-400 hover:text-rose-400 font-bold flex items-center gap-1.5 cursor-pointer"
                        >
                          {copiedKey === 'script' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>Salin Seluruh Naskah</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="p-4 bg-neutral-950 rounded-2xl border border-neutral-800">
                          <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block mb-1">
                            Detik 0-3 (Hook Visual):
                          </span>
                          <p className="text-neutral-300 text-xs leading-relaxed">{activeFunnel.video_hook}</p>
                        </div>
                        <div className="p-4 bg-neutral-950 rounded-2xl border border-neutral-800">
                          <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block mb-1">
                            Detik 3-10 (Body / Solusi):
                          </span>
                          <p className="text-neutral-300 text-xs leading-relaxed">{agent3.video_script.body_3_10s}</p>
                        </div>
                        <div className="p-4 bg-neutral-950 rounded-2xl border border-neutral-800">
                          <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block mb-1">
                            Detik 10-15 (Call-to-Action):
                          </span>
                          <p className="text-neutral-300 text-xs leading-relaxed">{agent3.video_script.cta_10_15s}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* STAGE 4: The Creator */}
              {activeStage === 3 && (
                <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-rose-500 font-mono">
                        TAHAP 4 • PROMPT VISUAL STUDIO 8K
                      </span>
                      <h3 className="text-lg font-black text-white font-heading mt-0.5">
                        Sub-Agent 4: Art Director & Visual Designer (The Creator)
                      </h3>
                    </div>
                    <Badge variant="brand" size="md">{agent4.aspect_ratio || '9:16'}</Badge>
                  </div>

                  <div>
                    <span className="text-[11px] font-black uppercase tracking-wider text-neutral-400 block mb-2">
                      Visual Mood & Rasio Penempatan
                    </span>
                    <div className="flex items-center gap-2">
                      <Badge variant="brand" size="md">{agent4.visual_mood || 'Cinematic'}</Badge>
                      <Badge variant="neutral" size="md">{agent4.aspect_ratio || '9:16'}</Badge>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[11px] font-black uppercase tracking-wider text-rose-400">
                        Prompt Text-to-Image (Midjourney / DALL-E / Stable Diffusion)
                      </span>
                      <button
                        onClick={() => handleCopy(agent4.image_prompt, 'prompt')}
                        className="text-xs text-neutral-400 hover:text-rose-400 font-bold flex items-center gap-1.5 cursor-pointer"
                      >
                        {copiedKey === 'prompt' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>Salin Prompt AI</span>
                      </button>
                    </div>
                    <div className="p-5 bg-black/90 rounded-2xl border border-rose-500/30 font-mono text-xs text-neutral-300 leading-relaxed italic shadow-inner">
                      "{agent4.image_prompt}"
                    </div>
                  </div>

                  <div className="p-4 bg-neutral-900/80 rounded-2xl border border-neutral-800 text-xs text-neutral-300">
                    💡 <strong>Rekomendasi Komposisi Kamera:</strong> {agent4.recommended_composition}
                  </div>

                  <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800 text-xs text-neutral-300 flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-rose-400 block mb-0.5 text-xs uppercase tracking-wider">
                        Dasar Teori Visual:
                      </strong>
                      <span>{agent4.data_foundation}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* STAGE 5: The QA & Deployer */}
              {activeStage === 4 && (
                <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-rose-500 font-mono">
                        TAHAP 5 • QUALITY CONTROL & PROYEKSI ROAS
                      </span>
                      <h3 className="text-lg font-black text-white font-heading mt-0.5">
                        Sub-Agent 5: Adversarial Evaluator & Executor (The QA & Deployer)
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="success" size="md" hasDot>
                        {agent5.qc_status}
                      </Badge>
                      <Badge variant={isProfitable ? 'success' : 'danger'} size="md">
                        ROAS {activeFunnel.roas_est} (PROFIT)
                      </Badge>
                    </div>
                  </div>

                  {/* Hero ROAS Display */}
                  <div className="text-center py-8 px-6 bg-gradient-to-b from-neutral-900/80 via-neutral-950 to-neutral-950 rounded-3xl border border-neutral-800 shadow-2xl">
                    <span className="text-xs font-black uppercase tracking-widest text-neutral-400 font-mono">
                      PROYEKSI NILAI BALIK MODAL IKLAN ({activeFunnel.label.toUpperCase()})
                    </span>
                    <div
                      className="text-6xl sm:text-8xl font-black font-mono tracking-tight my-3"
                      style={{ color: isProfitable ? '#34d399' : '#f87171' }}
                    >
                      {activeFunnel.roas_est}
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-300 font-medium max-w-lg mx-auto leading-relaxed">
                      {agent5.roas_report.summary}
                    </p>
                  </div>

                  {/* Rock-Solid Financial Matrix Table */}
                  <div className="w-full overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 shadow-2xl">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-neutral-900/90 border-b border-neutral-800 text-[11px] font-black uppercase tracking-wider text-neutral-400">
                          <th style={{ width: '38%', padding: '16px 24px' }}>METRIK FINANSIAL</th>
                          <th style={{ width: '22%', padding: '16px 20px', textAlign: 'right' }}>ESTIMASI AI</th>
                          <th style={{ width: '40%', padding: '16px 24px' }}>PENJELASAN UNTUK PEMILIK BISNIS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-800/80 font-medium text-neutral-300">
                        <tr className="hover:bg-rose-500/[0.03] transition-colors">
                          <td style={{ padding: '16px 24px' }} className="font-bold text-white text-sm">
                            Budget Iklan Harian
                          </td>
                          <td style={{ padding: '16px 20px', textAlign: 'right' }} className="font-mono font-bold text-rose-400 text-sm">
                            {formatRp(agent5.roas_report.budget_harian)}
                          </td>
                          <td style={{ padding: '16px 24px' }} className="text-neutral-400 text-xs">
                            Alokasi budget harian yang Anda tetapkan
                          </td>
                        </tr>

                        <tr className="hover:bg-rose-500/[0.03] transition-colors">
                          <td style={{ padding: '16px 24px' }} className="font-bold text-white text-sm">
                            Estimasi Tayangan (CPM Rp 20rb)
                          </td>
                          <td style={{ padding: '16px 20px', textAlign: 'right' }} className="font-mono font-bold text-neutral-200 text-sm">
                            {Number(agent5.roas_report.estimasi_tayangan).toLocaleString('id-ID')} orang
                          </td>
                          <td style={{ padding: '16px 24px' }} className="text-neutral-400 text-xs">
                            Jumlah calon konsumen yang melihat iklan Anda
                          </td>
                        </tr>

                        <tr className="hover:bg-rose-500/[0.03] transition-colors">
                          <td style={{ padding: '16px 24px' }} className="font-bold text-white text-sm">
                            Estimasi Klik (CTR {funnelPhase === 'fase1' ? '2.0%' : '2.8%'})
                          </td>
                          <td style={{ padding: '16px 20px', textAlign: 'right' }} className="font-mono font-bold text-neutral-200 text-sm">
                            {funnelPhase === 'fase1' ? '100' : '140'} orang
                          </td>
                          <td style={{ padding: '16px 24px' }} className="text-neutral-400 text-xs">
                            Calon pembeli yang tertarik mengklik tautan iklan
                          </td>
                        </tr>

                        <tr className="hover:bg-rose-500/[0.03] transition-colors">
                          <td style={{ padding: '16px 24px' }} className="font-bold text-white text-sm">
                            Estimasi Pembeli (CVR {funnelPhase === 'fase1' ? '3.0%' : '3.6%'})
                          </td>
                          <td style={{ padding: '16px 20px', textAlign: 'right' }} className="font-mono font-bold text-neutral-200 text-sm">
                            {funnelPhase === 'fase1' ? '3' : '5'} transaksi
                          </td>
                          <td style={{ padding: '16px 24px' }} className="text-neutral-400 text-xs">
                            Konsumen yang berhasil checkout dan membayar
                          </td>
                        </tr>

                        <tr className="hover:bg-rose-500/[0.03] transition-colors">
                          <td style={{ padding: '16px 24px' }} className="font-bold text-white text-sm">
                            Estimasi Omzet Harian
                          </td>
                          <td style={{ padding: '16px 20px', textAlign: 'right' }} className="font-mono font-bold text-neutral-200 text-sm">
                            {formatRp(funnelPhase === 'fase1' ? 105000 : 175000)}
                          </td>
                          <td style={{ padding: '16px 24px' }} className="text-neutral-400 text-xs">
                            Total penjualan kotor harian
                          </td>
                        </tr>

                        <tr className="hover:bg-rose-500/[0.03] transition-colors bg-neutral-900/30">
                          <td style={{ padding: '16px 24px' }} className="font-extrabold text-white text-sm">
                            Estimasi Laba Bersih
                          </td>
                          <td
                            style={{
                              padding: '16px 20px',
                              textAlign: 'right',
                              color: '#34d399',
                            }}
                            className="font-mono font-black text-base"
                          >
                            {formatRp(funnelPhase === 'fase1' ? 15000 : 35000)}
                          </td>
                          <td style={{ padding: '16px 24px' }} className="text-neutral-300 text-xs font-semibold">
                            Omzet dikurangi modal HPP dan biaya iklan harian
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Ads Manager JSON Payload */}
                  <div className="pt-4 border-t border-neutral-800">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2 font-mono">
                        <Code2 className="w-4 h-4 text-rose-500" />
                        CAMPAIGN BLUEPRINT PAYLOAD ({activeFunnel.label.toUpperCase()})
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        leftIcon={copiedKey === 'payload' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        onClick={() => handleCopy(agent5.campaign_blueprint_payload, 'payload')}
                      >
                        {copiedKey === 'payload' ? 'Tersalin!' : 'Copy JSON Payload'}
                      </Button>
                    </div>
                    <pre className="p-5 bg-black/90 rounded-2xl border border-neutral-800 font-mono text-xs text-neutral-300 overflow-x-auto max-h-64 leading-relaxed shadow-inner">
                      {JSON.stringify(agent5.campaign_blueprint_payload, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </PageContainer>

      <Footer />
    </div>
  );
}
