import { lazy, Suspense } from 'react';

const PriceBoard = lazy(() => import('./PriceBoardView'));

export const PriceBoardPage = () => {
  return (
    <Suspense>
      <PriceBoard />
    </Suspense>
  );
};
