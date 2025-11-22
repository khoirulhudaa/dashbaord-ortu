// src/pages/parent/JadwalAnak.tsx
import clsx from "clsx";
import { motion } from "framer-motion";
import { Activity, Bell, BookOpen, Calendar1, CalendarDays, CalendarHeartIcon, Clock, FileText, GraduationCap, HeartPulse, Library, MapPin, MessageSquare, Monitor, Moon, Sun, UserCircle, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
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

        <main className="col-span-12 px-7 lg:col-span-9 xl:col-span-10 space-y-8">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-bold mb-8 flex items-center gap-4">
              <Calendar1 className="h-10 w-10 text-teal-500" />
              Jadwal Siswa
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