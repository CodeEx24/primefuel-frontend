import { API_ENDPOINT } from '@/shared/constants/API_ENDPOINT';
import { UserType } from '@/shared/interface/AuthType';
import {
  AuthState,
  logout,
  setCredentials,
} from '@/shared/lib/features/authSlice';
import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';

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

const mutex = new Mutex();

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  object,
  FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);

  if (
    result.error &&
    result.error.status === 'PARSING_ERROR' &&
    result.error.originalStatus === 403
  ) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQuery(
          { url: `${API_ENDPOINT.AUTH.PATH}${API_ENDPOINT.AUTH.REFRESH}` },
          api,
          extraOptions
        );
        if (refreshResult.data) {
          const { user, accessToken } = refreshResult.data as {
            user: UserType;
            accessToken: string;
          };

          // const { token } = refreshResult.data as { token: string };
          api.dispatch(setCredentials({ user, accessToken }));
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logout());
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

// const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
//   const result = (await baseQuery(args, api, extraOptions)) as RootError;
//   if (result?.error?.originalStatus === 403) {
//     // send refresh token to get new access token
//     const refreshResult = await baseQuery(
//       `${API_ENDPOINT.AUTH.PATH}${API_ENDPOINT.AUTH.REFRESH}`,
//       api,
//       extraOptions
//     );
//     if (refreshResult?.data) {
//       const { user, accessToken } = refreshResult.data as {
//         user: UserType;
//         accessToken: string;
//       };

//       // Store the new token
//       api.dispatch(setCredentials({ user, accessToken }));
//       // retry the original query with new access token
//       const newRequest = await baseQuery(args, api, extraOptions);
//       return newRequest;
//     } else {
//       // If invalid logout user
//       api.dispatch(logout());
//     }
//   }

//   return result;
// };

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'Region',
    'Province',
    'Municipality',
    'Barangay',
    'User',
    'Branch',
    'Product Types',
    'Product',
    'Competitor',
  ],
  endpoints: () => ({}),
});
