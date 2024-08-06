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
import { tableCompetitorSchema } from '@/shared/schema/competitorSchema';
import { CompetitorForm } from '../../forms/CompetitorForm';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const competitor = tableCompetitorSchema.parse(row.original);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  return (
    <>
      <ResponsiveDialog
        isOpen={isUpdateOpen}
        setIsOpen={setIsUpdateOpen}
        title="Edit Product"
        description="Update the product details below."
      >
        <CompetitorForm
          setShowDialog={setIsUpdateOpen}
          competitor={competitor}
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
          {/* FOR RESPONSIVE DIALOG */}
          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={() => {
              setIsUpdateOpen(true);
            }}
          >
            Edit
          </DropdownMenuItem>

          {/* <DropdownMenuItem>Delete</DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
