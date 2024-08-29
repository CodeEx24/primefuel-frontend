import Typography from '@/components/defaults/Typography';
import { Toaster } from '@/components/ui/toaster';
import { Outlet } from 'react-router-dom';

export default function StaffLayout() {
  return (
    <div className="flex w-full flexs-col bg-background dark overflow-hidden min-h-screen">
      <Typography>Staff Layout</Typography>
      <div className="flex flex-col sm:pl-14 lg:pl-[240px] h-full">
        <main className=" p-4 md:p-10 h-full w-full ">
          <Outlet />
          <Toaster />
        </main>
      </div>
    </div>
  );
}
