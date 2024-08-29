import { ColumnDef } from '@tanstack/react-table';

// import { Badge } from '@/components/ui/badge';

// import { labels, priorities, statuses } from './data/data';
import { DataTableColumnHeader } from '@/components/defaults/table/DataTableColumnHeader';
import { DataTableRowActions } from './DeliveryTableRowActions';
import Typography from '@/components/defaults/Typography';
import { TableBranch } from '@/shared/schema/branchSchema';

export const deliveryColumns: ColumnDef<TableBranch>[] = [
  {
    accessorKey: 'purchaseOrder',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Purchase Order#" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <div className={`size-6 rounded-full border border-white`}></div>
          <Typography> {row.getValue('purchaseOrder')}</Typography>
        </div>
      );
    },
    enableHiding: false, // disable hiding for this column
  },
  {
    accessorKey: 'branch',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Branch" />
    ),
    cell: ({ row }) => {
      return <Typography> {row.getValue('branch')}</Typography>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'approvedBy',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Approval" />
    ),
    cell: ({ row }) => {
      return <Typography> {row.getValue('approvedBy')}</Typography>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      return <Typography>{row.getValue('status')}</Typography>;
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
