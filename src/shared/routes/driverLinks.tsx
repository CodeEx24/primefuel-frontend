import { ROUTES } from '@/shared/constants/ROUTES';

import { RouteObject } from 'react-router-dom';

import ProtectedRoute from '@/components/ProtectedRoutes';
import { ROLES } from '../constants/ROLES';
import { DashboardPage } from '@/pages/Driver/Dashboard';
import DriverLayout from '../layouts/Driver';
import { Circle } from 'lucide-react';

const driverPath = `/${ROUTES.DRIVER.PATH}`;

export const driverRoutes: RouteObject[] = [
  {
    path: driverPath,
    element: (
      <ProtectedRoute allowedRoles={[ROLES.Driver]}>
        <DriverLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: ROUTES.DRIVER.DASHBOARD,
        element: <DashboardPage />,
      },
    ],
  },
];

export const driverSidebarLinks = [
  {
    title: 'Dashboard',
    isCollapsible: true,
    children: [
      {
        title: 'Dashboard',
        logo: <Circle />,
        to: `${driverPath}/${ROUTES.DRIVER.DASHBOARD}`,
      },
    ],
  },
];
