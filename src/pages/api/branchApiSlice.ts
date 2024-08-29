import { buildQueryString } from '@/shared/lib/tableQueryBuilder';
import { apiSlice } from '@/pages/api/apiSlice';
import { API_ENDPOINT } from '@/shared/constants/API_ENDPOINT';
import { QueryParams } from '@/shared/interface/TableType';

const branchBasePath = API_ENDPOINT.BRANCHES.PATH;

export const branchApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBranches: builder.query({
      query: (data: QueryParams) => {
        const queryString = buildQueryString(data);
        return `${branchBasePath}${API_ENDPOINT.BRANCHES.READ}?${queryString}`;
      },
      providesTags: (_, __, data: QueryParams) => [{ type: 'Branch', data }],
    }),
    getBranchesById: builder.query({
      query: (id: string) => {
        return `${branchBasePath}${API_ENDPOINT.BRANCHES.ID.replace(
          ':id',
          id
        )}`;
      },
    }),

    addBranch: builder.mutation({
      query: (credentials) => ({
        url: `${branchBasePath}${API_ENDPOINT.BRANCHES.CREATE}`,
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    updateBranch: builder.mutation({
      query: ({ id, updates }) => ({
        url: `${branchBasePath}${API_ENDPOINT.BRANCHES.UPDATE.replace(
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
  useGetBranchesQuery,
  useGetBranchesByIdQuery,
  useAddBranchMutation,
  useUpdateBranchMutation,
} = branchApiSlice;
