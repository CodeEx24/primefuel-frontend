import { branchColumns } from '@/components/admin/table/branch/BranchTableConfig';
import { BranchTableToolbar } from '@/components/admin/table/branch/BranchTableToolbar';
import { DataTable } from '@/components/defaults/table/DataTable';
import Typography from '@/components/defaults/Typography';
import { useGetBranchesQuery } from '@/pages/api/branchApiSlice';
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

export default function BranchView() {
  const dispatch = useDispatch();
  const pagination = useSelector(getPagination);
  const filters = useSelector(getFilters);
  const sorting = useSelector(getSorting);
  const refetchStatus = useSelector(getRefetchStatus);

  const { data: branchesResult, refetch } = useGetBranchesQuery({
    page: pagination.pageIndex,
    pageSize: pagination.pageSize,
    filters: filters,
    sorting: sorting,
  });

  useEffect(() => {
    if (branchesResult?.data?.branches) {
      dispatch(
        setPaginationDetails({
          pagination: branchesResult.data.pagination,
          pageCount: branchesResult.data.pageCount,
          totalRecords: branchesResult.data.totalRecords,
        })
      );
    }
  }, [branchesResult, dispatch]);

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
          Branches
        </Typography>
      </div>
      <div className="">
        <DataTable
          columns={branchColumns}
          data={branchesResult?.data?.branches || []}
          ToolbarComponent={BranchTableToolbar}
        />
      </div>
    </div>
  );
}
