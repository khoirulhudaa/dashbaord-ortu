import clsx from "clsx";
import { motion } from "framer-motion";
import {
    Activity,
    Battery,
    Bell,
    BookOpen,
    CalendarDays,
    Clock,
    FileText,
    GraduationCap,
    HeartPulse, Library,
    MapPin,
    MessageSquare,
    Monitor,
    Moon,
    Navigation,
    Sun,
    Target,
    UserCircle,
    Users
} from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function SidebarItem({ icon, label, to }: { icon: React.ReactNode; label: string; to: string }) {
  return (
    <NavLink to={to} className={({ isActive }) => clsx(
      "flex w-full items-center gap-3 rounded-xl border px-3 py-2 text-sm transition-all",
      isActive ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300" : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:border-white/20"
    )}>
      <span className="grid h-7 w-7 place-content-center rounded-lg bg-white/5">{icon}</span>
      <span className="truncate text-left">{label}</span>
    </NavLink>
  );
}

const jadwalKonseling = [
  { tanggal: "25 Nov 2025", jam: "14:00", guru: "Ibu Siti Nurhaliza, M.Pd", topik: "Motivasi Belajar & Manajemen Waktu", status: "Terjadwal" },
  { tanggal: "18 Nov 2025", jam: "15:30", guru: "Bapak Ahmad Yani, S.Psi", topik: "Menghadapi Stres Ujian", status: "Selesai" },
  { tanggal: "10 Nov 2025", jam: "13:45", guru: "Ibu Siti Nurhaliza, M.Pd", topik: "Pemilihan Jurusan & Karir", status: "Selesai" },
];

const siswaData = [
  { nama: "Ahmad Ramadhan", kelas: "XI RPL-2", status: "Di Sekolah", lastSeen: "07:28 WIB", battery: 82, color: "#10b981", x: 50, y: 50 },
  { nama: "Siti Aminah", kelas: "VIII-A", status: "Dalam Perjalanan", lastSeen: "07:25 WIB", battery: 56, color: "#60a5fa", x: 25, y: 70 },
  { nama: "Budi Santoso", kelas: "X TKJ-1", status: "Di Rumah", lastSeen: "06:55 WIB", battery: 64, color: "#f59e0b", x: 80, y: 30 },
  { nama: "Rara Putri", kelas: "XII AKL-3", status: "Di Sekolah", lastSeen: "07:20 WIB", battery: 71, color: "#8b5cf6", x: 52, y: 48 },
];

export default function PagePelacakanSiswa() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<"light"|"dark"|"system">("system");
  const [homeSchoolingActive] = useState(true);
  const namaSekolah = "SMK Negeri 13 Jakarta";
  const namaOrtu = "Bapak Andi Saputra";

  // theme logic sama seperti sebelumnya
  useEffect(() => { const saved = localStorage.getItem("theme"); if (saved) setTheme(saved as any); }, []);
  useEffect(() => { localStorage.setItem("theme", theme); /* apply theme */ }, [theme]);

  return (
    <div className="overflow-auto h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-neutral-100">
      {/* HEADER */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-neutral-950/70 backdrop-blur">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button className="rounded-xl border border-white/10 p-2 hover:bg-white/5 lg:hidden" onClick={() => setSidebarOpen(v => !v)}>
              <div className="h-4 w-5">
                <span className="mb-1.5 block h-0.5 w-full bg-white" />
                <span className="mb-1.5 block h-0.5 w-4/5 bg-white" />
                <span className="block h-0.5 w-3/5 bg-white" />
              </div>
            </button>
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-content-center rounded-xl bg-emerald-500/20 text-emerald-300"><Users className="h-5 w-5" /></div>
              <div>
                <div className="text-xs uppercase tracking-wide text-white/60">{namaSekolah}</div>
                <div className="text-sm font-semibold">Dashboard Orang Tua</div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-1 rounded-xl border border-white/10 bg-white/5 p-1">
              <button onClick={() => setTheme("light")} className={clsx("rounded-lg p-1", theme === "light" ? "bg-white/20 text-yellow-400" : "text-white/60")}><Sun className="h-4 w-4" /></button>
              <button onClick={() => setTheme("dark")} className={clsx("rounded-lg p-1", theme === "dark" ? "bg-white/20 text-blue-400" : "text-white/60")}><Moon className="h-4 w-4" /></button>
              <button onClick={() => setTheme("system")} className={clsx("rounded-lg p-1", theme === "system" ? "bg-white/20 text-green-400" : "text-white/60")}><Monitor className="h-4 w-4" /></button>
            </div>
            {homeSchoolingActive && <span className="rounded-xl border border-green-400/30 bg-green-500/20 px-3 py-1.5 text-sm text-green-300">HS Aktif</span>}
            <button className="rounded-xl border border-white/10 p-2 hover:bg-white/5"><Bell className="h-5 w-5" /></button>
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5">
              <UserCircle className="h-5 w-5" /><div className="text-sm font-medium">{namaOrtu}</div>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-4 px-4 py-6">
        <aside className={clsx("col-span-12 lg:col-span-3 xl:col-span-2", sidebarOpen ? "block" : "hidden lg:block")}>
          <nav className="fixed top-[88px] h-screen pr-4 space-y-3 border-r border-white/20">
            <SidebarItem icon={<Activity className="h-4 w-4" />} label="Beranda" to='/' />
            <SidebarItem icon={<CalendarDays className="h-4 w-4" />} label="Jadwal Anak" to="/jadwal-anak" />
            <SidebarItem icon={<MapPin className="h-4 w-4" />} label="Pelacakan Siswa" to="/pelacakan-siswa" />
            <SidebarItem icon={<BookOpen className="h-4 w-4" />} label="Tugas & Nilai" to="/tugas-dan-nilai" />
            <SidebarItem icon={<HeartPulse className="h-4 w-4" />} label="Kesehatan" to="/kesehatan" />
            <SidebarItem icon={<Library className="h-4 w-4" />} label="Perpustakaan" to="/perpustakaan" />
            <SidebarItem icon={<MessageSquare className="h-4 w-4" />} label="Konseling" to="/konseling" />
            <SidebarItem icon={<GraduationCap className="h-4 w-4" />} label="Kenaikan & Kelulusan" to="/kenaikan-kelulusan" />
            <SidebarItem icon={<FileText className="h-4 w-4" />} label="Pelayanan" to="/pelayanan" />
            {/* <SidebarItem /icon={<UserCircle className="h-4 w-4" />} label="Profil" to="/profil" /> */}
          </nav>
        </aside>

        <main className="col-span-12 px-7 lg:col-span-9 xl:col-span-10 space-y-8">
          <h1 className="text-3xl font-bold flex items-center gap-4">
            <Target className="h-10 w-10 text-teal-500" />
            Pelacakan Siswa
          </h1>

          {/* PETA DENGAN RADIUS SEKOLAH */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl overflow-hidden"
          >
            <div className="relative h-96 md:h-[560px] rounded-3xl bg-gradient-to-b from-sky-900/30 via-neutral-900 to-neutral-950 overflow-hidden">

              {/* Radius Area Sekolah */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {/* 1km */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute w-96 h-96 rounded-full border-2 border-teal-500/20"
                />
                <div className="absolute w-96 h-96 rounded-full border border-teal-500/10" />
                <span className="absolute text-teal-400/80 text-xs font-medium -top-8">1 km</span>

                {/* 500m */}
                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute w-64 h-64 rounded-full border-2 border-emerald-500/30"
                />
                <div className="absolute w-64 h-64 rounded-full border border-emerald-500/15" />
                <span className="absolute text-emerald-400 text-xs font-medium -top-8 mt-32">500 m</span>
              </div>

              {/* Gedung Sekolah */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl">
                <div className="h-56 bg-gradient-to-t from-neutral-800 via-neutral-700 to-neutral-600 rounded-t-3xl border-t-8 border-teal-500 shadow-2xl relative">
                  <div className="absolute inset-x-0 -top-8 h-16 bg-gradient-to-b from-teal-500/40 to-transparent blur-xl" />
                  <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center">
                    <p className="text-3xl font-black text-teal-300 tracking-widest">SMK NEGERI 13</p>
                    <p className="text-sm text-teal-200/80 mt-1">JAKARTA</p>
                  </div>
                </div>
              </div>

              {/* Jalan & Elemen Lain */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-60">
                <path d="M0,400 Q500,380 1000,400" stroke="#475569" strokeWidth="12" fill="none" />
                <path d="M100,200 L100,600" stroke="#475569" strokeWidth="8" fill="none" />
                <path d="M900,200 L900,600" stroke="#475569" strokeWidth="8" fill="none" />
              </svg>

              {/* Titik Siswa dengan Pulse */}
              {siswaData.map((s) => (
                <motion.div
                  key={s.nama}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${s.x}%`, top: `${s.y}%` }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: s.nama === "Ahmad Ramadhan" ? 0.5 : 0.7 }}
                >
                  <div className="relative">
                    <motion.div
                      animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: s.color }}
                    />
                    <div className="relative w-14 h-14 rounded-full border-4 border-white/60 shadow-2xl flex items-center justify-center" style={{ backgroundColor: s.color }}>
                      <div className="w-5 h-5 bg-white rounded-full shadow-lg" />
                    </div>
                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/90 backdrop-blur-xl px-4 py-2 rounded-xl border border-white/10 text-xs font-bold">
                      {s.nama.split(" ")[0]}
                      <div className="text-[10px] font-normal text-white/70 mt-0.5">{s.status}</div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Legend */}
              <div className="absolute bottom-6 left-6 right-6 bg-black/80 backdrop-blur-2xl border border-white/20 rounded-2xl p-5">
                <p className="text-sm font-semibold text-white/90 mb-3">Legenda Siswa</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {siswaData.map((s) => (
                    <div key={s.nama} className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full shadow-lg" style={{ backgroundColor: s.color }} />
                      <div>
                        <p className="text-xs font-medium">{s.nama.split(" ")[0]}</p>
                        <p className="text-xs text-white/60">{s.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* TABEL STATUS (sama seperti sebelumnya, tetap cantik) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 rounded-3xl border border-white/10 bg-white/5 overflow-hidden shadow-2xl"
          >
            <div className="p-6 border-b border-white/10 bg-white/5">
              <h3 className="text-2xl font-bold">Status Terkini Anak</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-white/60 text-sm border-b border-white/10">
                    <th className="px-6 py-5">Nama Siswa</th>
                    <th className="px-6 py-5">Kelas</th>
                    <th className="px-6 py-5">Status</th>
                    <th className="px-6 py-5">Terakhir Dilihat</th>
                    <th className="px-6 py-5">Baterai</th>
                  </tr>
                </thead>
                <tbody>
                  {siswaData.map((s) => (
                    <tr key={s.nama} className="border-b border-white/5 hover:bg-white/5 transition-all">
                      <td className="px-6 py-5 font-medium text-lg">{s.nama}</td>
                      <td className="px-6 py-5 text-white/70">{s.kelas}</td>
                      <td className="px-6 py-5">
                        <span className={clsx(
                          "inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold",
                          s.status === "Di Sekolah" && "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40",
                          s.status === "Dalam Perjalanan" && "bg-sky-500/20 text-sky-300 border border-sky-500/40",
                          s.status === "Di Rumah" && "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                        )}>
                          <Navigation className="h-4 w-4" />
                          {s.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-white/70 flex items-center gap-3">
                        <Clock className="h-5 w-5" />
                        {s.lastSeen}
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <Battery className={clsx("h-7 w-7", s.battery > 60 ? "text-emerald-400" : s.battery > 30 ? "text-amber-400" : "text-red-400")} />
                          <span className={clsx("text-lg font-bold", s.battery < 30 && "text-red-400")}>{s.battery}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}