import { lazy, Suspense } from 'react';

const Competitor = lazy(() => import('./CompetitorView'));

export const CompetitorPage = () => {
  return (
    <Suspense>
      <Competitor />
    </Suspense>
  );
};
