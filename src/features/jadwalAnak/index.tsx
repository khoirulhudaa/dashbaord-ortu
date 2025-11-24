// src/pages/parent/JadwalAnak.tsx
import clsx from "clsx";
import { motion } from "framer-motion";
import {
  Activity, CalendarDays, Clock, Download, Home, MapPin, BookOpen,
  HeartPulse, Library, MessageSquare, GraduationCap, FileText,
  UserCircle, ChevronRight, User, School, AlertCircle
} from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Navbar from "../_global/components/navbar";

interface Anak {
  id: string;
  nama: string;
  kelas: string;
  foto?: string;
}

interface JadwalHarian {
  hari: string;
  jamMasuk: string;
  jamPulang: string;
  mataPelajaran: string[];
  guruWali?: string;
  catatan?: string;
}

const dataAnak: Anak[] = [
  { id: "1", nama: "Ahmad Ramadhan", kelas: "XI RPL-2" },
  { id: "2", nama: "Siti Aminah", kelas: "VIII-A" },
];

const jadwalAnak1: JadwalHarian[] = [
  { hari: "Senin", jamMasuk: "07:00", jamPulang: "14:30", mataPelajaran: ["Matematika", "PKN", "B. Indonesia", "Praktek RPL"], guruWali: "Ibu Siti Nurhaliza" },
  { hari: "Selasa", jamMasuk: "07:00", jamPulang: "14:30", mataPelajaran: ["Pemrograman Web", "Basis Data", "B. Inggris", "Agama"] },
  { hari: "Rabu", jamMasuk: "07:00", jamPulang: "14:00", mataPelajaran: ["Sistem Komputer", "Jaringan Dasar", "Produktif", "PPKN"] },
  { hari: "Kamis", jamMasuk: "07:00", jamPulang: "14:30", mataPelajaran: ["Praktek Kejuruan", "B. Indonesia", "Matematika", "Sejarah"] },
  { hari: "Jumat", jamMasuk: "07:00", jamPulang: "11:30", mataPelajaran: ["Agama", "Senbud", "Praktek Sholat Jumat"] },
];

const jadwalAnak2: JadwalHarian[] = [
  { hari: "Senin", jamMasuk: "07:30", jamPulang: "13:45", mataPelajaran: ["IPA", "IPS", "Seni Budaya", "PJOK"] },
  { hari: "Selasa", jamMasuk: "07:30", jamPulang: "13:45", mataPelajaran: ["Matematika", "B. Indonesia", "B. Inggris", "Prakarya"] },
  // ... tambah sesuai kebutuhan
];

const hariIni = new Date().toLocaleDateString("id-ID", { weekday: "long" });

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

export default function PageJadwalAnak() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [anakTerpilih, setAnakTerpilih] = useState<Anak>(dataAnak[0]);
  const [homeSchoolingActive] = useState(true);
  const namaSekolah = "SMK Negeri 13 Jakarta";
  const namaOrtu = "Bapak Andi Saputra";

  const jadwalAktif = anakTerpilih.id === "1" ? jadwalAnak1 : jadwalAnak2;

  // Auto close sidebar saat ganti route (tambahan safety)
  const location = useLocation();
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, [location.pathname]);

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
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-4">
                  <CalendarDays className="w-7 h-7 md:h-10 md:w-10 text-teal-500" />
                  Jadwal Pelajaran
                </h1>
              </div>
              {/* <button className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm hover:bg-white/10 transition">
                <Download className="h-4 w-4" />
                Download PDF
              </button> */}
            </div>

            {/* Info Anak & HS Badge */}
            <div className="mt-8 flex flex-wrap items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-center gap-3">
                <School className="h-5 w-5 text-teal-400" />
                <span>{anakTerpilih.kelas} • SMK Negeri 13 Jakarta</span>
              </div>
              {homeSchoolingActive && (
                <span className="rounded-lg bg-green-500/20 px-3 py-1 text-sm text-green-300 border border-green-400/30">
                  Home Schooling Aktif
                </span>
              )}
            </div>

            {/* Jadwal per Hari */}
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {jadwalAktif.map((j) => (
                <motion.div
                  key={j.hari}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className={clsx(
                    "rounded-2xl border p-6 backdrop-blur",
                    j.hari === hariIni
                      ? "border-emerald-500/50 bg-emerald-500/10"
                      : "border-white/10 bg-white/5"
                  )}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold">{j.hari}</h3>
                      {j.hari === hariIni && (
                        <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded-full">Hari Ini</span>
                      )}
                    </div>
                    <Clock className="h-5 w-5 text-white/60" />
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/60">Jam Belajar</span>
                      <span className="font-medium">{j.jamMasuk} – {j.jamPulang}</span>
                    </div>

                    <div>
                      <p className="text-white/60 mb-2">Mata Pelajaran:</p>
                      <ul className="space-y-1.5 text-white/90">
                        {j.mataPelajaran.map((mapel, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                            {mapel}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {j.catatan && (
                      <div className="mt-4 flex items-start gap-2 text-amber-300 text-xs">
                        <AlertCircle className="h-4 w-4 mt-0.5" />
                        <span>{j.catatan}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}