import { useGetMunicipalitiesQuery } from '@/pages/api/locationsApiSlice';
import SelectField from '@/components/admin/select/SelectField';
import { Control } from 'react-hook-form';

interface Municipality {
  name: string;
  mun_code: string;
}

interface SelectMunicipalityProps {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  control: Control<any>;
  region: string;
  province: string;
  onChange: (value: string) => void;
}

const SelectMunicipality: React.FC<SelectMunicipalityProps> = ({
  control,
  region,
  province,
  onChange,
}) => {
  const { data: municipalities } = useGetMunicipalitiesQuery(
    { region, province },
    { skip: !region || !province }
  );
  const items =
    municipalities?.map((municipality: Municipality) => ({
      name: municipality.name,
      code: municipality.mun_code,
    })) || [];

  return (
    <SelectField
      control={control}
      name="municipality"
      label="Municipality"
      placeholder="Select Municipality"
      items={items}
      disabled={!province}
      onChange={onChange}
    />
  );
};

export default SelectMunicipality;
