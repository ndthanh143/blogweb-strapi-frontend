export interface BaseResponse<T> {
  data: BaseResponseData<T>[];
  meta: Meta;
}
export interface BasePaginationResponse<T> {
  data: BaseResponseData<T>[];
  meta: Meta;
}

export interface BaseResponse<T> {
  data: BaseResponseData<T>[];
}

export interface BaseSingleResponse<T> {
  data: BaseResponseData<T>;
}

export interface BaseResponseData<T> {
  id: number;
  attributes: T;
}

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}
