import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { getItems } from '@/api/item';
import type { ItemsQueryParamsApi } from '@/types/itemTypes';

export const useItemsQuery = (params: ItemsQueryParamsApi) =>
  useQuery({
    queryKey: ['items', params],
    queryFn: ({ signal }) => getItems(params, signal),
    placeholderData: keepPreviousData,
  });
