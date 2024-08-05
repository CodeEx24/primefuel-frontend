import { useState } from 'react';
import { DialogTemplate } from '../dialog/DialogTemplate';
import { AccountForm } from '../forms/AccountForm';

export function AddAccountDialog() {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <DialogTemplate
      label="Add Account"
      title="Add user account"
      description="Fill in the form below to create a new user account. Ensure all required fields are completed accurately."
      isOpen={showDialog}
      setShowDialog={setShowDialog}
    >
      <AccountForm setShowDialog={setShowDialog} />
    </DialogTemplate>
  );
}
