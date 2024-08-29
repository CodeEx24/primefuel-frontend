import { lazy, Suspense } from 'react';

const Default = lazy(() => import('./DefaultView'));

export const DefaultPage = () => {
  return (
    <Suspense>
      <Default />
    </Suspense>
  );
};
