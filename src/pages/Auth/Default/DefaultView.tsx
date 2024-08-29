import AuthCard from '@/components/forms/AuthCard';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/shared/constants/ROUTES';
import { Link } from 'react-router-dom';

const DefaultView = () => {
  return (
    <AuthCard title="" description="Please select a role portal">
      <div className="w-full grid grid-cols-1 gap-2">
        <Link to={`/${ROUTES.SUPER_ADMIN.PATH}`}>
          <Button className="w-full">Super Admin</Button>
        </Link>
        <Link to={`/${ROUTES.ADMIN.PATH}`}>
          <Button className="w-full">Admin</Button>
        </Link>
        <Link to={`/${ROUTES.OWNER.PATH}`}>
          <Button className="w-full">Owner</Button>
        </Link>
        <Link to={`/${ROUTES.STAFF.PATH}`}>
          <Button className="w-full">Staff</Button>
        </Link>
        <Link to={`/${ROUTES.DRIVER.PATH}`}>
          <Button className="w-full">Driver</Button>
        </Link>
      </div>
    </AuthCard>
  );
};

export default DefaultView;
