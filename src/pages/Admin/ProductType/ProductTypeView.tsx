import { productTypesColumns } from '@/components/admin/table/productTypes/ProductTypesTableConfig';
import { ProductTypesTableToolbar } from '@/components/admin/table/productTypes/ProductTypesTableToolbar';
import { DataTable } from '@/components/defaults/table/DataTable';
import Typography from '@/components/defaults/Typography';
import { useGetProductTypesQuery } from '@/pages/api/productTypesApiSlice';
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

export default function ProductTypeView() {
  const dispatch = useDispatch();
  const pagination = useSelector(getPagination);
  const filters = useSelector(getFilters);
  const sorting = useSelector(getSorting);
  const refetchStatus = useSelector(getRefetchStatus);

  const { data: productTypesDetails, refetch } = useGetProductTypesQuery({
    page: pagination.pageIndex,
    pageSize: pagination.pageSize,
    filters: filters,
    sorting: sorting,
  });

  useEffect(() => {
    if (productTypesDetails?.data?.productTypes) {
      dispatch(
        setPaginationDetails({
          pagination: productTypesDetails.data.pagination,
          pageCount: productTypesDetails.data.pageCount,
          totalRecords: productTypesDetails.data.totalRecords,
        })
      );
    }
  }, [productTypesDetails, dispatch]);

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
          Product Types
        </Typography>
      </div>
      <div className="">
        <DataTable
          columns={productTypesColumns}
          data={productTypesDetails?.data?.productTypes || []}
          ToolbarComponent={ProductTypesTableToolbar}
        />
      </div>
    </div>
  );
}
