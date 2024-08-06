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
}

const FormDropdown = <T,>({
  label = 'Select an option', // Default label
  control,
  name,
  placeholder,
  choices,
  config,
}: FormDropdownProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <Label>{label}</Label>}
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl className="border-[#E4E4E7]">
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
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormDropdown;
