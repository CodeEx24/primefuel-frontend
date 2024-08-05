import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./DashboardView'));

export const DashboardPage = () => {
  return (
    <Suspense>
      <Dashboard />
    </Suspense>
  );
};
