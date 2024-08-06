import { ColumnDef } from '@tanstack/react-table';

// import { Badge } from '@/components/ui/badge';

// import { labels, priorities, statuses } from './data/data';
import { DataTableColumnHeader } from '@/components/defaults/table/DataTableColumnHeader';
import { DataTableRowActions } from './AccountTableRowActions';
import Typography from '@/components/defaults/Typography';
import { roles, statuses } from './DataOptions';
import { STATUS } from '@/shared/constants/ROLES';
import { TableAccount } from '@/shared/schema/accountSchema';

export const accountColumns: ColumnDef<TableAccount>[] = [
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <Typography> {row.getValue('email')}</Typography>
        </div>
      );
    },
    enableHiding: false, // disable hiding for this column
  },
  {
    accessorKey: 'lastname',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Name" />
    ),
    cell: ({ row }) => {
      return <Typography> {row.getValue('lastname')}</Typography>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'firstname',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="First Name" />
    ),
    cell: ({ row }) => {
      return <Typography> {row.getValue('firstname')}</Typography>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'roles',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      return <Typography>{row.getValue('roles')}</Typography>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'contact',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Contact Number" />
    ),
    cell: ({ row }) => {
      return <Typography> {row.getValue('contact')}</Typography>;
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
      const emoji =
        row.getValue('status') === STATUS.Approved
          ? '🟢'
          : row.getValue('status') === STATUS.Rejected
          ? '🔴'
          : '🟡';
      return (
        <Typography>
          {emoji}
          {row.getValue('status')}
        </Typography>
      );
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
  { placeholder: 'Email', key: 'email' },
  { placeholder: 'First Name', key: 'firstname' },
  { placeholder: 'Last Name', key: 'lastname' },
];

export const facetConfig = [
  { key: 'status', title: 'Status', options: statuses },
  { key: 'roles', title: 'Roles', options: roles },
];
