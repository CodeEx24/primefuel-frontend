import { useGetBarangaysQuery } from '@/pages/api/locationsApiSlice';
import SelectField from '@/components/userBaseComponent/super-admin/select/SelectField';
import { Control } from 'react-hook-form';

interface Barangay {
  name: string;
  mun_code: string;
}

interface SelectBarangayProps {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  control: Control<any>;
  region: string;
  province: string;
  municipality: string;
}

const SelectBarangay: React.FC<SelectBarangayProps> = ({
  control,
  region,
  province,
  municipality,
}) => {
  const { data: barangays } = useGetBarangaysQuery(
    { region, province, municipality },
    { skip: !region || !province || !municipality }
  );
  const items =
    barangays?.map((barangay: Barangay) => ({
      name: barangay.name,
      code: barangay.mun_code,
    })) || [];

  return (
    <SelectField
      control={control}
      name="barangay"
      label="Barangay"
      placeholder="Select Barangay"
      items={items}
      disabled={!municipality}
      onChange={() => {}}
    />
  );
};

export default SelectBarangay;
