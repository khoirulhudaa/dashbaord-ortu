// src/pages/parent/JadwalAnak.tsx
import clsx from "clsx";
import { motion } from "framer-motion";
import { Activity, Bell, BookOpen, CalendarDays, Clock, FileText, GraduationCap, HeartPulse, Library, MapPin, MessageSquare, Monitor, Moon, Sun, UserCircle, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

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
  const [sidebarOpen, setSidebarOpen] = useState(true);
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

  const jadwal = [
    { hari: "Senin", anak: "Ahmad Ramadhan", kelas: "XI RPL-2", jam: "07:00–14:30", mapel: "Matematika, PKN, B. Indonesia, Praktek RPL" },
    { hari: "Senin", anak: "Siti Aminah", kelas: "VIII-A", jam: "07:30–13:45", mapel: "IPA, IPS, Seni Budaya, PJOK" },
    { hari: "Selasa", anak: "Ahmad Ramadhan", kelas: "XI RPL-2", jam: "07:00–14:30", mapel: "Pemrograman Web, Basis Data, B. Inggris" },
  ];

  return (
    <div className="overflow-auto h-screen text-neutral-100 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950">
      {/* HEADER — PERSIS SAMA */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-neutral-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-full items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              className="rounded-xl border border-white/10 p-2 hover:bg-white/5 lg:hidden"
              onClick={() => setSidebarOpen(v => !v)}
              aria-label="Toggle Menu"
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
              <div className="text-sm font-medium">{namaOrtu}</div>
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
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="mb-6 text-2xl font-bold flex items-center gap-3">
              <CalendarDays className="h-8 w-8 text-teal-500" />
              Jadwal Anak
            </h1>

            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-white/10">
                    <tr>
                      <th className="text-left py-4">Hari</th>
                      <th className="text-left py-4">Nama Anak</th>
                      <th className="text-left py-4">Kelas</th>
                      <th className="text-left py-4">Jam</th>
                      <th className="text-left py-4">Mata Pelajaran</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {jadwal.map((j, i) => (
                      <tr key={i}>
                        <td className="py-4 font-medium">{j.hari}</td>
                        <td className="py-4">{j.anak}</td>
                        <td className="py-4 text-white/70">{j.kelas}</td>
                        <td className="py-4 flex items-center gap-2"><Clock className="h-4 w-4" />{j.jam}</td>
                        <td className="py-4 text-white/70">{j.mapel}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}