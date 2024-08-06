import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { FormInputText } from '@/components/defaults/forms/FormInputText';
import { Button } from '@/components/ui/button';
import { useCustomToast } from '@/shared/hooks/useCustomToast';
import { TOAST_TYPE } from '@/shared/constants/TOAST';
import { ErrorResponse } from '@/shared/interface/ErrorType';
import { Form } from '@/components/ui/form';
// import { useUpdateUserMutation } from '@/pages/api/usersApiSlice';
import { useDispatch } from 'react-redux';
import { setRefetchData } from '@/shared/lib/features/paginationSlice';
import { CompetitorProps } from '@/shared/interface/DialogFormType';
import { FormInputTextarea } from '@/components/defaults/forms/FormInputTextarea';
import {
  useCreateCompetitorMutation,
  useUpdateCompetitorMutation,
} from '@/pages/api/competitorApiSlice';
import { competitorSchema } from '@/shared/schema/competitorSchema';
import { convertToBase64 } from '@/lib/convertToBase64';
import { FormInputFile } from '@/components/defaults/forms/FormInputFile';

export function CompetitorForm({ setShowDialog, competitor }: CompetitorProps) {
  const { showToast } = useCustomToast();
  const [createCompetitor] = useCreateCompetitorMutation();
  const [updateCompetitor] = useUpdateCompetitorMutation();

  const dispatch = useDispatch();

  const competitorForm = useForm<z.infer<typeof competitorSchema>>({
    resolver: zodResolver(competitorSchema),
    defaultValues: {
      name: competitor?.name ?? '',
      description: competitor?.description ?? '',
      logo: competitor?.logo ?? '', // It should be type id to match with dropdown values
    },
  });

  const logo = competitorForm.watch('logo'); // Watch the role field

  // Extracted to form
  const { control, setValue, formState, clearErrors } = competitorForm;
  const onSubmit = async (data: z.infer<typeof competitorSchema>) => {
    try {
      if (!competitor) {
        // Request for adding account in server
        const result = await createCompetitor(data).unwrap();
        if (result.success) {
          showToast(TOAST_TYPE.SUCCESS, result.message);
          dispatch(setRefetchData());
          setShowDialog(false);
        } else {
          showToast(TOAST_TYPE.ERROR, result.message || 'Something went wrong');
        }
      } else {
        const result = await updateCompetitor({
          id: competitor._id,
          updates: data,
        }).unwrap();
        if (result) {
          showToast(TOAST_TYPE.SUCCESS, result?.message);
          dispatch(setRefetchData());
          setShowDialog(false);
        } else {
          showToast(TOAST_TYPE.ERROR, result.message || 'Something went wrong');
        }
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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove error
    clearErrors(['logo']);
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setValue('logo', base64);
    }
  };

  return (
    <Form {...competitorForm}>
      <form
        onSubmit={competitorForm.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormInputFile
          logo={logo}
          label="Competitor Image"
          message={formState.errors.logo?.message || ''}
          handleFileUpload={handleFileUpload}
        />

        <FormInputText
          label="Competitor Logo"
          control={control}
          name="logo"
          placeholder="Competitor Logo"
          classname="hidden"
        />

        <FormInputText
          label="Competitor Name"
          control={control}
          name="name"
          placeholder="Competitor Name"
        />

        <FormInputTextarea
          label="Description"
          control={control}
          name="description"
          placeholder="Competitor description"
        />

        <Button
          className="w-full"
          type="submit"
          disabled={
            Object.keys(competitorForm?.formState.errors || {}).length > 0
          }
        >
          {competitor
            ? `Update Competitor Type Details`
            : `Create Competitor Types`}
        </Button>
      </form>
    </Form>
  );
}
