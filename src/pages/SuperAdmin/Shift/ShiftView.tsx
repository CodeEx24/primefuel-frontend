import { shiftColumns } from '@/components/userBaseComponent/super-admin/table/shift/ShiftTableConfig';
import { ShiftTableToolbar } from '@/components/userBaseComponent/super-admin/table/shift/ShiftTableToolbar';
import { DataTable } from '@/components/defaults/table/DataTable';
import Typography from '@/components/defaults/Typography';
import { useGetShiftsQuery } from '@/pages/api/shiftApiSlice';
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

export default function ShiftView() {
  const dispatch = useDispatch();
  const pagination = useSelector(getPagination);
  const filters = useSelector(getFilters);
  const sorting = useSelector(getSorting);
  const refetchStatus = useSelector(getRefetchStatus);

  const { data: shiftsResult, refetch } = useGetShiftsQuery({
    page: pagination.pageIndex,
    pageSize: pagination.pageSize,
    filters: filters,
    sorting: sorting,
  });
  console.log('shiftsResult: ', shiftsResult);
  useEffect(() => {
    if (shiftsResult?.data?.shifts) {
      dispatch(
        setPaginationDetails({
          pagination: shiftsResult.data.pagination,
          pageCount: shiftsResult.data.pageCount,
          totalRecords: shiftsResult.data.totalRecords,
        })
      );
    }
  }, [shiftsResult, dispatch]);

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
          Shift
        </Typography>
      </div>
      <div className="">
        <DataTable
          columns={shiftColumns}
          data={shiftsResult?.data?.shifts || []}
          ToolbarComponent={ShiftTableToolbar}
        />
      </div>
    </div>
  );
}
