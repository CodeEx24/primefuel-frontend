import { ROUTES } from '@/shared/constants/ROUTES';

import { RouteObject } from 'react-router-dom';

import ProtectedRoute from '@/components/ProtectedRoutes';
import { ROLES } from '../constants/ROLES';
import StaffLayout from '../layouts/Staff';
import { DashboardPage } from '@/pages/Staff/Dashboard';
import DashboardView from '@/pages/Staff/Dashboard/DashboardView';

const staffPath = `/${ROUTES.STAFF.PATH}`;

export const staffRoutes: RouteObject[] = [
  {
    path: staffPath,
    element: (
      <ProtectedRoute allowedRoles={[ROLES.Staff]}>
        <StaffLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: ROUTES.STAFF.DASHBOARD,
        element: <DashboardPage />,
      },
    ],
  },
];

export const staffSidebarLinks = [
  {
    title: 'Dashboard',
    isCollapsible: true,
    children: [
      {
        title: 'Dashboard',
        logo: <DashboardView />,
        to: `${staffPath}/${ROUTES.STAFF.DASHBOARD}`,
      },
    ],
  },
];
