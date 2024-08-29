import { lazy, Suspense } from 'react';

const Account = lazy(() => import('./AccountView'));

export const AccountPage = () => {
  return (
    <Suspense>
      <Account />
    </Suspense>
  );
};
