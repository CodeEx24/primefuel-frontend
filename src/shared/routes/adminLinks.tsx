import { ROUTES } from '@/shared/constants/ROUTES';

import { RouteObject } from 'react-router-dom';

import ProtectedRoute from '@/components/ProtectedRoutes';
import { ROLES } from '../constants/ROLES';
import AdminLayout from '../layouts/Admin';
import { DashboardPage } from '@/pages/Admin/Dashboard';
import { Dashboard } from '@/assets/SuperAdmin/Dashboard';
import { RequestOrderPage } from '@/pages/Admin/RequestOrder';

const adminPath = `/${ROUTES.ADMIN.PATH}`;

export const adminRoutes: RouteObject[] = [
  {
    path: adminPath,
    element: (
      <ProtectedRoute allowedRoles={[ROLES.Admin]}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: ROUTES.ADMIN.DASHBOARD,
        element: <DashboardPage />,
      },
      {
        path: ROUTES.ADMIN.REQUEST_ORDER,
        element: <RequestOrderPage />,
      },
    ],
  },
];

export const adminSidebarLinks = [
  {
    title: 'Dashboard',
    isCollapsible: true,
    children: [
      {
        title: 'Dashboard',
        logo: <Dashboard />,
        to: `${adminPath}/${ROUTES.ADMIN.DASHBOARD}`,
      },
      {
        title: 'Request Order',
        logo: <Dashboard />,
        to: `${adminPath}/${ROUTES.ADMIN.REQUEST_ORDER}`,
      },
    ],
  },
];
