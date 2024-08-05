import { useGetProvincesQuery } from '@/pages/api/locationsApiSlice';
import SelectField from '@/components/admin/select/SelectField';
import { Control, useWatch } from 'react-hook-form';

interface Province {
  name: string;
  prov_code: string;
}

interface SelectProvinceProps {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  control: Control<any>;
  region: string;
  onChange: (value: string) => void;
}

const SelectProvince: React.FC<SelectProvinceProps> = ({
  control,
  region,
  onChange,
}) => {
  const { data: provinces } = useGetProvincesQuery(region, { skip: !region });
  const items =
    provinces?.map((province: Province) => ({
      name: province.name,
      code: province.prov_code,
    })) || [];

  const fieldValue = useWatch({ control });
  const matchedItem = items.find(
    (item: { name: string; code: string }) => item.name === fieldValue.region
  );
  console.log('matchedItem: ', matchedItem);
  return (
    <div>
      {provinces && items.length > 0 && (
        <SelectField
          control={control}
          name="province"
          label="Province"
          placeholder="Select Province"
          items={items}
          disabled={!region}
          onChange={onChange}
          dataValue={matchedItem}
        />
      )}
    </div>
  );
};

export default SelectProvince;
