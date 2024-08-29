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

interface SelectFieldProps {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  control: any;
  name: string;
  label: string;
  placeholder: string;
  items: { name: string; code: string }[];
  disabled?: boolean;
  onChange: (value: string) => void;
  dataValue?: { name: string; code: string };
}

const SelectField = ({
  control,
  name,
  label,
  placeholder,
  items,
  disabled = false,
  onChange,
  dataValue,
}: SelectFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <Label>
            {label} - {field.value}
          </Label>
          <Select
            onValueChange={(value) => {
              field.onChange(value.split('|')[0]);
              onChange(value.split('|')[1]);
            }}
            defaultValue={`${dataValue?.name}|${dataValue?.code}`}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {items.map((item) => (
                <SelectItem value={`${item.name}|${item.code}`} key={item.name}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectField;
