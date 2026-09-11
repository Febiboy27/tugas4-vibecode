# ApiBarat — Eksplorasi Kebakaran Jakarta Barat

Dashboard React/Vite untuk mengeksplorasi kejadian kebakaran per kecamatan di Jakarta Barat.

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

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
