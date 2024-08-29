import { FormInputText } from '@/components/defaults/forms/FormInputText';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { TOAST_TYPE } from '@/shared/constants/TOAST';
import { useCustomToast } from '@/shared/hooks/useCustomToast';
import { ErrorResponse } from '@/shared/interface/ErrorType';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { FormColorPicker } from '@/components/defaults/forms/FormColorPicker';
import { useState } from 'react';

import {
  useAddBranchMutation,
  useUpdateBranchMutation,
} from '@/pages/api/branchApiSlice';

import {
  useGetBarangaysQuery,
  useGetMunicipalitiesQuery,
  useGetProvincesQuery,
  useGetRegionsQuery,
} from '@/pages/api/locationsApiSlice';
import SelectFieldLocation from '../select/SelectFieldLocation';
import { setRefetchData } from '@/shared/lib/features/paginationSlice';
import { useDispatch } from 'react-redux';
import { branchSchema } from '@/shared/schema/branchSchema';
import { BranchFormProps } from '@/shared/interface/DialogFormType';

export default function BranchForm({ setShowDialog, branch }: BranchFormProps) {
  const { showToast } = useCustomToast();
  // Post request
  const [addBranchData] = useAddBranchMutation();
  const [updateBranchData] = useUpdateBranchMutation();

  const dispatch = useDispatch();

  const [locationParams, setLocationParams] = useState({
    region: '',
    province: '',
    municipality: '',
  });

  const { region, province, municipality } = locationParams;

  const addBranchForm = useForm<z.infer<typeof branchSchema>>({
    resolver: zodResolver(branchSchema),
    defaultValues: {
      branchName: branch?.branchName ?? '',
      region: branch?.region ?? '',
      province: branch?.province ?? '',
      municipality: branch?.municipality ?? '',
      barangay: branch?.barangay ?? '',
      gradientColor: branch?.gradientColor ?? '',
    },
  });

  const { handleSubmit, control } = addBranchForm;

  const onSubmit = async (data: z.infer<typeof branchSchema>) => {
    try {
      if (!branch) {
        const result = await addBranchData(data).unwrap();

        setShowDialog(false);
        showToast(TOAST_TYPE.SUCCESS, result.message);
        dispatch(setRefetchData());
      } else {
        const result = await updateBranchData({
          id: branch?._id,
          updates: data,
        }).unwrap();
        setShowDialog(false);
        showToast(TOAST_TYPE.SUCCESS, result?.message);
        dispatch(setRefetchData());
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

  const { data: regions } = useGetRegionsQuery({});
  const { data: provinces } = useGetProvincesQuery(region, { skip: !region });
  const { data: municipalities } = useGetMunicipalitiesQuery(
    { region, province },
    { skip: !region || !province }
  );
  const { data: barangays } = useGetBarangaysQuery(
    { region, province, municipality },
    { skip: !region || !province || !municipality }
  );

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

          <SelectFieldLocation
            label="Region"
            placeholder="Select a region"
            name="region"
            control={control}
            data={regions}
            codeField="reg_code"
            handleValueChange={handleValueChange}
          />

          <SelectFieldLocation
            label="Provinces"
            placeholder="Select a provinces"
            name="province"
            control={control}
            data={provinces}
            codeField="prov_code"
            handleValueChange={handleValueChange}
          />

          <SelectFieldLocation
            label="Municipality"
            placeholder="Select a municipality"
            name="municipality"
            control={control}
            data={municipalities}
            codeField="mun_code"
            handleValueChange={handleValueChange}
          />

          <SelectFieldLocation
            label="Barangay"
            placeholder="Select a barangay"
            name="barangay"
            control={control}
            data={barangays}
            codeField="bar_code"
            handleValueChange={handleValueChange}
          />

          <FormColorPicker
            label="Gradient Color"
            control={control}
            name="gradientColor"
            placeholder="Gradient Color"
          />

          <Button type="submit">
            {branch ? `Update branch details` : `Add Branch`}
          </Button>
        </div>
      </form>
    </Form>
  );
}
