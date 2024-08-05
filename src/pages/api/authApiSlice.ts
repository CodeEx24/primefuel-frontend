import { apiSlice } from '@/pages/api/apiSlice';
import { API_ENDPOINT } from '@/shared/constants/API_ENDPOINT';

const authBasePath = API_ENDPOINT.AUTH.PATH;

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: `${authBasePath}${API_ENDPOINT.AUTH.LOGIN}`,
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: `${authBasePath}${API_ENDPOINT.AUTH.REGISTER}`,
        method: 'POST',
        body: { ...credentials },
      }),
    }),

    logout: builder.query({
      query: () => `${authBasePath}${API_ENDPOINT.AUTH.LOGOUT}`,
      // Note: The method defaults to GET, so no need to specify method
    }),

    // refresh: builder.query({
    //   query: () => `${authBasePath}${API_ENDPOINT.LOCATIONS.GET_REGION}`,
    // }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutQuery } =
  authApiSlice;
