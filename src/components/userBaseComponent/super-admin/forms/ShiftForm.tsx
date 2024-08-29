import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useCustomToast } from '@/shared/hooks/useCustomToast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';

import { useDispatch } from 'react-redux';
import { ShiftDataProps } from '@/shared/interface/DialogFormType';
import { shiftSchema } from '@/shared/schema/shiftSchema';
import {
  useAddShiftMutation,
  useUpdateShiftMutation,
} from '@/pages/api/shiftApiSlice';
import FormDropdown from '@/components/defaults/forms/FormDropdown';
import { FormTimePicker } from '@/components/defaults/forms/FormTimePicker';
import { TOAST_TYPE } from '@/shared/constants/TOAST';
import { DAYS, Days } from '@/shared/constants/DAYS';
import { setRefetchData } from '@/shared/lib/features/paginationSlice';
import { ErrorResponse } from '@/shared/interface/ErrorType';
import { FormInputText } from '@/components/defaults/forms/FormInputText';
import { convertTimeToDate } from '@/shared/utils/timeConvert';
import { useGetBranchesQuery } from '@/pages/api/branchApiSlice';

export default function ShiftForm({
  setShowDialog,
  branchShift,
}: ShiftDataProps) {
  const { showToast } = useCustomToast();
  const [addShiftData] = useAddShiftMutation();
  const [updateShiftData] = useUpdateShiftMutation();
  const dispatch = useDispatch();
  const { data: branchesData } = useGetBranchesQuery({ page: 1, pageSize: 0 });

  console.log('branchShift?.shifts: ', branchShift?.shifts);

  const addShiftForm = useForm<z.infer<typeof shiftSchema>>({
    resolver: zodResolver(shiftSchema),
    defaultValues: {
      branch: branchShift?.branchId ? branchShift?.branchId : '',
      name: branchShift?.name ? branchShift?.name : '',
      shifts: branchShift?.shifts?.map((shift) => ({
        day: shift.day as Days,
        startTime: new Date(convertTimeToDate(shift.startTime)), // Ensure date object conversion if needed
        endTime: new Date(convertTimeToDate(shift.endTime)), // Ensure date object conversion if needed
      })) ?? [
        {
          day: 'Monday',
          startTime: new Date(new Date().setHours(8, 0, 0, 0)),
          endTime: new Date(new Date().setHours(18, 0, 0, 0)),
        },
      ],
    },
  });

  const { handleSubmit, control } = addShiftForm;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'shifts',
  });

  // Function to get the next day
  const getNextDay = (currentDay: Days): Days => {
    const daysArray = Object.keys(DAYS) as Days[];
    const currentIndex = daysArray.indexOf(currentDay);
    const nextIndex = (currentIndex + 1) % daysArray.length;
    return daysArray[nextIndex];
  };

  const onSubmit = async (data: z.infer<typeof shiftSchema>) => {
    const shifts = data.shifts.map((shift) => {
      // Convert string to Date object
      const startTime = new Date(shift.startTime);
      const endTime = new Date(shift.endTime);

      // Add 8 hours
      startTime.setHours(startTime.getHours() + 8);
      endTime.setHours(endTime.getHours() + 8);

      // Format startTime to HH:MM
      const formattedStartTime = startTime.toISOString().substring(11, 16);
      // Format endTime to HH:MM
      const formattedEndTime = endTime.toISOString().substring(11, 16);

      return {
        day: shift.day,
        startTime: formattedStartTime,
        endTime: formattedEndTime,
      };
    });

    const { branch, name } = data;
    try {
      if (!branchShift) {
        const result = await addShiftData({
          branch,
          name,
          shifts,
        }).unwrap();
        if (result.success) {
          setShowDialog(false);
          showToast(TOAST_TYPE.SUCCESS, result.message);
          dispatch(setRefetchData());
        } else {
          showToast(TOAST_TYPE.ERROR, result.message);
        }
      } else {
        const result = await updateShiftData({
          id: branchShift?._id,
          updates: { branch, name, shifts },
        }).unwrap();
        setShowDialog(false);
        showToast(TOAST_TYPE.SUCCESS, result?.message);
        dispatch(setRefetchData());
      }
    } catch (error: unknown) {
      const axiosError = error as ErrorResponse;
      if (!axiosError?.response) {
        const message = axiosError?.data?.message
          ? axiosError?.data.message
          : 'No server error response';
        showToast(TOAST_TYPE.ERROR, message);
      } else if (axiosError?.response?.status === 400) {
        showToast(TOAST_TYPE.ERROR, 'Missing username or password!');
      } else if (axiosError?.response?.status === 401) {
        showToast(TOAST_TYPE.ERROR, 'Unauthorized');
      } else {
        showToast(TOAST_TYPE.ERROR, 'Login Failed');
      }
    }
  };

  const branchChoices = branchesData?.data?.branches || [];

  return (
    <Form {...addShiftForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid w-full items-center gap-4">
          <FormInputText
            label="Shift Name"
            control={control}
            name="name"
            placeholder="Shift Name"
          />
          <FormDropdown
            control={control}
            name="branch"
            label="Branch"
            placeholder="Select a branch"
            choices={branchChoices}
            config={{ displayField: 'branchName', valueField: '_id' }}
          />

          <FormTimePicker control={control} name="shifts" fields={fields} />
          <div className="grid grid-cols-2 gap-4">
            <Button
              size="sm"
              type="button"
              disabled={fields.length === 7}
              onClick={() => {
                const lastShift = fields[fields.length - 1];
                const newDay = lastShift
                  ? getNextDay(lastShift.day as Days)
                  : 'Monday';
                append({
                  day: newDay,
                  startTime: new Date(new Date().setHours(8, 0, 0, 0)),
                  endTime: new Date(new Date().setHours(18, 0, 0, 0)),
                });
              }}
            >
              Add Shift Details
            </Button>

            <Button
              size="sm"
              type="button"
              onClick={() => remove(fields.length - 1)}
              disabled={fields.length === 1}
            >
              Remove Last Shift
            </Button>
          </div>
          <Button type="submit">
            {branchShift
              ? `Update branch shift details`
              : `Submit adding Shift`}
          </Button>
        </div>
      </form>
    </Form>
  );
}
