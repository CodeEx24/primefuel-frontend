import { lazy, Suspense } from 'react';

const Branch = lazy(() => import('./BranchView'));

export const BranchPage = () => {
  return (
    <Suspense>
      <Branch />
    </Suspense>
  );
};
