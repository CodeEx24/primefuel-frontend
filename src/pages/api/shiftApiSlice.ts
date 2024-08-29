import { buildQueryString } from '@/shared/lib/tableQueryBuilder';
import { apiSlice } from '@/pages/api/apiSlice';
import { API_ENDPOINT } from '@/shared/constants/API_ENDPOINT';
import { QueryParams } from '@/shared/interface/TableType';

const shiftBasePath = API_ENDPOINT.SHIFTS.PATH;

export const shiftApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllShifts: builder.query({
      query: () => `${shiftBasePath}${API_ENDPOINT.SHIFTS.READ}`,
    }),
    getShiftsById: builder.query({
      query: (id: string) => {
        return `${shiftBasePath}${API_ENDPOINT.SHIFTS.ID.replace(':id', id)}`;
      },
    }),
    getShifts: builder.query({
      query: (data: QueryParams) => {
        const queryString = buildQueryString(data);
        return `${shiftBasePath}${API_ENDPOINT.SHIFTS.READ}?${queryString}`;
      },
      providesTags: (_, __, data: QueryParams) => [{ type: 'Shift', data }],
    }),
    addShift: builder.mutation({
      query: (credentials) => ({
        url: `${shiftBasePath}${API_ENDPOINT.SHIFTS.CREATE}`,
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    updateShift: builder.mutation({
      query: ({ id, updates }) => ({
        url: `${shiftBasePath}${API_ENDPOINT.SHIFTS.UPDATE.replace(':id', id)}`,
        method: 'PUT', // Use PUT or PATCH for updates
        body: updates,
      }),
    }),
  }),
});

export const {
  useGetAllShiftsQuery,
  useGetShiftsByIdQuery,
  useGetShiftsQuery,
  useAddShiftMutation,
  useUpdateShiftMutation,
} = shiftApiSlice;
