import clsx from "clsx";
import { motion } from "framer-motion";
import {
  Activity,
  Bell,
  BookOpen,
  CalendarDays,
  FileText,
  GraduationCap,
  HeartPulse, Library,
  MapPin,
  MessageSquare,
  Monitor,
  Moon,
  Sun,
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

export default function PageKenaikan() {
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
          {/* Sidebar aktif: Kenaikan & Kelulusan */}

          <h1 className="text-3xl font-bold flex items-center gap-4">
            <GraduationCap className="h-10 w-10 text-teal-500" />
            Kenaikan Kelas & Kelulusan
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8">
              <h3 className="text-2xl font-bold text-emerald-400 mb-4">Ahmad Ramadhan</h3>
              <p className="text-lg">Kelas XI RPL-2 → <strong className="text-emerald-300">Naik ke XII RPL-2</strong></p>
              <p className="text-sm text-white/60 mt-4">Status: <span className="text-emerald-300 font-semibold">LULUS TAHUN AJARAN 2025/2026</span></p>
            </div>
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-8">
              <h3 className="text-2xl font-bold text-amber-400 mb-4">Siti Aminah</h3>
              <p className="text-lg">Kelas VIII-A → <strong className="text-amber-300">Naik ke IX-A</strong></p>
              <p className="text-sm text-white/60 mt-4">Status: <span className="text-amber-300 font-semibold">Masih Proses Penilaian</span></p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
            <p className="text-5xl font-bold text-teal-400">Selamat!</p>
            <p className="text-xl mt-4">Ahmad Ramadhan dinyatakan <strong>LULUS 100%</strong> dan siap melanjutkan ke kelas XII.</p>
          </div>
        </main>
      </div>
    </div>
  );
}