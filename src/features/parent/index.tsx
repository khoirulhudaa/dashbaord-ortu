import { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import clsx from "clsx";
import { motion } from "framer-motion";
import {
  Users, Sun, Moon, Monitor, Bell, UserCircle,
  CalendarDays, MapPin, BookOpen, HeartPulse, Library,
  MessageSquare, GraduationCap, FileText
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

export default function ParentLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [homeSchoolingActive] = useState(true);
  const namaSekolah = "SMK Negeri 13 Jakarta";
  const namaOrtu = "Bapak Andi Saputra";

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setTheme(saved as any);
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
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-neutral-100">
      {/* HEADER – STICKY */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-neutral-950/70 backdrop-blur-lg">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              className="rounded-xl border border-white/10 p-2 hover:bg-white/5 lg:hidden"
              onClick={() => setSidebarOpen(v => !v)}
            >
              <div className="h-4 w-5">
                <span className="mb-1.5 block h-0.5 w-full bg-white" />
                <span className="mb-1.5 block h-0.5 w-4/5 bg-white" />
                <span className="block h-0.5 w-3/5 bg-white" />
              </div>
            </button>
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-content-center rounded-xl bg-emerald-500/20 text-emerald-300">
                <Users className="h-5 w-5" />
              </div>
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
            {homeSchoolingActive && (
              <span className="rounded-xl border border-green-400/30 bg-green-500/20 px-3 py-1.5 text-sm text-green-300">HS Aktif</span>
            )}
            <button className="rounded-xl border border-white/10 p-2 hover:bg-white/5"><Bell className="h-5 w-5" /></button>
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5">
              <UserCircle className="h-5 w-5" />
              <span className="text-sm font-medium">{namaOrtu}</span>
            </div>
          </div>
        </div>
      </header>

      {/* HS BANNER */}
      {homeSchoolingActive && (
        <div className="fixed top-16 left-0 right-0 z-40 px-4 pt-4 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-7xl pointer-events-auto"
          >
            <div className="flex items-center justify-between rounded-xl border border-yellow-400/30 bg-yellow-100/10 p-3 text-yellow-200">
              <div className="flex items-center gap-2"><strong>Home Schooling Aktif:</strong> 3-10 Sep 2025 (Kualitas Udara)</div>
              <button className="text-xs underline">Lihat Kebijakan</button>
            </div>
          </motion.div>
        </div>
      )}

      {/* SIDEBAR – FIXED & STICKY */}
      <aside
        className={clsx(
          "fixed inset-y-0 left-0 z-40 w-64 translate-x-0 transform bg-neutral-950/90 backdrop-blur-lg border-r border-white/10 pt-20 transition-transform duration-300 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <nav className="h-full overflow-y-auto px-4 pb-10 space-y-2">
          <SidebarItem icon={<CalendarDays className="h-4 w-4" />} label="Jadwal Anak" to="/parent/jadwal-anak" />
          <SidebarItem icon={<MapPin className="h-4 w-4" />} label="Pelacakan Siswa" to="/parent/pelacakan-siswa" />
          <SidebarItem icon={<BookOpen className="h-4 w-4" />} label="Tugas & Nilai" to="/parent/tugas-dan-nilai" />
          <SidebarItem icon={<HeartPulse className="h-4 w-4" />} label="Kesehatan" to="/parent/kesehatan" />
          <SidebarItem icon={<Library className="h-4 w-4" />} label="Perpustakaan" to="/parent/perpustakaan" />
          <SidebarItem icon={<MessageSquare className="h-4 w-4" />} label="Konseling" to="/parent/konseling" />
          <SidebarItem icon={<GraduationCap className="h-4 w-4" />} label="Kenaikan & Kelulusan" to="/parent/kenaikan-kelulusan" />
          <SidebarItem icon={<FileText className="h-4 w-4" />} label="Pelayanan" to="/parent/pelayanan" />
          <SidebarItem icon={<UserCircle className="h-4 w-4" />} label="Profil" to="/parent/profil" />
        </nav>
      </aside>

      {/* BACKDROP MOBILE */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/70 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* MAIN CONTENT – MULAI DARI KIRI SIDEBAR */}
      <main className="lg:pl-64 pt-20 min-h-screen">
        {/* Padding atas untuk header (72px) + HS banner */}
        <div className={clsx("px-4 py-6", homeSchoolingActive ? "pt-32" : "pt-24")}>
          <Outlet /> {/* ← Isi halaman muncul di sini */}
        </div>
      </main>
    </div>
  );
}