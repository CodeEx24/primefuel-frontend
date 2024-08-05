import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <main className="w-full h-screen flex items-center justify-center dark bg-secondary">
      {/* <LoginForm /> */}
      <Outlet />
    </main>
  );
}
