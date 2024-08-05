import { ColumnsType } from '@/shared/lib/interface/TableType';
import Typography from '../defaults/Typography';
import { useReactTable, getCoreRowModel, getSortedRowModel, SortingState } from '@tanstack/react-table';
import { useState } from 'react';
import { Table } from '../ui/table';
import { Header } from '../defaults/table/Header';
export default function AccountTable() {
  const columns: ColumnsType[] = [
    {
      id: `checkbox`,
      header: 'Sample',
      cell: ({ row }: any) => {
        return <Typography>{row}</Typography>;
      },
    },
    {
      header: 'Influencers',
      accessorKey: 'influencer_details',
      cell: ({ row }: any) => {
        return <Typography>{row}</Typography>;
      },
    },
    {
      header: `Headers`,
      accessorKey: 'followers_count',
      cell: (props: any) => {
        return <div className="flex gap-2.5 w-[120px]">{props.getValue().toLocaleString()}</div>;
      },
    },
  ];

  // Remove this tow
  //   const pagination = { pageIndex: 1, pageSize: 10 }
  // const pageCount = 20
  const [paginationState, setPaginationState] = useState({ pageIndex: 1, pageSize: 10 });
  const [sortingState, setSortingState] = useState<SortingState>([]);

  const table = useReactTable({
    data: [], // Set the data here
    columns,
    getCoreRowModel: getCoreRowModel(),

    pageCount: 20,
    manualPagination: true,
    onPaginationChange: setPaginationState,

    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSortingState,

    state: { pagination: { pageIndex: 1, pageSize: 10 }, sorting: sortingState }, // , sorting
  });

  return (
    <>
      <Table>
        <Header table={table} />
        <Body table={table} columns={columns} platform={platform} />
      </Table>
      <TablePagination table={table} setPaginationState={setPaginationState} />
    </>
  );
}
