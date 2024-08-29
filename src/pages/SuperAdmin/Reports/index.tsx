import { lazy, Suspense } from 'react';

const Reports = lazy(() => import('./ReportsView'));

export const ReportsPage = () => {
  return (
    <Suspense>
      <Reports />
    </Suspense>
  );
};
