import AuthCard from '@/components/forms/AuthCard';
import LoginForm from '@/components/forms/LoginForm';
import { Role, ROLES } from '@/shared/constants/ROLES';
import { ROUTES } from '@/shared/constants/ROUTES';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const LoginView = () => {
  const location = useLocation();
  const { pathname } = location;
  const [role, setRole] = useState<Role | undefined>(undefined);

  useEffect(() => {
    if (pathname === `/${ROUTES.ADMIN.PATH}`) {
      setRole(ROLES.Admin);
    } else if (pathname === `/${ROUTES.SUPER_ADMIN.PATH}`) {
      setRole(ROLES.SuperAdmin);
    } else if (pathname === `/${ROUTES.OWNER.PATH}`) {
      setRole(ROLES.Owner);
    } else if (pathname === `/${ROUTES.STAFF.PATH}`) {
      setRole(ROLES.Staff);
    } else if (pathname === `/${ROUTES.DRIVER.PATH}`) {
      setRole(ROLES.Driver);
    }
  }, [pathname]);

  return (
    <AuthCard title="" description="Please login your account.">
      <LoginForm role={role} />
    </AuthCard>
  );
};

export default LoginView;
