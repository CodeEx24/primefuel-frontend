import { apiSlice } from '@/pages/api/apiSlice';
import { API_ENDPOINT } from '@/shared/constants/API_ENDPOINT';

const locationsPath = API_ENDPOINT.LOCATIONS.PATH;

export const locationsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get Users
    getRegions: builder.query({
      query: () => `${locationsPath}${API_ENDPOINT.LOCATIONS.GET_REGION}`,
      providesTags: ['Region'], // Add tags for caching
    }),
    // Get Provinces
    getProvinces: builder.query({
      query: (region) =>
        `${locationsPath}${API_ENDPOINT.LOCATIONS.GET_PROVINCE.replace(
          ':region',
          region
        )}`,
      providesTags: (_, __, region) => [{ type: 'Province', id: region }], // Add tags with region id
    }),
    // Get Municipalities
    getMunicipalities: builder.query({
      query: ({ region, province }) =>
        `${locationsPath}${API_ENDPOINT.LOCATIONS.GET_MUNICIPALITY.replace(
          ':region',
          region
        ).replace(':province', province)}`,
      providesTags: (_, __, { region, province }) => [
        { type: 'Municipality', id: `${region}-${province}` },
      ], // Add tags with combined region and province id
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
      providesTags: (_, __, { region, province, municipality }) => [
        { type: 'Barangay', id: `${region}-${province}-${municipality}` },
      ], // Add tags with combined region, province, and municipality id
    }),
  }),
});

export const {
  useGetRegionsQuery,
  useGetProvincesQuery,
  useGetMunicipalitiesQuery,
  useGetBarangaysQuery,
} = locationsApiSlice;
