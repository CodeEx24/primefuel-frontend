import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useEffect, useState } from 'react';
import { tableBranchSchema } from '@/shared/schema/table/admin/branchSchema';
import { useGetBranchesByIdQuery } from '@/pages/api/branchApiSlice';
import BranchForm from '../../forms/BranchForm';
import { ResponsiveDialog } from '@/components/defaults/ResponsiveDialog';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [branchesId, setBranchesId] = useState<string | null>(null); // Initialize with null

  // const { showToast } = useCustomToast();
  // const dispatch = useDispatch();
  const branch = tableBranchSchema.parse(row.original);

  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  // const [updateUser] = useUpdateUserMutation();
  const { data: branchesData, refetch } = useGetBranchesByIdQuery(
    branchesId ?? '',
    {
      skip: !branchesId, // Skip query if branchesId is null or empty
    }
  );

  useEffect(() => {
    if (isUpdateOpen) {
      setBranchesId(branch._id);
    } else {
      setBranchesId(null); // Reset branchesId when dialog is closed
    }
  }, [branch, isUpdateOpen]);

  useEffect(() => {
    if (branchesId && isUpdateOpen) {
      refetch();
    }
  }, [branchesId, refetch, isUpdateOpen]);

  // const handleClick = async (value: string) => {
  //   try {
  //     const { _id: id, ...updates } = branch;
  //     updates.status = value;
  //     const response = await updateUser({ id, updates }).unwrap();

  //     showToast(TOAST_TYPE.SUCCESS, response.message);
  //     dispatch(setRefetchData());
  //   } catch (error: unknown) {
  //     const axiosError = error as ErrorResponse;
  //     if (!axiosError?.response) {
  //       showToast(TOAST_TYPE.ERROR, 'No server error response');
  //     } else if (axiosError?.response?.status === 400) {
  //       showToast(TOAST_TYPE.ERROR, 'Missing email or password!');
  //     } else if (axiosError?.response?.status === 401) {
  //       showToast(TOAST_TYPE.ERROR, 'Unauthorized');
  //     } else {
  //       showToast(TOAST_TYPE.ERROR, 'Login Failed');
  //     }
  //   }
  // };

  return (
    <>
      <ResponsiveDialog
        isOpen={isUpdateOpen}
        setIsOpen={setIsUpdateOpen}
        title="Edit Branch"
        description="Update the branch details below by changing values."
      >
        <BranchForm
          setShowDialog={setIsUpdateOpen}
          branch={branchesData?.data}
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
              {/* <IconMenu text="Edit" icon={<SquarePen className="h-4 w-4" />} /> */}
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
