import { lazy, Suspense } from 'react';

const ProductType = lazy(() => import('./ProductTypeView'));

export const ProductTypePage = () => {
  return (
    <Suspense>
      <ProductType />
    </Suspense>
  );
};
