import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

type FormInputTextType = {
  label?: string;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  control: any;
  name: string;
  placeholder: string;
};

export const FormInputPassword = ({
  label,
  control,
  name,
  placeholder,
}: FormInputTextType) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleChange = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            {label && <Label>{label}</Label>}
            <FormControl>
              <div className="flex relative">
                <Input
                  placeholder={placeholder}
                  type={isPasswordVisible ? 'text' : 'password'}
                  className="w-full border-[#E4E4E7]"
                  {...field}
                />

                {isPasswordVisible ? (
                  <Eye
                    className="w-10 h-5 bg-background absolute right-2 top-2.5"
                    onClick={handleChange}
                  />
                ) : (
                  <EyeOff
                    className=" w-10 h-5 bg-background absolute right-2 top-2.5"
                    onClick={handleChange}
                  />
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
