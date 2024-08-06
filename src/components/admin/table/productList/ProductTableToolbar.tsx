import { Table } from '@tanstack/react-table';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Cross2Icon } from '@radix-ui/react-icons';
import { DataTableViewOptions } from '@/components/defaults/table/DataTableViewOptions';
import { useDispatch } from 'react-redux';
import { setFilters } from '@/shared/lib/features/paginationSlice';
import { debounce } from '@/lib/debounce';
import { useMemo, useState } from 'react';
import { productTypesFilterConfig } from './ProductTableConfig';
import { AddEntityButton } from '../../button/AddEntityButton';
import { ProductForm } from '../../forms/ProductForm';
import { useGetAllProductTypesQuery } from '@/pages/api/productTypesApiSlice';
import { DataTableFacetedFilter } from '@/components/defaults/table/DataTableFacetedFilter';

interface ProductTableToolbarProps<TData> {
  table: Table<TData>;
}

export function ProductTableToolbar<TData>({
  table,
}: ProductTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const dispatch = useDispatch();
  const [filtersState, setFiltersState] = useState<{ [key: string]: string }>(
    {}
  );

  const debouncedSetFilters = useMemo(
    () =>
      debounce((key: string, value: string) => {
        dispatch(setFilters({ title: key, value }));
      }, 300),
    [dispatch]
  );

  const handleInputChange =
    (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      setFiltersState((prev) => ({ ...prev, [key]: newValue }));
      debouncedSetFilters(key, newValue);
    };

  // Fetch product types
  const { data: productTypeDetails, isSuccess: isProductTypeSuccess } =
    useGetAllProductTypesQuery({});

  const typeChoices =
    productTypeDetails?.data?.productTypes?.map(
      ({ _id, name }: { _id: string; name: string }) => ({
        value: _id,
        label: name,
      })
    ) || []; // Default to empty array if productTypes is undefined

  const facetConfig = [{ key: 'type', title: 'Type', options: typeChoices }];

  return (
    <>
      <div className="grid grid-cols-1 md:flex  items-center justify-between gap-2 mt-4 px-1">
        {productTypesFilterConfig.map(({ placeholder, key }) => (
          <Input
            key={key}
            placeholder={placeholder}
            value={filtersState[key] || ''}
            onChange={handleInputChange(key)}
            className="h-8 hidden md:flex"
          />
        ))}

        {isProductTypeSuccess &&
          facetConfig.map(({ key, title, options }) =>
            table.getColumn(key) ? (
              <DataTableFacetedFilter
                key={key}
                column={table.getColumn(key)}
                title={title}
                options={options}
              />
            ) : null
          )}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3 text-foreground dark"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}

        <div className="flex gap-2">
          <DataTableViewOptions table={table} />
          <AddEntityButton
            FormComponent={ProductForm}
            buttonLabel="Add Product"
            dialogTitle="Add Product"
            dialogDescription="Add the product detail below by changing values."
          />
        </div>
      </div>
    </>
  );
}
