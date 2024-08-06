import { buildQueryString } from '@/lib/tableQueryBuilder';
import { apiSlice } from '@/pages/api/apiSlice';
import { API_ENDPOINT } from '@/shared/constants/API_ENDPOINT';
import { QueryParams } from '@/shared/interface/TableType';

const usersPath = API_ENDPOINT.USERS.PATH;

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get Users
    getUsers: builder.query({
      query: (data: QueryParams) => {
        const queryString = buildQueryString(data);
        return `${usersPath}${API_ENDPOINT.USERS.READ}?${queryString}`;
      },
      providesTags: (_, __, data: QueryParams) => [{ type: 'User', data }],
    }),
    getUserById: builder.query({
      query: (id: string) => {
        return `${usersPath}${API_ENDPOINT.USERS.ID.replace(':id', id)}`;
      },
    }),
    // Create User
    createUser: builder.mutation({
      query: (newUser) => ({
        url: `${usersPath}${API_ENDPOINT.USERS.CREATE}`,
        method: 'POST',
        body: { ...newUser },
      }),
    }),

    updateUser: builder.mutation({
      query: ({ id, updates }) => ({
        url: `${usersPath}${API_ENDPOINT.USERS.UPDATE.replace(':id', id)}`,
        method: 'PUT', // Use PUT or PATCH for updates
        body: updates,
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  // useUpdateUserMutation,
  // useDeleteUserMutation,
} = usersApiSlice;
