import clsx from "clsx";
import { motion } from "framer-motion";
import {
  Activity,
  BookOpen,
  CalendarDays,
  FileText,
  GraduationCap,
  HeartPulse,
  Library,
  MapPin,
  MessageSquare,
  UserCircle,
  Mail,
  Phone,
  Home,
  Users,
  Edit3,
  Camera,
  Badge,
  X,
  Save,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
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

export default function PageProfile() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [homeSchoolingActive] = useState(true);
  const namaSekolah = "SMK Negeri 13 Jakarta";

  // === DATA ORTU (bisa dari API nanti) ===
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nama: "Bapak Andi Saputra",
    email: "andi.saputra@gmail.com",
    telepon: "+62 812-3456-7890",
    teleponAlt: "+62 878-9999-1234",
    alamat: "Jl. Raya Bogor KM 24 No. 87 RT 005/RW 002\nKel. Cisalak Pasar, Kec. Cimanggis\nKota Depok, Jawa Barat 16452",
  });

  // === MODAL UBAH PASSWORD ===
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [showPass, setShowPass] = useState({ current: false, new: false, confirm: false });
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setTheme(saved as any);
  }, []);
  useEffect(() => localStorage.setItem("theme", theme), [theme]);

  const handleSaveProfile = () => {
    // Di sini nanti kirim ke API
    alert("Profil berhasil disimpan!");
    setIsEditing(false);
  };

  const handleChangePassword = () => {
    if (passwordData.new !== passwordData.confirm) {
      setPasswordError("Password baru tidak cocok");
      return;
    }
    if (passwordData.new.length < 6) {
      setPasswordError("Password minimal 6 karakter");
      return;
    }
    // Di sini nanti kirim ke API
    alert("Kata sandi berhasil diubah!");
    setShowPasswordModal(false);
    setPasswordData({ current: "", new: "", confirm: "" });
    setPasswordError("");
  };

  return (
    <div className="overflow-auto h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-neutral-100">
      <Navbar
        namaSekolah={namaSekolah}
        namaOrtu={formData.nama}
        homeSchoolingActive={homeSchoolingActive}
        onToggleSidebar={() => setSidebarOpen((v) => !v)}
      />

      <div className="grid grid-cols-12 gap-4 md:px-4 py-6">
        <aside className={clsx("col-span-12 lg:col-span-3 xl:col-span-2", sidebarOpen ? "block" : "hidden lg:block")}>
          <nav className="z-[9999] fixed top-[60px] md:pt-0 md:pl-0 pl-4 overflow-auto pt-4 md:top-[88px] bg-black md:bg-transparent h-screen pr-4 space-y-3 border-r border-white/20">
            <SidebarItem icon={<Activity className="h-4 w-4" />} label="Beranda" to="/" />
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
              <UserCircle className="h-10 w-10 text-teal-500" />
              Profile Saya
            </h1>

            {/* Foto + Nama */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="relative group">
                <div className="h-40 w-40 rounded-full border-4 border-teal-500/30 bg-white/5 overflow-hidden shadow-2xl">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Andi&mouth=smile&eyes=happy&facialHairProbability=50&style=circle"
                    alt="Foto Profil"
                    className="h-full w-full object-cover"
                  />
                </div>
                <button className="absolute bottom-3 right-3 bg-teal-500 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-lg">
                  <Camera className="h-5 w-5 text-white" />
                </button>
              </div>

              <div className="text-center md:text-left space-y-4 flex-1">
                <div>
                  <h2 className="text-3xl font-bold">{formData.nama}</h2>
                  <p className="text-white/60 text-lg">Orang Tua / Wali Murid</p>
                </div>
                <div className="flex gap-3 flex-wrap justify-center md:justify-start">
                  {isEditing ? (
                    <>
                      <button onClick={handleSaveProfile} className="flex items-center gap-2 px-5 py-2 bg-teal-500 hover:bg-teal-400 rounded-xl transition-colors">
                        <Save className="h-4 w-4" /> Simpan
                      </button>
                      <button onClick={() => setIsEditing(false)} className="flex items-center gap-2 px-5 py-2 border border-white/20 hover:border-white/40 rounded-xl transition-all">
                        <X className="h-4 w-4" /> Batal
                      </button>
                    </>
                  ) : (
                    <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 text-teal-400 hover:text-teal-300 transition-colors">
                      <Edit3 className="h-4 w-4" /> Edit Profil
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Kontak & Alamat */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <motion.div whileHover={{ scale: 1.02 }} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-xl font-semibold mb-5 flex items-center gap-3">
                  <Mail className="h-6 w-6 text-teal-400" /> Kontak
                </h3>
                <div className="space-y-4 text-sm">
                  {["Email", "Telepon", "Telepon Alternatif"].map((label, i) => {
                    const key = i === 0 ? "email" : i === 1 ? "telepon" : "teleponAlt";
                    return (
                      <div key={i} className="flex justify-between items-center">
                        <span className="text-white/60">{label}</span>
                        {isEditing ? (
                          <input
                            type="text"
                            value={formData[key]}
                            onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                            className="bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-right w-48 focus:outline-none focus:border-teal-400"
                          />
                        ) : (
                          <span>{formData[key]}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-xl font-semibold mb-5 flex items-center gap-3">
                  <Home className="h-6 w-6 text-teal-400" /> Alamat Rumah
                </h3>
                {isEditing ? (
                  <textarea
                    value={formData.alamat}
                    onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                    rows={4}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 focus:outline-none focus:border-teal-400 resize-none"
                  />
                ) : (
                  <p className="text-sm leading-relaxed whitespace-pre-line">{formData.alamat}</p>
                )}
              </motion.div>
            </div>

            {/* Anak yang Diwakili */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 mt-4">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <Users className="h-6 w-6 text-teal-400" /> Anak yang Diwakili
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { nama: "Ahmad Rizki Saputra", nisn: "0051234567", kelas: "XII TKJ 3", seed: "AhmadRizki" },
                  { nama: "Muhammad Farhan Pratama", nisn: "0067891234", kelas: "X RPL 2", seed: "Farhan" },
                ].map((anak, i) => (
                  <motion.div key={i} whileHover={{ y: -6 }} className="bg-white/5 border border-white/10 rounded-xl p-5 flex items-center gap-5">
                    <div className="h-20 w-20 rounded-full border-2 border-teal-500/30 overflow-hidden">
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Andi&mouth=smile&eyes=happy&facialHairProbability=50&style=circle`}
                        alt={anak.nama}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{anak.nama}</p>
                      <p className="text-xs text-white/60">NISN: {anak.nisn}</p>
                      <p className="text-sm text-teal-400 mt-1 flex items-center gap-1">
                        <Badge className="h-3 w-3" /> {anak.kelas}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Tombol Ubah Kata Sandi */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => setShowPasswordModal(true)}
                className="px-8 py-3 border border-white/20 hover:border-white/40 rounded-xl font-medium transition-all flex items-center gap-2"
              >
                <Lock className="h-4 w-4" /> Ubah Kata Sandi
              </button>
            </div>
          </motion.div>
        </main>
      </div>

      {/* MODAL UBAH KATA SANDI */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-neutral-900 border border-white/20 rounded-2xl p-8 max-w-md w-full"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold flex items-center gap-3">
                <Lock className="h-7 w-7 text-teal-400" /> Ubah Kata Sandi
              </h3>
              <button onClick={() => setShowPasswordModal(false)} className="text-white/60 hover:text-white">
                <X className="h-6 w-6" />
              </button>
            </div>

            {passwordError && <p className="text-red-400 text-sm mb-4">{passwordError}</p>}

            {["current", "new", "confirm"].map((field, i) => (
              <div key={i} className="mb-4">
                <label className="text-sm text-white/70">
                  {field === "current" ? "Kata Sandi Lama" : field === "new" ? "Kata Sandi Baru" : "Konfirmasi Kata Sandi Baru"}
                </label>
                <div className="relative mt-1">
                  <input
                    type={showPass[field as keyof typeof showPass] ? "text" : "password"}
                    value={passwordData[field as keyof typeof passwordData]}
                    onChange={(e) => setPasswordData({ ...passwordData, [field]: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:border-teal-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass({ ...showPass, [field]: !showPass[field as keyof typeof showPass] })}
                    className="absolute right-3 top-3.5 text-white/60 hover:text-white"
                  >
                    {showPass[field as keyof typeof showPass] ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            ))}

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleChangePassword}
                className="flex-1 py-3 bg-teal-500 hover:bg-teal-400 rounded-xl font-medium transition-colors"
              >
                Simpan Kata Sandi
              </button>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="flex-1 py-3 border border-white/20 hover:border-white/40 rounded-xl transition-all"
              >
                Batal
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}