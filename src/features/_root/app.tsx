// src/app/router.tsx (atau di file yang sama dengan kode kamu)
import { APP_CONFIG } from "@/core/configs/app";
import { MENU_CONFIG, USERMENU_CONFIG } from "@/core/configs/menu";
import {
  AuthPage,
  ForgetPassword,
  LoginPage,
  ResetPassword,
} from "@/features/auth";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootPage } from "../dashboard";

// === Halaman Orang Tua (yang sudah kita buat sebelumnya) ===
// import { PageJadwalAnak } from "@/features/parent/pages/JadwalAnak";
// import { PagePelacakanSiswa } from "@/features/parent/pages/PelacakanSiswa";
// import { PageTugasNilai } from "@/features/parent/pages/TugasNilai";
// import { PageKesehatan } from "@/features/parent/pages/Kesehatan";
// import { PagePerpustakaan } from "@/features/parent/pages/Perpustakaan";

// === Komponen lain ===
import { Default404, Vokadash } from "@/features/_global";
import { Otp } from "@/features/otp";
import { SchoolRegister } from "@/features/schools";
import { DashboardMain } from "../attendance";
import PageJadwalAnak from "../jadwalAnak";
import PageKenaikan from "../kenaikan";
import PageKesehatan from "../kesehatan";
import PageKonseling from "../konseling";
import { LetterPreview } from "../letter/containers/letter-preview";
import PageProfile from "../myProfile";
import PagePelacakanSiswa from "../pelacakanSiswa";
import PagePelayanan from "../pelayanan";
import PagePerpustakaan from "../perpustakaan";
import PageTugasNilai from "../tugasDanNilai";
// import { DashboardMain } from "@/features/parent/pages/DashboardMain"; // halaman beranda

const router = createBrowserRouter(
  [
    // ──────────────────────────────────────────────────────────────
    // Dashboard Orang Tua (RootPage adalah layout utama dengan sidebar)
    // ──────────────────────────────────────────────────────────────
    {
      path: "/",
      element: <RootPage />,
      errorElement: <Default404 />,
      children: [
        { index: true, element: <DashboardMain /> }, // /dashboard → beranda
        { path: "dashboard", element: <DashboardMain /> },

        // Halaman Orang Tua
        { path: "jadwal-anak", element: <PageJadwalAnak /> },
        { path: "pelacakan-siswa", element: <PagePelacakanSiswa /> },
        { path: "tugas-dan-nilai", element: <PageTugasNilai /> },
        { path: "kesehatan", element: <PageKesehatan /> },
        { path: "perpustakaan", element: <PagePerpustakaan /> },
        { path: "konseling", element: <PageKonseling /> },
        { path: "kenaikan-kelulusan", element: <PageKenaikan /> },
        { path: "pelayanan", element: <PagePelayanan /> },
        { path: "profile", element: <PageProfile /> },

        // yang sudah ada sebelumnya
        { path: "format", element: <LetterPreview /> },
      ],
    },

    // ──────────────────────────────────────────────────────────────
    // Auth Routes
    // ──────────────────────────────────────────────────────────────
    {
      path: "/auth",
      element: <AuthPage />,
      children: [
        { path: "login", element: <LoginPage /> },
        { path: "forget-password", element: <ForgetPassword /> },
        { path: "reset-password/:token", element: <ResetPassword /> },
      ],
    },

    // Jika kamu butuh route lain (contoh: OTP, register sekolah, dll)
    { path: "/otp", element: <Otp /> },
    { path: "/school-register", element: <SchoolRegister /> },
  ],
  {
    basename: APP_CONFIG.baseName,
  }
);

export const RootApp = () => {
  // Pastikan menu di config sudah mencakup route baru
  const sidebarMenus = MENU_CONFIG.parent;     // atau staff, tergantung role
  const usermenus = USERMENU_CONFIG.parent;

  return (
    <Vokadash
      appName={APP_CONFIG.appName}
      menus={sidebarMenus}
      usermenus={usermenus}
    >
      <RouterProvider router={router} />
    </Vokadash>
  );
};

export const App = () => {
  return <RootApp />;
};