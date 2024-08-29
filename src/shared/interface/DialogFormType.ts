import React from 'react';
import { z } from 'zod';
import { tableProductSchema } from '../schema/productSchema';
import { tableBranchSchema } from '../schema/branchSchema';
import { tableProductTypesSchema } from '../schema/productTypesSchema';
import { tableAccountSchema } from '../schema/accountSchema';
import { tableCompetitorSchema } from '../schema/competitorSchema';
import { tableShiftSchema } from '../schema/shiftSchema';
import { tableRequestOrderSchema } from '../schema/requestOrderSchema';

export interface AccountFormProps {
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
  user?: z.infer<typeof tableAccountSchema>;
}

export interface ProductTypesFormProps {
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
  productTypes?: z.infer<typeof tableProductTypesSchema>;
}

export interface ProductProps {
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
  product?: z.infer<typeof tableProductSchema>;
}

export interface BranchFormProps {
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
  branch?: z.infer<typeof tableBranchSchema>;
}

export interface RequestOrderFormProps {
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
  requstOrder?: z.infer<typeof tableRequestOrderSchema>;
}

export interface ShiftDataProps {
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
  branchShift?: z.infer<typeof tableShiftSchema>;
}

export interface CompetitorProps {
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
  competitor?: z.infer<typeof tableCompetitorSchema>;
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
