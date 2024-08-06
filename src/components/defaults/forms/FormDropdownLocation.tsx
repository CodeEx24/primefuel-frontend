import React from 'react';
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

interface FormDropdownLocationProps {
  label?: string;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  control: any;
  name: string;
  placeholder: string;
  choices: {
    name: string;
    reg_code?: string; // region
    prov_code?: string; // prov
    mun_code?: string; // municipality
  }[];
}

const FormDropdownLocation: React.FC<FormDropdownLocationProps> = ({
  label = 'Select an option', // Default label
  control,
  name,
  placeholder,
  choices,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <Label>{label}</Label>}
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {choices.map((item) => (
                <SelectItem value={item.name} key={item.reg_code}>
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

export default FormDropdownLocation;
