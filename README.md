# Portfolio Alhimnii Rusdy

Website portofolio statis yang menggunakan HTML, CSS, dan JavaScript. Seluruh gambar, screenshot proyek, dan dokumen tersimpan secara terpisah agar mudah diperbarui serta siap untuk GitHub Pages atau hosting biasa.

## Cara membuka website

1. Ekstrak ZIP secara lengkap (jangan memindahkan `index.html` sendirian).
2. Buka folder `Portfolio_Alhimnii_Rusdy_Folder_Project`.
3. Klik dua kali `index.html` untuk membuka website di Chrome, Edge, atau browser modern.
4. Koneksi internet hanya diperlukan ketika mengunjungi tautan eksternal (GitHub, YouTube, TikTok, Goodwood Conferences, atau repositori kampus).

**Penting:** Pertahankan susunan folder relatif terhadap `index.html`. Tidak perlu `npm`, Node.js, database, atau server untuk melihat website ini.

## Struktur folder

```text
Portfolio_Alhimnii_Rusdy_Folder_Project/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── main.js                 # Navigasi, animasi, modal Content Creator
│   ├── certificates.js         # Pop-up foto sertifikat
│   ├── attendance-data.js      # Daftar screenshot proyek SMA Kartikatama
│   └── attendance-gallery.js   # Navigasi galeri Guru/Siswa/Admin/Aplikasi
├── assets/
│   ├── favicon.svg
│   ├── images/
│   │   ├── profile/             # Foto profil dan foto wisuda
│   │   ├── certificates/        # Empat foto sertifikat
│   │   └── project-previews/    # Gambar miniatur proyek
│   ├── screenshots/
│   │   ├── website/
│   │   │   ├── guru/            # 6 screenshot
│   │   │   ├── siswa/           # 4 screenshot
│   │   │   └── admin/           # 9 screenshot
│   │   └── aplikasi/            # 7 screenshot
│   └── documents/
│       └── CV_Alhimnii_Rusdy.pdf
└── README.md
```

## Mengubah website

- **Tulisan dan tautan:** edit `index.html`.
- **Warna, ukuran, dan tampilan HP:** edit `css/styles.css`.
- **Interaksi dan pop-up:** edit file JavaScript dalam `js/`.
- **Foto dan sertifikat:** ganti file terkait di `assets/images/` dengan nama dan ekstensi yang sama, atau ubah `src` di `index.html`.
- **Screenshot SMA Kartikatama:** tambahkan foto ke folder yang tepat, lalu daftar jalur fotonya dalam `js/attendance-data.js`.
- **Download CV:** ganti PDF di `assets/documents/` dengan nama yang sama.

## Fitur yang dipertahankan

- Kartu proyek Content Creator dengan modal TikTok/YouTube.
- Link Goodwood Conferences.
- Galeri proyek SMA Kartikatama (Website: Guru, Siswa, Admin; Aplikasi: 7 gambar), tombol navigasi dan zoom.
- Section Education, foto wisuda, Organization, dan link repositori kampus.
- Galeri empat sertifikat yang tampil lewat pop-up, **tanpa tombol unduh sertifikat**.
- Download CV dan layout responsif.

## Publikasi ke GitHub Pages

Upload **semua file dan folder** (bukan hanya `index.html`) ke root repository GitHub, lalu aktifkan Pages dengan sumber **Deploy from a branch → main → /(root)**. Website akan diakses dari alamat GitHub Pages repository tersebut.

## Privasi

Sebelum memublikasikan screenshot sekolah, pastikan data pribadi siswa, guru, atau admin yang tampak di gambar telah disamarkan dan Anda berhak menampilkannya.
