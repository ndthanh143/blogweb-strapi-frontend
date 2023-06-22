export enum OrderEnum {
  DESC = 'desc',
  ASC = 'asc',
}

export const ORDER_OPTIONS = [
  {
    label: 'latest',
    value: OrderEnum.DESC,
  },
  {
    label: 'oldest',
    value: OrderEnum.ASC,
  },
];
