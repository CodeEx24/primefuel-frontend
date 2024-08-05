import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React from 'react';
import { useWatch } from 'react-hook-form';

type CodeField = 'reg_code' | 'mun_code' | 'prov_code' | 'bar_code';

interface SelectFieldLocationProps {
  label: string;
  placeholder: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  data: { name: string; [key: string]: string }[];
  codeField: CodeField; // Prop to specify which code field to use
  handleValueChange: (name: string, value: string) => void;
}

const SelectFieldLocation: React.FC<SelectFieldLocationProps> = ({
  label,
  placeholder,
  name,
  control,
  data,
  codeField,
  handleValueChange,
}) => {
  // Create a mapping from name to the specified code field
  const nameToCodeMap = React.useMemo(() => {
    return data.reduce((map, item) => {
      map[item.name] = item[codeField]; // Access the specified code field
      return map;
    }, {} as Record<string, string>);
  }, [data, codeField]);

  // Use `useWatch` to get the current field value
  const fieldValue = useWatch({ control });

  React.useEffect(() => {
    // When fieldValue changes, look up the code and call handleValueChange
    if (fieldValue[name] && nameToCodeMap[fieldValue[name]]) {
      console.log('handleValueCHange: ', name);
      handleValueChange(name, nameToCodeMap[fieldValue[name]]);
    }
  }, []);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <Label>{label}</Label>
          <Select
            onValueChange={(value) => {
              // Use the selected value to get the code from the map
              const code = nameToCodeMap[value];
              field.onChange(value); // Set only the name as the field value
              handleValueChange(name, code); // Pass the code to handleValueChange
            }}
            defaultValue={field.value}
            // disabled={disabled}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            {data && (
              <SelectContent>
                {data.map((item) => (
                  <SelectItem
                    value={item.name} // Use only the name as the value
                    key={item[codeField]} // Use the specified code field as the key
                  >
                    {item.name} {/* Display only the name */}
                  </SelectItem>
                ))}
              </SelectContent>
            )}
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectFieldLocation;
