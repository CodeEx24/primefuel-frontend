import { ColumnDef } from '@tanstack/react-table';

// import { Badge } from '@/components/ui/badge';

// import { labels, priorities, statuses } from './data/data';
import { DataTableColumnHeader } from '@/components/defaults/table/DataTableColumnHeader';
import { DataTableRowActions } from './CompetitorTableRowActions';
import Typography from '@/components/defaults/Typography';
import { TableProduct } from '@/shared/schema/productSchema';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const competitorListColumns: ColumnDef<TableProduct>[] = [
  {
    accessorKey: 'logo',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Logo" />
    ),
    cell: ({ row }) => {
      return (
        <Avatar className="rounded-md size-24 text-foreground border border-ring">
          <AvatarImage src={row.getValue('logo')} className="object-contain" />
          <AvatarFallback>{row.original.name}</AvatarFallback>
        </Avatar>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false,
    enableHiding: false, // disable hiding for this column
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
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

export const competitorFilterConfig = [
  { placeholder: 'Competitor Name', key: 'name' },
  { placeholder: 'Description', key: 'description' },
];

// export const facetConfig = [
//   { key: 'status', title: 'Status', options: statuses },
//   { key: 'roles', title: 'Roles', options: roles },
// ];
