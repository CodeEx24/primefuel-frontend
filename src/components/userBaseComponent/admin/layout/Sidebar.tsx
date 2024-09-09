import { ROUTES } from '@/shared/constants/ROUTES';
import { Link, useLocation } from 'react-router-dom';

import companyLogo from '@/assets/NetFuel/PrimeFuel2.webp';
import miniLogo from '@/assets/NetFuel/PrimeFuelMini.webp';
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Typography from '@/components/defaults/Typography';
import { adminSidebarLinks } from '@/shared/routes/adminLinks';

export default function AdminSidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex lg:w-[240px] max-h-screen">
      <nav className="flex flex-col items-center px-2 sm:py-5  overflow-y-scroll">
        <Link to={ROUTES.SUPER_ADMIN.DASHBOARD} className="">
          <img
            src={companyLogo}
            alt="Net Fuel Logo"
            className="hidden lg:flex h-16 w-30"
          />
          <img src={miniLogo} alt="Logo" className="flex lg:hidden h-8 w-30" />
        </Link>
        <TooltipProvider>
          <div className="space-y-2 mt-4 w-full lg:px-4">
            {adminSidebarLinks.map((adminLinks) => {
              return (
                <div key={adminLinks.title} className="space-y-2">
                  <Tooltip>
                    <Typography
                      variant="paragraph"
                      tag="p"
                      className="text-foreground hidden lg:flex"
                    >
                      {adminLinks.title}
                    </Typography>

                    {adminLinks.children.map((link) => {
                      return (
                        <TooltipTrigger asChild key={link.title}>
                          <Link
                            to={link.to}
                            className={`flex h-9 w-9 lg:w-full items-center justify-center  rounded-lg text-muted-foreground transition-colors hover:text-foreground lg:p-4 lg:space-x-4 lg:justify-start ${
                              link.to === pathname && 'bg-accent'
                            }`}
                          >
                            <div className="flex gap-2 items-center">
                              {link.logo}
                              <Typography
                                className={`${
                                  link.to === pathname && 'text-primary'
                                } hidden lg:flex`}
                              >
                                {link.title}
                              </Typography>
                            </div>
                          </Link>
                        </TooltipTrigger>
                      );
                    })}
                  </Tooltip>
                  <div className="mb-2" />
                </div>
              );
            })}
          </div>
        </TooltipProvider>
      </nav>
    </aside>
  );
}
