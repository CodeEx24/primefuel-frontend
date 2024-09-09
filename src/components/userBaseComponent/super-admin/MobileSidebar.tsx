import { PanelLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Link, useLocation } from 'react-router-dom';

import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { superAdminSidebarLinks } from '@/shared/routes/superAdminLinks';
import Typography from '../../defaults/Typography';

import companyLogo from '@/assets/NetFuel/PrimeFuel2.webp';
import profileSvg from '@/assets/Profile.svg';
import { useDispatch } from 'react-redux';
import { logout } from '@/shared/lib/features/authSlice';
import { useLogoutQuery } from '@/pages/api/authApiSlice';
import { useEffect, useState } from 'react';

export default function SuperAdminMobileSidebar() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  // Initialize skip as true
  // Initialize skip as true
  const [refetchTriggered, setRefetchTriggered] = useState(false);
  const { refetch, isFetching } = useLogoutQuery(undefined, {
    skip: !refetchTriggered,
  });

  useEffect(() => {
    if (refetchTriggered && !isFetching) {
      refetch();
      dispatch(logout());
      setRefetchTriggered(false); // Reset refetch trigger
    }
  }, [refetchTriggered, isFetching, dispatch, refetch]);

  const signOut = () => {
    setRefetchTriggered(true); // Trigger refetch when logout is initiated
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 p-4 justify-between items-center gap-4  bg-secondary  sm:static  border-b border-muted sm:justify-end lg:pl-[240px]">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5 text-foreground" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="dark sm:max-w-xs ">
          <nav className="grid text-lg font-medium ">
            <Link to="/" className="mb-6 flex ">
              <img src={companyLogo} alt="Logo" className="w-60" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <div className="space-y-2">
              <TooltipProvider>
                {superAdminSidebarLinks.map((adminLinks) => {
                  return (
                    <div key={adminLinks.title} className="space-y-2">
                      <Tooltip>
                        <Typography
                          variant="paragraph"
                          tag="p"
                          className="text-foreground text-sm"
                        >
                          {adminLinks.title}
                        </Typography>

                        {adminLinks.children.map((link) => {
                          return (
                            <TooltipTrigger asChild key={link.title}>
                              <Link
                                to={link.to}
                                className={`flex h-9 px-2 lg:w-full items-center justify-start  rounded-lg text-muted-foreground transition-colors hover:text-foreground lg:p-4 lg:space-x-4 lg:justify-start ${
                                  link.to === pathname && 'bg-accent'
                                }`}
                              >
                                <div className="flex gap-2 items-center">
                                  {link.logo}
                                  <Typography
                                    className={`text-sm font-normal ${
                                      link.to === pathname && 'text-primary'
                                    } `}
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
              </TooltipProvider>
            </div>
          </nav>
        </SheetContent>
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <img src={profileSvg} alt="UserProfile" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
