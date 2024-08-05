import { useState } from 'react';
import { DialogTemplate } from '../dialog/DialogTemplate';
import BranchForm from '../forms/BranchForm';

export default function AddBranchDialog() {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <DialogTemplate
      label="Add Branch"
      title="Add Branch"
      description="Fill in the form below to add a new branch. Ensure all required fields are completed accurately."
      isOpen={showDialog}
      setShowDialog={setShowDialog}
    >
      <BranchForm setShowDialog={setShowDialog} />
    </DialogTemplate>
  );
}
