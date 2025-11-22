import { DashboardMain } from "@/features/attendance";
import { useProfile } from "@/features/profile";
import { useSchool } from "@/features/schools";

export const HomePage = () => {
  const profile = useProfile();
  const isAdmin = profile?.user?.role === "admin";
  const school = useSchool();
  console.log('school this is:', school?.data);

  // Periksa apakah salah satu data bernilai null atau ""
  const shouldShowUpdateDialog = isAdmin && school?.data?.[0] && (
    school.data[0].namaSekolah === null || school.data[0].namaSekolah === "" ||
    school.data[0].npsn === null || school.data[0].npsn === "" ||
    school.data[0].nameProvince === null || school.data[0].nameProvince === "" ||
    school.data[0].urlYutubeFirst === null || school.data[0].urlYutubeFirst === ""
  );

  return (
    <DashboardMain />
  );
};