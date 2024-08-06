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
import { ProductProps } from '@/shared/interface/DialogFormType';
import { FormInputTextarea } from '@/components/defaults/forms/FormInputTextarea';
import { useGetAllProductTypesQuery } from '@/pages/api/productTypesApiSlice';
import { productSchema } from '@/shared/schema/productSchema';
import FormDropdown from '@/components/defaults/forms/FormDropdown';
import {
  useCreateProductMutation,
  useUpdateProductMutation,
  //   useUpdateProductMutation,
} from '@/pages/api/productApiSlice copy';

export function ProductForm({ setShowDialog, product }: ProductProps) {
  const { showToast } = useCustomToast();
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const dispatch = useDispatch();

  const productForm = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name ?? '',
      description: product?.description ?? '',
      type: product?.type ?? '', // It should be type id to match with dropdown values
    },
  });

  // Extracted to form
  const { control } = productForm;
  // watch type

  const onSubmit = async (data: z.infer<typeof productSchema>) => {
    try {
      if (!product) {
        // Request for adding account in server
        const result = await createProduct(data).unwrap();
        if (result.success) {
          showToast(TOAST_TYPE.SUCCESS, result.message);
          dispatch(setRefetchData());
          setShowDialog(false);
        } else {
          showToast(TOAST_TYPE.ERROR, result.message || 'Something went wrong');
        }
      } else {
        const result = await updateProduct({
          id: product._id,
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

  const { data: productTypeDetails, isSuccess: isProductTypeDetailsSuccess } =
    useGetAllProductTypesQuery({});

  const productTypeChoices = productTypeDetails?.data?.productTypes || [];

  return (
    <Form {...productForm}>
      <form onSubmit={productForm.handleSubmit(onSubmit)} className="space-y-4">
        <FormInputText
          label="Product Name"
          control={control}
          name="name"
          placeholder="Product Name"
        />

        {isProductTypeDetailsSuccess && productTypeChoices && (
          <FormDropdown
            control={control}
            name="type"
            label="Product Type"
            placeholder="Select a product type"
            choices={productTypeChoices}
            config={{ displayField: 'name', valueField: '_id' }}
          />
        )}
        <FormInputTextarea
          label="Description"
          control={control}
          name="description"
          placeholder="Product description"
        />

        <Button
          className="w-full"
          type="submit"
          disabled={Object.keys(productForm?.formState.errors || {}).length > 0}
        >
          {product ? `Update Product Type Details` : `Create Product Types`}
        </Button>
      </form>
    </Form>
  );
}
