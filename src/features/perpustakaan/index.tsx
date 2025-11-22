import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { motion } from "framer-motion";
import {
  Users, Sun, Moon, Monitor, Bell, UserCircle,
  CalendarDays, MapPin, BookOpen, HeartPulse, Library,
  MessageSquare, GraduationCap, FileText,
  Navigation, Battery, Clock,
  Activity
} from "lucide-react";
import Navbar from "../_global/components/navbar";

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

const siswaData = [
  { nama: "Ahmad Ramadhan", kelas: "XI RPL-2", status: "Di Sekolah", lastSeen: "07:28 WIB", battery: 82, color: "#10b981", x: 28, y: 32 },
  { nama: "Siti Aminah", kelas: "VIII-A", status: "Dalam Perjalanan", lastSeen: "07:12 WIB", battery: 56, color: "#60a5fa", x: 72, y: 45 },
  { nama: "Budi Santoso", kelas: "X TKJ-1", status: "Di Rumah", lastSeen: "06:55 WIB", battery: 64, color: "#f59e0b", x: 15, y: 50 },
  { nama: "Rara Putri", kelas: "XII AKL-3", status: "Di Sekolah", lastSeen: "07:20 WIB", battery: 71, color: "#8b5cf6", x: 85, y: 25 },
];

export default function PagePerpustakaan() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [homeSchoolingActive] = useState(true);
  const namaSekolah = "SMK Negeri 13 Jakarta";
  const namaOrtu = "Bapak Andi Saputra";

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark" || saved === "system") setTheme(saved as any);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", isDark);
    } else {
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [theme]);

  return (
    <div className="h-screen overflow-auto bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-neutral-100">
     {/* HEADER — PERSIS SAMA */}
        <Navbar
          namaSekolah={namaSekolah}
          namaOrtu={namaOrtu}
          homeSchoolingActive={homeSchoolingActive}
          onToggleSidebar={() => setSidebarOpen(v => !v)}
        />
  
        <div className="grid grid-cols-12 gap-4 md:px-4 py-6">
          <aside className={clsx("col-span-12 lg:col-span-3 xl:col-span-2", sidebarOpen ? "block" : "hidden lg:block")}>
            <nav className="z-[9999] fixed top-[60px] md:pt-0 md:pl-0 pl-4 overflow-auto pt-4 md:top-[88px] bg-black md:bg-transparent h-screen pr-4 space-y-3 border-r border-white/20">
            <SidebarItem icon={<Activity className="h-4 w-4" />} label="Beranda" to='/' />
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

        <main className="col-span-12 px-7 lg:col-span-9 xl:col-span-10 space-y-8">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-bold flex items-center mb-8 gap-4">
              <Library className="h-10 w-10 text-teal-500" />
              Perpustakaan Digital
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
              <div className="rounded-2xl border border-teal-500/30 bg-teal-500/10 p-8 text-center">
                <p className="text-6xl font-bold text-teal-400">12</p>
                <p className="text-white/70 mt-2">Total Pinjaman</p>
              </div>
              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-8 text-center">
                <p className="text-6xl font-bold text-amber-400">3</p>
                <p className="text-white/70 mt-2">Sedang Dipinjam</p>
              </div>
              <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-8 text-center">
                <p className="text-6xl font-bold text-red-400">1</p>
                <p className="text-white/70 mt-2">Terlambat</p>
              </div>
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center">
                <p className="text-6xl font-bold text-emerald-400">8</p>
                <p className="text-white/70 mt-2">Sudah Dikembalikan</p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <h3 className="text-xl font-semibold">Riwayat Peminjaman</h3>
              </div>
              <table className="w-full text-sm">
                <thead className="bg-white/5">
                  <tr>
                    <th className="text-left p-4">Judul Buku</th>
                    <th className="text-left p-4">Tanggal Pinjam</th>
                    <th className="text-left p-4">J b t Tempo</th>
                    <th className="text-left p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr><td className="p-4">Fisika Dasar Jilid 2</td><td className="p-4">10 Nov 2025</td><td className="p-4">24 Nov 2025</td><td className="p-4"><span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs">Dipinjam</span></td></tr>
                  <tr><td className="p-4">Novel Sejarah Indonesia</td><td className="p-4">15 Okt 2025</td><td className="p-4 text-red-400">29 Okt 2025</td><td className="p-4"><span className="px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-xs">Terlambat</span></td></tr>
                  <tr><td className="p-4">Algoritma & Pemrograman</td><td className="p-4">1 Nov 2025</td><td className="p-4">15 Nov 2025</td><td className="p-4"><span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs">Dipinjam</span></td></tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}