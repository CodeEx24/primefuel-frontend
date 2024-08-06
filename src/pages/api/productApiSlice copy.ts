import { buildQueryString } from '@/lib/tableQueryBuilder';
import { apiSlice } from '@/pages/api/apiSlice';
import { API_ENDPOINT } from '@/shared/constants/API_ENDPOINT';
import { QueryParams } from '@/shared/interface/TableType';

const productPath = API_ENDPOINT.PRODUCTS.PATH;

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get Users
    getProducts: builder.query({
      query: (data: QueryParams) => {
        const queryString = buildQueryString(data);
        return `${productPath}${API_ENDPOINT.PRODUCTS.READ}?${queryString}`;
      },
      providesTags: (_, __, data: QueryParams) => [{ type: 'Product', data }],
    }),
    getProductsById: builder.query({
      query: (id: string) => {
        return `${productPath}${API_ENDPOINT.PRODUCTS.ID.replace(':id', id)}`;
      },
    }),
    // Create User
    createProduct: builder.mutation({
      query: (newProductTypes) => ({
        url: `${productPath}${API_ENDPOINT.PRODUCTS.CREATE}`,
        method: 'POST',
        body: { ...newProductTypes },
      }),
    }),

    updateProduct: builder.mutation({
      query: ({ id, updates }) => ({
        url: `${productPath}${API_ENDPOINT.PRODUCTS.UPDATE.replace(':id', id)}`,
        method: 'PUT', // Use PUT or PATCH for updates
        body: updates,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  // useUpdateUserMutation,
  // useDeleteUserMutation,
} = productsApiSlice;
