import { Outlet } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import AdminSidebar from '@/components/admin/Sidebar';
import AdminMobileSidebar from '@/components/admin/MobileSidebar';

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
