// import { Button, cn } from '@/core/libs';
// import { fetchCalendarEvents } from '@/features/events';
// import { useProfile } from '@/features/profile';
// import { Menu } from 'lucide-react';
// import React, { PropsWithChildren, useEffect, useState } from 'react';
// import { LangToggle } from '../lang-toggle';
// import { ThemeToggle } from '../theme-toggle';
// import { Sidebar } from './sidebar';
// import { Brand } from './sidebar/default/_components/Brand';
// import { SidebarProps } from './sidebar/types';
// import { UserMenu, UserMenuProps } from './usermenu';

// export interface DashboardLayoutProps extends PropsWithChildren {
//   menus: SidebarProps['menus'];
//   usermenus: UserMenuProps['menus'];
//   sidebarClassName?: string;
//   headerClassName?: string;
// }


// export const DashboardLayout = React.memo(({ menus = [], usermenus, children, ...props }: DashboardLayoutProps) => {
//   const [sidebarVisible, setSidebarVisible] = useState(false); // Ubah default ke true agar sidebar terlihat saat pertama load
//   const [minimize, setMinimize] = useState(false); // Ubah default ke true agar sidebar terlihat saat pertama load
//   const [visible, setVisible] = useState(true); // Ubah default ke true agar sidebar terlihat saat pertama load
//   const profile = useProfile();
//   const [events, setEvents] = useState([]);

//    const loadEvents = async () => {
//       try {
//         const response = await fetchCalendarEvents(); // Ambil semua event dari API
//         console.log('reponse', response?.data)
//         setEvents(response?.data)
//         if (!response || !response.data) {
//           console.error("❌ Error: Data tidak ditemukan dalam response API.");
//           return;
//         }
//       } catch (err) {
//         console.error("❌ Error fetching events:", err);
//       } 
//   };

//   useEffect(() => {
//     loadEvents()
//   }, [])

//   const filteredMenus = menus.map((data) => {
//     if(profile?.user?.role === 'superAdmin' && data?.title === 'Manajemen Perpustakaan') {
//       return false;
//     }
//     if (data.items) {
//       const filteredItems = data.items.filter(item => {
//         if (profile?.user?.role === 'superAdmin' && (item.title === 'Acara' || item.title === 'Kelulusan')) {
//           return false;
//         }
//         return true;
//       });

//       return filteredItems.length > 0
//         ? { ...data, items: filteredItems }
//         : null;
//     }
//     return data;
//   }).filter(Boolean);

//   return (
//     <>
//       <div className="dashboard-layout grid min-h-[100svh] w-full">
//           <div className="sidebar-content flex flex-col overflow-hidden">
//             <header
//               className={cn(
//                 `sidebar-header flex h-14 items-center gap-2 border-b bg-muted-foreground/5 ${visible ? 'px-5' : 'px-9'} lg:h-[60px]`,
//                 props.headerClassName,
//               )}
//             >
//               <div className="relative z-[99] overflow-hidden hover:border-white rounded-full">
//                 <Brand isCollapsed={!visible} />
//               </div>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={() => setSidebarVisible((v) => !v)}
//                 className="md:hidden"
//               >
//                 <Menu className="h-6 w-6" />
//                 <span className="sr-only">Toggle sidebar</span>
//               </Button>
//               <Sidebar.Sheet className={props.sidebarClassName} menus={filteredMenus} />
//               <div className="w-full flex-1">
//               </div>
//               <ThemeToggle />
//               <LangToggle />
//               <UserMenu menus={usermenus} />
//             </header>
//             <div className="w-full px-4 max-h-svh overflow-y-auto flex flex-1 flex-col gap-4 pb-10">
//               <div className="gap-4 flex-1 flex flex-col lg:gap-6">
//                 {children}
//               </div>
//             </div>
//           </div>
//       </div>
//     </>
//   );
// });

// DashboardLayout.displayName = 'DashboardLayout';



import { fetchCalendarEvents } from '@/features/events';
import { useProfile } from '@/features/profile';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { SidebarProps } from './sidebar/types';
import { UserMenuProps } from './usermenu';

// Global styles for consistent theming
const GlobalStyles = () => (
  <style>
    {`
      .dashboard-layout {
        background: linear-gradient(to bottom, #F3F4F6, #F3F4F6);
      }
      .dark .dashboard-layout {
        background: linear-gradient(to bottom, #111827, #111827);
      }
      .sidebar-header {
        background: #F3F4F6;
        border-bottom: 1px solid #E5E7EB;
        backdrop-filter: blur(4px);
      }
      .dark .sidebar-header {
        background: #111827;
        border-bottom: 1px solid #4B5563;
      }
      button:hover {
        transform: translateY(-1px);
      }
      button:focus {
        outline: none;
        box-shadow: 0 0 0 2px rgba(20, 184, 166, 0.2);
      }
      .dark button:focus {
        box-shadow: 0 0 0 2px rgba(45, 212, 191, 0.2);
      }
    `}
  </style>
);

export interface DashboardLayoutProps extends PropsWithChildren {
  menus: SidebarProps['menus'];
  usermenus: UserMenuProps['menus'];
  sidebarClassName?: string;
  headerClassName?: string;
}

export const DashboardLayout = React.memo(({ menus = [], usermenus, children, ...props }: DashboardLayoutProps) => {
  const [sidebarVisible, setSidebarVisible] = useState(true); // Sidebar visible by default
  const [minimize, setMinimize] = useState(false);
  const [visible, setVisible] = useState(true);
  const profile = useProfile();
  const [events, setEvents] = useState([]);

  const loadEvents = async () => {
    try {
      const response = await fetchCalendarEvents();
      console.log('response', response?.data);
      setEvents(response?.data);
      if (!response || !response.data) {
        console.error("❌ Error: Data tidak ditemukan dalam response API.");
        return;
      }
    } catch (err) {
      console.error("❌ Error fetching events:", err);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const filteredMenus = menus
    .map((data) => {
      if (profile?.user?.role === 'superAdmin' && data?.title === 'Manajemen Perpustakaan') {
        return false;
      }
      if (data.items) {
        const filteredItems = data.items.filter((item) => {
          if (profile?.user?.role === 'superAdmin' && (item.title === 'Acara' || item.title === 'Kelulusan')) {
            return false;
          }
          return true;
        });
        return filteredItems.length > 0 ? { ...data, items: filteredItems } : null;
      }
      return data;
    })
    .filter(Boolean);

  return (
    <>
      {/* <GlobalStyles /> */}
      <div className="dashboard-layout grid h-max w-full text-gray-800 dark:text-white">
        <div className="sidebar-content flex flex-col overflow-hidden">
          {/* <header
            className={cn(
              `sidebar-header flex h-14 items-center gap-4 border-b bg-[#F3F4F6] dark:bg-[#F3F4F6] backdrop-blur-sm transition-all duration-300 ${visible ? 'px-5' : 'px-9'} lg:h-[60px]`,
              props.headerClassName
            )}
          >
            <div className="relative z-[99] overflow-hidden rounded-xl hover:shadow-md transition-shadow duration-300">
              <Brand isCollapsed={!visible} />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarVisible((v) => !v)}
              className="md:hidden rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle sidebar</span>
            </Button>
            <Sidebar.Sheet
              className={cn(
                'bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-r border-gray-200 dark:border-gray-700',
                props.sidebarClassName
              )}
              menus={filteredMenus}
            />
            <div className="w-full flex-1" />
            <ThemeToggle classNamve="rounded-lg border border-gray-300 dark:border-gray-600 p-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300" />
            <LangToggle className="rounded-lg border border-gray-300 dark:border-gray-600 p-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300" />
            <UserMenu
              menus={usermenus}
              className="rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
            />
          </header> */}
          <div className="w-full max-h-svh overflow-y-auto flex flex-1 flex-col gap-4 pb-0">
            <div className="gap-4 h-full flex-1 flex flex-col lg:gap-6">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
});

DashboardLayout.displayName = 'DashboardLayout';