import { lazy, Suspense } from 'react';

const Deliveries = lazy(() => import('./DeliveriesView'));

export const DeliveriesPage = () => {
  return (
    <Suspense>
      <Deliveries />
    </Suspense>
  );
};
