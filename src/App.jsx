import { useEffect, useState } from 'react'
import './App.css'

const YEARS = [2020, 2021, 2022, 2023]
const districts = [
  { name: 'Cengkareng', values: [59, 63, 71, 102], population: 601156, path: 'M5 20 L20 9 L34 14 L31 31 L16 35 Z', label: [18, 23] },
  { name: 'Kalideres', values: [49, 61, 60, 86], population: 471436, path: 'M4 20 L5 39 L18 48 L31 31 L20 9 Z', label: [14, 31] },
  { name: 'Kembangan', values: [50, 38, 53, 68], population: 334115, path: 'M31 31 L34 14 L48 16 L54 31 L45 42 Z', label: [39, 29] },
  { name: 'Kebon Jeruk', values: [44, 43, 54, 76], population: 383168, path: 'M31 31 L45 42 L55 52 L42 61 L25 51 L18 48 Z', label: [36, 48] },
  { name: 'Grogol Petamburan', values: [39, 21, 29, 33], population: 241564, path: 'M54 31 L67 22 L76 33 L68 45 L55 52 L45 42 Z', label: [59, 38] },
  { name: 'Palmerah', values: [20, 25, 28, 33], population: 206353, path: 'M55 52 L68 45 L77 54 L69 66 L55 66 L42 61 Z', label: [60, 57] },
  { name: 'Taman Sari', values: [36, 30, 40, 32], population: 110252, path: 'M76 33 L89 35 L94 48 L83 54 L77 54 L68 45 Z', label: [82, 44] },
  { name: 'Tambora', values: [36, 41, 47, 54], population: 241889, path: 'M77 54 L83 54 L94 48 L98 61 L87 70 L69 66 Z', label: [83, 61] },
]

const causes = [
  { name: 'Listrik', values: [221, 246, 279], color: '#ef664f' },
  { name: 'Lainnya', values: [35, 62, 72], color: '#f4a261' },
  { name: 'Membakar Sampah', values: [29, 23, 75], color: '#f6c85f' },
  { name: 'Gas', values: [25, 40, 29], color: '#8db3a5' },
  { name: 'Rokok', values: [11, 9, 29], color: '#6f91a8' },
  { name: 'Lilin', values: [1, 2, 0], color: '#b6c9c1' },
]

const stations = [
  ['Kantor Sudin Jakarta Barat', 'Grogol Petamburan', 106.788109, -6.172585],
  ['Sektor Cengkareng', 'Cengkareng', 106.71863, -6.132952],
  ['Pos Cengkareng Barat', 'Cengkareng', 106.7284, -6.145172],
  ['Pos Kresek', 'Cengkareng', 106.707414, -6.177248],
  ['Pos Rawa Buaya', 'Cengkareng', 106.731449, -6.162949],
  ['Pos Cengkareng Timur', 'Cengkareng', 106.732609, -6.142258],
  ['Sektor Grogol Petamburan', 'Grogol Petamburan', 106.773484, -6.152704],
  ['Pos Duta Mas', 'Grogol Petamburan', 106.779929, -6.150778],
  ['Sektor Tamansari', 'Taman Sari', 106.815121, -6.134337],
  ['Pos Lokasari', 'Taman Sari', 106.822542, -6.14799],
  ['Pos Mangga Besar', 'Taman Sari', 106.8182, -6.146069],
  ['Pos Glodok', 'Taman Sari', 106.8147, -6.14523],
  ['Sektor Tambora', 'Tambora', 106.808386, -6.133791],
  ['Pos Krendang', 'Tambora', 106.804231, -6.148124],
  ['Pos Jembatan Besi', 'Tambora', 106.7979, -6.152758],
  ['Pos Jembatan Besi Baru', 'Tambora', 106.7944, -6.151378],
  ['Pos Angke', 'Tambora', 106.800027, -6.143806],
  ['Sektor Kebon Jeruk', 'Kebon Jeruk', 106.772697, -6.190171],
  ['Pos Kebon Jeruk Lama', 'Kebon Jeruk', 106.7683, -6.200452],
  ['Pos Siloam Kebon Jeruk', 'Kebon Jeruk', 106.7637, -6.190469],
  ['Pos Pasar Kembang', 'Kebon Jeruk', 106.778, -6.206092],
  ['Pos Greenville', 'Kebon Jeruk', 106.7777, -6.169053],
  ['Pos Kedoya Utara', 'Kebon Jeruk', 106.7675, -6.177172],
  ['Pos Kedoya Selatan', 'Kebon Jeruk', 106.7592, -6.179851],
  ['Sektor Kalideres', 'Kalideres', 106.702963, -6.119414],
  ['Pos Citra 1', 'Kalideres', 106.6938, -6.14669],
  ['Pos Pegadungan', 'Kalideres', 106.7115, -6.14228],
  ['Sektor Palmerah', 'Palmerah', 106.809896, -6.186991],
  ['Pos Rengas', 'Palmerah', 106.7925, -6.202733],
  ['Pos Jatipulo', 'Palmerah', 106.803411, -6.175857],
  ['Sektor Kembangan', 'Kembangan', 106.738557, -6.184545],
  ['Pos Joglo', 'Kembangan', 106.725, -6.218498],
  ['Pos Rumdis', 'Kembangan', 106.722, -6.218194],
  ['Pos Puri Indah', 'Kembangan', 106.7473, -6.181366],
]

const format = (value) => new Intl.NumberFormat('id-ID').format(value)
const total = (yearIndex) => districts.reduce((sum, d) => sum + d.values[yearIndex], 0)
const projectBoundary = (feature) => {
  const coordinates = feature?.geometry?.coordinates || []
  const points = []
  const collect = (value) => {
    if (typeof value?.[0] === 'number') points.push(value)
    else value?.forEach(collect)
  }
  collect(coordinates)
  const bounds = points.reduce((acc, [lon, lat]) => ({
    minLon: Math.min(acc.minLon, lon), maxLon: Math.max(acc.maxLon, lon),
    minLat: Math.min(acc.minLat, lat), maxLat: Math.max(acc.maxLat, lat),
  }), { minLon: Infinity, maxLon: -Infinity, minLat: Infinity, maxLat: -Infinity })
  const project = ([lon, lat]) => [
    4 + ((lon - bounds.minLon) / (bounds.maxLon - bounds.minLon)) * 96,
    4 + ((bounds.maxLat - lat) / (bounds.maxLat - bounds.minLat)) * 70,
  ]
  const ringPath = (ring) => ring.map((point, index) => `${index ? 'L' : 'M'}${project(point)[0].toFixed(2)} ${project(point)[1].toFixed(2)}`).join(' ') + ' Z'
  const polygonPath = (polygon) => polygon.map(ringPath).join(' ')
  return feature?.geometry?.type === 'MultiPolygon'
    ? coordinates.map(polygonPath).join(' ')
    : coordinates.map(ringPath).join(' ')
}

function Icon({ name }) {
  const paths = {
    map: 'M3 5l6-2 6 2 6-2v16l-6 2-6-2-6 2V5zm6-2v16m6-14v16',
    trend: 'M3 17l6-6 4 4 8-9M17 6h4v4',
    flame: 'M12 22c4 0 7-3 7-7 0-4-3-6-4-10-2 2-3 4-3 7-1-1-2-3-2-5-3 3-5 6-5 9 0 3 3 6 7 6z',
    info: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm0-11v6m0-10v.01',
  }
  return <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={paths[name]} /></svg>
}

function App() {
  const [page, setPage] = useState('overview')
  const [year, setYear] = useState('all')
  const [metric, setMetric] = useState('count')
  const [selected, setSelected] = useState('Cengkareng')
  const [showStations, setShowStations] = useState(true)
  const [boundary, setBoundary] = useState(null)

  useEffect(() => {
    fetch('/data/jakarta-barat-boundary.geojson')
      .then((response) => {
        if (!response.ok) throw new Error('GeoJSON batas Jakarta Barat gagal dimuat')
        return response.json()
      })
      .then((geojson) => setBoundary(geojson.features?.[0] || null))
      .catch(() => setBoundary(null))
  }, [])

  const selectedDistrict = districts.find((d) => d.name === selected)
  const valuesFor = (d) => year === 'all' ? d.values.reduce((a, b) => a + b, 0) : d.values[Number(year) - 2020]
  const max = Math.max(...districts.map(valuesFor))
  const ranked = [...districts].sort((a, b) => valuesFor(b) - valuesFor(a))
  const mapTotal = year === 'all' ? districts.reduce((sum, d) => sum + valuesFor(d), 0) : total(Number(year) - 2020)
  const maxYear = YEARS[YEARS.reduce((best, _, i) => total(i) > total(best) ? i : best, 0)]
  const selectedRate = selectedDistrict ? (valuesFor(selectedDistrict) / selectedDistrict.population) * 10000 : 0

  const stationPoint = (lon, lat) => ({
    x: 8 + ((lon - 106.69) / 0.14) * 84,
    y: 14 + ((-lat - 6.12) / 0.10) * 58,
  })

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={() => setPage('overview')} aria-label="Kembali ke beranda"><span className="brand-mark"><Icon name="flame" /></span><span>Api<span className="brand-accent">Barat</span></span></button>
        <nav className="nav" aria-label="Navigasi utama">
          {[['overview', 'Ringkasan'], ['map', 'Eksplorasi Peta'], ['trend', 'Tren Kebakaran'], ['about', 'Tentang Data']].map(([id, label]) => <button key={id} className={page === id ? 'active' : ''} onClick={() => setPage(id)}>{id === 'map' ? <Icon name="map" /> : id === 'trend' ? <Icon name="trend" /> : null}{label}</button>)}
        </nav>
        <div className="header-meta"><span className="live-dot" /> Data 2020—2023</div>
      </header>

      <main>
        {page === 'overview' && <Overview onExplore={() => setPage('map')} ranked={ranked} mapTotal={mapTotal} maxYear={maxYear} boundary={boundary} />}
        {page === 'map' && <MapPage year={year} setYear={setYear} metric={metric} setMetric={setMetric} selected={selected} setSelected={setSelected} selectedDistrict={selectedDistrict} selectedRate={selectedRate} valuesFor={valuesFor} max={max} showStations={showStations} setShowStations={setShowStations} stationPoint={stationPoint} ranked={ranked} boundary={boundary} />}
        {page === 'trend' && <TrendPage year={year} setYear={setYear} ranked={ranked} />}
        {page === 'about' && <About />}
      </main>
      <footer><span>ApiBarat · Eksplorasi Kebakaran Permukiman Jakarta Barat</span><span>Sumber: Open Data Jakarta · Data 2020—2024</span></footer>
    </div>
  )
}

function Overview({ onExplore, ranked, mapTotal, maxYear, boundary }) {
  return <div className="page overview-page">
    <section className="hero-copy"><div className="eyebrow"><span className="eyebrow-line" /> DATA STORY · JAKARTA BARAT</div><h1>Memahami pola<br /><em>kebakaran permukiman.</em></h1><p className="lead">Eksplorasi data kebakaran di Jakarta Barat. Temukan wilayah dengan kejadian terbanyak, lihat perubahannya dari waktu ke waktu, dan kenali konteks pos pemadam di sekitar kita.</p><button className="primary-button" onClick={onExplore}>Jelajahi peta <span>→</span></button></section>
    <section className="overview-grid"><div className="map-card mini-map"><div className="card-heading"><div><span className="eyebrow">RINGKASAN WILAYAH</span><h2>Jakarta Barat</h2></div><span className="map-status"><span className="live-dot" /> 8 kecamatan</span></div><MiniMap ranked={ranked} boundary={boundary} /><div className="map-caption"><span><i className="legend-swatch high" /> Lebih banyak kejadian</span><span><i className="legend-swatch low" /> Lebih sedikit</span></div></div><div className="side-summary"><div className="metric-card dark"><span className="metric-label">TOTAL KEBAKARAN</span><strong>{format(mapTotal)}</strong><span className="metric-note">akumulasi 2020—2023</span></div><div className="metric-card"><span className="metric-label">TAHUN TERTINGGI</span><strong>{maxYear}</strong><span className="metric-note">tren meningkat +{Math.round(((total(3) - total(0)) / total(0)) * 100)}% sejak 2020</span></div><div className="callout"><span className="callout-number">01</span><div><strong>Cengkareng memimpin</strong><p>Dengan 295 kejadian selama empat tahun, Cengkareng menjadi kecamatan dengan kebakaran terbanyak.</p></div></div></div></section>
    <section className="section-block"><div className="section-title"><div><span className="eyebrow">TEMUAN UTAMA</span><h2>Gambaran cepat</h2></div><button className="text-button" onClick={onExplore}>Lihat semua data →</button></div><div className="finding-grid"><Finding number="01" title="Cengkareng paling sering terdampak" text="Total kejadian mencapai 295 kasus pada periode 2020—2023." /><Finding number="02" title="Tren terus naik" text="Jumlah kejadian meningkat dari 333 pada 2020 menjadi 484 pada 2023." /><Finding number="03" title="Listrik jadi penyebab utama" text="Data penyebab tahun 2021—2023 menunjukkan listrik sebagai faktor dominan." /></div></section>
  </div>
}

function Finding({ number, title, text }) { return <article className="finding"><span>{number}</span><h3>{title}</h3><p>{text}</p></article> }

function MiniMap({ ranked, boundary }) {
  const max = Math.max(...ranked.map((d) => d.values.reduce((a, b) => a + b, 0)))
  return <div className="map-visual mini"><svg viewBox="0 0 104 78" role="img" aria-label="Peta ringkasan kecamatan Jakarta Barat">{districts.map((d) => { const v = d.values.reduce((a, b) => a + b, 0); return <path key={d.name} d={d.path} className="district-shape" style={{ fill: `rgba(239,102,79,${0.2 + (v / max) * 0.72})` }} /> })}{boundary && <path d={projectBoundary(boundary)} className="real-boundary" />}<MapLabels /></svg><div className="mini-compass">N</div></div>
}

function MapLabels() { return <>{districts.map((d) => <text key={d.name} x={d.label[0]} y={d.label[1]} className="district-label">{d.name.replace(' ', '\n')}</text>)}</> }

function MapPage({ year, setYear, metric, setMetric, selected, setSelected, selectedDistrict, selectedRate, valuesFor, max, showStations, setShowStations, stationPoint, ranked, boundary }) {
  return <div className="page map-page"><section className="page-intro"><div><div className="eyebrow"><span className="eyebrow-line" /> EKSPLORASI PETA</div><h1>Di mana kebakaran<br /><em>paling sering terjadi?</em></h1><p>Pilih tahun dan indikator untuk membaca pola kebakaran di setiap kecamatan.</p></div><div className="intro-note"><Icon name="info" /><span>Warna lebih gelap menunjukkan jumlah kejadian yang lebih tinggi.</span></div></section>
    <div className="explorer-layout"><aside className="filter-panel"><div className="filter-heading"><span className="eyebrow">KONTROL PETA</span><button className="reset-button" onClick={() => { setYear('all'); setMetric('count'); setSelected('Cengkareng') }}>Reset</button></div><label>Tahun</label><div className="segmented">{['all', ...YEARS].map((y) => <button key={y} className={String(year) === String(y) ? 'selected' : ''} onClick={() => setYear(y)}>{y === 'all' ? 'Semua' : y}</button>)}</div><label>Indikator warna</label><select value={metric} onChange={(e) => setMetric(e.target.value)}><option value="count">Jumlah kebakaran</option><option value="rate">Rasio per 10.000 penduduk</option></select><div className="filter-divider" /><label className="switch-label"><span>Pos pemadam</span><button className={`switch ${showStations ? 'on' : ''}`} onClick={() => setShowStations(!showStations)} aria-label="Tampilkan pos pemadam"><span /></button></label><p className="filter-help">Data pos pemadam periode 2024.</p><div className="selected-summary"><span className="eyebrow">WILAYAH TERPILIH</span><strong>{selected}</strong><span>{format(valuesFor(selectedDistrict))} kejadian {year === 'all' ? 'total' : `pada ${year}`}</span></div></aside>
      <section className="map-card explorer-card"><div className="map-toolbar"><div><strong>Jakarta Barat</strong><span> · 8 kecamatan</span></div><div className="map-tools"><button title="Perbesar">＋</button><button title="Perkecil">−</button><button title="Reset tampilan">⌂</button></div></div><div className="map-visual main-map"><svg viewBox="0 0 104 78" role="img" aria-label="Peta interaktif kebakaran Jakarta Barat">{districts.map((d) => { const raw = metric === 'rate' ? (valuesFor(d) / d.population) * 10000 : valuesFor(d); const intensity = raw / (metric === 'rate' ? Math.max(...districts.map((x) => (valuesFor(x) / x.population) * 10000)) : max); return <g key={d.name} onClick={() => setSelected(d.name)} className={`district-group ${selected === d.name ? 'selected' : ''}`}><path d={d.path} className="district-shape" style={{ fill: `rgba(239,102,79,${0.16 + intensity * 0.78})` }} /><text x={d.label[0]} y={d.label[1]} className="district-label">{d.name}</text></g> })}{boundary && <path d={projectBoundary(boundary)} className="real-boundary" />}{showStations && stations.map(([name, district, lon, lat]) => { const p = stationPoint(lon, lat); return <circle key={name} cx={p.x} cy={p.y} r="1.05" className="station-dot"><title>{name} · {district}</title></circle> })}<path d="M3 70 C25 66 28 73 45 68 S75 69 101 63" className="river-line" /></svg><div className="map-compass"><strong>N</strong><span>↑</span></div><div className="map-legend"><span className="eyebrow">JUMLAH KEJADIAN</span><div className="gradient" /><div className="legend-numbers"><span>0</span><span>{Math.round(max / 2)}</span><span>{max}</span></div></div></div><div className="map-footnote"><span><i className="station-legend" /> Pos pemadam ({stations.length})</span><span><i className="boundary-legend" /> Batas resmi Jakarta Barat</span></div></section>
      <aside className="detail-panel"><span className="eyebrow">DETAIL KECAMATAN</span><h2>{selected}</h2><div className="detail-total"><strong>{format(valuesFor(selectedDistrict))}</strong><span>kejadian<br />{year === 'all' ? '2020—2023' : year}</span></div><div className="detail-row"><span>Rasio indikatif</span><strong>{selectedRate.toFixed(1)} <small>/ 10.000 penduduk</small></strong></div><div className="detail-chart"><span className="eyebrow">TREN TAHUNAN</span>{selectedDistrict.values.map((v, i) => <div className="bar-row" key={YEARS[i]}><span>{YEARS[i]}</span><div><i style={{ width: `${(v / 110) * 100}%` }} /></div><b>{v}</b></div>)}</div><button className="full-button" onClick={() => setSelected('Cengkareng')}>Kembali ke default</button></aside></div>
    <section className="table-section"><div className="section-title"><div><span className="eyebrow">PERINGKAT</span><h2>Kecamatan berdasarkan kejadian</h2></div></div><div className="ranking-table">{ranked.map((d, i) => <button key={d.name} onClick={() => setSelected(d.name)} className={d.name === selected ? 'row-active' : ''}><span className="rank">{String(i + 1).padStart(2, '0')}</span><strong>{d.name}</strong><span className="table-bar"><i style={{ width: `${(valuesFor(d) / max) * 100}%` }} /></span><b>{format(valuesFor(d))}</b></button>)}</div></section>
  </div>
}

function TrendPage({ year, setYear, ranked }) {
  const [causeYear, setCauseYear] = useState(2023)
  const trendMax = Math.max(...YEARS.map((_, i) => total(i)))
  const causeIndex = causeYear - 2021
  return <div className="page trend-page"><section className="page-intro compact"><div><div className="eyebrow"><span className="eyebrow-line" /> TREN KEBAKARAN</div><h1>Melihat perubahan<br /><em>dari waktu ke waktu.</em></h1><p>Perbandingan jumlah kejadian kebakaran antar-tahun dan kecamatan.</p></div><div className="year-pills">{YEARS.map((y) => <button className={year === y ? 'selected' : ''} onClick={() => setYear(y)} key={y}>{y}</button>)}</div></section><section className="chart-card"><div className="section-title"><div><span className="eyebrow">TOTAL PER TAHUN</span><h2>Tren kebakaran Jakarta Barat</h2></div><span className="chart-note">Satuan: kejadian</span></div><div className="trend-chart"><div className="y-axis"><span>{trendMax}</span><span>{Math.round(trendMax * .66)}</span><span>{Math.round(trendMax * .33)}</span><span>0</span></div><div className="chart-area"><div className="grid-lines">{[1,2,3].map((x) => <i key={x} />)}</div><div className="bars">{YEARS.map((y, i) => <div className="year-bar" key={y}><div className="bar-value">{total(i)}</div><div className="trend-bar" style={{ height: `${(total(i) / trendMax) * 100}%` }} /><span>{y}</span></div>)}</div></div></div></section><section className="split-sections"><div className="chart-card"><div className="section-title"><div><span className="eyebrow">PERBANDINGAN WILAYAH</span><h2>Ranking {year === 'all' ? 'total' : year}</h2></div></div><div className="rank-bars">{ranked.map((d) => <div className="rank-bar" key={d.name}><span>{d.name}</span><div><i style={{ width: `${(d.values[year === 'all' ? 3 : year - 2020] / 110) * 100}%` }} /></div><b>{d.values[year === 'all' ? 3 : year - 2020]}</b></div>)}</div></div><div className="chart-card"><div className="section-title"><div><span className="eyebrow">DUGAAN PENYEBAB</span><h2>Penyebab dominan</h2></div><select value={causeYear} onChange={(e) => setCauseYear(Number(e.target.value))}>{[2021, 2022, 2023].map((y) => <option key={y}>{y}</option>)}</select></div>{causes.map((c) => <div className="cause-row" key={c.name}><span>{c.name}</span><div><i style={{ width: `${(c.values[causeIndex] / 279) * 100}%`, background: c.color }} /></div><b>{c.values[causeIndex]}</b></div>)}<p className="chart-footnote">Data penyebab tersedia untuk Jakarta Barat pada 2021—2023.</p></div></section></div>
}

function About() { return <div className="page about-page"><section className="page-intro"><div><div className="eyebrow"><span className="eyebrow-line" /> TENTANG DATA</div><h1>Terbuka tentang<br /><em>data yang digunakan.</em></h1><p>Memahami sumber dan batasan adalah bagian penting dari membaca data kebencanaan.</p></div></section><div className="about-grid"><section className="about-card"><span className="eyebrow">SUMBER DATA</span><h2>Dataset yang digunakan</h2><ul><li><strong>Jumlah Peristiwa Kebakaran Menurut Kecamatan</strong><span>DKI Jakarta · 2020—2023</span></li><li><strong>Jumlah Penduduk menurut Kecamatan</strong><span>DKI Jakarta · 2019</span></li><li><strong>Data Pos Pemadam Kebakaran</strong><span>DKI Jakarta · 2024</span></li><li><strong>Jumlah Kebakaran Menurut Penyebab</strong><span>Jakarta Barat · 2021—2023</span></li><li><strong>Batas administrasi Jakarta Barat</strong><span>geoBoundaries · ADM2 · basis BPS/WFP/OCHA</span></li></ul></section><section className="about-card"><span className="eyebrow">METODOLOGI</span><h2>Cara membaca peta</h2><p>Warna kecamatan menunjukkan jumlah peristiwa kebakaran yang tercatat. Garis putus-putus menunjukkan batas resmi Kota Jakarta Barat dari GeoJSON administrasi. Klik kecamatan untuk melihat detail dan tren tahunan.</p><div className="notice"><Icon name="info" /><div><strong>Catatan penting</strong><p>Data kejadian bersifat agregat per kecamatan, bukan titik lokasi kebakaran. Rasio menggunakan penduduk 2019 sebagai baseline dan bersifat indikatif.</p></div></div><div className="notice soft"><Icon name="info" /><div><strong>Cakupan penyebab</strong><p>Data penyebab tersedia untuk wilayah Jakarta Barat, tetapi hanya pada tingkat tahunan.</p></div></div></section></div></div> }

export default App
