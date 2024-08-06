import { FilterType, SortingType } from '@/shared/interface/TableType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PaginationState {
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  pageCount: number;
  totalRecords: number;
  filters: FilterType;
  sorting: SortingType;
  refetchData: boolean;
}

const initialState: PaginationState = {
  pagination: {
    pageIndex: 1,
    pageSize: 10,
  },
  pageCount: 0,
  totalRecords: 0,
  filters: {},
  sorting: {},
  refetchData: false,
};

const tablePaginationSlice = createSlice({
  name: 'pageDetails',
  initialState: initialState,
  reducers: {
    setPaginationDetails: (
      state,
      action: PayloadAction<{
        pagination: { pageIndex: number; pageSize: number };
        pageCount: number;
        totalRecords: number;
      }>
    ) => {
      const { pagination, pageCount, totalRecords } = action.payload;
      state.pagination = pagination;
      state.pageCount = pageCount;
      state.totalRecords = totalRecords;
    },
    setPagination: (
      state,
      action: PayloadAction<{
        pageIndex: number;
        pageSize: number;
      }>
    ) => {
      const { pageIndex, pageSize } = action.payload;
      state.pagination = { pageIndex, pageSize };
    },

    setPageSize: (
      state,
      action: PayloadAction<{
        pageSize: number;
      }>
    ) => {
      state.pagination.pageSize = action.payload.pageSize;
    },

    setPageIndex: (
      state,
      action: PayloadAction<{
        pageIndex: number;
      }>
    ) => {
      state.pagination.pageIndex = action.payload.pageIndex;
    },

    resetPagination: (state) => {
      state.pagination = { pageIndex: 1, pageSize: 10 };
      state.pageCount = 0;
      state.totalRecords = 0;
      state.filters = {};
    },

    setRefetchData: (state) => {
      state.refetchData = !state.refetchData;
    },

    setFilters: (
      state,
      action: PayloadAction<{
        title: string;
        value: string | string[];
      }>
    ) => {
      const { title, value } = action.payload;
      if (title) {
        if (typeof value === 'string') {
          // If value is a string, assign directly
          state.filters[title] = value;
        } else if (Array.isArray(value)) {
          // If value is an array, you might want to join or handle differently
          state.filters[title] = value.join(','); // Example: join array into a comma-separated string
        } else {
          // Handle the case where value is undefined or some other type
          delete state.filters[title];
        }
      }
    },

    setSorting: (
      state,
      action: PayloadAction<{
        name: string;
        order: 'asc' | 'desc' | '';
      }>
    ) => {
      const { name, order } = action.payload;
      // Clear sorting if name is missing or order is invalid
      if (!name || (order !== 'asc' && order !== 'desc')) {
        delete state.sorting.name;
        delete state.sorting.order;
        return;
      }

      // Reset sorting if it is already set with the same value
      if (state.sorting.name === name && state.sorting.order === order) {
        delete state.sorting.name;
        delete state.sorting.order;
      } else {
        // Set sorting with new order
        state.sorting['name'] = name;
        state.sorting['order'] = order;
      }
    },
  },
});

export const {
  setPaginationDetails,
  setPageSize,
  setPageIndex,
  resetPagination,
  setRefetchData,
  setPagination,
  setFilters,
  setSorting,
} = tablePaginationSlice.actions;
export default tablePaginationSlice.reducer;

export const getPagination = (state: { pageDetails: PaginationState }) =>
  state.pageDetails.pagination;
export const getTotalPageCount = (state: { pageDetails: PaginationState }) =>
  state.pageDetails.pageCount;
export const getTotalRecords = (state: { pageDetails: PaginationState }) =>
  state.pageDetails.totalRecords;
export const getFilters = (state: { pageDetails: PaginationState }) =>
  state.pageDetails.filters;
export const getSorting = (state: { pageDetails: PaginationState }) =>
  state.pageDetails.sorting;
export const getRefetchStatus = (state: { pageDetails: PaginationState }) =>
  state.pageDetails.refetchData;
