import { lazy, Suspense } from 'react';

const Products = lazy(() => import('./ProductsView'));

export const ProductsPage = () => {
  return (
    <Suspense>
      <Products />
    </Suspense>
  );
};
