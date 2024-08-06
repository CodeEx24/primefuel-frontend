import { buildQueryString } from '@/lib/tableQueryBuilder';
import { apiSlice } from '@/pages/api/apiSlice';
import { API_ENDPOINT } from '@/shared/constants/API_ENDPOINT';
import { QueryParams } from '@/shared/interface/TableType';

const competitorPath = API_ENDPOINT.COMPETITORS.PATH;

export const competitorsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get Users
    getCompetitors: builder.query({
      query: (data: QueryParams) => {
        const queryString = buildQueryString(data);
        return `${competitorPath}${API_ENDPOINT.COMPETITORS.READ}?${queryString}`;
      },
      providesTags: (_, __, data: QueryParams) => [
        { type: 'Competitor', data },
      ],
    }),
    getCompetitorsById: builder.query({
      query: (id: string) => {
        return `${competitorPath}${API_ENDPOINT.COMPETITORS.ID.replace(
          ':id',
          id
        )}`;
      },
    }),
    // Create User
    createCompetitor: builder.mutation({
      query: (newProductTypes) => ({
        url: `${competitorPath}${API_ENDPOINT.COMPETITORS.CREATE}`,
        method: 'POST',
        body: { ...newProductTypes },
      }),
    }),

    updateCompetitor: builder.mutation({
      query: ({ id, updates }) => ({
        url: `${competitorPath}${API_ENDPOINT.COMPETITORS.UPDATE.replace(
          ':id',
          id
        )}`,
        method: 'PUT', // Use PUT or PATCH for updates
        body: updates,
      }),
    }),
  }),
});

export const {
  useGetCompetitorsQuery,
  useGetCompetitorsByIdQuery,
  useCreateCompetitorMutation,
  useUpdateCompetitorMutation,
  // useUpdateUserMutation,
  // useDeleteUserMutation,
} = competitorsApiSlice;
