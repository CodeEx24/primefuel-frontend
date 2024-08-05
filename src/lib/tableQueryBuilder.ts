import { QueryParams } from '@/shared/interface/TableType';

export const buildQueryString = ({
  page,
  pageSize,
  filters = {},
  sorting = { name: '', order: undefined },
}: QueryParams): string => {
  // Construct the filters query string
  const filterParams = Object.entries(filters)
    .map(([key, value]) => {
      if (value !== '') {
        if (Array.isArray(value)) {
          return `${key}=${value.join(',')}`;
        }
        return `${key}=${value}`;
      }
      return null; // Return null for empty values to filter out later
    })
    .filter(Boolean) // Remove null entries
    .join('&');

  // Construct the sorting query string
  console.log('sorting: ', sorting.name);
  console.log('sorting: ', sorting.order);
  const sortingParams =
    sorting.name && sorting.order
      ? `sortField=${sorting.name}&sortOrder=${sorting.order}`
      : '';

  // Combine all parts of the query string
  const queryStringParts = [
    `page=${page}`,
    `pageSize=${pageSize}`,
    filterParams,
    sortingParams,
  ]
    .filter((part) => part !== '') // Remove empty parts
    .join('&');

  return queryStringParts;
};
