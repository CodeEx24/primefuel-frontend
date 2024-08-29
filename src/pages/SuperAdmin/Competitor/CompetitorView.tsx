import { competitorListColumns } from '@/components/userBaseComponent/super-admin/table/competitor/CompetitorTableConfig';
import { CompetitorTableToolbar } from '@/components/userBaseComponent/super-admin/table/competitor/CompetitorTableToolbar';
import { DataTable } from '@/components/defaults/table/DataTable';
import Typography from '@/components/defaults/Typography';
import { useGetCompetitorsQuery } from '@/pages/api/competitorApiSlice';
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

export default function CompetitorView() {
  const dispatch = useDispatch();
  const pagination = useSelector(getPagination);
  const filters = useSelector(getFilters);
  const sorting = useSelector(getSorting);
  const refetchStatus = useSelector(getRefetchStatus);

  const { data: competitorDetails, refetch } = useGetCompetitorsQuery({
    page: pagination.pageIndex,
    pageSize: pagination.pageSize,
    filters: filters,
    sorting: sorting,
  });

  useEffect(() => {
    if (competitorDetails?.data?.competitors) {
      dispatch(
        setPaginationDetails({
          pagination: competitorDetails.data.pagination,
          pageCount: competitorDetails.data.pageCount,
          totalRecords: competitorDetails.data.totalRecords,
        })
      );
    }
  }, [competitorDetails, dispatch]);

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
          Competitors
        </Typography>
      </div>
      <div className="">
        <DataTable
          columns={competitorListColumns}
          data={competitorDetails?.data?.competitors || []}
          ToolbarComponent={CompetitorTableToolbar}
        />
      </div>
    </div>
  );
}
