import { ROLES, STATUS } from '@/shared/constants/ROLES';
import {
  CheckCircledIcon,
  CrossCircledIcon,
  StopwatchIcon,
} from '@radix-ui/react-icons';
import { PersonStandingIcon } from 'lucide-react';

export const statuses = [
  {
    value: STATUS.Approved,
    label: STATUS.Approved,
    icon: CheckCircledIcon,
  },
  {
    value: STATUS.Rejected,
    label: STATUS.Rejected,
    icon: CrossCircledIcon,
  },
  {
    value: STATUS.Pending,
    label: STATUS.Pending,
    icon: StopwatchIcon,
  },
];

export const roles = [
  {
    label: ROLES.Admin,
    value: ROLES.Admin,
    icon: PersonStandingIcon,
  },
  {
    label: ROLES.SuperAdmin,
    value: ROLES.SuperAdmin,
    icon: PersonStandingIcon,
  },
  {
    label: ROLES.Owner,
    value: ROLES.Owner,
    icon: PersonStandingIcon,
  },
  {
    label: ROLES.Staff,
    value: ROLES.Staff,
    icon: PersonStandingIcon,
  },
  {
    label: ROLES.Driver,
    value: ROLES.Driver,
    icon: PersonStandingIcon,
  },
];
