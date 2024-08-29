import { ColumnDef } from '@tanstack/react-table';

// import { Badge } from '@/components/ui/badge';

// import { labels, priorities, statuses } from './data/data';
import { DataTableColumnHeader } from '@/components/defaults/table/DataTableColumnHeader';
import { DataTableRowActions } from './ProductTypesTableRowActions';
import Typography from '@/components/defaults/Typography';
import { TableProductType } from '@/shared/schema/productTypesSchema';

export const productTypesColumns: ColumnDef<TableProductType>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product Types" />
    ),
    cell: ({ row }) => {
      return <Typography>{row.getValue('name')}</Typography>;
    },
    enableHiding: false, // disable hiding for this column
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      return <Typography>{row.getValue('description')}</Typography>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'createdBy',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created By" />
    ),
    cell: ({ row }) => {
      return <Typography> {row.getValue('createdBy')}</Typography>;
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

export const productTypesFilterConfig = [
  { placeholder: 'Product Types', key: 'name' },
  { placeholder: 'Description', key: 'description' },
];
