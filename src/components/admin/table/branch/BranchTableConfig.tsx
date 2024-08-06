import { ColumnDef } from '@tanstack/react-table';

// import { Badge } from '@/components/ui/badge';

// import { labels, priorities, statuses } from './data/data';
import { DataTableColumnHeader } from '@/components/defaults/table/DataTableColumnHeader';
import { DataTableRowActions } from './BranchTableRowActions';
import Typography from '@/components/defaults/Typography';
import { TableBranch } from '@/shared/schema/branchSchema';

export const branchColumns: ColumnDef<TableBranch>[] = [
  {
    accessorKey: 'branchName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Branch Name" />
    ),
    cell: ({ row }) => {
      const gradientColor = row.original.gradientColor;
      return (
        <div className="flex gap-2">
          <div
            className={`size-6 rounded-full border border-white`}
            style={{
              backgroundColor: gradientColor,
            }}
          ></div>
          <Typography> {row.getValue('branchName')}</Typography>
        </div>
      );
    },
    enableHiding: false, // disable hiding for this column
  },
  {
    accessorKey: 'region',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Region" />
    ),
    cell: ({ row }) => {
      return <Typography> {row.getValue('region')}</Typography>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'province',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Province" />
    ),
    cell: ({ row }) => {
      return <Typography> {row.getValue('province')}</Typography>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'municipality',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Municipality" />
    ),
    cell: ({ row }) => {
      return <Typography>{row.getValue('municipality')}</Typography>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'barangay',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Barangay" />
    ),
    cell: ({ row }) => {
      return <Typography> {row.getValue('barangay')}</Typography>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  // {
  //   accessorKey: 'gradientColor',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Hex Color" />
  //   ),
  //   cell: ({ row }) => {
  //     const gradientColor = row.getValue('gradientColor') as string;
  //     return (
  //       <div className="flex gap-2">
  //         <div
  //           style={{
  //             backgroundColor: gradientColor,
  //             color: gradientColor,
  //           }}
  //           className="size-6 rounded-full border border-white"
  //         ></div>
  //         <Typography>{gradientColor}</Typography>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },
  {
    id: 'actions',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

export const accountFilterConfig = [
  { placeholder: 'Branch Name', key: 'branchName' },
  { placeholder: 'Region', key: 'region' },
  { placeholder: 'Province', key: 'province' },
  { placeholder: 'Municipality', key: 'municipality' },
  { placeholder: 'Barangay', key: 'barangay' },
];
