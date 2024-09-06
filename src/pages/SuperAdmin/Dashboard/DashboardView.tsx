import { DummyChart } from '@/components/userBaseComponent/super-admin/DummyChart';
import Typography from '@/components/defaults/Typography';
import { Input } from '@/components/ui/input';
import { useSelector } from 'react-redux';
import {
  getFilters,
  getPagination,
  getSorting,
} from '@/shared/lib/features/paginationSlice';
import { useGetUsersQuery } from '@/pages/api/usersApiSlice';
import { useEffect } from 'react';

export default function DashboardView() {
  const pagination = useSelector(getPagination);
  const filters = useSelector(getFilters);
  const sorting = useSelector(getSorting);

  const { data: usersDetails } = useGetUsersQuery({
    page: pagination.pageIndex,
    pageSize: pagination.pageSize,
    filters: filters,
    sorting: sorting,
  });

  useEffect(() => {
    console.log('usersDetails: ', usersDetails);
  });

  return (
    <div className="space-y-4 w-full">
      <Typography variant="heading3" tag="h3" className="text-primary">
        Dashboard
      </Typography>
      <div className="md:flex  justify-between w-full space-y-2 md:space-y-0 md:gap-4">
        <Input
          placeholder="Search"
          className="text-foreground w-full md:w-4/12"
        ></Input>
        <div className="md:flex space-y-2 md:space-y-0 md:gap-4 md:w-8/12">
          <Input placeholder="Branch" className="text-foreground"></Input>
          <Input placeholder="Product" className="text-foreground"></Input>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DummyChart />
        <DummyChart />
        <DummyChart />
      </div>
    </div>
  );
}
