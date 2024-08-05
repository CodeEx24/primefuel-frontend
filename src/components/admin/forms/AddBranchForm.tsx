import { FormInputText } from '@/components/defaults/FormInputText';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { TOAST_TYPE } from '@/shared/constants/TOAST';
import { useCustomToast } from '@/shared/hooks/useCustomToast';
import { ErrorResponse } from '@/shared/interface/ErrorType';
import { addBranchSchema } from '@/shared/schema/branchSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { FormColorPicker } from '@/components/defaults/FormColorPicker';
import { useState } from 'react';

import SelectRegion from '@/components/admin/select/locations/SelectRegion';
import SelectProvince from '@/components/admin/select/locations/SelectProvince';
import SelectMunicipality from '@/components/admin/select/locations/SelectMunicipality';
import SelectBarangay from '@/components/admin/select/locations/SelectBarangay';
import { useAddBranchMutation } from '@/pages/api/branchApiSlice';

export default function AddBranchForm({
  setShowDialog,
}: {
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { showToast } = useCustomToast();

  // Post request
  const [addBranchData] = useAddBranchMutation();

  const [locationParams, setLocationParams] = useState({
    region: '',
    province: '',
    municipality: '',
  });

  const { region, province, municipality } = locationParams;

  const addBranchForm = useForm<z.infer<typeof addBranchSchema>>({
    resolver: zodResolver(addBranchSchema),
    defaultValues: {
      branchName: '',
      region: '',
      province: '',
      municipality: '',
      barangay: '',
      gradientColor: '',
    },
  });

  const { handleSubmit, control } = addBranchForm;

  const onSubmit = async (data: z.infer<typeof addBranchSchema>) => {
    try {
      const result = await addBranchData(data).unwrap();

      if (result.success) {
        showToast(TOAST_TYPE.SUCCESS, result.message);
        setShowDialog(false);
      }
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

  const handleValueChange = (name: string, value: string) => {
    setLocationParams({ ...locationParams, [name]: value });
  };

  return (
    <Form {...addBranchForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid w-full items-center gap-4 ">
          <FormInputText
            label="Branch Name"
            control={control}
            name="branchName"
            placeholder="Branch Name"
          />

          <SelectRegion
            control={control}
            onChange={(code: string) => handleValueChange('region', code)}
          />
          <SelectProvince
            control={control}
            region={region}
            onChange={(code: string) => handleValueChange('province', code)}
          />
          <SelectMunicipality
            control={control}
            region={region}
            province={province}
            onChange={(code: string) => handleValueChange('municipality', code)}
          />
          <SelectBarangay
            control={control}
            region={region}
            province={province}
            municipality={municipality}
          />
          <FormColorPicker
            label="Gradient Color"
            control={control}
            name="gradientColor"
            placeholder="Gradient Color"
          />

          <Button type="submit">Add Branch</Button>
        </div>
      </form>
    </Form>
  );
}
