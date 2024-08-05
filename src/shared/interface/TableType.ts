export interface FilterType {
  [key: string]: string | undefined;
}
export interface SortingType {
  name?: string;
  order?: 'asc' | 'desc' | undefined;
}

export type QueryParams = {
  page: number;
  pageSize: number;
  filters?: FilterType;
  sorting?: SortingType;
};
