import { ROUTES } from '@/shared/constants/ROUTES';

import { RouteObject } from 'react-router-dom';

import { Dashboard } from '@/assets/Admin/Dashboard';
import { Account } from '@/assets/Admin/Account';
import { Shift } from '@/assets/Admin/Shift';
import { Reports } from '@/assets/Admin/Reports';
import { Delivery } from '@/assets/Admin/Delivery';
import { Gas } from '@/assets/Admin/Products';
import { Category } from '@/assets/Admin/Category';
import { Branch } from '@/assets/Admin/Branch';
import { Stocks } from '@/assets/Admin/Stocks';
import { Competitor } from '@/assets/Admin/Competitor';
import { Conversion } from '@/assets/Admin/Conversion';
import { Price } from '@/assets/Admin/Price';
import AdminLayout from '../layouts/Admin';
import { DashboardPage } from '@/pages/Admin/Dashboard';
import { AccountPage } from '@/pages/Admin/Account';
import { ShiftPage } from '@/pages/Admin/Shift';
import { DeliveriesPage } from '@/pages/Admin/Deliveries';
import { ProductListPage } from '@/pages/Admin/ProductList';
import { ProductTypePage } from '@/pages/Admin/ProductType';
import { BranchPage } from '@/pages/Admin/Branch';
import { StocksPage } from '@/pages/Admin/Stocks';
import { CompetitorPage } from '@/pages/Admin/Competitor';
import { ConversionPage } from '@/pages/Admin/Conversion';
import { PriceBoardPage } from '@/pages/Admin/PriceBoard';
import { ReportsPage } from '@/pages/Admin/Reports';
import ProtectedRoute from '@/components/ProtectedRoutes';
import { ROLES } from '../constants/ROLES';

const adminPath = `/${ROUTES.INTERNAL_USER.PATH}`;

export const adminRoutes: RouteObject[] = [
  {
    path: adminPath,
    element: (
      <ProtectedRoute allowedRoles={[ROLES.InternalUser]}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: ROUTES.INTERNAL_USER.DASHBOARD,
        element: <DashboardPage />,
      },
      {
        path: ROUTES.INTERNAL_USER.ACCOUNT,
        element: <AccountPage />,
      },
      {
        path: ROUTES.INTERNAL_USER.SHIFT,
        element: <ShiftPage />,
      },
      {
        path: ROUTES.INTERNAL_USER.REPORTS,
        element: <ReportsPage />,
      },
      {
        path: ROUTES.INTERNAL_USER.DELIVERIES,
        element: <DeliveriesPage />,
      },
      {
        path: ROUTES.INTERNAL_USER.PRODUCT_LIST,
        element: <ProductListPage />,
      },
      {
        path: ROUTES.INTERNAL_USER.PRODUCT_TYPE,
        element: <ProductTypePage />,
      },
      {
        path: ROUTES.INTERNAL_USER.BRANCH,
        element: <BranchPage />,
      },
      {
        path: ROUTES.INTERNAL_USER.STOCKS,
        element: <StocksPage />,
      },
      {
        path: ROUTES.INTERNAL_USER.COMPETITOR,
        element: <CompetitorPage />,
      },
      {
        path: ROUTES.INTERNAL_USER.CONVERSION,
        element: <ConversionPage />,
      },
      {
        path: ROUTES.INTERNAL_USER.PRICE_BOARD,
        element: <PriceBoardPage />,
      },
    ],
  },
];

const adminSidebarLinks = [
  {
    title: 'Dashboard',
    children: [
      {
        title: 'Dashboard',
        logo: <Dashboard />,
        to: `${adminPath}/${ROUTES.INTERNAL_USER.DASHBOARD}`,
      },
    ],
  },
  {
    title: 'Account Management',
    children: [
      {
        title: 'Account',
        logo: <Account />,
        to: `${adminPath}/${ROUTES.INTERNAL_USER.ACCOUNT}`,
      },
      {
        title: 'Shift',
        logo: <Shift />,
        to: `${adminPath}/${ROUTES.INTERNAL_USER.SHIFT}`,
      },
      {
        title: 'Reports',
        logo: <Reports />,
        to: `${adminPath}/${ROUTES.INTERNAL_USER.REPORTS}`,
      },
    ],
  },
  {
    title: 'Order Management',
    children: [
      {
        title: 'Deliveries',
        logo: <Delivery />,
        to: `${adminPath}/${ROUTES.INTERNAL_USER.DELIVERIES}`,
      },
    ],
  },
  {
    title: 'Product Management',
    children: [
      {
        title: 'Product List',
        logo: <Gas />,
        to: `${adminPath}/${ROUTES.INTERNAL_USER.PRODUCT_LIST}`,
      },
      {
        title: 'Product Types',
        logo: <Category />,
        to: `${adminPath}/${ROUTES.INTERNAL_USER.PRODUCT_TYPE}`,
      },
    ],
  },
  {
    title: 'Branch Management',
    children: [
      {
        title: 'Branch',
        logo: <Branch />,
        to: `${adminPath}/${ROUTES.INTERNAL_USER.BRANCH}`,
      },
      {
        title: 'Stocks',
        logo: <Stocks />,
        to: `${adminPath}/${ROUTES.INTERNAL_USER.STOCKS}`,
      },
    ],
  },
  {
    title: 'Competitors Management',
    children: [
      {
        title: 'Competitor',
        logo: <Competitor />,
        to: `${adminPath}/${ROUTES.INTERNAL_USER.COMPETITOR}`,
      },
    ],
  },
  {
    title: 'Price Management',
    children: [
      {
        title: 'Conversion',
        logo: <Conversion />,
        to: `${adminPath}/${ROUTES.INTERNAL_USER.CONVERSION}`,
      },
      {
        title: 'Price Board',
        logo: <Price />,
        to: `${adminPath}/${ROUTES.INTERNAL_USER.PRICE_BOARD}`,
      },
    ],
  },
];

export { adminSidebarLinks };
