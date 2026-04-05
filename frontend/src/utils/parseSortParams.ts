import type { ItemsQueryParamsApi } from '@/types/itemTypes';

export const parseSortParams = (
  sortStr: string
): Pick<ItemsQueryParamsApi, 'sortColumn' | 'sortDirection'> => {
  const [column, direction] = sortStr.split('_');

  return {
    sortColumn:
      column === 'title' || column === 'createdAt' || column === 'price' ? column : undefined,

    sortDirection: direction === 'asc' || direction === 'desc' ? direction : undefined,
  };
};
