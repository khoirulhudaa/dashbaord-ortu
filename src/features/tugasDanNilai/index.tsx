import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { motion } from "framer-motion";
import {
  Users, Sun, Moon, Monitor, Bell, UserCircle,
  CalendarDays, MapPin, BookOpen, HeartPulse, Library,
  MessageSquare, GraduationCap, FileText, TrendingUp,
  Activity
} from "lucide-react";

function SidebarItem({ icon, label, to }: { icon: React.ReactNode; label: string; to: string }) {
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
      <span className="grid h-7 w-7 place-content-center rounded-lg bg-white/5">{icon}</span>
      <span className="truncate text-left">{label}</span>
    </NavLink>
  );
}

const nilaiData = [
  { mapel: "Matematika", nilai: 88, trend: "up" },
  { mapel: "B. Indonesia", nilai: 92, trend: "up" },
  { mapel: "IPA", nilai: 79, trend: "down" },
  { mapel: "B. Inggris", nilai: 85, trend: "up" },
  { mapel: "Pemrograman Web", nilai: 90, trend: "up" },
  { mapel: "Basis Data", nilai: 87, trend: "up" },
];

const tugasBelum = [
  "Latihan Soal Matematika Bab 5",
  "Essay B. Indonesia: Tokoh Pahlawan",
  "Laporan Praktikum IPA: Fotosintesis",
  "Tugas Kelompok Pemrograman Web",
];

export default function PageTugasNilai() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [homeSchoolingActive] = useState(true);
  const namaSekolah = "SMK Negeri 13 Jakarta";
  const namaOrtu = "Bapak Andi Saputra";

  useEffect(() => { /* theme logic sama */ }, [theme]);

  const rataRata = Math.round(nilaiData.reduce((a, b) => a + b.nilai, 0) / nilaiData.length);

  return (
    <div className="h-screen overflow-auto bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-neutral-100">
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
            <BookOpen className="h-10 w-10 text-teal-500" />
            Tugas & Nilai
          </h1>

          {/* Rata-rata Nilai */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {nilaiData.map((n) => (
              <motion.div
                key={n.mapel}
                whileHover={{ scale: 1.03 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center"
              >
                <p className="text-sm text-white/70">{n.mapel}</p>
                <p className="text-4xl font-bold text-teal-400 mt-2">{n.nilai}</p>
                <div className="flex justify-center mt-2">
                  <TrendingUp className={`h-5 w-5 ${n.trend === "up" ? "text-emerald-400" : "text-red-400 rotate-180"}`} />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Rata-rata Besar */}
            <div className="rounded-2xl border border-teal-500/30 bg-teal-500/10 p-8 text-center">
              <p className="text-lg text-teal-300">Rata-rata Nilai Semester Ini</p>
              <p className="text-7xl font-bold text-teal-400 mt-4">{rataRata}</p>
            </div>

            {/* Tugas Belum Selesai */}
            <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span className="text-red-400">Tugas / PR Belum Selesai</span>
              </h3>
              <div className="space-y-3">
                {tugasBelum.map((t, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                    <span className="text-sm">{t}</span>
                    <span className="text-xs px-3 py-1 rounded-full bg-red-500/20 text-red-300">Belum</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}