// src/core/configs/menu.ts
import { VokadashProps } from "@/features/_global";

// ──────────────────────────────────────────────────────────────
// MENU ORANG TUA (Parent)
// ──────────────────────────────────────────────────────────────
export const MENU_PARENT: VokadashProps["menus"] = [
  {
    title: "Beranda",
    url: "/dashboard",
    icon: "Activity", // Lucide icon name (string) — Vokadash akan map ke <Activity />
  },
  {
    title: "Jadwal Anak",
    url: "/jadwal-anak",
    icon: "CalendarDays",
  },
  {
    title: "Pelacakan Siswa",
    url: "/pelacakan-siswa",
    icon: "MapPin",
  },
  {
    title: "Tugas & Nilai",
    url: "/tugas-nilai",
    icon: "BookOpen",
  },
  {
    title: "Kesehatan",
    url: "/kesehatan",
    icon: "HeartPulse",
  },
  {
    title: "Perpustakaan",
    url: "/perpustakaan",
    icon: "Library",
  },
  {
    title: "Konseling",
    url: "/konseling",
    icon: "MessageSquare",
  },
  {
    title: "Kenaikan & Kelulusan",
    url: "/kenaikan",
    icon: "GraduationCap",
  },
  {
    title: "Pelayanan",
    url: "/pelayanan",
    icon: "FileText",
  },
  {
    title: "Profil",
    url: "/profil",
    icon: "UserCircle",
  },
];

// ──────────────────────────────────────────────────────────────
// USER MENU (dropdown avatar)
// ──────────────────────────────────────────────────────────────
export const USER_MENU_PARENT: VokadashProps["usermenus"] = [
  {
    title: "Profil Saya",
    url: "/profil",
  },
  {
    title: "Pengaturan",
    url: "/pengaturan",
  },
  {
    title: "Keluar",
    url: "/logout",
  },
];

// ──────────────────────────────────────────────────────────────
// EKSPOR CONFIG UTAMA (dipakai di RootApp)
// ──────────────────────────────────────────────────────────────
export const MENU_CONFIG = {
  staff: MENU_PARENT,        // tetap ada untuk role staff (lama)
  parent: MENU_PARENT,      // baru: untuk orang tua
};

export const USERMENU_CONFIG = {
  staff: USER_MENU_PARENT,   // lama
  parent: USER_MENU_PARENT, // baru
};