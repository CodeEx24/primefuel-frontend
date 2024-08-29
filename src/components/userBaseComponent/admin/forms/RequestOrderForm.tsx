import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import { RequestOrderFormProps } from '@/shared/interface/DialogFormType';
import { requestOrderSchema } from '@/shared/schema/requestOrderSchema';
import FormDropdown from '@/components/defaults/forms/FormDropdown';
import { useGetBranchesQuery } from '@/pages/api/branchApiSlice';
import { useGetProductsQuery } from '@/pages/api/productApiSlice';
import { Plus, Trash } from 'lucide-react';
import { FormInputNumber } from '@/components/defaults/forms/FormInputNumber';

export default function RequestOrderForm({
  requstOrder,
}: RequestOrderFormProps) {
  // 🛠️ Custom Toast
  // const { showToast } = useCustomToast();

  // 🚀 Post request
  // const [addBranchData] = useAddBranchMutation();
  // const [updateBranchData] = useUpdateBranchMutation();

  // 📦 Redux Dispatch
  // const dispatch = useDispatch();

  // 🔄 FETCHING DATA
  const { data: branchesData } = useGetBranchesQuery(
    { page: 1, pageSize: 0 } // or any required params
  );

  const { data: productsData } = useGetProductsQuery({
    page: 1,
    pageSize: 0, // or any required params
  });

  // 📝 Form setup
  const addRequestOrderForm = useForm<z.infer<typeof requestOrderSchema>>({
    resolver: zodResolver(requestOrderSchema),
    defaultValues: {
      branch: requstOrder?.branch ?? '',
      products: [
        {
          productId: '',
          quantityLiters: 1, // Default to 0 since `quantityLiters` is a number
        },
      ],
    },
  });

  const { handleSubmit, control } = addRequestOrderForm;

  // 🗂️ Manage product fields
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'products',
  });

  // 📤 Handle form submission
  const onSubmit = async (data: z.infer<typeof requestOrderSchema>) => {
    console.log('data: ', data);
    // try {
    //   if (!requstOrder) {
    //     const result = await addBranchData(data).unwrap();

    //     setShowDialog(false);
    //     showToast(TOAST_TYPE.SUCCESS, result.message);
    //     dispatch(setRefetchData());
    //   } else {
    //     const result = await updateBranchData({
    //       id: requstOrder?._id,
    //       updates: data,
    //     }).unwrap();
    //     setShowDialog(false);
    //     showToast(TOAST_TYPE.SUCCESS, result?.message);
    //     dispatch(setRefetchData());
    //   }
    // } catch (error: unknown) {
    //   const axiosError = error as ErrorResponse;
    //   if (!axiosError?.response) {
    //     showToast(TOAST_TYPE.ERROR, 'No server error response');
    //   } else if (axiosError?.response?.status === 400) {
    //     showToast(TOAST_TYPE.ERROR, 'Missing username or password!');
    //   } else if (axiosError?.response?.status === 401) {
    //     showToast(TOAST_TYPE.ERROR, 'Unauthorized');
    //   } else {
    //     showToast(TOAST_TYPE.ERROR, 'Login Failed');
    //   }
    // }
  };

  // 🗂️ Branch choices
  const branchChoices = branchesData?.data?.branches || [];
  const productChoices = productsData?.data?.products || [];

  return (
    <Form {...addRequestOrderForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid w-full items-center gap-4 ">
          <FormDropdown
            control={control}
            name="branch"
            label="Branch"
            placeholder="Select a branch"
            choices={branchChoices}
            config={{ displayField: 'branchName', valueField: '_id' }}
          />

          {fields.map((item, index) => (
            <div
              key={item.id}
              className="flex gap-2 justify-between items-end w-full"
            >
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <FormDropdown
                    control={control}
                    name={`products.${index}.productId`}
                    label="Product"
                    placeholder="Select a product"
                    choices={productChoices}
                    config={{ displayField: 'name', valueField: '_id' }}
                  />
                </div>
                <div>
                  <FormInputNumber
                    label="Quantity In Liters"
                    control={control}
                    name={`products.${index}.quantityLiters`}
                    placeholder="QuantityLiters"
                  />{' '}
                </div>
              </div>
            </div>
          ))}

          <div className=" grid grid-cols-2 gap-2">
            <Button
              type="button"
              onClick={() => append({ productId: '', quantityLiters: 1 })}
              className=" flex items-center justify-center text-white gap-1 h-8"
            >
              <Plus className="size-4 mt-0.5" />
              Add Product
            </Button>

            <Button
              type="button"
              variant="destructive"
              onClick={() => remove(fields.length - 1)} // Remove the last item
              className=" flex items-center justify-center text-white gap-1 h-8"
              disabled={fields.length <= 1} // Disable if there is 1 or fewer items
            >
              <Trash className="size-4 mt-0.5" />
              Remove Last Item
            </Button>
          </div>

          <Button type="submit">
            {addRequestOrderForm
              ? `Update request order details`
              : `Add Request Order`}
          </Button>
        </div>
      </form>
    </Form>
  );
}
