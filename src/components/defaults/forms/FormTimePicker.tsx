import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import FormDropdown from './FormDropdown';
import { TimePicker12Demo } from '../TimePickerDemo';
import { Control, FieldValues, FieldArrayWithId, Path } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import Typography from '../Typography';

type FormInputTimePickerType<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fields: FieldArrayWithId<T, any>[];
};

// Utility function to construct paths
function getPath<T extends FieldValues>(
  base: Path<T>,
  index: number,
  field: string
): Path<T> {
  return `${base}.${index}.${field}` as Path<T>;
}

export function FormTimePicker<T extends FieldValues>({
  control,
  name,
  fields,
}: FormInputTimePickerType<T>) {
  return (
    <>
      {fields.map((field, index) => (
        <>
          <hr />
          <div key={field.id} className="space-y-4">
            <FormField
              control={control}
              name={getPath(name, index, 'day')}
              render={() => (
                <FormItem>
                  <FormLabel></FormLabel>
                  <FormControl>
                    <FormDropdown
                      control={control}
                      name={getPath(name, index, 'day')}
                      label={`Schedule Day ${index + 1}`}
                      placeholder="Select a day"
                      choices={[
                        { label: 'Monday', value: 'Monday' },
                        { label: 'Tuesday', value: 'Tuesday' },
                        { label: 'Wednesday', value: 'Wednesday' },
                        { label: 'Thursday', value: 'Thursday' },
                        { label: 'Friday', value: 'Friday' },
                        { label: 'Saturday', value: 'Saturday' },
                        { label: 'Sunday', value: 'Sunday' },
                        // Add other days as needed
                      ]}
                      config={{ displayField: 'label', valueField: 'value' }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex gap-8 items-center ">
              <FormField
                control={control}
                name={getPath(name, index, 'startTime')}
                render={({ field }) => (
                  <FormItem>
                    <Label>Start Time</Label>
                    <FormControl>
                      <TimePicker12Demo
                        setDate={field.onChange}
                        date={field.value}
                        isStart={new Date(field.value).getHours() < 12}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={getPath(name, index, 'endTime')}
                render={({ field }) => (
                  <FormItem>
                    <Label>End Time</Label>
                    <FormControl>
                      <TimePicker12Demo
                        setDate={field.onChange}
                        date={field.value}
                        isStart={new Date(field.value).getHours() < 12}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            {Array.isArray(control?._formState?.errors?.shifts) &&
              control._formState.errors.shifts[index]?.startTime?.message && (
                <Typography className="text-sm font-medium text-destructive mt-0">
                  {control._formState.errors.shifts[index]?.startTime?.message}
                </Typography>
              )}
          </div>
        </>
      ))}
      <hr />
    </>
  );
}
