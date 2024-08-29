import { ColumnDef } from '@tanstack/react-table';

// import { Badge } from '@/components/ui/badge';

// import { labels, priorities, statuses } from './data/data';
import { DataTableColumnHeader } from '@/components/defaults/table/DataTableColumnHeader';
import { DataTableRowActions } from './ShiftTableRowActions';
import Typography from '@/components/defaults/Typography';
import { TableShift } from '@/shared/schema/shiftSchema';

export const shiftColumns: ColumnDef<TableShift>[] = [
  {
    accessorKey: 'branch',
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
          <Typography> {row.getValue('branch')}</Typography>
        </div>
      );
    },
    enableHiding: false, // disable hiding for this column
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Shift Name" />
    ),
    cell: ({ row }) => {
      return <Typography> {row.getValue('name')}</Typography>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
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
      return <Typography> {row.getValue('municipality')}</Typography>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

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
