import { Outlet } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import SuperAdminMobileSidebar from '@/components/userBaseComponent/super-admin/MobileSidebar';
import SuperAdminSidebar from '@/components/userBaseComponent/super-admin/Sidebar';

export default function SuperAdminLayout() {
  return (
    <div className="flex w-full flex-col bg-background dark overflow-hidden min-h-screen">
      <SuperAdminSidebar />
      <div className="flex flex-col sm:pl-14 lg:pl-[240px] h-full">
        <SuperAdminMobileSidebar />

        <main className=" p-4 md:p-10 h-full w-full ">
          <Outlet />
          <Toaster />
        </main>
      </div>
    </div>
  );
}
