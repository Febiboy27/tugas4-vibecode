# ApiBarat — Eksplorasi Kebakaran Jakarta Barat

Dashboard React/Vite untuk membaca arsip kejadian kebakaran per kecamatan di Jakarta Barat.

## Menjalankan

```bash
npm install
npm run dev
```

Validasi produksi:

```bash
npm run lint
npm run build
```

## Cakupan data

Data kejadian per kecamatan berasal dari workbook tahun 2020–2023, data penduduk berasal dari 2019, data penyebab mencakup Jakarta Barat tahun 2021–2023, dan data pos pemadam menggunakan periode 2024. Peta menampilkan kejadian sebagai agregat kecamatan, bukan titik kejadian individual.

Seluruh data analitik saat ini dibundel di `src/App.jsx` agar MVP dapat berjalan tanpa backend.
