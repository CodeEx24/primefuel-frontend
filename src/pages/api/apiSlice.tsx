import { API_ENDPOINT } from '@/shared/constants/API_ENDPOINT';
import { UserType } from '@/shared/interface/AuthType';
import { RootError } from '@/shared/interface/ErrorType';
import {
  AuthState,
  logout,
  setCredentials,
} from '@/shared/lib/features/authSlice';
import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:4000',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as { auth: AuthState };
    const token = state.auth.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
  const result = (await baseQuery(args, api, extraOptions)) as RootError;
  if (result?.error?.originalStatus === 403) {
    // send refresh token to get new access token
    const refreshResult = await baseQuery(
      `${API_ENDPOINT.AUTH.PATH}${API_ENDPOINT.AUTH.REFRESH}`,
      api,
      extraOptions
    );
    if (refreshResult?.data) {
      const { user, accessToken } = refreshResult.data as {
        user: UserType;
        accessToken: string;
      };

      // Store the new token
      api.dispatch(setCredentials({ user, accessToken }));
      // retry the original query with new access token
      const newRequest = await baseQuery(args, api, extraOptions);
      return newRequest;
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User', 'Branch'],
  endpoints: () => ({}),
});
