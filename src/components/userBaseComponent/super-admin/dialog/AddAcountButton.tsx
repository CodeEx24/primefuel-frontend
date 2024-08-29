import { useState } from 'react';
import { AccountForm } from '../forms/AccountForm';
import { Button } from '@/components/ui/button';
import { ResponsiveDialog } from '@/components/defaults/ResponsiveDialog';

export function AddAccountButton() {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <Button onClick={() => setShowDialog(!showDialog)}>Add Account</Button>
      <ResponsiveDialog
        isOpen={showDialog}
        setIsOpen={setShowDialog}
        title="Add Branch"
        description="Add the branch details below by changing values."
      >
        {<AccountForm setShowDialog={setShowDialog} />}
      </ResponsiveDialog>
    </>
  );
}
