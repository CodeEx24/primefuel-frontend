import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  addAccountSchema,
  updateAccountSchema,
} from '@/shared/schema/accountSchema';
import { FormInputText } from '@/components/defaults/FormInputText';
import { FormInputPassword } from '@/components/defaults/FormInputPassword';
import { Button } from '@/components/ui/button';
import { useCustomToast } from '@/shared/hooks/useCustomToast';
import { TOAST_TYPE } from '@/shared/constants/TOAST';
import { ErrorResponse } from '@/shared/interface/ErrorType';
import { Form } from '@/components/ui/form';
import FormDropdown from '@/components/defaults/FormDropdown';
import { POSITION, ROLES } from '@/shared/constants/ROLES';
import { useEffect } from 'react';
import { AccountFormType } from '@/shared/interface/DialogFormType';
import {
  useCreateUserMutation,
  useUpdateUserMutation,
} from '@/pages/api/usersApiSlice';
import { useDispatch } from 'react-redux';
import { setRefetchData } from '@/shared/lib/features/paginationSlice';
import { useGetAllBranchesQuery } from '@/pages/api/branchApiSlice';

type FormData =
  | z.infer<typeof addAccountSchema>
  | z.infer<typeof updateAccountSchema>;

export function AccountForm({ setShowDialog, user }: AccountFormType) {
  const { showToast } = useCustomToast();

  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const dispatch = useDispatch();
  const accountSchema = user ? updateAccountSchema : addAccountSchema;

  const accountForm = useForm<FormData>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      firstname: user?.firstname ?? '',
      lastname: user?.lastname ?? '',
      email: user?.email ?? '',
      password: '',
      contact: user?.contact ?? '',
      username: user?.username ?? '',
      roles: user?.roles ?? undefined,
      position: user?.position ?? undefined,
      branch: user?.branch ?? undefined,
      plateNumber: user?.plateNumber ?? undefined,
    },
  });

  // Extracted to form
  const { clearErrors, resetField } = accountForm;
  const roles = accountForm.watch('roles'); // Watch the role field
  const position = accountForm.watch('position'); // Watch the role field
  const branch = accountForm.watch('branch'); // Watch the role field
  const plateNumber = accountForm.watch('plateNumber'); // Watch the role field

  // Fetching branch
  const { data: branchesData } = useGetAllBranchesQuery(
    undefined, // or any required params
    {
      skip: !roles || roles !== ROLES.Staff, // Skip query if role is null or undefined
    }
  );

  useEffect(() => {
    clearErrors(['position', 'branch', 'plateNumber']);
    // clear value of 3 inputs position branch and plateNumber
    resetField('position', { defaultValue: undefined });
    resetField('branch', { defaultValue: undefined });
    resetField('plateNumber', { defaultValue: undefined });
  }, [roles, branchesData, clearErrors, resetField]); // Effect runs whenever role changes

  const onSubmit = async (data: z.infer<typeof updateAccountSchema>) => {
    try {
      if (!user) {
        // Request for adding account in server
        const result = await createUser(data).unwrap();
        // Success message toast
        showToast(TOAST_TYPE.SUCCESS, result.message);
        setShowDialog(false);
        dispatch(setRefetchData());
      } else {
        const result = await updateUser({
          id: user._id,
          updates: data,
        }).unwrap();
        showToast(TOAST_TYPE.SUCCESS, result?.message);
        // dispatch(setRefetchData());
      }

      // Else update user
    } catch (error: unknown) {
      const axiosError = error as ErrorResponse;
      if (!axiosError?.response) {
        showToast(TOAST_TYPE.ERROR, 'No server error response');
      } else if (axiosError?.response?.status === 400) {
        showToast(TOAST_TYPE.ERROR, 'Missing username or password!');
      } else if (axiosError?.response?.status === 401) {
        showToast(TOAST_TYPE.ERROR, 'Unauthorized');
      } else {
        showToast(TOAST_TYPE.ERROR, 'Login Failed');
      }
    }
  };

  const roleAddedFieldSubmittable =
    position === undefined && branch === undefined && plateNumber === undefined;

  return (
    <Form {...accountForm}>
      <form
        onSubmit={accountForm.handleSubmit(onSubmit)}
        className="w-full grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <FormInputText
          label="First Name"
          control={accountForm.control}
          name="firstname"
          placeholder="First Name"
        />
        <FormInputText
          label="Last Name"
          control={accountForm.control}
          name="lastname"
          placeholder="Last Name"
        />
        <FormInputText
          label="Email"
          control={accountForm.control}
          name="email"
          placeholder="Email"
        />
        <FormInputText
          label="Username"
          control={accountForm.control}
          name="username"
          placeholder="Username"
        />

        <FormInputText
          label="Contact"
          control={accountForm.control}
          name="contact"
          placeholder="Contact Number"
        />

        {!user && (
          <FormInputPassword
            label="Password"
            control={accountForm.control}
            name="password"
            placeholder="Password"
          />
        )}

        <FormDropdown
          choices={Object.values(ROLES)}
          label="Role"
          control={accountForm.control}
          name="roles"
          placeholder="Select a role"
        />

        {roles === ROLES.InternalUser && (
          <FormDropdown
            control={accountForm.control}
            name="position"
            label="Position"
            placeholder="Select an position"
            choices={Object.values(POSITION)}
          />
        )}

        {roles === ROLES.Staff && branchesData && (
          <FormDropdown
            control={accountForm.control}
            name="branch"
            label="Branch"
            placeholder="Select a branch"
            choices={branchesData.data}
            config={{ displayField: 'branchName', valueField: '_id' }}
          />
        )}

        {roles === ROLES.Driver && (
          <FormInputText
            label="Plate Number"
            control={accountForm.control}
            name="plateNumber"
            placeholder="Plate Number"
          />
        )}

        <Button
          className="w-full mt-2 md:col-span-2"
          type="submit"
          disabled={
            Object.keys(accountForm?.formState.errors || {}).length > 0 ||
            roleAddedFieldSubmittable
          }
        >
          {user ? `Update User Details` : `Create an Account`}
        </Button>
      </form>
    </Form>
  );
}
