import { ColumnDef } from '@tanstack/react-table';

// import { Badge } from '@/components/ui/badge';

// import { labels, priorities, statuses } from './data/data';
import { DataTableColumnHeader } from '@/components/defaults/table/DataTableColumnHeader';
import { DataTableRowActions } from './RequestOrderTableRowActions';
import Typography from '@/components/defaults/Typography';
import { TableRequestOrder } from '@/shared/schema/requestOrderSchema';

export const requestOrderColumns: ColumnDef<TableRequestOrder>[] = [
  {
    accessorKey: 'branch',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Branch Name" />
    ),
    cell: ({ row }) => {
      return <Typography> {row.getValue('branch')}</Typography>;
    },
    enableHiding: false, // disable hiding for this column
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
