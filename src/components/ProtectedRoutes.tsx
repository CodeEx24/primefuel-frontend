import { selectCurrentUser } from '@/shared/lib/features/authSlice';
import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  allowedRoles: string[];
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
  children,
}) => {
  const user = useSelector(selectCurrentUser);
  // Check for user and role validation
  if (user?.role && allowedRoles.includes(user.role)) {
    return <>{children}</>;
  }

  return <Navigate to="/" />;
};

export default ProtectedRoute;
