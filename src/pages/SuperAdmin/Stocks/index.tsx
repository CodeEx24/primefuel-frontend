import { lazy, Suspense } from 'react';

const Stocks = lazy(() => import('./StocksView'));

export const StocksPage = () => {
  return (
    <Suspense>
      <Stocks />
    </Suspense>
  );
};
