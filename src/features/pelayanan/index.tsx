import clsx from "clsx";
import { motion } from "framer-motion";
import {
  Activity,
  BookOpen,
  CalendarDays,
  FileText,
  GraduationCap,
  HeartPulse, Library,
  MapPin,
  MessageSquare,
  UserCircle
} from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../_global/components/navbar";

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

export default function PagePelayanan() {
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
            <h1 className="text-3xl font-bold flex items-center gap-4 mb-8">
              <FileText className="h-10 w-10 text-teal-500" />
              Pelayanan Administrasi
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {["Surat Keterangan Aktif Kuliah", "Legalisir Ijazah", "Pindah Sekolah", "Beasiswa", "Pengambilan Raport", "Izin Tidak Masuk", "Pengajuan Cuti", "Surat Rekomendasi"].map((p, i) => (
                <motion.div key={i} whileHover={{ scale: 1.05 }} className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center cursor-pointer hover:border-teal-500/50 transition-all">
                  <div className="grid h-16 w-16 mx-auto place-content-center rounded-xl bg-teal-500/20 text-teal-300 mb-4">
                    <FileText className="h-8 w-8" />
                  </div>
                  <p className="font-medium">{p}</p>
                  <p className="text-xs text-white/60 mt-2">Klik untuk ajukan</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-xl font-semibold mb-4">Pengajuan Terakhir</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                  <span>Surat Keterangan Aktif Kuliah - Ahmad</span>
                  <span className="text-emerald-300 text-sm">Disetujui</span>
                </div>
                <div className="flex justify-between items-center p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
                  <span>Izin Tidak Masuk - Siti (3 hari)</span>
                  <span className="text-amber-300 text-sm">Menunggu Persetujuan</span>
                </div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}