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

export default function PageKesehatan() {
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
    <div className="overflow-auto h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-neutral-100">
      {/* HEADER */}
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

        <main className="col-span-12 px-4 md:px-7 lg:col-span-9 xl:col-span-10 space-y-8">

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-4">
            <HeartPulse className="w-7 h-7 md:h-10 md:w-10 text-teal-500" />
              Kesehatan Anak
            </h1>

            {/* Filter & Search */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                {/* Dropdown Kelas */}
                <select className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500/50 backdrop-blur">
                  <option value="">Semua Kelas</option>
                  <option value="XI RPL-2">XI RPL-2</option>
                  <option value="VIII-A">VIII-A</option>
                  <option value="X TKJ-1">X TKJ-1</option>
                  <option value="XII AKL-3">XII AKL-3</option>
                </select>

                {/* Search by Name */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Cari nama anak..."
                    className="w-full sm:w-64 rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500/50 backdrop-blur placeholder-white/40"
                  />
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              <div className="text-sm text-white/60">
                Menampilkan <span className="text-emerald-300 font-medium">4</span> anak
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
              {/* Ahmad Ramadhan */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                <h3 className="text-xl font-bold text-teal-400 mb-6">Ahmad Ramadhan — XI RPL-2</h3>
                <div className="space-y-5 text-lg">
                  <div className="flex justify-between"><span className="text-white/70">Golongan Darah</span><span className="font-medium">O+</span></div>
                  <div className="flex justify-between"><span className="text-white/70">Tinggi Badan</span><span className="font-medium">175 cm</span></div>
                  <div className="flex justify-between"><span className="text-white/70">Berat Badan</span><span className="font-medium">68 kg</span></div>
                  <div className="flex justify-between"><span className="text-white/70">IMT</span><span className="text-emerald-400 font-bold">22.2 (Normal)</span></div>
                  <div className="flex justify-between"><span className="text-white/70">Tekanan Darah</span><span className="font-medium">120/80 mmHg</span></div>
                  <div className="flex justify-between"><span className="text-white/70">Denyut Nadi</span><span className="font-medium">72 bpm</span></div>
                  <div className="flex justify-between"><span className="text-white/70">Alergi</span><span className="font-medium">Tidak ada</span></div>
                  <div className="flex justify-between"><span className="text-white/70">Riwayat Penyakit</span><span className="font-medium">Asma ringan (terkontrol)</span></div>
                </div>
              </div>

              {/* Siti Aminah */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                <h3 className="text-xl font-bold text-teal-400 mb-6">Siti Aminah — VIII-A</h3>
                <div className="space-y-5 text-lg">
                  <div className="flex justify-between"><span className="text-white/70">Golongan Darah</span><span className="font-medium">A</span></div>
                  <div className="flex justify-between"><span className="text-white/70">Tinggi Badan</span><span className="font-medium">158 cm</span></div>
                  <div className="flex justify-between"><span className="text-white/70">Berat Badan</span><span className="font-medium">49 kg</span></div>
                  <div className="flex justify-between"><span className="text-white/70">IMT</span><span className="text-emerald-400 font-bold">19.6 (Normal)</span></div>
                  <div className="flex justify-between"><span className="text-white/70">Tekanan Darah</span><span className="font-medium">110/70 mmHg</span></div>
                  <div className="flex justify-between"><span className="text-white/70">Denyut Nadi</span><span className="font-medium">78 bpm</span></div>
                  <div className="flex justify-between"><span className="text-white/70">Alergi</span><span className="text-amber-400 font-medium">Debu, Tungau, Udang</span></div>
                  <div className="flex justify-between"><span className="text-white/70">Riwayat Penyakit</span><span className="font-medium">Rhinitis alergi</span></div>
                </div>
              </div>

              {/* Budi Santoso */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                <h3 className="text-xl font-bold text-teal-400 mb-6">Budi Santoso — X TKJ-1</h3>
                <div className="space-y-5 text-lg">
                  <div className="flex justify-between"><span className="text-white/70">Golongan Darah</span><span className="font-medium">B</span></div>
                  <div className="flex justify-between"><span className="text-white/70">Tinggi Badan</span><span className="font-medium">168 cm</span></div>
                  <div className="flex justify-between"><span className="text-white/70">Berat Badan</span><span className="font-medium">72 kg</span></div>
                  <div className="flex justify-between"><span className="text-white/70">IMT</span><span className="text-amber-400 font-bold">25.4 (Kelebihan)</span></div>
                  <div className="flex justify-between"><span className="text-white/70">Tekanan Darah</span><span className="font-medium">128/82 mmHg</span></div>
                  <div className="flex justify-between"><span className="text-white/70">Denyut Nadi</span><span className="font-medium">80 bpm</span></div>
                  <div className="flex justify-between"><span className="text-white/70">Alergi</span><span className="font-medium">Kacang tanah</span></div>
                  <div className="flex justify-between"><span className="text-white/70">Riwayat Penyakit</span><span className="font-medium">Obesitas ringan</span></div>
                </div>
              </div>

              {/* Rara Putri */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                <h3 className="text-xl font-bold text-teal-400 mb-6">Rara Putri — XII AKL-3</h3>
                <div className="space-y-5 text-lg">
                  <div className="flex justify-between"><span className="text-white/70">Golongan Darah</span><span className="font-medium">AB</span></div>
                  <div className="flex justify-between"><span className="text-white/70">Tinggi Badan</span><span className="font-medium">162 cm</span></div>
                  <div className="flex justify-between"><span className="text-white/70">Berat Badan</span><span className="font-medium">52 kg</span></div>
                  <div className="flex justify-between"><span className="text-white/70">IMT</span><span className="text-emerald-400 font-bold">19.8 (Normal)</span></div>
                  <div className="flex justify-between"><span className="text-white/70">Tekanan Darah</span><span className="font-medium">115/75 mmHg</span></div>
                  <div className="flex justify-between"><span className="text-white/70">Denyut Nadi</span><span className="font-medium">70 bpm</span></div>
                  <div className="flex justify-between"><span className="text-white/70">Alergi</span><span className="font-medium">Tidak ada</span></div>
                  <div className="flex justify-between"><span className="text-white/70">Riwayat Penyakit</span><span className="font-medium">Anemia ringan (perbaikan)</span></div>
                </div>
              </div>
            </div>

            {/* Catatan Umum */}
            <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h3 className="text-lg font-semibold mb-3">Catatan dari Petugas Kesehatan Sekolah</h3>
              <p className="text-white/70 leading-relaxed">
                Semua anak dalam kondisi sehat dan siap mengikuti kegiatan belajar. 
                Budi Santoso sedang dalam program penurunan berat badan bersama guru olahraga. 
                Siti Aminah diminta membawa obat alergi (antihistamin) setiap hari. 
                Rara Putri terus konsumsi suplemen zat besi sesuai anjuran dokter.
              </p>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}