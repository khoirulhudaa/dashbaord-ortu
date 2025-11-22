// import React, { useEffect, useMemo, useRef, useState } from "react";

// // Global styles for dark/light mode and custom elements
// const GlobalStyles = () => (
//   <style>
//     {`
//       /* Base styles for light and dark mode */
//       // .dashboard-container {
//       //   background: linear-gradient(to bottom, #F3F4F6, #F3F4F6);
//       // }
//       .dark .dashboard-container {
//         background: linear-gradient(to bottom, #111827, #111827);
//       }
//       select option {
//         background: #F9FAFB !important;
//         color: #1F2937;
//       }
//       select option:checked,
//       select option:hover {
//         background: #14B8A6 !important;
//         color: #FFFFFF;
//       }
//       @media (prefers-color-scheme: dark) {
//         select option {
//           background: #1F2A44 !important;
//           color: #FFFFFF;
//         }
//         select option:checked,
//         select option:hover {
//           background: #2DD4BF !important;
//           color: #FFFFFF;
//         }
//       }
//       /* Custom input and button styles */
//       input, select, textarea {
//         transition: all 0.3s ease;
//       }
//       input:focus, select:focus, textarea:focus {
//         outline: none;
//         border-color: #14B8A6;
//         box-shadow: 0 0 0 2px rgba(20, 184, 166, 0.2);
//       }
//       .dark input:focus, .dark select:focus, .dark textarea:focus {
//         border-color: #2DD4BF;
//         box-shadow: 0 0 0 2px rgba(45, 212, 191, 0.2);
//       }
//       button:hover {
//         transform: translateY(-1px);
//       }
//     `}
//   </style>
// );

// /**********************  Mini UI primitives (updated styles)  **********************/
// function clsx(...a) {
//   return a.filter(Boolean).join(" ");
// }

// function Card({ children, className = "" }) {
//   return (
//     <div
//       className={clsx(
//         "rounded-xl border border-gray-200 dark:border-white/20 bg-white/90 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow duration-300",
//         className
//       )}
//     >
//       {children}
//     </div>
//   );
// }

// function CardHeader({ children, className = "" }) {
//   return (
//     <div
//       className={clsx(
//         "px-5 py-4 border-b border-gray-200 dark:border-white/20",
//         className
//       )}
//     >
//       {children}
//     </div>
//   );
// }

// function CardTitle({ children, className = "" }) {
//   return (
//     <div
//       className={clsx(
//         "text-xl font-semibold text-gray-800 dark:text-white",
//         className
//       )}
//     >
//       {children}
//     </div>
//   );
// }

// function CardContent({ children, className = "" }) {
//   return (
//     <div className={clsx("px-5 py-4", className)}>{children}</div>
//   );
// }

// function Badge({ children, variant = "default" }) {
//   const base =
//     "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium";
//   const variants = {
//     default: "bg-teal-600 dark:bg-teal-700 border border-white/20 text-white",
//     secondary: "bg-amber-500/90 dark:bg-amber-600/90 text-white",
//     destructive: "bg-red-500/90 dark:bg-red-600/90 text-white",
//     outline: "border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white",
//   };
//   return (
//     <span className={clsx(base, variants[variant] || variants.default)}>
//       {children}
//     </span>
//   );
// }

// function Modal({ open, onClose, title, children, widthClass = "max-w-lg" }) {
//   if (!open) return null;
//   return (
//     <div className="fixed inset-0 z-50 bg-black/80 dark:bg-black/90 backdrop-blur-sm">
//       <div className="absolute inset-0" onClick={onClose} />
//       <div className="absolute inset-0 flex items-center justify-center p-4">
//         <div
//           className={clsx(
//             "w-full rounded-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg border border-gray-200 dark:border-white/20 shadow-2xl",
//             widthClass
//           )}
//         >
//           <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/20 px-5 py-4">
//             <div className="text-xl font-semibold text-gray-800 dark:text-white">
//               {title}
//             </div>
//             <button
//               onClick={onClose}
//               className="rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-1.5 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
//             >
//               Tutup
//             </button>
//           </div>
//           <div className="p-5 max-h-[70vh] overflow-auto">{children}</div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function PillTabs({ items, value, onChange }) {
//   return (
//     <div className="inline-flex rounded-full border border-gray-200 dark:border-white/20 bg-white dark:bg-gray-800 p-1 text-sm">
//       {items.map((it) => (
//         <button
//           key={it.value}
//           onClick={() => onChange(it.value)}
//           className={clsx(
//             "px-4 py-2 rounded-full transition-all duration-300",
//             value === it.value
//               ? "bg-teal-600 dark:bg-teal-700 border border-white/20 text-white"
//               : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
//           )}
//         >
//           {it.label}
//         </button>
//       ))}
//     </div>
//   );
// }

// /****************************  Helpers & Testable Logic  ****************************/
// function hoursDiff(a, b) {
//   return (new Date(b) - new Date(a)) / 36e5;
// }

// function computeSLA(records, thresholdHours) {
//   if (!records?.length) return 0;
//   const done = records.filter((r) => r.status === "Selesai" && r.resolvedAt);
//   if (!done.length) return 0;
//   const ok = done.filter(
//     (r) => hoursDiff(r.openedAt, r.resolvedAt) <= thresholdHours
//   );
//   return Math.round((ok.length / done.length) * 100);
// }

// function isLow(v, t = 60) {
//   return Number(v) < Number(t);
// }

// function avgSatisfaction(tickets) {
//   const arr = tickets
//     .filter((t) => typeof t.satisfaction === "number")
//     .map((t) => t.satisfaction);
//   if (!arr.length) return 0;
//   return Math.round(arr.reduce((a, b) => a + b, 0) / arr.length);
// }

// function nextTicketId(prev) {
//   const n = prev && /^U-(\d{4})$/.test(prev) ? parseInt(prev.slice(2), 10) : 0;
//   const x = (n || 0) + 1;
//   return `U-${String(x).padStart(4, "0")}`;
// }

// function formatDate(iso) {
//   const d = new Date(iso);
//   return d.toLocaleDateString(undefined, {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });
// }

// function formatDateTime(iso) {
//   const d = new Date(iso);
//   return d.toLocaleString(undefined, {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: false,
//   });
// }

// const PELAYANAN_CATEGORIES = [
//   "Administrasi Umum",
//   "PPDB",
//   "Mutasi Siswa",
//   "Surat Keterangan",
//   "Legalisir Ijazah/Transkrip",
//   "Beasiswa/KIP",
//   "Kurikulum & KBM",
//   "Bimbingan Konseling",
//   "Kedisiplinan",
//   "Kesehatan & UKS",
//   "Perpustakaan",
//   "Sarana Prasarana",
//   "IT & Jaringan",
//   "Website/Portal",
//   "Keuangan/Komite",
//   "Ekstrakurikuler",
//   "Pencegahan Perundungan",
//   "Pengaduan Kekerasan",
//   "Lainnya",
// ];

// const CATEGORY_STANDARD_HOURS = {
//   "Legalisir Ijazah/Transkrip": 72,
//   PPDB: 24,
//   "IT & Jaringan": 24,
//   "Surat Keterangan": 48,
//   "Sarana Prasarana": 72,
//   "Kesehatan & UKS": 24,
//   "Administrasi Umum": 48,
// };

// const getStandardHours = (cat) => CATEGORY_STANDARD_HOURS[cat] ?? 48;

// const resolutionHours = (t) =>
//   t?.resolvedAt ? Math.round(hoursDiff(t.openedAt, t.resolvedAt)) : null;

// const evaluateStandard = (t) => {
//   const std = getStandardHours(t.category);
//   const dur = resolutionHours(t);
//   return { std, dur, ok: dur != null ? dur <= std : false };
// };

// /**********************  Pengumuman/Informasi helpers  **********************/
// function filterAnnouncements(list, filter) {
//   if (filter === "all") return list;
//   return list.filter((a) => a.source === filter);
// }

// function unreadCount(list, readSet) {
//   return list.filter((a) => !readSet.has(a.id)).length;
// }

// /**********************  Orang Tua: helpers  **********************/
// function enforceMax3(selectedIds) {
//   if (selectedIds.length <= 3) return { ok: true, ids: selectedIds };
//   return { ok: false, ids: selectedIds.slice(0, 3) };
// }

// function attendanceRate(records) {
//   if (!records?.length) return 0;
//   const hadir = records.filter((r) => r.status === "Hadir").length;
//   return Math.round((hadir / records.length) * 100);
// }

// function avgGrade(scores) {
//   const arr = scores?.map((s) => s.score) || [];
//   if (!arr.length) return 0;
//   return Math.round(arr.reduce((a, b) => a + b, 0) / arr.length);
// }

// /********************************  Tiny Charts  ********************************/
// function Donut({ value = 0, size = 140, thickness = 22, color = "#14B8A6", track = "#E5E7EB" }) {
//   const clamped = Math.max(0, Math.min(100, value));
//   return (
//     <div className="my-3" style={{ width: size, height: size }}>
//       <div
//         className="relative w-full h-full grid place-items-center"
//         style={{
//           background: `conic-gradient(${color} ${clamped * 3.6}deg, ${track} 0)`,
//           borderRadius: "9999px",
//         }}
//       >
//         <div
//           className="absolute bg-white dark:bg-gray-900"
//           style={{
//             width: size - thickness * 2,
//             height: size - thickness * 2,
//             borderRadius: "9999px",
//           }}
//         />
//         <div
//           className="relative text-2xl font-semibold"
//           style={{ color }}
//         >
//           {clamped}%
//         </div>
//       </div>
//     </div>
//   );
// }

// function Sparkline({ data = [], width = 240, height = 70, color = "#14B8A6" }) {
//   const max = Math.max(1, ...data);
//   const toY = (v) => height - (v / max) * height;
//   const step = data.length > 1 ? width / (data.length - 1) : width;
//   const path = data
//     .map((v, i) => `${i === 0 ? "M" : "L"}${i * step},${toY(v)}`)
//     .join(" ");
//   return (
//     <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-[70px]">
//       <path d={path} fill="none" stroke={color} strokeWidth="2" />
//     </svg>
//   );
// }

// function Bars({ data = [], height = 120 }) {
//   const max = Math.max(1, ...data);
//   return (
//     <div className="w-full" style={{ height }}>
//       <div className="h-full w-full flex items-end gap-1">
//         {data.map((v, i) => {
//           const h = Math.round((v / max) * 100);
//           return (
//             <div key={i} className="flex-1 bg-gray-200 dark:bg-gray-700">
//               <div
//                 className="w-full"
//                 style={{
//                   height: `${h}%`,
//                   background: "linear-gradient(to top, #14B8A6, #2DD4BF)",
//                 }}
//               />
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// /***********************************  MAP (Leaflet lazy)  ***********************************/
// function useLeafletReady() {
//   const [ready, setReady] = useState(false);
//   useEffect(() => {
//     if (typeof window === "undefined") return;
//     if (window.L) {
//       setReady(true);
//       return;
//     }
//     const cssId = "leaflet-css";
//     if (!document.getElementById(cssId)) {
//       const link = document.createElement("link");
//       link.id = cssId;
//       link.rel = "stylesheet";
//       link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
//       document.head.appendChild(link);
//     }
//     const jsId = "leaflet-js";
//     if (document.getElementById(jsId)) {
//       document
//         .getElementById(jsId)
//         .addEventListener("load", () => setReady(true));
//       return;
//     }
//     const script = document.createElement("script");
//     script.id = jsId;
//     script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
//     script.async = true;
//     script.onload = () => setReady(true);
//     document.body.appendChild(script);
//   }, []);
//   return ready;
// }

// function MiniMap({ points = [] }) {
//   const el = useRef(null);
//   const mapRef = useRef(null);
//   const layerRef = useRef(null);
//   const ready = useLeafletReady();
//   useEffect(() => {
//     if (!ready || !el.current || mapRef.current) return;
//     const L = window.L;
//     const map = L.map(el.current).setView(
//       points[0]?.lat ? [points[0].lat, points[0].lng] : [-6.9175, 107.6191],
//       13
//     );
//     L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//       attribution: "&copy; OSM",
//     }).addTo(map);
//     mapRef.current = map;
//     layerRef.current = L.layerGroup().addTo(map);
//     return () => {
//       map.remove();
//     };
//   }, [ready]);
//   useEffect(() => {
//     if (!ready || !mapRef.current || !layerRef.current) return;
//     const L = window.L;
//     const layer = layerRef.current;
//     layer.clearLayers();
//     points.forEach((p) => {
//       const color = p.color || "#14B8A6";
//       const m = L.circleMarker([p.lat, p.lng], {
//         radius: 6,
//         color,
//         fillColor: color,
//         fillOpacity: 0.8,
//       });
//       m.bindTooltip(p.label || "Lokasi");
//       m.addTo(layer);
//     });
//   }, [ready, points]);
//   return (
//     <div
//       ref={el}
//       className="w-full h-full rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700"
//     />
//   );
// }

// /********************************  ROOT APP WITH MODES  ********************************/
// export const DashboardMain = () => {
//   const [mode, setMode] = useState("user"); // "user" | "parent"
//   const tests = useMemo(() => {
//     const attendance = attendanceRate([
//       { status: "Hadir" },
//       { status: "Izin" },
//       { status: "Hadir" },
//     ]);
//     const g = avgGrade([{ score: 80 }, { score: 90 }]);
//     const lim = enforceMax3(["a", "b", "c", "d"]);
//     const hasFmt =
//       typeof formatDateTime(new Date().toISOString) === "string" &&
//       typeof formatDate(new Date().toISOString()) === "string";
//     return { ok: attendance === 67 && g === 85 && lim.ids.length === 3 && hasFmt };
//   }, []);

//   return (
//     <div className="min-h-screen w-full p-6 md:p-10 dashboard-container text-gray-800 dark:text-white">
//       <GlobalStyles />
//       <header className="flex items-center justify-between gap-4 flex-wrap mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-teal-600 dark:text-teal-400">
//             Xpresensi — {mode === "user" ? "Dashboard User" : "Dashboard Orang Tua"}
//           </h1>
//           <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
//             Mobile-first.{" "}
//             {mode === "parent"
//               ? "Pantau multi-anak & kirim feedback."
//               : "Layanan masyarakat & pengumuman."}
//           </p>
//         </div>
//         <PillTabs
//           items={[
//             { label: "User", value: "user" },
//             { label: "Orang Tua", value: "parent" },
//           ]}
//           value={mode}
//           onChange={setMode}
//         />
//       </header>
//       {mode === "user" ? <UserDashboard /> : <ParentDashboard />}
//       {/* <details className="text-xs text-gray-500 dark:text-gray-400 mt-4">
//         <summary>Self-test ringkas: {tests.ok ? "lulus" : "gagal"}</summary>
//         <div>attendance 67%, avgGrade 85, enforceMax3 = 3 id, date helpers OK</div>
//       </details> */}
//     </div>
//   );
// };

// /*************************  DASHBOARD USER  *************************/
// function initMyTickets() {
//   const now = new Date();
//   const iso = (d) => new Date(d).toISOString();
//   const minusH = (h) => iso(new Date(now.getTime() - h * 36e5));
//   return [
//     {
//       id: "U-0003",
//       title: "Legalisir Ijazah",
//       category: "Legalisir Ijazah/Transkrip",
//       openedAt: minusH(70),
//       status: "Selesai",
//       resolvedAt: minusH(10),
//       responseHours: 2,
//       satisfaction: 58,
//       timeline: ["Dibuat", "Direspon", "Selesai"],
//     },
//     {
//       id: "U-0002",
//       title: "Masalah akses WiFi kelas",
//       category: "IT & Jaringan",
//       openedAt: minusH(30),
//       status: "Diproses",
//       resolvedAt: null,
//       responseHours: 3,
//       satisfaction: null,
//       timeline: ["Dibuat", "Direspon"],
//     },
//     {
//       id: "U-0001",
//       title: "Informasi PPDB",
//       category: "PPDB",
//       openedAt: minusH(5),
//       status: "Baru",
//       resolvedAt: null,
//       responseHours: null,
//       satisfaction: null,
//       timeline: ["Dibuat"],
//     },
//   ];
// }

// function initAnnouncements() {
//   const now = Date.now();
//   const minusD = (d) => new Date(now - d * 864e5).toISOString();
//   return [
//     {
//       id: "AN-0005",
//       source: "dinas",
//       title: "Sosialisasi Kurikulum Merdeka",
//       date: minusD(0),
//       priority: "warning",
//       body: "Kepala sekolah diundang rapat sosialisasi kurikulum. 10.00 WIB.",
//     },
//     {
//       id: "AN-0004",
//       source: "sekolah",
//       title: "Ujian Semester Ganjil",
//       date: minusD(1),
//       priority: "info",
//       body: "Jadwal Ujian Semester kelas 9 akan diumumkan di portal.",
//     },
//     {
//       id: "AN-0003",
//       source: "sekolah",
//       title: "Perbaikan Jaringan",
//       date: minusD(2),
//       priority: "warning",
//       body: "Maintenance jaringan 13.00-15.00, akses WiFi mungkin terputus.",
//     },
//     {
//       id: "AN-0002",
//       source: "dinas",
//       title: "Pendataan KIP",
//       date: minusD(5),
//       priority: "info",
//       body: "Lengkapi data KIP sebelum tanggal 30.",
//     },
//   ];
// }

// function UserDashboard() {
//   const [tickets, setTickets] = useState(initMyTickets());
//   const [openNew, setOpenNew] = useState(false);
//   const [detail, setDetail] = useState(null);

//   const [announcements] = useState(initAnnouncements());
//   const [annFilter, setAnnFilter] = useState("all");
//   const [annDetail, setAnnDetail] = useState(null);
//   const [readSet, setReadSet] = useState(() => new Set());
//   useEffect(() => {
//     if (typeof window === "undefined") return;
//     try {
//       const raw = localStorage.getItem("ann_read_ids");
//       if (raw) {
//         setReadSet(new Set(JSON.parse(raw)));
//       }
//     } catch {}
//   }, []);
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       localStorage.setItem("ann_read_ids", JSON.stringify(Array.from(readSet)));
//     }
//   }, [readSet]);
//   const annsFiltered = useMemo(
//     () => filterAnnouncements(announcements, annFilter),
//     [announcements, annFilter]
//   );
//   const annsUnread = useMemo(
//     () => unreadCount(announcements, readSet),
//     [announcements, readSet]
//   );
//   const markRead = (id) =>
//     setReadSet((prev) => {
//       const s = new Set(prev);
//       s.add(id);
//       return s;
//     });

//   const sla = useMemo(() => computeSLA(tickets, 48), [tickets]);
//   const avg = useMemo(() => avgSatisfaction(tickets), [tickets]);
//   const activeCount = tickets.filter((t) => t.status !== "Selesai").length;
//   const resolved30=tickets.filter(t=> t.status==="Selesai" && (new Date()-new Date(t.resolvedAt) <= 30*864e5)).length

//   const onCreate = (payload) => {
//     setTickets((prev) => {
//       const latest = prev[0]?.id || "U-0000";
//       const id = nextTicketId(latest);
//       const now = new Date().toISOString();
//       const row = {
//         id,
//         title: payload.title,
//         category: payload.category,
//         openedAt: now,
//         status: "Baru",
//         responseHours: null,
//         resolvedAt: null,
//         satisfaction: null,
//         timeline: ["Dibuat"],
//       };
//       return [row, ...prev];
//     });
//     setOpenNew(false);
//   };

//   const onRate = (id, score) =>
//     setTickets((prev) =>
//       prev.map((t) => (t.id === id ? { ...t, satisfaction: score } : t))
//     );

//   const slaWarn = isLow(sla, 60);
//   const satisWarn = isLow(avg, 60);
//   const active = tickets.filter((t) => t.status !== "Selesai");
//   const history = tickets.filter((t) => t.status === "Selesai");

//   return (
//     <div className="space-y-6">
//       {/* KPI */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         <Card>
//           <CardHeader className="border-b border-gray-200 dark:border-white/20">
//             <CardTitle className={clsx("text-sm", slaWarn && "text-red-500 dark:text-red-400")}>
//               {slaWarn && "⚠️ "}Kepatuhan
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <Donut
//               value={sla}
//               color={slaWarn ? "#EF4444" : "#14B8A6"}
//               track={slaWarn ? "#FEE2E2" : "#E5E7EB"}
//             />
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="border-b border-gray-200 dark:border-white/20">
//             <CardTitle className="text-sm">Rata Kepuasan</CardTitle>
//           </CardHeader>
//           <CardContent className="flex flex-col justify-between h-[78.6%]">
//             <div className={clsx("text-4xl font-bold text-teal-600 dark:text-teal-400 mt-4")}>
//               {avg}
//               <span className="text-3xl">/100</span>
//             </div>
//             <div className="text-xs text-gray-600 dark:text-gray-400">dari tiket selesai</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="border-b border-gray-200 dark:border-white/20">
//             <CardTitle className="text-sm">Tiket Aktif</CardTitle>
//           </CardHeader>
//           <CardContent className="flex flex-col justify-between h-[78.6%]">
//             <div className={clsx("text-4xl font-bold text-teal-600 dark:text-teal-400 mt-4")}>
//               {activeCount}
//             </div>
//             <div className="text-xs text-gray-600 dark:text-gray-400">Baru/Diproses</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="border-b border-gray-200 dark:border-white/20">
//             <CardTitle className="text-sm">Selesai 30 Hari</CardTitle>
//           </CardHeader>
//           <CardContent className="flex flex-col justify-between h-[78.6%]">
//             <div className={clsx("text-4xl font-bold text-teal-600 dark:text-teal-400 mt-4")}>
//               {resolved30}
//             </div>
//             <div className="text-xs text-gray-600 dark:text-gray-400">riwayat</div>
//           </CardContent>
//         </Card>
//       </div>

//       <div className="w-full md:flex gap-6">
//         <div className="w-full md:w-1/2">
//           {/* PENGUMUMAN */}
//           <Card>
//             <CardHeader className="flex items-center justify-between border-b border-gray-200 dark:border-white/20 mb-4">
//               <CardTitle className="text-base">📣 Pengumuman & Informasi</CardTitle>
//               <div className="flex items-center gap-2 text-xs">
//                 <div>Belum dibaca: {annsUnread}</div>
//                 <select
//                   value={annFilter}
//                   onChange={(e) => setAnnFilter(e.target.value)}
//                   className="ml-2 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 px-2 text-gray-800 dark:text-white"
//                 >
//                   <option value="all">Semua</option>
//                   <option value="sekolah">Sekolah</option>
//                   <option value="dinas">Dinas</option>
//                 </select>
//               </div>
//             </CardHeader>
//             <CardContent className="space-y-2">
//               {annsFiltered.map((a) => (
//                 <div
//                   key={a.id}
//                   className="rounded-xl border border-gray-200 dark:border-white/20 p-4 flex items-start justify-between gap-3 hover:bg-Gray-50 dark:hover:bg-gray-700/50 transition-colors"
//                 >
//                   <div>
//                     <div className="text-sm font-medium flex items-center gap-2">
//                       <p className="text-md">{a.title}</p>
//                       {a.priority === "warning" && <Badge variant="destructive">Penting</Badge>}
//                       <p className="border border-gray-300 dark:border-gray-600 rounded-full text-sm px-3 text-gray-700 dark:text-white">
//                         {a.source === "dinas" ? "Dinas" : "Sekolah"}
//                       </p>
//                     </div>
//                     <div className="text-xs text-gray-600 dark:text-gray-400">
//                       {formatDateTime(a.date)}
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <button
//                       onClick={() => setAnnDetail(a.id)}
//                       className="rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-1.5 text-xs text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
//                     >
//                       Lihat
//                     </button>
//                   </div>
//                 </div>
//               ))}
//               {annsFiltered.length === 0 && (
//                 <div className="text-sm text-gray-600 dark:text-gray-400">
//                   Tidak ada pengumuman.
//                 </div>
//               )}
//             </CardContent>
//           </Card>

//           {/* Actions */}
//           <div className="flex gap-3 mt-4">
//             <button
//               onClick={() => setOpenNew(true)}
//               className="flex-1 h-10 rounded-lg bg-teal-600 dark:bg-teal-700 border border-white/20 text-white hover:bg-teal-500 dark:hover:bg-teal-600 transition-all duration-300 transform hover:scale-105"
//             >
//               + Buat Aduan
//             </button>
//             <button
//               onClick={() =>
//                 window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
//               }
//               className="h-10 rounded-lg border border-gray-300 dark:border-gray-600 px-3 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
//             >
//               Lihat Riwayat
//             </button>
//           </div>
//         </div>
//         {/* Active tickets */}
//         <div className="w-full md:mt-0 mt-6 md:w-1/2">
//           <Card>
//             <CardHeader className="border-b border-gray-200 dark:border-white/20 mb-3">
//               <CardTitle className="text-base">Tiket Aktif</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-2">
//               {active.length === 0 && (
//                 <div className="text-sm text-gray-600 dark:text-gray-400">
//                   Tidak ada tiket aktif.
//                 </div>
//               )}
//               {active.map((t) => (
//                 <div
//                   key={t.id}
//                   className="rounded-xl border border-gray-200 dark:border-white/20 p-4 flex items-start justify-between gap-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
//                 >
//                   <div>
//                     <div className="text-sm font-medium text-gray-800 dark:text-white">
//                       {t.title}
//                     </div>
//                     <div className="text-xs text-gray-600 dark:text-gray-400">
//                       {t.category} • {formatDate(t.openedAt)}
//                     </div>
//                     <div className="mt-1">
//                       <Badge variant={t.status === "Diproses" ? "secondary" : "default"}>
//                         {t.status}
//                       </Badge>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <button
//                       onClick={() => setDetail(t.id)}
//                       className="rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-1.5 text-xs text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
//                     >
//                       Detail
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>
//         </div>
//       </div>

//       {/* History */}
//       <Card>
//         <CardHeader className="border-b border-gray-200 dark:border-white/20 mb-4">
//           <CardTitle className="text-base">Riwayat Selesai</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-2">
//           {history.length === 0 && (
//             <div className="text-sm text-gray-600 dark:text-gray-400">
//               Belum ada tiket selesai.
//             </div>
//           )}
//           {history.slice(0, 6).map((t) => {
//             const { std, dur, ok } = evaluateStandard(t);
//             return (
//               <div
//                 key={t.id}
//                 className="rounded-xl border border-gray-200 dark:border-white/20 p-4 flex items-start justify-between gap-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
//               >
//                 <div>
//                   <div className="text-sm font-medium text-gray-800 dark:text-white">
//                     {t.title}
//                   </div>
//                   <div className="text-xs text-gray-600 dark:text-gray-400">
//                     {t.category} • Selesai {formatDate(t.resolvedAt)} •{" "}
//                     <span className={ok ? "" : "text-red-500 dark:text-red-400"}>
//                       {dur}
//                     </span>{" "}
//                     / std {std}j
//                   </div>
//                   <div className="mt-1 flex items-center gap-2">
//                     <Badge variant="default">Selesai</Badge>
//                     <span
//                       className={clsx(
//                         "text-xs",
//                         t.satisfaction != null
//                           ? t.satisfaction < 60
//                             ? "text-red-500 dark:text-red-400"
//                             : "text-gray-700 dark:text-gray-200"
//                           : "text-gray-400 dark:text-gray-500"
//                       )}
//                     >
//                       {t.satisfaction != null
//                         ? `Skor ${t.satisfaction}`
//                         : "Belum dinilai"}
//                     </span>
//                     {!ok && <Badge variant="destructive">Terlambat</Badge>}
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => setDetail(t.id)}
//                     className="rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-1.5 text-xs text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
//                   >
//                     Detail
//                   </button>
//                 </div>
//               </div>
//             )})}
//           </CardContent>
//         </Card>

//         {/* Modals */}
//         <NewTicketModal open={openNew} onClose={() => setOpenNew(false)} onCreate={(p) => onCreate(p)} />
//         <TicketDetailModal open={!!detail} onClose={() => setDetail(null)} ticket={tickets.find(t => t.id === detail)} onRate={(id, v) => onRate(id, v)} />
//         <AnnouncementDetailModal open={!!annDetail} onClose={() => setAnnDetail(null)} announcement={announcements.find(a => a.id === annDetail)} markRead={(id) => markRead(id)} />
//       </div>
//     );
// }

// function NewTicketModal({ open, onClose, onCreate }) {
//   const [category, setCategory] = useState(PELAYANAN_CATEGORIES[0]);
//   const [title, setTitle] = useState("");
//   const [desc, setDesc] = useState("");
//   const disabled = !title.trim();
//   const submit = (e) => {
//     e.preventDefault();
//     if (disabled) return;
//     onCreate({ category, title, desc });
//   };
//   if (!open) return null;

//   return (
//     <Modal open={open} onClose={onClose} title="Buat Aduan">
//       <form onSubmit={submit} className="space-y-4">
//         <div className="flex flex-col gap-2">
//           <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Kategori</label>
//           <select
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400"
//           >
//             {PELAYANAN_CATEGORIES.map((k) => (
//               <option key={k} value={k} className="bg-gray-100 dark:bg-gray-700">
//                 {k}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="flex flex-col gap-2">
//           <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Judul</label>
//           <input
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="Tuliskan ringkas aduan"
//             className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400"
//           />
//         </div>
//         <div className="flex flex-col gap-2">
//           <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Deskripsi</label>
//           <textarea
//             value={desc}
//             onChange={(e) => setDesc(e.target.value)}
//             placeholder="Detail kronologi/ lokasi (opsional)"
//             className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white min-h-24 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400"
//           />
//         </div>
//         <div className="flex justify-end gap-3 pt-2">
//           <button
//             type="button"
//             onClick={onClose}
//             className="w-1/2 rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
//           >
//             Batal
//           </button>
//           <button
//             type="submit"
//             disabled={disabled}
//             className={clsx(
//               "w-1/2 rounded-lg px-3 py-2 text-sm transition-all duration-300",
//               disabled
//                 ? "bg-gray-200 dark:bg-gray-600 text-gray-400 cursor-not-allowed"
//                 : "bg-teal-600 dark:bg-teal-700 border border-white/20 text-white hover:bg-teal-500 dark:hover:bg-teal-600 transform hover:scale-105"
//             )}
//           >
//             Kirim
//           </button>
//         </div>
//       </form>
//     </Modal>
//   );
// }

// function TicketDetailModal({ open, onClose, ticket, onRate }) {
//   const [score, setScore] = useState(ticket?.satisfaction ?? 80);
//   useEffect(() => {
//     setScore(ticket?.satisfaction ?? 80);
//   }, [ticket]);
//   if (!open || !ticket) return null;
//   const canRate = ticket.status === "Selesai";
//   const { std, dur, ok } = evaluateStandard(ticket);

//   return (
//     <Modal open={open} onClose={onClose} title={`Detail Tiket — ${ticket.id}`}>
//       <div className="space-y-4">
//         <div>
//           <div className="text-sm font-medium text-gray-800 dark:text-white">{ticket.title}</div>
//           <div className="text-xs text-gray-600 dark:text-gray-400">
//             {ticket.category} • Dibuat {formatDate(ticket.openedAt)}
//           </div>
//         </div>
//         <div className="text-sm">
//           Status:{" "}
//           <Badge variant={ticket.status === "Selesai" ? "default" : ticket.status === "Diproses" ? "secondary" : "outline"}>
//             {ticket.status}
//           </Badge>
//         </div>
//         {ticket.resolvedAt && (
//           <div className="rounded-xl border border-gray-200 dark:border-white/20 p-4">
//             <div className="grid grid-cols-2 gap-y-2 text-sm">
//               <div className="text-gray-600 dark:text-gray-400">Selesai</div>
//               <div>{formatDateTime(ticket.resolvedAt)}</div>
//               <div className="text-gray-600 dark:text-gray-400">Durasi</div>
//               <div className={ok ? "" : "text-red-500 dark:text-red-400"}>{dur} jam</div>
//               <div className="text-gray-600 dark:text-gray-400">Standar</div>
//               <div>
//                 {std} jam{" "}
//                 {ok ? (
//                   <Badge className="ml-1">OK</Badge>
//                 ) : (
//                   <Badge className="ml-1" variant="destructive">Terlambat</Badge>
//                 )}
//               </div>
//             </div>
//             <div className="mt-2 h-2 rounded bg-gray-200 dark:bg-gray-700 overflow-hidden">
//               <div
//                 className={clsx("h-full", ok ? "bg-teal-600 dark:bg-teal-700 border border-white/20" : "bg-red-500 dark:bg-red-600")}
//                 style={{ width: `${Math.min(100, Math.round((dur / std) * 100))}%` }}
//               />
//             </div>
//           </div>
//         )}
//         <div>
//           <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Timeline</div>
//           <ul className="text-sm space-y-1">
//             {ticket.timeline.map((t, i) => (
//               <li key={i} className="flex items-center gap-2">
//                 <span className="h-1.5 w-1.5 rounded-full bg-teal-600 dark:bg-teal-700 border border-white/20" />
//                 {t}
//               </li>
//             ))}
//           </ul>
//         </div>
//         {canRate ? (
//           <div className="rounded-xl border border-gray-200 dark:border-white/20 p-4">
//             <div className="flex items-center justify-between">
//               <div className="text-sm font-medium text-gray-800 dark:text-white">Beri Penilaian</div>
//               <div className={clsx("text-sm", score < 60 ? "text-red-500 dark:text-red-400" : "text-gray-700 dark:text-gray-200")}>
//                 {score}/100
//               </div>
//             </div>
//             <input
//               type="range"
//               min={0}
//               max={100}
//               value={score}
//               onChange={(e) => setScore(Number(e.target.value))}
//               className="w-full accent-teal-600 dark:accent-teal-400"
//             />
//             <div className="flex justify-end mt-3">
//               <button
//                 onClick={() => {
//                   onRate(ticket.id, score);
//                   onClose();
//                 }}
//                 className="rounded-lg bg-teal-600 dark:bg-teal-700 border border-white/20 text-white px-3 py-1.5 text-sm hover:bg-teal-500 dark:hover:bg-teal-600 transition-all duration-300 transform hover:scale-105"
//               >
//                 Simpan
//               </button>
//             </div>
//           </div>
//         ) : (
//           <div className="text-xs text-gray-600 dark:text-gray-400">
//             Penilaian muncul setelah tiket selesai.
//           </div>
//         )}
//       </div>
//     </Modal>
//   );
// }

// function AnnouncementDetailModal({ open, onClose, announcement, markRead }) {
//   useEffect(() => {
//     if (open && announcement) {
//       markRead?.(announcement.id);
//     }
//   }, [open, announcement]);
//   if (!open || !announcement) return null;

//   return (
//     <Modal open={open} onClose={onClose} title={`Pengumuman — ${announcement.source === "dinas" ? "Dinas" : "Sekolah"}`}>
//       <div className="space-y-3">
//         <div className="text-base font-semibold text-gray-800 dark:text-white">{announcement.title}</div>
//         <div className="text-xs text-gray-600 dark:text-gray-400">
//           {formatDateTime(announcement.date)} •{" "}
//           <Badge variant={announcement.priority === "warning" ? "destructive" : "secondary"}>
//             {announcement.priority === "warning" ? "Penting" : "Info"}
//           </Badge>
//         </div>
//         <p className="text-sm leading-relaxed whitespace-pre-line text-gray-800 dark:text-white">
//           {announcement.body}
//         </p>
//         <div className="flex justify-end pt-2">
//           <button
//             className="rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-1.5 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
//             onClick={onClose}
//           >
//             Tutup
//           </button>
//         </div>
//       </div>
//     </Modal>
//   );
// }

// /*************************  DASHBOARD ORANG TUA *************************/
// function demoChildren() {
//   const now = Date.now();
//   const minusD = (d) => new Date(now - d * 864e5).toISOString();
//   const hist = (seed) =>
//     Array.from({ length: 14 }, (_, i) => ({
//       date: minusD(i),
//       status: ["Hadir", "Hadir", "Izin", "Sakit", "Alpha"][(i + seed) % 5],
//     }));
//   const grades = (seed) => [
//     { subject: "Matematika", score: 80 - (seed * 3) % 10 },
//     { subject: "IPA", score: 85 - (seed * 4) % 7 },
//     { subject: "Bahasa Indonesia", score: 88 - (seed * 5) % 8 },
//     { subject: "Bahasa Inggris", score: 82 - (seed * 2) % 6 },
//   ];
//   return [
//     {
//       id: "C-1",
//       name: "Alya Putri",
//       kelas: "7A",
//       color: "#EF4444",
//       lastPos: { lat: -6.9179, lng: 107.6139 },
//       attendance: hist(1),
//       today: "Hadir",
//       scheduleToday: ["07:00 Matematika", "08:30 IPA", "10:00 B.Indonesia"],
//       exams: [{ title: "UH Matematika", date: minusD(-2) }],
//       todos: [
//         { title: "PR IPA Hal 12", done: false },
//         { title: "Ringkasan B.Indo", done: true },
//       ],
//       grades: grades(1),
//       notes: ["Perlu peningkatan latihan aljabar."],
//       messages: [{ from: "Wali Kelas 7A", body: "Besok pakai seragam pramuka.", date: minusD(0) }],
//     },
//     {
//       id: "C-2",
//       name: "Bima Arga",
//       kelas: "9C",
//       color: "#3B82F6",
//       lastPos: { lat: -6.9195, lng: 107.611 },
//       attendance: hist(2),
//       today: "Izin",
//       scheduleToday: ["07:00 Sejarah", "08:30 B.Inggris", "10:00 TIK"],
//       exams: [{ title: "Tryout UN", date: minusD(3) }],
//       todos: [{ title: "PR TIK Project", done: false }],
//       grades: grades(2),
//       notes: ["Aktif bertanya, konsisten"],
//       messages: [{ from: "Guru TIK", body: "Bawa laptop pekan ini.", date: minusD(1) }],
//     },
//     {
//       id: "C-3",
//       name: "Citra Lestari",
//       kelas: "6B",
//       color: "#10B981",
//       lastPos: { lat: -6.9142, lng: 107.6205 },
//       attendance: hist(3),
//       today: "Hadir",
//       scheduleToday: ["07:00 Tematik", "08:30 SBK", "10:00 PJOK"],
//       exams: [{ title: "Ulangan Tematik", date: minusD(6) }],
//       todos: [{ title: "PR SBK Kolase", done: true }],
//       grades: grades(3),
//       notes: ["Sangat baik dalam kolaborasi"],
//       messages: [{ from: "Guru PJOK", body: "Bawa sepatu olahraga.", date: minusD(2) }],
//     },
//     {
//       id: "C-4",
//       name: "Dion Saputra",
//       kelas: "8D",
//       color: "#A855F7",
//       lastPos: { lat: -6.9208, lng: 107.6231 },
//       attendance: hist(4),
//       today: "Alpha",
//       scheduleToday: ["07:00 IPS", "08:30 Matematika", "10:00 IPA"],
//       exams: [{ title: "UH IPS", date: minusD(5) }],
//       todos: [{ title: "PR IPS Peta", done: false }],
//       grades: grades(4),
//       notes: ["Perlu pendampingan kehadiran"],
//       messages: [{ from: "BK", body: "Mohon hadir pertemuan orang tua.", date: minusD(0) }],
//     },
//   ];
// }

// function ParentDashboard(){
//   const children=useMemo(()=>demoChildren(),[])
//   const [selectedIds,setSelectedIds]=useState(children.slice(0,Math.min(3,children.length)).map(c=>c.id))
//   const [activeId,setActiveId]=useState(children[0]?.id)
//   const [section,setSection]=useState("lokasi") // lokasi|jadwal|akademik|notifikasi|banding|feedback|akun

//   const limit=enforceMax3(selectedIds)
//   useEffect(()=>{ if(!limit.ok) setSelectedIds(limit.ids) },[children.length])

//   const activeChild=children.find(c=>c.id===activeId)||children[0]
//   const monitored=children.filter(c=> limit.ids.includes(c.id))

//   // Side menu (desktop) / tabs (mobile)
//   const sections=[
//     {id:"lokasi",label:"🗺️ Lokasi & Kehadiran"},
//     {id:"jadwal",label:"📅 Jadwal & Aktivitas"},
//     {id:"akademik",label:"📚 Akademik"},
//     {id:"notifikasi",label:"📢 Notifikasi"},
//     {id:"banding",label:"👨‍👩‍👧 Perbandingan"},
//     {id:"feedback",label:"🏫 Pelayanan"},
//     {id:"akun",label:"🔒 Akun Orang Tua"},
//   ]

//   return (
//     <div className="grid grid-cols-1 gap-4">
//       {/* Sidebar */}
//       <div className="w-full md:relative md:flex md:top-6 gap-6 mb-8 min:h-[400px] md:overflow-hidden">
//         <Card className="w-full md:w-1/2 bg-black/20 h-max md:h-full">
//           <CardHeader className="pb-3 md:pb-1 h-max md:h-[14%] border-b border-b-white/20 mb-5"><CardTitle className="text-base">👨‍👩‍👧 Daftar Anak</CardTitle></CardHeader>
//           <CardContent className="h-[86%]">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {children.map(c=> (
//                 <button key={c.id} onClick={()=>setActiveId(c.id)} className={clsx("h-[140px] rounded-xl border p-3 text-left", activeId===c.id?"border-white/30":"")}> 
//                   <div className="flex items-center gap-2">
//                     <div className="h-10 w-10 rounded-full" style={{background:c.color}}/>
//                     <div>
//                       <div className="text-sm font-medium">{c.name}</div>
//                       <div className="text-xs text-gray-500">Kelas {c.kelas}</div>
//                     </div>
//                   </div>
//                   <div className="mt-2 flex items-center justify-between text-xs">
//                     <label className="flex items-center mt-3 gap-3">
//                       <input className="scale-[1.4] rounded-md ml-3 flex items-center" type="checkbox" checked={selectedIds.includes(c.id)} onChange={e=>{ const ids=e.target.checked? [...selectedIds,c.id] : selectedIds.filter(x=>x!==c.id); const res=enforceMax3(ids); if(!res.ok){ alert("Anda hanya dapat memantau 3 anak sekaligus. Hubungi sekolah untuk penambahan."); } setSelectedIds(res.ids) }} /> 
//                       <p className="text-[16px]">
//                         Pantau
//                       </p>
//                     </label>
//                     <Badge variant={c.today==="Hadir"?"default":c.today==="Alpha"?"destructive":"secondary"}>{c.today}</Badge>
//                   </div>
//                 </button>
//               ))}
//             </div>
//             {/* {children.length>3 && <div className="mt-2 text-xs text-red-600">Catatan: Anda hanya dapat memantau 3 anak sekaligus.</div>} */}
//           </CardContent>
//         </Card>

//         <Card className="w-full md:w-1/2 h-max md:h-full md:mt-0 mt-4">
//           <CardHeader className="pb-3 md:pb-1 h-max md:h-[14%] border-b border-b-white/20 mb-5"><CardTitle className="text-base">Menu</CardTitle></CardHeader>
//           <CardContent className="h-max md:h-[80%]">
//             <ul className="h-full justify-between flex flex-wrap text-sm gap-4">
//               {sections.map(s=> (
//                 <li key={s.id} className="w-[48%] border border-white/20 rounded-md">
//                   <button 
//                     onClick={()=>setSection(s.id)} 
//                     className={clsx("w-full h-full text-left px-3 py-3 rounded-md", 
//                     section===s.id?"bg-gray-900 text-white":"hover:bg-slate-800")}>
//                       {s.label}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Main */}
//       <div className="space-y-4">
//         {/* Mobile tabs */}
//         {/* <div className="md:hidden overflow-auto"><div className="flex gap-2 w-max">
//           {sections.map(s=> (<button key={s.id} onClick={()=>setSection(s.id)} className={clsx("px-3 py-2 rounded-full border text-sm", section===s.id?"bg-gray-900 text-white":"bg-white")}>{s.label}</button>))}
//         </div></div> */}

//         {section==="lokasi" && <SectionLokasi child={activeChild}/>} 
//         {section==="jadwal" && <SectionJadwal child={activeChild}/>} 
//         {section==="akademik" && <SectionAkademik child={activeChild}/>} 
//         {section==="notifikasi" && <SectionNotifikasi child={activeChild}/>} 
//         {section==="banding" && <SectionBanding children={monitored} allChildren={children}/>} 
//         {section==="feedback" && <SectionFeedback/>} 
//         {section==="akun" && <SectionAkun parentName="Orang Tua Demo"/>}
//       </div>
//     </div>
//   )
// }

// /***********************  SECTIONS: ORANG TUA  ************************/ 
// function SectionLokasi({child}){
//   const points=[{lat:child.lastPos.lat,lng:child.lastPos.lng,label:`${child.name} (titik terakhir)`, color:"#111"}]
//   const weeklyCounts=useMemo(()=>{ const days=child.attendance.slice(0,7).reverse(); return days.map(d=> d.status==="Hadir"?1:0) },[child.id])
//   const hadirToday=child.today
//   return (
//     <Card className="relative">
//       <CardHeader className="border-b border-b-white/20 pb-3"><CardTitle className="text-base">🗺️ Lokasi & Kehadiran — {child.name}</CardTitle></CardHeader>
//       <CardContent className="space-y-3 mt-4">
//         <div className="grid grid-cols-1 gap-4">
//           <div className="h-[400px]">
//             <MiniMap points={points}/>
//           </div>
//           <div className="flex items-center w-max md:w-full h-[34px] mt-2">
//             <p className="w-[160px] text-sm mb-1 md:flex hidden">Status hari ini</p>
//             <div className="w-[400px] md:flex items-center gap-2"><Badge variant={hadirToday==="Hadir"?"default":hadirToday==="Alpha"?"destructive":"secondary"}>{hadirToday}</Badge><span className="text-xs text-gray-500">(otomatis dari presensi)</span></div>
//             <p className="text-sm mb-1 md:flex hidden text-white w-[400px]">Riwayat kehadiran (7 hari)</p>
//             <Bars data={weeklyCounts} height={100}/>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }
// function SectionJadwal({child}){
//   return (
//     <Card className="border-b border-b-white/20 pb-3">
//       <CardHeader className="pb-4 border-b border-b-white/20 mb-4"><CardTitle className="text-base">📅 Jadwal & Aktivitas — {child.name}</CardTitle></CardHeader>
//       <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div>
//           <div className="text-sm font-medium mb-3">Pelajaran Hari Ini</div>
//           <ul className="text-sm space-y-1 flex flex-col gap-4">{child.scheduleToday.map((s,i)=>(<li key={i} className="rounded border px-2 py-1">{s}</li>))}</ul>
//         </div>
//         <div className="md:border-x border-x-white/30 md:px-3">
//           <div className="text-sm font-medium mb-3">Ujian/Tugas Mendatang</div>
//           <ul className="text-sm space-y-1 flex flex-col gap-4">{child.exams.map((x,i)=>(<li key={i} className="rounded border px-2 py-1">{x.title} • {new Date(x.date).toLocaleDateString()}</li>))}</ul>
//         </div>
//         <div>
//           <div className="text-sm font-medium mb-3">Ringkasan PR</div>
//           <ul className="text-sm space-y-1 flex flex-col gap-4">{child.todos.map((t,i)=>(<li key={i} className="rounded border px-1 py-1 flex items-center gap-2"><input className="scale-[1.2] rounded-md ml-3 flex items-center" type="checkbox" checked={t.done} readOnly/> {t.title} {t.done?<Badge className="ml-1">Sudah</Badge>:<Badge variant="secondary" className="ml-1">Belum</Badge>}</li>))}</ul>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }
// function SectionAkademik({child}){
//   const avg=avgGrade(child.grades)
//   const trend=child.grades.map(g=>g.score)
//   return (
//     <Card className="border-b border-b-white/20 pb-3">
//       <CardHeader className="border-b border-b-white/20 pb-3"><CardTitle className="text-base">📚 Perkembangan Akademik — {child.name}</CardTitle></CardHeader>
//       <CardContent className="space-y-3 mt-4">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {/* <div className="md:col-span-2">
//             <div className="text-sm mb-1">Grafik skor terakhir (per mapel)</div>
//             <Sparkline data={trend} />
//           </div> */}
//           <div className="my-4">
//             <div className="text-sm mb-1">Rata-rata</div>
//             <div className="text-4xl font-semibold">{avg}</div>
//           </div>
//         </div>
//         <div>
//           {/* <div className="text-sm mb-1">Nilai terbaru</div> */}
//           <table className="w-full text-sm border rounded-lg overflow-hidden">
//             <thead className="bg-gray-50 text-gray-600"><tr><th className="p-2 py-3 text-left">Mata Pelajaran</th><th className="p-2 text-center">Nilai</th></tr></thead>
//             <tbody>
//               {child.grades.map((g,i)=>(<tr key={i} className="border-t"><td className="p-2 py-5">{g.subject}</td><td className="p-2 text-center">{g.score}</td></tr>))}
//             </tbody>
//           </table>
//         </div>
//         <div className="border-t border-t-white/20 pt-4 pb-2 flex items-center">
//           <div className="text-sm mb-1">Catatan guru/wali</div>
//           <div className="flex">
//             ,<p className="text-sm ml-2 list-disc">{child.notes.map((n,i)=>(<p key={i}>{n}</p>))}</p>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }
// function SectionNotifikasi({child}){
//   return (
//     <Card className="border-b border-b-white/20 pb-3">
//       <CardHeader className="border-b border-b-white/20 pb-3"><CardTitle className="text-base">📢 Notifikasi & Komunikasi — {child.name}</CardTitle></CardHeader>
//       <CardContent className="space-y-2 mt-4">
//         {child.messages.map((m,i)=>(
//           <div key={i} className="rounded-xl border p-3 flex items-start justify-between gap-3">
//             <div>
//               <div className="text-sm font-medium">{m.from}</div>
//               <div className="text-xs text-gray-500">{new Date(m.date).toLocaleString()}</div>
//               <div className="text-sm mt-1">{m.body}</div>
//             </div>
//             <div className="flex items-center gap-2"><a href="#" onClick={(e)=>{e.preventDefault(); alert("Simulasi kontak guru via WhatsApp/Email")}} className="rounded-md border px-2 py-1 text-xs">Hubungi Guru/Wali</a></div>
//           </div>
//         ))}
//         {child.messages.length===0 && <div className="text-sm text-gray-500">Tidak ada pesan.</div>}
//       </CardContent>
//     </Card>
//   )
// }
// function SectionBanding({children,allChildren}){
//   const [a,setA]=useState(children[0]?.id||allChildren[0]?.id)
//   const [b,setB]=useState(children[1]?.id||allChildren[1]?.id)
//   const ca=allChildren.find(x=>x.id===a); const cb=allChildren.find(x=>x.id===b)
//   const aAttend=attendanceRate(ca.attendance), bAttend=attendanceRate(cb.attendance)
//   const aAvg=avgGrade(ca.grades), bAvg=avgGrade(cb.grades)
//   const aPR=ca.todos.filter(t=>!t.done).length, bPR=cb.todos.filter(t=>!t.done).length
//   return (
//     <Card className="border-b border-b-white/20 pb-3">
//       <CardHeader className="border-b border-b-white/20 pb-3"><CardTitle className="text-base">👨‍👩‍👧 Perbandingan Antar Anak</CardTitle></CardHeader>
//       <CardContent className="space-y-3 mt-4">
//         <div className="flex flex-wrap gap-2 my-5 items-center text-sm">
//           <span>Pilih anak A:</span>
//           <select value={a} onChange={e=>setA(e.target.value)} className="rounded-md border px-2 py-1 bg-black">{allChildren.map(c=>(<option key={c.id} value={c.id}>{c.name}</option>))}</select>
//           <span className="ml-4">Anak B:</span>
//           <select value={b} onChange={e=>setB(e.target.value)} className="rounded-md border px-2 py-1 bg-black">{allChildren.map(c=>(<option key={c.id} value={c.id}>{c.name}</option>))}</select>
//         </div>
//         <table className="w-full text-sm border rounded-lg overflow-hidden">
//           <thead className="bg-white/20 text-white">
//             <tr>
//               <th className="p-2 text-left w-1/3">Metrik</th>
//               <th className="p-2 text-center w-1/3">{ca.name}</th>
//               <th className="p-2 text-center w-1/3">{cb.name}</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr className="border-t">
//               <td className="p-2 py-4 w-1/3">Kehadiran %</td>
//               <td className="p-2 py-4 text-center w-1/3">{aAttend}%</td>
//               <td className="p-2 py-4 text-center w-1/3">{bAttend}%</td>
//             </tr>
//             <tr className="border-t">
//               <td className="p-2 py-4 w-1/3">Nilai rata-rata</td>
//               <td className="p-2 py-4 text-center w-1/3">{aAvg}</td>
//               <td className="p-2 py-4 text-center w-1/3">{bAvg}</td>
//             </tr>
//             <tr className="border-t">
//               <td className="p-2 py-4 w-1/3">Jumlah PR belum</td>
//               <td className="p-2 py-4 text-center w-1/3">{aPR}</td>
//               <td className="p-2 py-4 text-center w-1/3">{bPR}</td>
//             </tr>
//           </tbody>
//         </table>
//         {/* <div>
//           <div className="text-sm mb-1">Grafik perbandingan (nilai)</div>
//           <Bars data={[aAvg,bAvg]} height={120}/>
//         </div> */}
//       </CardContent>
//     </Card>
//   )
// }
// function SectionFeedback(){
//   const [cat,setCat]=useState(PELAYANAN_CATEGORIES[0])
//   const stdHours=useMemo(()=>getStandardHours(cat),[cat])
//   const [scores,setScores]=useState({komunikasi:4,transparansi:4,fasilitas:3,umum:4})
//   const [saran,setSaran]=useState("")
//   const [history,setHistory]=useState([])
//   const ipm=Math.round(((scores.komunikasi+scores.transparansi+scores.fasilitas+scores.umum)/20)*100) // bintang 1-5 -> 0-100
//   const submit=()=>{ const row={date:new Date().toISOString(),category:cat,stdHours,scores:{...scores},saran,ipm}; setHistory([row,...history]); setSaran("") }
//   const Star=({value,onChange})=> (
//     <div className="inline-flex">{[1,2,3,4,5].map(i=> (<button key={i} type="button" onClick={()=>onChange(i)} className={clsx("px-0.5 text-lg", i<=value?"text-amber-500":"text-gray-300")}>★</button>))}</div>
//   )
//   return (
//     <Card className="border-b border-b-white/20 pb-3">
//       <CardHeader className="border-b border-b-white/20 pb-3"><CardTitle className="text-base">🏫 Pelayanan Masyarakat (Feedback Ortu)</CardTitle></CardHeader>
//       <CardContent className="space-y-3 mt-4">
//         {/* Kategori Layanan + standar SLA */}
//         <div className="grid grid-cols-1 gap-3 items-center">
//           <div>
//             <div className="text-sm mb-2">Kategori Layanan</div>
//             <select value={cat} onChange={e=>setCat(e.target.value)} className="w-full rounded-md border px-3 py-2 text-sm bg-black/20">
//               {PELAYANAN_CATEGORIES.map(k=> (<option className="bg-black/20" key={k} value={k}>{k}</option>))}
//             </select>
//             <div className="text-xs text-gray-500 mt-1">Standar durasi: <b>{stdHours}</b> jam</div>
//           </div>
//           <div className="md:col-span-2">
//             <div className="text-sm mb-1">Indeks Pelayanan (otomatis dari bintang)</div>
//             <div className="flex items-center gap-4">
//               <Donut value={ipm} size={100}/>
//               <div className="text-xs text-gray-500">Merah bila &lt; 60</div>
//             </div>
//           </div>
//         </div>

//         {/* Rating bintang per-aspek */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm items-center">
//           <div>Kualitas komunikasi guru</div><Star value={scores.komunikasi} onChange={v=>setScores(s=>({...s,komunikasi:v}))}/>
//           <div>Transparansi nilai & laporan</div><Star value={scores.transparansi} onChange={v=>setScores(s=>({...s,transparansi:v}))}/>
//           <div>Fasilitas sekolah</div><Star value={scores.fasilitas} onChange={v=>setScores(s=>({...s,fasilitas:v}))}/>
//           <div>Kepuasan umum</div><Star value={scores.umum} onChange={v=>setScores(s=>({...s,umum:v}))}/>
//         </div>

//         {/* Saran */}
//         <div className="border-t border-t-white/20 mt-4 pt-3">
//           <div className="text-sm mb-1">Kotak Saran</div>
//           <textarea value={saran} onChange={e=>setSaran(e.target.value)} placeholder="Tulis masukan singkat" className="w-full rounded-md border px-3 py-2 text-sm min-h-24 bg-black/20 mt-2"/>
//         </div>

//         <div className="flex justify-end"><button onClick={submit} className="rounded-md border px-3 py-2 text-sm w-full mb-3">Kirim Feedback</button></div>

//         {/* Riwayat */}
//         <div>
//           <div className="text-sm font-medium mb-1">Riwayat Feedback Saya</div>
//           {history.length===0? <div className="text-sm text-gray-500">Belum ada feedback.</div> : (
//             <ul className="text-sm space-y-2">
//               {history.map((h,i)=>(
//                 <li key={i} className={clsx("rounded border p-2", h.ipm<60 && "border-red-300 bg-red-50")}> 
//                   <div className="flex items-center justify-between">
//                     <div className="text-xs text-gray-500">{formatDateTime(h.date)} • IPM {h.ipm}</div>
//                     <div className="flex items-center gap-2"><Badge variant="outline">{h.category}</Badge><span className="text-xs text-gray-500">Std {h.stdHours}j</span></div>
//                   </div>
//                   <div className="text-xs">⭐ {h.scores.komunikasi}/{h.scores.transparansi}/{h.scores.fasilitas}/{h.scores.umum}</div>
//                   {h.saran && <div className="mt-1">{h.saran}</div>}
//                   {h.ipm<60 && <div className="mt-1 text-xs text-red-600">⚠️ Rata-rata kepuasan di bawah 60</div>}
//                   <div className="text-xs text-gray-500 mt-1">(Terkirim ke Kepala Sekolah & Dinas — contoh)</div>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </CardContent>
//     </Card>
//   )
// }
// function SectionAkun({parentName}){
//   const [name,setName]=useState(parentName); const [hp,setHp]=useState("081234567890"); const [email,setEmail]=useState("ortu@example.com"); const [pwd,setPwd]=useState("")
//   const [myKids,setMyKids]=useState(["C-1","C-2","C-3"]) // max 3
//   const addKid=()=>{ if(myKids.length>=3){ alert("Maksimal 3 anak. Hubungi sekolah untuk penambahan."); return } const id=prompt("Masukkan ID anak:"); if(id) setMyKids([...myKids,id]) }
//   const removeKid=(id)=> setMyKids(myKids.filter(x=>x!==id))
//   return (
//     <Card className="border-b border-b-white/20 pb-3">
//       <CardHeader className="border-b border-b-white/20 pb-3"><CardTitle className="text-base">🔒 Akun Orang Tua</CardTitle></CardHeader>
//       <CardContent className="space-y-3 mt-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//           <div>
//             <div className="text-sm">Nama</div>
//             <input value={name} onChange={e=>setName(e.target.value)} className="w-full rounded-md border px-3 py-2 text-sm bg-black/20 my-3"/>
//           </div>
//           <div>
//             <div className="text-sm">HP</div>
//             <input value={hp} onChange={e=>setHp(e.target.value)} className="w-full rounded-md border px-3 py-2 text-sm bg-black/20 my-3"/>
//           </div>
//           <div>
//             <div className="text-sm">Email</div>
//             <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full rounded-md border px-3 py-2 text-sm bg-black/20 my-3"/>
//           </div>
//           <div>
//             <div className="text-sm">Ganti Password</div>
//             <input type="password" value={pwd} onChange={e=>setPwd(e.target.value)} placeholder="Password baru" className="w-full rounded-md border px-3 py-2 text-sm bg-black/20 my-3"/>
//           </div>
//         </div>
//         <div>
//           <div className="text-sm font-medium mb-1">Manajemen Anak (max 3)</div>
//           <div className="flex flex-wrap gap-2 items-center mt-4">
//             {myKids.map(id=> (<span key={id} className="inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs">{id}<button onClick={()=>removeKid(id)} className="ml-1 text-gray-500">✕</button></span>))}
//             <button onClick={addKid} className="rounded-md border px-2 py-1 text-xs">+ Tambah</button>
//           </div>
//         </div>
//         <div className="flex justify-between gap-4 border-t border-t-white/20 pt-4">
//           <button onClick={()=>alert("Password diganti (simulasi)")} className="w-1/2 bg-white text-black rounded-md border px-3 py-2 text-sm">Simpan</button>
//           <button onClick={()=>alert("Logout (simulasi)")} className="w-1/2 border border-white/20 rounded-md px-3 py-2 text-sm">Logout</button>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }




import Navbar from "@/features/_global/components/navbar";
import { motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  Bell,
  BookOpen,
  CalendarDays,
  FileText,
  GraduationCap,
  HeartPulse,
  House,
  Library,
  MapPin,
  MessageSquare,
  Monitor,
  Moon,
  Navigation,
  Sun,
  UserCircle,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

/**************************************
 * Dashboard Orang Tua — Xpresensi
 * - HS (Home Schooling) indikator read-only (dikontrol admin)
 * - Peta pelacakan: hingga 4 anak sekaligus (mock SVG)
 * - Glossy cards + Dark/Light/System theme
 **************************************/

// ---------------------------------
// Mock Data
// ---------------------------------
const mockNotif = [
  { id: 1, text: "Pengumuman rapat orang tua wali pada Sabtu, 7 Sep.", time: "1 jam lalu" },
  { id: 2, text: "Pembayaran SPP bulan ini jatuh tempo 10 Sep.", time: "Kemarin" },
];

const mockChildren = [
  { id: "A1", nama: "Ahmad Ramadhan", kelas: "XI RPL-2", status: "Hadir" },
  { id: "A2", nama: "Siti Aminah", kelas: "VIII SMP", status: "Izin" },
  { id: "A3", nama: "Budi Santoso", kelas: "VII-A", status: "Di Rumah" },
  { id: "A4", nama: "Rara Putri", kelas: "XII IPA-1", status: "Hadir" },
];

// Demo pelacakan hingga 4 anak pada satu peta
const mockTracking: Record<string, { id: string; nama: string; status: string; lastSeen: string; accuracy: number; battery: number; x: number; y: number; }[]> = {
  map1: [
    { id: "A1", nama: "Ahmad Ramadhan", status: "Di Sekolah", lastSeen: "07:28 WIB (Gerbang Utama)", accuracy: 18, battery: 82, x: 22, y: 30 },
    { id: "A2", nama: "Siti Aminah", status: "Dalam Perjalanan", lastSeen: "07:05 WIB (Jalan Melati)", accuracy: 35, battery: 56, x: 60, y: 48 },
    { id: "A3", nama: "Budi Santoso", status: "Di Rumah", lastSeen: "06:55 WIB (Rumah)", accuracy: 12, battery: 64, x: 10, y: 52 },
    { id: "A4", nama: "Rara Putri", status: "Di Sekolah", lastSeen: "07:20 WIB (Parkir Timur)", accuracy: 22, battery: 71, x: 78, y: 18 },
  ],
};

// ---------------------------------
// Utils
// ---------------------------------
function clsx(...a: any[]) { return a.filter(Boolean).join(" "); }

// ---------------------------------
// Main Component
// ---------------------------------
export const DashboardMain = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState<"system" | "light" | "dark">("system");
  const [hydrated, setHydrated] = useState(false);
  // HS dikontrol admin (read-only di UI orang tua)
  const [homeSchoolingActive] = useState(true);

  const [trackConsent, setTrackConsent] = useState(true);
  const [selectedTrackIds, setSelectedTrackIds] = useState<string[]>(["A1", "A2", "A3", "A4"].slice(0, 4));

  // theme hydrate
  useEffect(() => {
    try { const saved = localStorage.getItem("theme"); if (saved === "light" || saved === "dark" || saved === "system") setTheme(saved as any); } catch {}
    setHydrated(true);
  }, []);
  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem("theme", theme); } catch {}
    if (theme === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", isDark);
    } else {
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [theme, hydrated]);

  // DEV TESTS
  useEffect(() => {
    try {
      console.assert(Array.isArray(mockTracking.map1), "mockTracking.map1 harus array");
      console.assert(selectedTrackIds.length <= 4, "selectedTrackIds <= 4");
      const mapped = mockTracking.map1.filter(p => selectedTrackIds.includes(p.id)).slice(0,4).map(p => p.id);
      console.assert(Array.isArray(mapped), ".map harus bekerja pada array (bukan object)");
    } catch {}
  }, [selectedTrackIds]);

  const namaSekolah = "SMK Negeri 13 Jakarta";
  const namaOrtu = "Bapak Andi Saputra";

  return (
    <div className="min-h-screen to-neutral-950 text-neutral-100">
      {/* Topbar */}
      <Navbar
        namaSekolah={namaSekolah}
        namaOrtu={namaOrtu}
        homeSchoolingActive={homeSchoolingActive}
        onToggleSidebar={() => setSidebarOpen((v) => !v)}
      />

      {/* Banner Home Schooling */}
      {/* {homeSchoolingActive && (
        <div className="mx-auto max-w-full px-4 pt-4">
          <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} className="flex items-center justify-between rounded-xl border border-yellow-400/30 bg-yellow-100/10 p-3 text-yellow-200">
            <div className="flex items-center gap-2"><AlertTriangle className="h-5 w-5" /><span><b>Home Schooling Aktif:</b> 3-10 Sep 2025 (Kualitas Udara)</span></div>
            <button className="text-xs underline">Lihat Kebijakan</button>
          </motion.div>
        </div>
      )} */}

      <div className="grid grid-cols-12 gap-4 md:px-4 py-6">
      {/* SIDEBAR — IDENTIK */}
      <aside
        className={clsx(
          "col-span-12 lg:col-span-3 xl:col-span-2",
          sidebarOpen ? "block" : "hidden lg:block"
        )}
      >
        <nav className="z-[9999] fixed top-[60px] md:pt-0 md:pl-0 pl-4 overflow-auto pt-4 md:top-[88px] bg-black md:bg-transparent h-screen pr-4 space-y-3 border-r border-white/20">
          <SidebarItem icon={<Activity className="h-4 w-4" />} label="Beranda" to="/" />
          <SidebarItem icon={<CalendarDays className="h-4 w-4" />} label="Jadwal Anak" to="/jadwal-anak" />
          <SidebarItem icon={<MapPin className="h-4 w-4" />} label="Pelacakan Siswa" to="/pelacakan-siswa" />
          <SidebarItem icon={<BookOpen className="h-4 w-4" />} label="Tugas & Nilai" to="/tugas-dan-nilai" />
          <SidebarItem icon={<HeartPulse className="h-4 w-4" />} label="Kesehatan" to="/kesehatan" />
          <SidebarItem icon={<Library className="h-4 w-4" />} label="Perpustakaan" to="/perpustakaan" />
          <SidebarItem icon={<MessageSquare className="h-4 w-4" />} label="Konseling" to="/konseling" />
          <SidebarItem icon={<GraduationCap className="h-4 w-4" />} label="Kenaikan & Kelulusan" to="/kenaikan-kelulusan" />
          <SidebarItem icon={<FileText className="h-4 w-4" />} label="Pelayanan" to="/pelayanan" />
          <SidebarItem icon={<UserCircle className="h-4 w-4" />} label="Profile" to="/profile" />
        </nav>
      </aside>

        {/* Main */}
        <main className="col-span-12 px-7 lg:col-span-9 xl:col-span-10 space-y-8">
          <h1 className="text-3xl font-bold flex items-center gap-4">
            <Activity className="h-10 w-10 text-teal-500" />
            Halaman Utama
          </h1>
          {homeSchoolingActive && (
            <Card className="col-span-12 mb-4" title="Mode Home Schooling" icon={Activity}>
              <p className="text-sm text-white/70">Saat ini anak belajar dari rumah. Jadwal dan presensi mengikuti mode daring.</p>
            </Card>
          )}

          <div className="grid grid-cols-12 gap-4">
            {/* Ringkasan Anak */}
            <Card className="col-span-12" title="Ringkasan Kehadiran Anak" icon={Users}>
              <ul className="divide-y divide-white/5">
                {mockChildren.map((c) => (
                  <li key={c.id} className="flex items-center justify-between py-3">
                    <div>
                      <div className="text-sm font-semibold">{c.nama}</div>
                      <div className="text-xs text-white/60">{c.kelas}</div>
                    </div>
                    <span className="text-xs text-emerald-400">{c.status}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Notifikasi */}
            <Card className="col-span-12 lg:col-span-6" title="Notifikasi" icon={Bell}>
              <ul className="divide-y divide-white/5">
                {mockNotif.map((n) => (
                  <li key={n.id} className="flex items-center justify-between py-3">
                    <div className="text-sm">{n.text}</div>
                    <div className="text-xs text-white/50">{n.time}</div>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Jadwal */}
            <Card className="col-span-12 lg:col-span-6" title="Jadwal Hari Ini" icon={CalendarDays}>
              <p className="text-sm text-white/70">Lihat jadwal pelajaran anak-anak Anda di sini.</p>
            </Card>

            {/* Peta Pelacakan (maks 4 anak) */}
            <Card className="col-span-12" title="Peta Pelacakan (maks 4 anak)" icon={MapPin}
              actions={
                <div className="flex items-center gap-2 text-sm">
                  <button onClick={()=>setTrackConsent(v=>!v)} className={clsx("rounded-xl border px-3 py-1.5",
                    trackConsent?"border-green-400/30 bg-green-500/20 text-green-300 hover:bg-green-500/30":"border-white/10 bg-white/5 text-white/70 hover:bg-white/10")}>
                    {trackConsent?"Izin Aktif":"Izin Nonaktif"}
                  </button>
                </div>
              }
            >
              {/* Controls: pilih hingga 4 anak */}
              <div className="mb-3 flex flex-wrap items-center gap-2 text-sm">
                {mockChildren.map((c) => {
                  const checked = selectedTrackIds.includes(c.id);
                  const disabled = !checked && selectedTrackIds.length >= 4;
                  return (
                    <label key={c.id} className={clsx("inline-flex items-center gap-2 rounded-lg border px-2 py-1", checked?"border-emerald-400/30 bg-emerald-500/10":"border-white/10 bg-white/5")}> 
                      <input type="checkbox" checked={checked} disabled={disabled}
                        onChange={(e)=>{
                          setSelectedTrackIds(prev=>{
                            if (e.target.checked) {
                              if (prev.includes(c.id)) return prev;
                              if (prev.length >= 4) return prev; // hard limit
                              return [...prev, c.id];
                            } else {
                              return prev.filter(x=>x!==c.id);
                            }
                          });
                        }}
                      />
                      <span>{c.nama}</span>
                    </label>
                  );
                })}
                <span className="text-xs text-white/50">(Maksimal 4 anak pada satu peta)</span>
              </div>

              {!trackConsent && (
                <div className="mb-3 rounded-lg border border-amber-400/30 bg-amber-500/10 p-3 text-sm text-amber-200">Aktifkan izin untuk melihat posisi. Data pada peta ini adalah contoh (mock) untuk demo UI.</div>
              )}

              {/* SVG Map mock */}
              <div className={clsx("relative overflow-hidden rounded-xl border border-white/10", trackConsent?"opacity-100":"opacity-40 blur-[1px]")}> 
                <svg viewBox="0 0 100 60" className="h-64 w-full">
                  {/* background grid */}
                  <defs>
                    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeOpacity="0.08" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect x="0" y="0" width="100" height="60" fill="url(#grid)" />
                  <rect x="0.5" y="0.5" width="99" height="59" rx="3" fill="none" stroke="currentColor" strokeOpacity="0.12" />

                  {/* markers */}
                  {mockTracking.map1
                    .filter((p) => selectedTrackIds.includes(p.id))
                    .slice(0, 4)
                    .map((p, idx) => {
                      const colors = ["#10b981", "#60a5fa", "#f59e0b", "#ef4444"]; // up to 4
                      const color = colors[idx % colors.length];
                      return (
                        <g key={p.id} transform={`translate(${p.x}, ${p.y})`}>
                          <circle r="3.5" fill={color} />
                          <text x="5" y="-5" fontSize="3" fill="currentColor" opacity="0.8">{p.nama}</text>
                        </g>
                      );
                    })}
                </svg>
                {/* legend */}
                <div className="absolute bottom-2 left-2 flex flex-wrap items-center gap-3 rounded-lg bg-black/40 px-2 py-1 text-[11px] backdrop-blur">
                  {mockTracking.map1.filter(p=>selectedTrackIds.includes(p.id)).slice(0,4).map((p, idx) => {
                    const colors = ["#10b981", "#60a5fa", "#f59e0b", "#ef4444"]; 
                    const color = colors[idx % colors.length];
                    return (
                      <span key={p.id} className="inline-flex items-center gap-1 text-white/80">
                        <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: color }} /> {p.nama}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* table quick details */}
              <div className="mt-3 overflow-x-auto rounded-xl border border-white/10">
                <table className="min-w-full text-sm">
                  <thead className="bg-white/5 text-white/70">
                    <tr>
                      <th className="px-3 py-2 text-left">Nama</th>
                      <th className="px-3 py-2 text-left">Status</th>
                      <th className="px-3 py-2 text-left">Terakhir</th>
                      <th className="px-3 py-2 text-left">Akurasi</th>
                      <th className="px-3 py-2 text-left">Baterai</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {mockTracking.map1.filter(p=>selectedTrackIds.includes(p.id)).slice(0,4).map(p => (
                      <tr key={p.id}>
                        <td className="px-3 py-2">{p.nama}</td>
                        <td className="px-3 py-2">
                          <span className={clsx(
                            "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px]",
                            p.status === "Di Sekolah" && "bg-emerald-500/20 text-emerald-300",
                            p.status === "Dalam Perjalanan" && "bg-sky-500/20 text-sky-300",
                            p.status === "Di Rumah" && "bg-white/10 text-white/70"
                          )}>
                            <Navigation className="h-3.5 w-3.5" /> {p.status}
                          </span>
                        </td>
                        <td className="px-3 py-2">{p.lastSeen}</td>
                        <td className="px-3 py-2">± {p.accuracy} m</td>
                        <td className="px-3 py-2">{p.battery}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-xs text-white/40">Catatan: Ini mock untuk demo. Untuk real tracking diperlukan SDK lokasi siswa, izin perangkat, serta kebijakan privasi.</p>
            </Card>
          </div>

          {/* <footer className="mt-6 pb-4 text-center text-xs text-white/40">© {new Date().getFullYear()} Xpresensi — Dashboard Orang Tua • Demo UI</footer> */}
        </main>
      </div>
    </div>
  );
}

// ---------------------------------
// UI Primitives
// ---------------------------------
function Card({ title, icon: Icon, actions, children, className = "" }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={clsx(
        "relative overflow-hidden rounded-2xl border shadow-lg backdrop-blur p-4",
        "bg-white/70 text-black border-black/10",
        "dark:bg-neutral-900/60 dark:text-white dark:border-white/10",
        className
      )}
    >
      {/* glossy overlay */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/10 opacity-40 dark:from-white/10 dark:to-white/0" />
        <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-white/50 blur-3xl opacity-20 dark:bg-white/10" />
      </div>
      {(title || actions) && (
        <div className="relative mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {Icon ? <Icon className="h-5 w-5 text-black/70 dark:text-white/80" /> : null}
            {title ? <h3 className="text-sm font-semibold tracking-wide text-black/80 dark:text-white/90">{title}</h3> : null}
          </div>
          <div className="flex items-center gap-2">{actions}</div>
        </div>
      )}
      <div className="relative">{children}</div>
    </motion.div>
  );
}

function SidebarItem({
  icon,
  label,
  to,
}: {
  icon: React.ReactNode;
  label: string;
  to: string;
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        clsx(
          "flex w-full items-center gap-3 rounded-xl border px-3 py-2 text-sm transition-all",
          isActive
            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
            : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:border-white/20"
        )
      }
    >
      <span className="grid h-7 w-7 place-content-center rounded-lg bg-white/5">
        {icon}
      </span>
      <span className="truncate text-left">{label}</span>
    </NavLink>
  );
}

/*********** DEV TESTS (console) ***********/
try {
  console.assert(!"h-4 w-4".includes("\\"), "no stray escapes in className");
  console.assert(Array.isArray(mockTracking.map1), "mockTracking.map1 is array");
  const ids = mockTracking.map1.map(p=>p.id);
  console.assert(ids.length === 4, "mockTracking has 4 points");
} catch (e) { /* no-op */ }