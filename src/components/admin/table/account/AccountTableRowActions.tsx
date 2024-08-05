import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { tableAccountSchema } from '@/shared/schema/table/admin/accountSchema';
import { STATUS } from '@/shared/constants/ROLES';
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from '@/pages/api/usersApiSlice';
import { ErrorResponse } from '@/shared/interface/ErrorType';
import { TOAST_TYPE } from '@/shared/constants/TOAST';
import { useCustomToast } from '@/shared/hooks/useCustomToast';
import { useDispatch } from 'react-redux';
import { setRefetchData } from '@/shared/lib/features/paginationSlice';
import { DialogTemplate } from '../../dialog/DialogTemplate';
import { AccountForm } from '../../forms/AccountForm';
import { useEffect, useState } from 'react';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [userId, setUserId] = useState<string | null>(null); // Initialize with null

  const { showToast } = useCustomToast();
  const dispatch = useDispatch();
  const account = tableAccountSchema.parse(row.original);

  const [isShowing, setIsShowing] = useState(false);
  const [updateUser] = useUpdateUserMutation();
  const { data: userData, refetch } = useGetUserByIdQuery(userId ?? '', {
    skip: !userId, // Skip query if userId is null or empty
  });

  useEffect(() => {
    if (isShowing) {
      setUserId(account._id);
    } else {
      setUserId(null); // Reset userId when dialog is closed
    }
  }, [isShowing, account]);

  useEffect(() => {
    if (userId && isShowing) {
      refetch();
    }
  }, [userId, refetch, isShowing]);

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

        <DialogTemplate
          label="Update"
          title="Update user account"
          description="Fill in the form below to create a new user account. Ensure all required fields are completed accurately."
          isOpen={isShowing}
          setShowDialog={setIsShowing}
          isButton={false}
        >
          {isShowing && userData?.data && (
            <AccountForm setShowDialog={setIsShowing} user={userData.data} />
          )}
        </DialogTemplate>

        <DropdownMenuItem>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
