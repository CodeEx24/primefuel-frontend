import { buildQueryString } from '@/shared/lib/tableQueryBuilder';
import { apiSlice } from '@/pages/api/apiSlice';
import { API_ENDPOINT } from '@/shared/constants/API_ENDPOINT';
import { QueryParams } from '@/shared/interface/TableType';

const productTypesPath = API_ENDPOINT.PRODUCT_TYPES.PATH;

export const productTypesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get Users
    getProductTypes: builder.query({
      query: (data: QueryParams) => {
        const queryString = buildQueryString(data);
        return `${productTypesPath}${API_ENDPOINT.PRODUCT_TYPES.READ}?${queryString}`;
      },
      providesTags: (_, __, data: QueryParams) => [
        { type: 'Product Types', data },
      ],
    }),
    getAllProductTypes: builder.query({
      query: () => `${productTypesPath}${API_ENDPOINT.PRODUCT_TYPES.READ}`,
      providesTags: () => [{ type: 'Product Types' }],
    }),
    getProductTypeById: builder.query({
      query: (id: string) => {
        return `${productTypesPath}${API_ENDPOINT.PRODUCT_TYPES.ID.replace(
          ':id',
          id
        )}`;
      },
    }),
    // Create User
    createProductTypes: builder.mutation({
      query: (newProductTypes) => ({
        url: `${productTypesPath}${API_ENDPOINT.PRODUCT_TYPES.CREATE}`,
        method: 'POST',
        body: { ...newProductTypes },
      }),
    }),

    updateProductTypes: builder.mutation({
      query: ({ id, updates }) => ({
        url: `${productTypesPath}${API_ENDPOINT.PRODUCT_TYPES.UPDATE.replace(
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
  useGetProductTypesQuery,
  useGetAllProductTypesQuery,
  useGetProductTypeByIdQuery,
  useCreateProductTypesMutation,
  useUpdateProductTypesMutation,
  // useUpdateUserMutation,
  // useDeleteUserMutation,
} = productTypesApiSlice;
