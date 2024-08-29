import { useState } from 'react';
import BranchForm from '../forms/BranchForm';
import { ResponsiveDialog } from '@/components/defaults/ResponsiveDialog';
import { Button } from '@/components/ui/button';

export default function AddBranchButton() {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <Button onClick={() => setShowDialog(!showDialog)}>Add Branch</Button>
      <ResponsiveDialog
        isOpen={showDialog}
        setIsOpen={setShowDialog}
        title="Add Branch"
        description="Add the branch details below by changing values."
      >
        {<BranchForm setShowDialog={setShowDialog} />}
      </ResponsiveDialog>
    </>
  );
}
