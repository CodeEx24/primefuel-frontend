import { ROLES } from '@/shared/constants/ROLES';
import { ROUTES } from '@/shared/constants/ROUTES';
import { selectCurrentUser } from '@/shared/lib/features/authSlice';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

interface ProtectedAuthRoutesProps {
  children: React.ReactNode;
}

const ProtectedAuthRoutes: React.FC<ProtectedAuthRoutesProps> = ({
  children,
}) => {
  const user = useSelector(selectCurrentUser);
  if (user) {
    if (user.role === ROLES.SuperAdmin) {
      // Redirect to a different page if the user is already logged in
      return (
        <Navigate
          to={`/${ROUTES.SUPER_ADMIN.PATH}/${ROUTES.SUPER_ADMIN.DASHBOARD}`}
        />
      );
    } else {
      // Unauthorized
      return <Navigate to="/unauthorized" />;
    }
  }
  return <>{children}</>;
};

export default ProtectedAuthRoutes;
