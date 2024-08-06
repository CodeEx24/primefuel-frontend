import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Textarea } from '../../ui/textarea';

type FormInputTextType = {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  control: any;
  name: string;
  placeholder: string;
  label?: string;
  defaultValue?: string;
  classname?: string;
};

export const FormInputTextarea = ({
  label,
  control,
  name,
  placeholder,
  classname,
}: FormInputTextType) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <Label>{label}</Label>}
          <FormControl>
            <Textarea
              placeholder={placeholder}
              className={`resize-none text-foreground ${classname}`}
              {...field}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
