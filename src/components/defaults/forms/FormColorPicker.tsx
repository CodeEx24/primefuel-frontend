import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ColorPicker from '@rc-component/color-picker';
import '@rc-component/color-picker/assets/index.css';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

type FormColorPickerType = {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  control: any;
  name: string;
  placeholder: string;
  label?: string;
  defaultValue?: string;
};

export const FormColorPicker = ({
  label,
  control,
  name,
  placeholder,
}: FormColorPickerType) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => {
        const handleChange = (color: any) => {
          // Convert color to hex string and update
          onChange(color.toHexString());
        };

        // Ensure value is a valid hex color code
        const hexValue = /^#[0-9A-Fa-f]{6}$/.test(value) ? value : '#FFFFFF';

        return (
          <FormItem>
            {label && <Label className="w-full">{label}</Label>}

            <FormControl>
              <div className="flex gap-4">
                <Popover>
                  <PopoverTrigger>
                    <div
                      style={{
                        backgroundColor: hexValue,
                        color: hexValue,
                      }}
                      className="size-8 rounded-full border-2 border-gray-500"
                    ></div>
                  </PopoverTrigger>
                  <PopoverContent>
                    <ColorPicker
                      onChange={handleChange} // Pass the color object and convert to hex string
                      value={hexValue}
                      disabledAlpha
                    />
                  </PopoverContent>
                </Popover>
                <Input
                  placeholder={placeholder}
                  className="border-[#E4E4E7]"
                  value={value}
                  onChange={onChange}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
