import { Table } from '@tanstack/react-table';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Cross2Icon } from '@radix-ui/react-icons';
import { DataTableViewOptions } from '@/components/defaults/table/DataTableViewOptions';
import { useDispatch } from 'react-redux';
import { setFilters } from '@/shared/lib/features/paginationSlice';
import { AddAccountDialog } from '../../dialog/AddAcountDialog';
import { debounce } from '@/lib/debounce';
import { useMemo, useState } from 'react';
import { accountFilterConfig } from './BranchTableConfig';
import AddBranchDialog from '../../dialog/AddBranchDialog';

interface BranchTableToolbarProps<TData> {
  table: Table<TData>;
}

export function BranchTableToolbar<TData>({
  table,
}: BranchTableToolbarProps<TData>) {
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
  return (
    <>
      <div className="grid grid-cols-1 md:flex  items-center justify-between gap-2 mt-4 px-1">
        {accountFilterConfig.map(({ placeholder, key }) => (
          <Input
            key={key}
            placeholder={placeholder}
            value={filtersState[key] || ''}
            onChange={handleInputChange(key)}
            className="h-8 hidden md:flex"
          />
        ))}

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
          <AddBranchDialog />
        </div>
      </div>
    </>
  );
}
