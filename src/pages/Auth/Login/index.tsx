import { lazy, Suspense } from 'react';

const Login = lazy(() => import('./LoginView'));

export const LoginPage = () => {
  return (
    <Suspense>
      <Login />
    </Suspense>
  );
};
