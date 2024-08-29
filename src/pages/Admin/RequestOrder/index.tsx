import { lazy, Suspense } from 'react';

const RequestOrder = lazy(() => import('./RequestOrderView'));

export const RequestOrderPage = () => {
  return (
    <Suspense>
      <RequestOrder />
    </Suspense>
  );
};
