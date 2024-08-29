import { productListColumns } from '@/components/userBaseComponent/super-admin/table/productList/ProductTableConfig';
import { ProductTableToolbar } from '@/components/userBaseComponent/super-admin/table/productList/ProductTableToolbar';
import { DataTable } from '@/components/defaults/table/DataTable';
import Typography from '@/components/defaults/Typography';
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
import { useGetProductsQuery } from '@/pages/api/productApiSlice';

export default function ProductsView() {
  const dispatch = useDispatch();
  const pagination = useSelector(getPagination);
  const filters = useSelector(getFilters);
  const sorting = useSelector(getSorting);
  const refetchStatus = useSelector(getRefetchStatus);

  const { data: productsDetails, refetch } = useGetProductsQuery({
    page: pagination.pageIndex,
    pageSize: pagination.pageSize,
    filters: filters,
    sorting: sorting,
  });

  useEffect(() => {
    if (productsDetails?.data?.products) {
      dispatch(
        setPaginationDetails({
          pagination: productsDetails.data.pagination,
          pageCount: productsDetails.data.pageCount,
          totalRecords: productsDetails.data.totalRecords,
        })
      );
    }
  }, [productsDetails, dispatch]);

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
          Product
        </Typography>
      </div>
      <div className="">
        <DataTable
          columns={productListColumns}
          data={productsDetails?.data?.products || []}
          ToolbarComponent={ProductTableToolbar}
        />
      </div>
    </div>
  );
}
