import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { STATUS } from '@/shared/constants/ROLES';
import { useUpdateUserMutation } from '@/pages/api/usersApiSlice';
import { ErrorResponse } from '@/shared/interface/ErrorType';
import { TOAST_TYPE } from '@/shared/constants/TOAST';
import { useCustomToast } from '@/shared/hooks/useCustomToast';
import { useDispatch } from 'react-redux';
import { setRefetchData } from '@/shared/lib/features/paginationSlice';
import { AccountForm } from '../../forms/AccountForm';
import { useState } from 'react';
import { ResponsiveDialog } from '@/components/defaults/ResponsiveDialog';
import { tableAccountSchema } from '@/shared/schema/accountSchema';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const { showToast } = useCustomToast();
  const dispatch = useDispatch();
  const account = tableAccountSchema.parse(row.original);

  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  const [updateUser] = useUpdateUserMutation();

  const handleClick = async (value: string) => {
    try {
      const { _id: id, ...updates } = account;
      updates.status = value;
      const response = await updateUser({ id, updates }).unwrap();

      showToast(TOAST_TYPE.SUCCESS, response.message);
      dispatch(setRefetchData());
    } catch (error: unknown) {
      const axiosError = error as ErrorResponse;
      if (!axiosError?.response) {
        showToast(TOAST_TYPE.ERROR, 'No server error response');
      } else if (axiosError?.response?.status === 400) {
        showToast(TOAST_TYPE.ERROR, 'Missing email or password!');
      } else if (axiosError?.response?.status === 401) {
        showToast(TOAST_TYPE.ERROR, 'Unauthorized');
      } else {
        showToast(TOAST_TYPE.ERROR, 'Login Failed');
      }
    }
  };

  return (
    <>
      <ResponsiveDialog
        isOpen={isUpdateOpen}
        setIsOpen={setIsUpdateOpen}
        title="Edit User"
        description="Update the user details below by changing values."
      >
        <AccountForm setShowDialog={setIsUpdateOpen} user={account} />
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
          {account.status === STATUS.Pending && (
            <>
              <DropdownMenuItem
                className="flex items-center gap-2"
                onClick={() => handleClick('Approved')}
              >
                {STATUS.Approved}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2"
                onClick={() => handleClick('Rejected')}
              >
                {STATUS.Rejected}
              </DropdownMenuItem>
            </>
          )}
          <hr />

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
