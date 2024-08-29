import { ROUTES } from '@/shared/constants/ROUTES';

import { RouteObject } from 'react-router-dom';

import { Dashboard } from '@/assets/SuperAdmin/Dashboard';
import { Account } from '@/assets/SuperAdmin/Account';
import { Shift } from '@/assets/SuperAdmin/Shift';
import { Delivery } from '@/assets/SuperAdmin/Delivery';
import { Gas } from '@/assets/SuperAdmin/Products';
import { Category } from '@/assets/SuperAdmin/Category';
import { Branch } from '@/assets/SuperAdmin/Branch';
import { Competitor } from '@/assets/SuperAdmin/Competitor';
import { DashboardPage } from '@/pages/SuperAdmin/Dashboard';
import { AccountPage } from '@/pages/SuperAdmin/Account';
import { ShiftPage } from '@/pages/SuperAdmin/Shift';
import { DeliveriesPage } from '@/pages/SuperAdmin/Deliveries';
import { ProductTypePage } from '@/pages/SuperAdmin/ProductType';
import { BranchPage } from '@/pages/SuperAdmin/Branch';
import { StocksPage } from '@/pages/SuperAdmin/Stocks';
import { CompetitorPage } from '@/pages/SuperAdmin/Competitor';
import { ConversionPage } from '@/pages/SuperAdmin/Conversion';
import { PriceBoardPage } from '@/pages/SuperAdmin/PriceBoard';
import { ReportsPage } from '@/pages/SuperAdmin/Reports';
import ProtectedRoute from '@/components/ProtectedRoutes';
import { ROLES } from '../constants/ROLES';
import { ProductsPage } from '@/pages/SuperAdmin/Products';
import SuperAdminLayout from '../layouts/SuperAdmin';

const superAdminPath = `/${ROUTES.SUPER_ADMIN.PATH}`;

export const superAdminRoutes: RouteObject[] = [
  {
    path: superAdminPath,
    element: (
      <ProtectedRoute allowedRoles={[ROLES.SuperAdmin]}>
        <SuperAdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: ROUTES.SUPER_ADMIN.DASHBOARD,
        element: <DashboardPage />,
      },
      {
        path: ROUTES.SUPER_ADMIN.ACCOUNT,
        element: <AccountPage />,
      },
      {
        path: ROUTES.SUPER_ADMIN.SHIFT,
        element: <ShiftPage />,
      },
      {
        path: ROUTES.SUPER_ADMIN.REPORTS,
        element: <ReportsPage />,
      },
      {
        path: ROUTES.SUPER_ADMIN.DELIVERIES,
        element: <DeliveriesPage />,
      },
      {
        path: ROUTES.SUPER_ADMIN.PRODUCT_LIST,
        element: <ProductsPage />,
      },
      {
        path: ROUTES.SUPER_ADMIN.PRODUCT_TYPE,
        element: <ProductTypePage />,
      },
      {
        path: ROUTES.SUPER_ADMIN.BRANCH,
        element: <BranchPage />,
      },
      {
        path: ROUTES.SUPER_ADMIN.STOCKS,
        element: <StocksPage />,
      },
      {
        path: ROUTES.SUPER_ADMIN.COMPETITOR,
        element: <CompetitorPage />,
      },
      {
        path: ROUTES.SUPER_ADMIN.CONVERSION,
        element: <ConversionPage />,
      },
      {
        path: ROUTES.SUPER_ADMIN.PRICE_BOARD,
        element: <PriceBoardPage />,
      },
    ],
  },
];

export const superAdminSidebarLinks = [
  {
    title: 'Dashboard',
    children: [
      {
        title: 'Dashboard',
        logo: <Dashboard />,
        to: `${superAdminPath}/${ROUTES.SUPER_ADMIN.DASHBOARD}`,
      },
    ],
  },
  {
    title: 'Account Management',
    children: [
      {
        title: 'Account',
        logo: <Account />,
        to: `${superAdminPath}/${ROUTES.SUPER_ADMIN.ACCOUNT}`,
      },
      {
        title: 'Shift',
        logo: <Shift />,
        to: `${superAdminPath}/${ROUTES.SUPER_ADMIN.SHIFT}`,
      },
      // {
      //   title: 'Reports',
      //   logo: <Reports />,
      //   to: `${superAdminPath}/${ROUTES.SUPER_ADMIN.REPORTS}`,
      // },
    ],
  },
  {
    title: 'Order Management',
    children: [
      {
        title: 'Deliveries',
        logo: <Delivery />,
        to: `${superAdminPath}/${ROUTES.SUPER_ADMIN.DELIVERIES}`,
      },
    ],
  },
  {
    title: 'Product Management',
    children: [
      {
        title: 'Product List',
        logo: <Gas />,
        to: `${superAdminPath}/${ROUTES.SUPER_ADMIN.PRODUCT_LIST}`,
      },
      {
        title: 'Product Types',
        logo: <Category />,
        to: `${superAdminPath}/${ROUTES.SUPER_ADMIN.PRODUCT_TYPE}`,
      },
    ],
  },
  {
    title: 'Branch Management',
    children: [
      {
        title: 'Branch',
        logo: <Branch />,
        to: `${superAdminPath}/${ROUTES.SUPER_ADMIN.BRANCH}`,
      },
      // {
      //   title: 'Stocks',
      //   logo: <Stocks />,
      //   to: `${superAdminPath}/${ROUTES.SUPER_ADMIN.STOCKS}`,
      // },
    ],
  },
  {
    title: 'Competitors Management',
    children: [
      {
        title: 'Competitor',
        logo: <Competitor />,
        to: `${superAdminPath}/${ROUTES.SUPER_ADMIN.COMPETITOR}`,
      },
    ],
  },
  // {
  //   title: 'Price Management',
  //   children: [
  //     {
  //       title: 'Conversion',
  //       logo: <Conversion />,
  //       to: `${superAdminPath}/${ROUTES.SUPER_ADMIN.CONVERSION}`,
  //     },
  //     {
  //       title: 'Price Board',
  //       logo: <Price />,
  //       to: `${superAdminPath}/${ROUTES.SUPER_ADMIN.PRICE_BOARD}`,
  //     },
  //   ],
  // },
];
