import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useState } from 'react';
import { ResponsiveDialog } from '@/components/defaults/ResponsiveDialog';
import RequestOrderForm from '../../forms/RequestOrderForm';
import { tableRequestOrderSchema } from '@/shared/schema/requestOrderSchema';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const requstOrderDetails = tableRequestOrderSchema.parse(row.original);

  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  return (
    <>
      <ResponsiveDialog
        isOpen={isUpdateOpen}
        setIsOpen={setIsUpdateOpen}
        title="Edit Branch"
        description="Update the branch details below by changing values."
      >
        <RequestOrderForm
          setShowDialog={setIsUpdateOpen}
          requstOrder={requstOrderDetails}
        />
      </ResponsiveDialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted text-foreground"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem className="p-0">
            <Button
              variant="ghost"
              className="w-full h-8 flex justify-start"
              onClick={() => {
                setIsUpdateOpen(true);
              }}
            >
              Edit
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
