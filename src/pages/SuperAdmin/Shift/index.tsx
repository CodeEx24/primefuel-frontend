import { lazy, Suspense } from 'react';

const Shift = lazy(() => import('./ShiftView'));

export const ShiftPage = () => {
  return (
    <Suspense>
      <Shift />
    </Suspense>
  );
};
