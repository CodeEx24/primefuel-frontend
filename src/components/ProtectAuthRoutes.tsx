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
    if (user.roles.includes(ROLES.InternalUser)) {
      // Redirect to a different page if the user is already logged in
      return (
        <Navigate
          to={`/${ROUTES.INTERNAL_USER.PATH}/${ROUTES.INTERNAL_USER.DASHBOARD}`}
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
