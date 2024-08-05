// lib/constants/roles.ts
export const ROLES = {
  InternalUser: 'InternalUser',
  Driver: 'Driver',
  Staff: 'Staff',
} as const;

export type Role = keyof typeof ROLES;

// lib/constants/roles.ts
export const POSITION = {
  SuperAdmin: 'SuperAdmin',
  President: 'President',
  Admin: 'Admin',
} as const;

export type Position = keyof typeof POSITION;

export const STATUS = {
  Approved: 'Approved',
  Pending: 'Pending',
  Rejected: 'Rejected',
} as const;

export type Status = keyof typeof STATUS;
