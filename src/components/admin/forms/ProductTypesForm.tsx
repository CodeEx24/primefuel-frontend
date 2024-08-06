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
import { FormInputTextarea } from '@/components/defaults/forms/FormInputTextarea';
import {
  useCreateProductTypesMutation,
  useUpdateProductTypesMutation,
} from '@/pages/api/productTypesApiSlice';
import { ProductTypesFormProps } from '@/shared/interface/DialogFormType';
import { productTypeSchema } from '@/shared/schema/productTypesSchema';

export function ProductTypesForm({
  setShowDialog,
  productTypes,
}: ProductTypesFormProps) {
  const { showToast } = useCustomToast();

  const [createProductTypes] = useCreateProductTypesMutation();
  const [updateProductTypes] = useUpdateProductTypesMutation();

  const dispatch = useDispatch();

  const productTypesForm = useForm<z.infer<typeof productTypeSchema>>({
    resolver: zodResolver(productTypeSchema),
    defaultValues: {
      name: productTypes?.name ?? '',
      description: productTypes?.description ?? '',
    },
  });

  // Extracted to form
  const { control } = productTypesForm;

  const onSubmit = async (data: z.infer<typeof productTypeSchema>) => {
    try {
      if (!productTypes) {
        // Request for adding account in server
        const result = await createProductTypes(data).unwrap();
        if (result.success) {
          showToast(TOAST_TYPE.SUCCESS, result.message);
          dispatch(setRefetchData());
          setShowDialog(false);
        } else {
          showToast(TOAST_TYPE.ERROR, result.message || 'Something went wrong');
        }
      } else {
        const result = await updateProductTypes({
          id: productTypes._id,
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

  return (
    <Form {...productTypesForm}>
      <form
        onSubmit={productTypesForm.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormInputText
          label="Product Types"
          control={control}
          name="name"
          placeholder="Product Types"
        />

        <FormInputTextarea
          label="Description"
          control={control}
          name="description"
          placeholder="Product types description"
        />

        <Button
          className="w-full"
          type="submit"
          disabled={
            Object.keys(productTypesForm?.formState.errors || {}).length > 0
          }
        >
          {productTypes
            ? `Update Product Type Details`
            : `Create Product Types`}
        </Button>
      </form>
    </Form>
  );
}
