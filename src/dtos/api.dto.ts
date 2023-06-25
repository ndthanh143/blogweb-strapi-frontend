export type PaginationOption = {
  page?: number;
  pageSize?: number;
};

export type SearchAPIProps = {
  query: string;
  options: PaginationOption;
  sort?: string;
};

export type FilterArticlesProps = {
  id: number;
  options: PaginationOption;
  sort?: string;
};
