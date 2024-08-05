import { useGetRegionsQuery } from '@/pages/api/locationsApiSlice';
import SelectField from '@/components/admin/select/SelectField';
import { Control, useWatch } from 'react-hook-form';

interface Region {
  name: string;
  reg_code: string;
}

interface SelectRegionProps {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  control: Control<any>;
  onChange: (value: string) => void;
}

const SelectRegion: React.FC<SelectRegionProps> = ({ control, onChange }) => {
  const { data: regions } = useGetRegionsQuery({});
  const items =
    regions?.map((region: Region) => ({
      name: region.name,
      code: region.reg_code,
    })) || [];

  const fieldValue = useWatch({ control });
  const matchedItem = items.find(
    (item: { name: string; code: string }) => item.name === fieldValue.region
  );
  console.log('matchedItem: ', matchedItem);
  return (
    <div>
      {regions && items.length > 0 && matchedItem ? (
        <SelectField
          control={control}
          name="region"
          label="Region"
          placeholder="Select Region"
          items={items}
          onChange={onChange}
          dataValue={matchedItem}
        />
      ) : (
        <SelectField
          control={control}
          name="region"
          label="Region"
          placeholder="Select Region"
          items={items}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default SelectRegion;
