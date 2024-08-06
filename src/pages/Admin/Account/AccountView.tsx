import { accountColumns } from '@/components/admin/table/account/AccountTableConfig';
import { AccountTableToolbar } from '@/components/admin/table/account/AccountTableToolbar';
import { DataTable } from '@/components/defaults/table/DataTable';
import Typography from '@/components/defaults/Typography';
import { useGetUsersQuery } from '@/pages/api/usersApiSlice';
import {
  getFilters,
  getPagination,
  getRefetchStatus,
  getSorting,
  setPaginationDetails,
  setRefetchData,
} from '@/shared/lib/features/paginationSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function AccountView() {
  // Fetch users mutation useUserMutation

  const dispatch = useDispatch();
  const pagination = useSelector(getPagination);
  const filters = useSelector(getFilters);
  const sorting = useSelector(getSorting);
  const refetchStatus = useSelector(getRefetchStatus);

  const { data: usersDetails, refetch } = useGetUsersQuery({
    page: pagination.pageIndex,
    pageSize: pagination.pageSize,
    filters: filters,
    sorting: sorting,
  });

  useEffect(() => {
    if (usersDetails?.data?.users) {
      dispatch(
        setPaginationDetails({
          pagination: usersDetails.data.pagination,
          pageCount: usersDetails.data.pageCount,
          totalRecords: usersDetails.data.totalRecords,
        })
      );
    }
  }, [usersDetails, dispatch]);

  useEffect(() => {
    if (refetchStatus) {
      refetch();
      dispatch(setRefetchData());
    }
  }, [refetchStatus, refetch, dispatch]);

  return (
    <div className="space-y-4 w-full ">
      <div className="flex justify-between">
        <Typography variant="heading3" tag="h3">
          Account
        </Typography>
      </div>
      <div className="">
        <DataTable
          columns={accountColumns}
          data={usersDetails?.data?.users || []}
          ToolbarComponent={AccountTableToolbar}
        />
      </div>
    </div>
  );
}
