import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type FormInputTextType = {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  control: any;
  name: string;
  placeholder: string;
  label?: string;
  defaultValue?: string;
};

export const FormInputText = ({
  label,
  control,
  name,
  placeholder,
}: FormInputTextType) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            {label && <Label>{label}</Label>}
            <FormControl>
              <Input
                type="text"
                placeholder={placeholder}
                className="border-[#E4E4E7]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
