import React from 'react';
import { z } from 'zod';
import { updateAccountSchema } from '../schema/accountSchema';
import { addBranchSchema } from '../schema/branchSchema';

export interface AccountFormType {
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
  user?: z.infer<typeof updateAccountSchema>;
}

export interface BranchFormType {
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
  branch?: z.infer<typeof addBranchSchema>;
}

export interface DialogTemplateType {
  children: React.ReactNode;
  label: string;
  title: string;
  description?: string;
  isOpen: boolean;
  isButton?: boolean;
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
}
