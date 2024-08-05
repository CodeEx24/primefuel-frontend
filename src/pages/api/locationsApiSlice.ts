import { apiSlice } from '@/pages/api/apiSlice';
import { API_ENDPOINT } from '@/shared/constants/API_ENDPOINT';

const locationsPath = API_ENDPOINT.LOCATIONS.PATH;

export const locationsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get Users
    getRegions: builder.query({
      query: () => `${locationsPath}${API_ENDPOINT.LOCATIONS.GET_REGION}`,
    }),
    // Get Provinces
    getProvinces: builder.query({
      query: (region) =>
        `${locationsPath}${API_ENDPOINT.LOCATIONS.GET_PROVINCE.replace(
          ':region',
          region
        )}`,
    }),
    // Get Municipalities
    getMunicipalities: builder.query({
      query: ({ region, province }) =>
        `${locationsPath}${API_ENDPOINT.LOCATIONS.GET_MUNICIPALITY.replace(
          ':region',
          region
        ).replace(':province', province)}`,
    }),
    // Get Barangays
    getBarangays: builder.query({
      query: ({ region, province, municipality }) =>
        `${locationsPath}${API_ENDPOINT.LOCATIONS.GET_BARANGAY.replace(
          ':region',
          region
        )
          .replace(':province', province)
          .replace(':municipality', municipality)}`,
    }),
  }),
});

export const {
  useGetRegionsQuery,
  useGetProvincesQuery,
  useGetMunicipalitiesQuery,
  useGetBarangaysQuery,
} = locationsApiSlice;
