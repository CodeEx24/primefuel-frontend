import { ROLES, STATUS } from '@/shared/constants/ROLES';
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CrossCircledIcon,
  StopwatchIcon,
} from '@radix-ui/react-icons';

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
    label: 'Super Admin',
    value: ROLES.Admin,
    icon: ArrowDownIcon,
  },
  {
    label: ROLES.Staff,
    value: ROLES.Staff,
    icon: ArrowRightIcon,
  },
  {
    label: ROLES.Driver,
    value: ROLES.Driver,
    icon: ArrowUpIcon,
  },
];
