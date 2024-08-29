import { ROUTES } from '@/shared/constants/ROUTES';

import { RouteObject } from 'react-router-dom';

import ProtectedRoute from '@/components/ProtectedRoutes';
import { ROLES } from '../constants/ROLES';
import { Dashboard } from '@/assets/SuperAdmin/Dashboard';
import OwnerLayout from '../layouts/Owner';
import { DashboardPage } from '@/pages/Owner/Dashboard';

const ownerPath = `/${ROUTES.OWNER.PATH}`;

export const ownerRoutes: RouteObject[] = [
  {
    path: ownerPath,
    element: (
      <ProtectedRoute allowedRoles={[ROLES.Owner]}>
        <OwnerLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: ROUTES.OWNER.DASHBOARD,
        element: <DashboardPage />,
      },
    ],
  },
];

export const ownerSidebarLinks = [
  {
    title: 'Dashboard',
    isCollapsible: true,
    children: [
      {
        title: 'Dashboard',
        logo: <Dashboard />,
        to: `${ownerPath}/${ROUTES.OWNER.DASHBOARD}`,
      },
    ],
  },
];
