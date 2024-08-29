import { Toaster } from '@/components/ui/toaster';
import AdminMobileSidebar from '@/components/userBaseComponent/admin/layout/MobileSidebar';
import AdminSidebar from '@/components/userBaseComponent/admin/layout/Sidebar';
import { Outlet } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div className="flex w-full flex-col bg-background dark overflow-hidden min-h-screen">
      <AdminSidebar />
      <div className="flex flex-col sm:pl-14 lg:pl-[240px] h-full">
        <AdminMobileSidebar />

        <main className=" p-4 md:p-10 h-full w-full ">
          <Outlet />
          <Toaster />
        </main>
      </div>
    </div>
  );
}
