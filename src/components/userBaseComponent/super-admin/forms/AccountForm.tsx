import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { FormInputText } from '@/components/defaults/forms/FormInputText';
import { FormInputPassword } from '@/components/defaults/forms/FormInputPassword';
import { Button } from '@/components/ui/button';
import { useCustomToast } from '@/shared/hooks/useCustomToast';
import { TOAST_TYPE } from '@/shared/constants/TOAST';
import { ErrorResponse } from '@/shared/interface/ErrorType';
import { Form } from '@/components/ui/form';
import FormDropdown from '@/components/defaults/forms/FormDropdown';
import { ROLES } from '@/shared/constants/ROLES';
import { useEffect } from 'react';
import {
  useCreateUserMutation,
  useUpdateUserMutation,
} from '@/pages/api/usersApiSlice';
import { useDispatch } from 'react-redux';
import { setRefetchData } from '@/shared/lib/features/paginationSlice';
import { useGetBranchesQuery } from '@/pages/api/branchApiSlice';
import { AccountFormProps } from '@/shared/interface/DialogFormType';
import {
  addAccountSchema,
  updateAccountSchema,
} from '@/shared/schema/accountSchema';
import { FormInputNumber } from '@/components/defaults/forms/FormInputNumber';

type FormData =
  | z.infer<typeof addAccountSchema>
  | z.infer<typeof updateAccountSchema>;

export function AccountForm({ setShowDialog, user }: AccountFormProps) {
  const { showToast } = useCustomToast();

  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const dispatch = useDispatch();
  const accountSchema = user ? updateAccountSchema : addAccountSchema;

  const branchesValue =
    user?.branches && user?.branches.length > 0
      ? user.branches
      : [{ branchesId: '' }];

  const accountForm = useForm<FormData>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      firstname: user?.firstname ?? '',
      lastname: user?.lastname ?? '',
      email: user?.email ?? '',
      password: '',
      contact: user?.contact ?? '',
      username: user?.username ?? '',
      role: user?.role ?? undefined,
      branch: user?.branch == '' ? undefined : user?.branch,
      branches: branchesValue,
      plateNumber: user?.plateNumber == '' ? undefined : user?.plateNumber,
    },
  });

  const { control } = accountForm;

  // 🗂️ Manage product fields
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'branches',
  });

  // Extracted to form
  const { clearErrors, resetField } = accountForm;
  const role = accountForm.watch('role'); // Watch the role field

  const { data: branchesData, isSuccess: isBranchesDataSuccess } =
    useGetBranchesQuery(
      { page: 1, pageSize: 0 }, // or any required params
      {
        skip:
          !role &&
          (role === ROLES.Staff ||
            role === ROLES.Owner ||
            role === ROLES.Admin),
      }
    );

  useEffect(() => {
    clearErrors(['branches', 'branch', 'plateNumber']);
    // clear value of 3 inputs position branch and plateNumber
    resetField('branches', { defaultValue: undefined });
    resetField('branch', { defaultValue: undefined });
    resetField('plateNumber', { defaultValue: undefined });
  }, [role, branchesData, clearErrors, resetField]); // Effect runs whenever role changes

  const onSubmit = async (data: z.infer<typeof updateAccountSchema>) => {
    try {
      if (!user) {
        // Request for adding account in server
        const result = await createUser(data).unwrap();
        // Success message toast
        showToast(TOAST_TYPE.SUCCESS, result.message);
        dispatch(setRefetchData());
        setShowDialog(false);
      } else {
        const result = await updateUser({
          id: user._id,
          updates: data,
        }).unwrap();
        showToast(TOAST_TYPE.SUCCESS, result?.message);
        dispatch(setRefetchData());
        setShowDialog(false);
      }

      // Else update user
    } catch (error: unknown) {
      const axiosError = error as ErrorResponse;
      if (!axiosError?.response) {
        showToast(
          TOAST_TYPE.ERROR,
          axiosError?.data?.message || 'No server error response'
        );
      } else if (axiosError?.response?.status === 400) {
        showToast(TOAST_TYPE.ERROR, 'Missing username or password!');
      } else if (axiosError?.response?.status === 401) {
        showToast(TOAST_TYPE.ERROR, 'Unauthorized');
      } else {
        showToast(TOAST_TYPE.ERROR, 'Login Failed');
      }
    }
  };

  // const roleAddedFieldSubmittable =
  //   role !== ROLES.SuperAdmin &&
  //   branch === undefined &&
  //   plateNumber === undefined;
  const branchChoices = branchesData?.data?.branches || [];

  return (
    <Form {...accountForm}>
      <form onSubmit={accountForm.handleSubmit(onSubmit)} className="space-y-4">
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

        <FormInputNumber
          label="Contact"
          control={accountForm.control}
          name="contact"
          placeholder="Contact Number"
          isPhoneNumber={true}
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
          name="role"
          placeholder="Select a role"
        />

        {/* {role === ROLES.InternalUser && (
          <FormDropdown
            control={accountForm.control}
            name="position"
            label="Position"
            placeholder="Select an position"
            choices={Object.values(POSITION)}
          />
        )} */}

        {role === ROLES.Staff && isBranchesDataSuccess && branchChoices && (
          <FormDropdown
            control={accountForm.control}
            name="branch"
            label="Branch"
            placeholder="Select a branch"
            choices={branchChoices}
            config={{ displayField: 'branchName', valueField: '_id' }}
          />
        )}

        {(role === ROLES.Admin || role === ROLES.Owner) &&
          isBranchesDataSuccess &&
          branchChoices &&
          fields.map((field, index) => (
            <FormDropdown
              key={field.id}
              control={control}
              name={`branches.${index}.branchesId`}
              label={`Branch ${index + 1}`}
              placeholder="Select a branch"
              choices={branchChoices}
              config={{ displayField: 'branchName', valueField: '_id' }}
              index={index}
              remove={remove}
              fieldsLength={fields.length}
            />
          ))}

        {role === ROLES.Driver && (
          <FormInputText
            label="Plate Number"
            control={accountForm.control}
            name="plateNumber"
            placeholder="Plate Number"
          />
        )}
        {(role === ROLES.Admin || role === ROLES.Owner) && (
          <Button
            size="full"
            variant="outline"
            type="button"
            className="h-8 text-foreground"
            onClick={
              () => append({ branchesId: '' }) // Append an empty string as the default value for the new branch
            }
          >
            Assign Additional New Branch
          </Button>
        )}
        <Button
          className="w-full"
          type="submit"
          disabled={Object.keys(accountForm?.formState.errors || {}).length > 0}
        >
          {user ? `Update User Details` : `Create an Account`}
        </Button>
      </form>
    </Form>
  );
}
