// src/components/Navbar.tsx
import { UserCircle, Users } from "lucide-react";
import { useEffect, useState } from "react";

interface NavbarProps {
  namaSekolah: string;
  namaOrtu: string;
  homeSchoolingActive?: boolean;
  onToggleSidebar?: () => void;
}

export default function Navbar({
  namaSekolah,
  namaOrtu,
  homeSchoolingActive = false,
  onToggleSidebar,
}: NavbarProps) {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");

  // Simpan & terapkan tema (bisa kamu pindahkan ke context kalau mau global)
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark" || saved === "system") {
      setTheme(saved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);

    if (theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-neutral-950/70 backdrop-blur">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Kiri - Logo + Nama Sekolah */}
        <div className="flex items-center gap-3">
          {/* Hamburger untuk mobile */}
          <button
            className="rounded-xl border border-white/10 p-2 hover:bg-white/5 lg:hidden"
            onClick={onToggleSidebar}
          >
            <div className="h-4 w-5">
              <span className="mb-1.5 block h-0.5 w-full bg-white" />
              <span className="mb-1.5 block h-0.5 w-4/5 bg-white" />
              <span className="block h-0.5 w-3/5 bg-white" />
            </div>
          </button>

          <div className="hidden md:flex items-center gap-3">
            <div className="grid h-9 w-9 place-content-center rounded-xl bg-emerald-500/20 text-emerald-300">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-white/60">{namaSekolah}</div>
              <div className="text-sm font-semibold">Dashboard Orang Tua</div>
            </div>
          </div>
        </div>

        {/* Kanan - Theme, HS Badge, Notif, Profil */}
        <div className="flex items-center gap-3">
          {/* Theme Switcher */}
          {/* <div className="flex gap-1 rounded-xl border border-white/10 bg-white/5 p-1">
            <button
              onClick={() => setTheme("light")}
              className={clsx("rounded-lg p-1", theme === "light" ? "bg-white/20 text-yellow-400" : "text-white/60")}
            >
              <Sun className="h-4 w-4" />
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={clsx("rounded-lg p-1", theme === "dark" ? "bg-white/20 text-blue-400" : "text-white/60")}
            >
              <Moon className="h-4 w-4" />
            </button>
            <button
              onClick={() => setTheme("system")}
              className={clsx("rounded-lg p-1", theme === "system" ? "bg-white/20 text-green-400" : "text-white/60")}
            >
              <Monitor className="h-4 w-4" />
            </button>
          </div> */}

          {/* Badge Home Schooling */}
          {homeSchoolingActive && (
            <span className="rounded-xl border border-green-400/30 bg-green-500/20 px-3 py-1.5 text-sm text-green-300">
              HS Aktif
            </span>
          )}

          {/* Notifikasi */}
          {/* <button className="rounded-xl border border-white/10 p-2 hover:bg-white/5">
            <Bell className="h-5 w-5" />
          </button> */}

          {/* Profil Orang Tua */}
          <div className="flex items-center gap-2 rounded-xl border	Конец-white/10 bg-white/5 px-3 py-1.5">
            <UserCircle className="h-5 w-5" />
            <div className="text-sm font-medium">{namaOrtu}</div>
          </div>
        </div>
      </div>
    </header>
  );
}