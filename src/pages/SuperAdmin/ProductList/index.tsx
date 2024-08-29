import { lazy, Suspense } from 'react';

const ProductList = lazy(() => import('./ProductListView'));

export const ProductListPage = () => {
  return (
    <Suspense>
      <ProductList />
    </Suspense>
  );
};
