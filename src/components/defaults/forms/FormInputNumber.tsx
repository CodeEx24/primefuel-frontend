import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type FormInputNumberType = {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  control: any;
  name: string;
  placeholder: string;
  label?: string;
  defaultValue?: string;
  classname?: string;
  isNegativeAllowed?: boolean; // Add the new prop
  isPhoneNumber?: boolean; // Add the new prop
};

export const FormInputNumber = ({
  label,
  control,
  name,
  placeholder,
  classname,
  isNegativeAllowed = false,
  isPhoneNumber = false,
}: FormInputNumberType) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            {label && <Label className={`${classname}`}>{label}</Label>}
            <FormControl>
              <Input
                type="number"
                placeholder={placeholder}
                className={`border-[#E4E4E7] ${classname}`}
                onKeyDown={(e) =>
                  ['e', 'E', '+', '-', '.'].includes(e.key) &&
                  e.preventDefault()
                }
                {...field}
                value={
                  isPhoneNumber
                    ? field.value
                    : field.value !== undefined
                    ? Number(field.value).toString()
                    : ''
                }
                onChange={(e) => {
                  let value = e.target.value;

                  if (isPhoneNumber) {
                    field.onChange(value);
                  } else {
                    value = value.replace(/[^0-9.]/g, '');

                    // Remove leading zeros, but keep at least one zero if the result is empty
                    const trimValue = value.replace(/^0+(?!$)/, '') || '0';

                    // Convert the trimmed value to a number
                    const numericValue = parseFloat(trimValue);

                    // Check if the numeric value is valid based on isNegativeAllowed
                    if (isNegativeAllowed || numericValue >= 0) {
                      field.onChange(numericValue); // Update field with numeric value
                    }
                  }
                  // Remove all non-digit characters except the decimal point
                }}
              />
            </FormControl>
            <FormMessage className={`${classname}`} />
          </FormItem>
        );
      }}
    />
  );
};
