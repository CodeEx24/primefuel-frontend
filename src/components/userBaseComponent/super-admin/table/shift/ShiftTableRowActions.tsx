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
import { tableShiftSchema } from '@/shared/schema/shiftSchema';
import ShiftForm from '../../forms/ShiftForm';
import ShiftViewData from './ViewData';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const shiftDetails = tableShiftSchema.parse(row.original);

  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);

  return (
    <>
      <ResponsiveDialog
        isOpen={isViewOpen}
        setIsOpen={setIsViewOpen}
        title="Shift View Details"
        // description="Update the branch details below by changing values."
      >
        <ShiftViewData
          setShowDialog={setIsViewOpen}
          branchShift={shiftDetails}
        />
      </ResponsiveDialog>
      <ResponsiveDialog
        isOpen={isUpdateOpen}
        setIsOpen={setIsUpdateOpen}
        title="Edit Branch"
        description="Update the branch details below by changing values."
      >
        <ShiftForm setShowDialog={setIsUpdateOpen} branchShift={shiftDetails} />
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
                setIsViewOpen(true);
              }}
            >
              View
            </Button>
          </DropdownMenuItem>
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
