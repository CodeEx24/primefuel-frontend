import { lazy, Suspense } from 'react';

const Conversion = lazy(() => import('./ConversionView'));

export const ConversionPage = () => {
  return (
    <Suspense>
      <Conversion />
    </Suspense>
  );
};
