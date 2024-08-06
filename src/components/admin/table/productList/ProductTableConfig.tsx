import { ColumnDef } from '@tanstack/react-table';

// import { Badge } from '@/components/ui/badge';

// import { labels, priorities, statuses } from './data/data';
import { DataTableColumnHeader } from '@/components/defaults/table/DataTableColumnHeader';
import { DataTableRowActions } from './ProductTableRowActions';
import Typography from '@/components/defaults/Typography';
import { TableProduct } from '@/shared/schema/productSchema';

export const productListColumns: ColumnDef<TableProduct>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product Name" />
    ),
    cell: ({ row }) => {
      return <Typography>{row.getValue('name')}</Typography>;
    },
    enableHiding: false, // disable hiding for this column
  },
  {
    accessorKey: 'type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => {
      return <Typography>{row.original.type_name}</Typography>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false,
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      return <Typography> {row.getValue('description')}</Typography>;
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
  { placeholder: 'Product Name', key: 'name' },
  { placeholder: 'Description', key: 'description' },
];

// export const facetConfig = [
//   { key: 'status', title: 'Status', options: statuses },
//   { key: 'roles', title: 'Roles', options: roles },
// ];
