import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface DropdownConfig<T> {
  displayField?: keyof T; // Optional, only used if choices are objects
  valueField?: keyof T; // Optional, only used if choices are objects
}

interface FormDropdownProps<T> {
  label?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  name: string;
  placeholder: string;
  choices: (T | string)[];
  config?: DropdownConfig<T>; // Optional, only used if choices are objects
  classname?: string;
  index?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  remove?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fieldsLength?: number;
}

const FormDropdown = <T,>({
  label = 'Select an option', // Default label
  control,
  name,
  placeholder,
  choices,
  config,
  index,
  remove,
  fieldsLength,
}: FormDropdownProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <Label>{label}</Label>}
          <div className={`${fieldsLength && 'flex space-x-4'} `}>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl className="border-[#E4E4E7] ">
                <SelectTrigger>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {choices.map((item, index) => {
                  let value: string;
                  let display: string;

                  if (typeof item === 'string') {
                    value = item;
                    display = item;
                  } else if (config) {
                    value = item[
                      config.valueField as keyof T
                    ] as unknown as string;
                    display = item[
                      config.displayField as keyof T
                    ] as unknown as string;
                  } else {
                    throw new Error(
                      'Config is required for object-based choices.'
                    );
                  }

                  return (
                    <SelectItem value={value} key={index}>
                      {display}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            {fieldsLength !== undefined && (
              <Button
                variant="destructive"
                type="button"
                className="h-10"
                onClick={() => remove(index)}
                disabled={fieldsLength === 1} // Disable remove button if only one field is present
              >
                Remove
              </Button>
            )}
          </div>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormDropdown;
